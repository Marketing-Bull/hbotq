#!/usr/bin/env node
/**
 * scripts/validate-schema.mjs
 *
 * Walks the Next.js build output (under .next/server/app/) and validates
 * every <script type="application/ld+json"> block against schema.org rules.
 *
 * This catches bugs that would silently break Google rich results:
 *   - Missing required fields (@context, @type, name, address, geo, etc.)
 *   - Wrong URL format in sameAs / url / item / image
 *   - AggregateRating bounds violations (ratingValue outside [worst, best])
 *   - Mismatched `tel:` / `telephone` values
 *   - Broken BreadcrumbList (position must start at 1, must be contiguous)
 *   - FAQPage with empty questions
 *   - Review without author / reviewBody / itemReviewed
 *
 * Usage:
 *   node scripts/validate-schema.mjs              # validate existing .next
 *   node scripts/validate-schema.mjs --verbose    # show every block checked
 *   node scripts/validate-schema.mjs --no-fail    # warnings only, exit 0
 *
 * Exits 1 on any error unless --no-fail is passed.
 * Exits 2 if .next/ doesn't exist (suggests `npm run build` first).
 */

import { readFile, readdir, stat } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

// ---------- Config ----------

const PROJECT_ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const BUILD_DIR = join(PROJECT_ROOT, ".next", "server", "app");
const SCHEMA_ORG = "https://schema.org";

const args = new Set(process.argv.slice(2));
const VERBOSE = args.has("--verbose") || args.has("-v");
const NO_FAIL = args.has("--no-fail");

// ---------- Color helpers (no chalk dep) ----------

const supportsColor = process.stdout.isTTY && !process.env.NO_COLOR;
const c = (code) => (s) => (supportsColor ? `\x1b[${code}m${s}\x1b[0m` : String(s));
const red = c("31");
const green = c("32");
const yellow = c("33");
const blue = c("34");
const gray = c("90");
const bold = c("1");

// ---------- Errors collected during validation ----------

const errors = []; // { page, blockIndex, @type, message }
const warnings = []; // { page, blockIndex, @type, message }
const stats = {
  pages: 0,
  blocks: 0,
  byType: {},
  errors: 0,
  warnings: 0,
};

function err(page, idx, type, message) {
  errors.push({ page, blockIndex: idx, "@type": type, message });
  stats.errors++;
}
function warn(page, idx, type, message) {
  warnings.push({ page, blockIndex: idx, "@type": type, message });
  stats.warnings++;
}

// ---------- Assertion helpers ----------

function isPlainObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function isHttpUrl(v) {
  if (typeof v !== "string") return false;
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

function isNumber(v) {
  return typeof v === "number" && Number.isFinite(v);
}

function nonEmptyString(v) {
  return typeof v === "string" && v.trim().length > 0;
}

function present(v) {
  return v !== undefined && v !== null;
}

// ---------- Field validators ----------

function validateString(page, idx, type, field, value, opts = {}) {
  if (value === undefined) {
    err(page, idx, type, `missing required string field: ${field}`);
    return null;
  }
  if (!nonEmptyString(value)) {
    err(page, idx, type, `field "${field}" must be a non-empty string (got ${typeof value})`);
    return null;
  }
  if (opts.url && !isHttpUrl(value)) {
    err(page, idx, type, `field "${field}" must be an http(s) URL (got: ${JSON.stringify(value)})`);
    return null;
  }
  return value;
}

function validateNumber(page, idx, type, field, value, opts = {}) {
  if (value === undefined) {
    if (opts.required) err(page, idx, type, `missing required number field: ${field}`);
    return null;
  }
  if (!isNumber(value)) {
    err(page, idx, type, `field "${field}" must be a finite number (got ${typeof value}: ${JSON.stringify(value)})`);
    return null;
  }
  return value;
}

function validateArray(page, idx, type, field, value, opts = {}) {
  if (!Array.isArray(value)) {
    err(page, idx, type, `field "${field}" must be an array (got ${typeof value})`);
    return null;
  }
  if (opts.minItems !== undefined && value.length < opts.minItems) {
    err(page, idx, type, `field "${field}" must have at least ${opts.minItems} item(s) (got ${value.length})`);
    return null;
  }
  return value;
}

// ---------- Type-specific validators ----------

function validateContext(page, idx, block) {
  if (block["@context"] !== SCHEMA_ORG) {
    err(page, idx, block["@type"], `"@context" must equal "${SCHEMA_ORG}" (got ${JSON.stringify(block["@context"] ?? null)})`);
    return false;
  }
  return true;
}

function validatePostalAddress(page, idx, type, addr) {
  if (!isPlainObject(addr)) {
    err(page, idx, type, `"address" must be an object with @type PostalAddress`);
    return;
  }
  if (addr["@type"] !== "PostalAddress") {
    err(page, idx, type, `"address" @type must be "PostalAddress" (got ${JSON.stringify(addr["@type"])})`);
  }
  validateString(page, idx, type, "address.streetAddress", addr.streetAddress);
  validateString(page, idx, type, "address.addressLocality", addr.addressLocality);
  validateString(page, idx, type, "address.addressRegion", addr.addressRegion);
  validateString(page, idx, type, "address.postalCode", addr.postalCode);
  validateString(page, idx, type, "address.addressCountry", addr.addressCountry);
}

function validateGeo(page, idx, type, geo) {
  if (!isPlainObject(geo)) {
    err(page, idx, type, `"geo" must be an object with @type GeoCoordinates`);
    return;
  }
  if (geo["@type"] !== "GeoCoordinates") {
    err(page, idx, type, `"geo" @type must be "GeoCoordinates" (got ${JSON.stringify(geo["@type"])})`);
  }
  validateNumber(page, idx, type, "geo.latitude", geo.latitude, { required: true });
  validateNumber(page, idx, type, "geo.longitude", geo.longitude, { required: true });
  if (isNumber(geo.latitude) && (geo.latitude < -90 || geo.latitude > 90)) {
    err(page, idx, type, `geo.latitude out of range [-90, 90]: ${geo.latitude}`);
  }
  if (isNumber(geo.longitude) && (geo.longitude < -180 || geo.longitude > 180)) {
    err(page, idx, type, `geo.longitude out of range [-180, 180]: ${geo.longitude}`);
  }
}

function validateOpeningHours(page, idx, type, hours) {
  const arr = validateArray(page, idx, type, "openingHoursSpecification", hours, { minItems: 0 });
  if (!arr) return;
  for (let i = 0; i < arr.length; i++) {
    const h = arr[i];
    if (!isPlainObject(h)) {
      err(page, idx, type, `openingHoursSpecification[${i}] must be an object`);
      continue;
    }
    if (h["@type"] !== "OpeningHoursSpecification") {
      err(page, idx, type, `openingHoursSpecification[${i}] @type must be "OpeningHoursSpecification" (got ${JSON.stringify(h["@type"])})`);
    }
    validateString(page, idx, type, `openingHoursSpecification[${i}].dayOfWeek`, h.dayOfWeek);
    validateString(page, idx, type, `openingHoursSpecification[${i}].opens`, h.opens);
    validateString(page, idx, type, `openingHoursSpecification[${i}].closes`, h.closes);
  }
}

function validateAggregateRating(page, idx, type, ar) {
  if (!isPlainObject(ar)) {
    err(page, idx, type, `"aggregateRating" must be an object`);
    return;
  }
  if (ar["@type"] !== "AggregateRating") {
    err(page, idx, type, `aggregateRating @type must be "AggregateRating" (got ${JSON.stringify(ar["@type"])})`);
  }
  const rv = validateNumber(page, idx, type, "aggregateRating.ratingValue", ar.ratingValue, { required: true });
  const rc = validateNumber(page, idx, type, "aggregateRating.reviewCount", ar.reviewCount, { required: true });
  const best = validateNumber(page, idx, type, "aggregateRating.bestRating", ar.bestRating, { required: true });
  const worst = validateNumber(page, idx, type, "aggregateRating.worstRating", ar.worstRating, { required: true });
  if (rv !== null && best !== null && worst !== null) {
    if (rv < worst || rv > best) {
      err(page, idx, type, `aggregateRating.ratingValue ${rv} out of bounds [${worst}, ${best}]`);
    }
  }
  if (rc !== null && rc <= 0) {
    err(page, idx, type, `aggregateRating.reviewCount must be > 0 (got ${rc})`);
  }
}

function validateSearchAction(page, idx, type, sa, path) {
  if (!isPlainObject(sa)) {
    err(page, idx, type, `${path} must be an object with @type SearchAction`);
    return;
  }
  if (sa["@type"] !== "SearchAction") {
    err(page, idx, type, `${path} @type must be "SearchAction" (got ${JSON.stringify(sa["@type"])})`);
  }
  // target can be a string URL or an EntryPoint object. Google's docs accept both.
  if (sa.target === undefined) {
    err(page, idx, type, `${path} is missing required "target" field`);
  } else if (typeof sa.target === "string") {
    if (!isHttpUrl(sa.target)) {
      err(page, idx, type, `${path}.target string must be an http(s) URL (got ${JSON.stringify(sa.target)})`);
    }
  } else if (isPlainObject(sa.target)) {
    if (sa.target["@type"] !== undefined && sa.target["@type"] !== "EntryPoint") {
      err(page, idx, type, `${path}.target.@type must be "EntryPoint" when present (got ${JSON.stringify(sa.target["@type"])})`);
    }
    validateString(page, idx, type, `${path}.target.urlTemplate`, sa.target.urlTemplate, { url: true });
  } else {
    err(page, idx, type, `${path}.target must be a string URL or EntryPoint object (got ${typeof sa.target})`);
  }
  // `query-input` must look like `required name=<placeholder>` per Google's
  // docs, and the placeholder on the right of `=` must appear in urlTemplate.
  const qi = sa["query-input"];
  if (typeof qi !== "string" || !/^required name=[\w-]+$/.test(qi)) {
    err(page, idx, type, `${path}["query-input"] must match /^required name=[\\w-]+$/ (got ${JSON.stringify(qi)})`);
  } else {
    const placeholder = qi.replace(/^required name=/, "");
    if (isPlainObject(sa.target) && typeof sa.target.urlTemplate === "string" && !sa.target.urlTemplate.includes(`{${placeholder}}`)) {
      err(page, idx, type, `${path}["query-input"] placeholder "{${placeholder}}" must appear in target.urlTemplate (${JSON.stringify(sa.target.urlTemplate)})`);
    }
  }
}

function validateWebSite(page, idx, block) {
  validateString(page, idx, "WebSite", "name", block.name);
  validateString(page, idx, "WebSite", "url", block.url, { url: true });
  if (present(block.alternateName)) {
    validateString(page, idx, "WebSite", "alternateName", block.alternateName);
  }
  if (present(block.inLanguage)) {
    validateString(page, idx, "WebSite", "inLanguage", block.inLanguage);
  }
  if (present(block.publisher)) {
    const pub = block.publisher;
    if (!isPlainObject(pub) || !nonEmptyString(pub["@id"])) {
      err(page, idx, "WebSite", `"publisher" must be an object with @id (the parent business)`);
    }
  }
  if (present(block.potentialAction)) {
    const pa = block.potentialAction;
    if (Array.isArray(pa)) {
      for (let i = 0; i < pa.length; i++) {
        validateSearchAction(page, idx, "WebSite", pa[i], `potentialAction[${i}]`);
      }
    } else {
      validateSearchAction(page, idx, "WebSite", pa, "potentialAction");
    }
  }
}

function validateRating(page, idx, type, r, path) {
  if (!isPlainObject(r)) {
    err(page, idx, type, `${path} must be an object with @type Rating`);
    return;
  }
  if (r["@type"] !== "Rating") {
    err(page, idx, type, `${path} @type must be "Rating" (got ${JSON.stringify(r["@type"])})`);
  }
  const rv = validateNumber(page, idx, type, `${path}.ratingValue`, r.ratingValue, { required: true });
  const best = validateNumber(page, idx, type, `${path}.bestRating`, r.bestRating, { required: true });
  const worst = validateNumber(page, idx, type, `${path}.worstRating`, r.worstRating, { required: true });
  if (rv !== null && best !== null && worst !== null) {
    if (rv < worst || rv > best) {
      err(page, idx, type, `${path}.ratingValue ${rv} out of bounds [${worst}, ${best}]`);
    }
  }
}

function validateMedicalBusiness(page, idx, block) {
  validateString(page, idx, "MedicalBusiness", "name", block.name);
  validateString(page, idx, "MedicalBusiness", "url", block.url, { url: true });
  validateString(page, idx, "MedicalBusiness", "telephone", block.telephone);
  if (present(block.telephone) && !/^[+\d][\d\s\-().]{5,}$/.test(block.telephone)) {
    warn(page, idx, "MedicalBusiness", `telephone does not look like a phone number: ${JSON.stringify(block.telephone)}`);
  }
  if (present(block.email)) {
    validateString(page, idx, "MedicalBusiness", "email", block.email);
    if (nonEmptyString(block.email) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(block.email)) {
      warn(page, idx, "MedicalBusiness", `email does not look like an email address: ${JSON.stringify(block.email)}`);
    }
  }
  validatePostalAddress(page, idx, "MedicalBusiness", block.address);
  validateGeo(page, idx, "MedicalBusiness", block.geo);
  validateOpeningHours(page, idx, "MedicalBusiness", block.openingHoursSpecification);
  if (present(block.sameAs)) {
    const sa = validateArray(page, idx, "MedicalBusiness", "sameAs", block.sameAs);
    if (sa) {
      for (let i = 0; i < sa.length; i++) {
        if (!isHttpUrl(sa[i])) {
          err(page, idx, "MedicalBusiness", `sameAs[${i}] must be an http(s) URL (got: ${JSON.stringify(sa[i])})`);
        }
      }
    }
  }
  if (present(block.aggregateRating)) {
    validateAggregateRating(page, idx, "MedicalBusiness", block.aggregateRating);
  }
  if (Array.isArray(block.employee)) {
    for (let i = 0; i < block.employee.length; i++) {
      const e = block.employee[i];
      if (e["@type"] !== "Physician") {
        err(page, idx, "MedicalBusiness", `employee[${i}] @type must be "Physician" (got ${JSON.stringify(e["@type"])})`);
      }
      validateString(page, idx, "MedicalBusiness", `employee[${i}].name`, e.name);
      validateString(page, idx, "MedicalBusiness", `employee[${i}].jobTitle`, e.jobTitle);
      if (e.medicalSpecialty !== undefined && !Array.isArray(e.medicalSpecialty)) {
        err(page, idx, "MedicalBusiness", `employee[${i}].medicalSpecialty must be an array`);
      }
    }
  }
}

function validatePhysician(page, idx, block) {
  validateString(page, idx, "Physician", "name", block.name);
  validateString(page, idx, "Physician", "jobTitle", block.jobTitle);
  if (block.medicalSpecialty !== undefined && !Array.isArray(block.medicalSpecialty)) {
    err(page, idx, "Physician", `"medicalSpecialty" must be an array`);
  }
  if (block.worksFor !== undefined) {
    const wf = block.worksFor;
    if (!isPlainObject(wf) || !nonEmptyString(wf["@id"])) {
      err(page, idx, "Physician", `"worksFor" must be an object with @id (the parent business)`);
    }
  }
}

function validateMedicalCondition(page, idx, block) {
  validateString(page, idx, "MedicalCondition", "name", block.name);
  validateString(page, idx, "MedicalCondition", "description", block.description);
  validateString(page, idx, "MedicalCondition", "url", block.url, { url: true });
  if (present(block.possibleTreatment)) {
    const pt = block.possibleTreatment;
    if (!isPlainObject(pt)) {
      err(page, idx, "MedicalCondition", `"possibleTreatment" must be an object`);
    } else {
      if (pt["@type"] !== "MedicalTherapy") {
        err(page, idx, "MedicalCondition", `possibleTreatment @type must be "MedicalTherapy" (got ${JSON.stringify(pt["@type"])})`);
      }
      validateString(page, idx, "MedicalCondition", "possibleTreatment.name", pt.name);
      if (present(pt.url)) validateString(page, idx, "MedicalCondition", "possibleTreatment.url", pt.url, { url: true });
    }
  }
}

function validateFAQPage(page, idx, block) {
  const main = validateArray(page, idx, "FAQPage", "mainEntity", block.mainEntity, { minItems: 1 });
  if (!main) return;
  for (let i = 0; i < main.length; i++) {
    const q = main[i];
    if (!isPlainObject(q)) {
      err(page, idx, "FAQPage", `mainEntity[${i}] must be an object`);
      continue;
    }
    if (q["@type"] !== "Question") {
      err(page, idx, "FAQPage", `mainEntity[${i}] @type must be "Question" (got ${JSON.stringify(q["@type"])})`);
    }
    validateString(page, idx, "FAQPage", `mainEntity[${i}].name`, q.name);
    if (!isPlainObject(q.acceptedAnswer)) {
      err(page, idx, "FAQPage", `mainEntity[${i}].acceptedAnswer must be an object`);
      continue;
    }
    if (q.acceptedAnswer["@type"] !== "Answer") {
      err(page, idx, "FAQPage", `mainEntity[${i}].acceptedAnswer @type must be "Answer" (got ${JSON.stringify(q.acceptedAnswer["@type"])})`);
    }
    validateString(page, idx, "FAQPage", `mainEntity[${i}].acceptedAnswer.text`, q.acceptedAnswer.text);
  }
}

function validateBreadcrumb(page, idx, block) {
  const items = validateArray(page, idx, "BreadcrumbList", "itemListElement", block.itemListElement, { minItems: 2 });
  if (!items) return;
  let expectedPos = 1;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!isPlainObject(it)) {
      err(page, idx, "BreadcrumbList", `itemListElement[${i}] must be an object`);
      expectedPos++;
      continue;
    }
    if (it["@type"] !== "ListItem") {
      err(page, idx, "BreadcrumbList", `itemListElement[${i}] @type must be "ListItem" (got ${JSON.stringify(it["@type"])})`);
    }
    validateNumber(page, idx, "BreadcrumbList", `itemListElement[${i}].position`, it.position, { required: true });
    if (it.position !== expectedPos) {
      err(page, idx, "BreadcrumbList", `itemListElement[${i}].position should be ${expectedPos} (got ${it.position})`);
    }
    validateString(page, idx, "BreadcrumbList", `itemListElement[${i}].name`, it.name);
    validateString(page, idx, "BreadcrumbList", `itemListElement[${i}].item`, it.item, { url: true });
    expectedPos++;
  }
}

function validateReview(page, idx, block) {
  validateString(page, idx, "Review", "reviewBody", block.reviewBody);
  if (!isPlainObject(block.reviewRating)) {
    err(page, idx, "Review", `"reviewRating" must be an object with @type Rating`);
  } else {
    validateRating(page, idx, "Review", block.reviewRating, "reviewRating");
  }
  if (!isPlainObject(block.author)) {
    err(page, idx, "Review", `"author" must be an object with @type Person`);
  } else {
    if (block.author["@type"] !== "Person") {
      err(page, idx, "Review", `author @type must be "Person" (got ${JSON.stringify(block.author["@type"])})`);
    }
    validateString(page, idx, "Review", "author.name", block.author.name);
  }
  if (present(block.itemReviewed)) {
    const ir = block.itemReviewed;
    if (!isPlainObject(ir)) {
      err(page, idx, "Review", `"itemReviewed" must be an object`);
    } else {
      validateString(page, idx, "Review", "itemReviewed.name", ir.name);
      if (present(ir.url)) validateString(page, idx, "Review", "itemReviewed.url", ir.url, { url: true });
    }
  } else {
    err(page, idx, "Review", `missing required "itemReviewed"`);
  }
}

const TYPE_VALIDATORS = {
  MedicalBusiness: validateMedicalBusiness,
  Physician: validatePhysician,
  MedicalCondition: validateMedicalCondition,
  FAQPage: validateFAQPage,
  BreadcrumbList: validateBreadcrumb,
  Review: validateReview,
  WebSite: validateWebSite,
  // AggregateRating + Rating are nested inside other types; we still accept
  // them as top-level for future schema additions, and validate their fields.
  AggregateRating(page, idx, block) {
    validateAggregateRating(page, idx, "AggregateRating", block);
  },
  Rating(page, idx, block) {
    validateRating(page, idx, "Rating", block, "");
  },
};

function validateBlock(page, idx, block) {
  if (!isPlainObject(block)) {
    err(page, idx, "?", `block is not a JSON object`);
    return;
  }
  if (!nonEmptyString(block["@type"])) {
    err(page, idx, "?", `missing required "@type" string field`);
    return;
  }
  const type = block["@type"];
  stats.byType[type] = (stats.byType[type] ?? 0) + 1;
  if (!validateContext(page, idx, block)) return;
  const validator = TYPE_VALIDATORS[type];
  if (!validator) {
    warn(page, idx, type, `no validator defined for @type "${type}" — skipping deep validation`);
    return;
  }
  validator(page, idx, block);
}

// ---------- HTML parsing ----------

// JSON-LD is rendered by <JsonLd> as:
//   <script type="application/ld+json">...</script>
// Inside the Next.js HTML, the script body is escaped so that "</script>" can't
// close the tag prematurely. We need to match the unescaped JSON when parsing.
const JSON_LD_RE = /<script\s+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;

async function extractJsonLdBlocks(html) {
  const out = [];
  let m;
  // Reset regex state per page (defensive)
  JSON_LD_RE.lastIndex = 0;
  while ((m = JSON_LD_RE.exec(html)) !== null) {
    let body = m[1];
    // Unescape the XSS-hardening from <JsonLd> (see components/seo/json-ld.tsx):
    //   < becomes \u003c
    // When parsing JSON this is a no-op, but other entities the renderer emits
    // (none today) would need handling here.
    try {
      const parsed = JSON.parse(body);
      out.push(parsed);
    } catch (e) {
      // Stash as a string marker; caller will log it.
      out.push({ __parseError: String(e.message), __raw: body.slice(0, 200) });
    }
  }
  return out;
}

// ---------- File walking ----------

async function walk(dir) {
  const out = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (e) {
    if (e.code === "ENOENT") return out;
    throw e;
  }
  for (const e of entries) {
    const full = join(dir, e.name);
    if (e.isDirectory()) {
      out.push(...(await walk(full)));
    } else if (e.isFile() && e.name.endsWith(".html")) {
      out.push(full);
    }
  }
  return out;
}

// ---------- Main ----------

async function main() {
  // Verify .next exists
  try {
    const s = await stat(BUILD_DIR);
    if (!s.isDirectory()) throw new Error("not a directory");
  } catch {
    console.error(red(`✗ ${relative(PROJECT_ROOT, BUILD_DIR)} does not exist.`));
    console.error(red(`  Run \`npm run build\` first to generate build output, then re-run this script.`));
    console.error(red(`  Or run \`npm run build:validate\` to build and validate in one step.`));
    process.exit(2);
  }

  const htmlFiles = (await walk(BUILD_DIR)).sort();
  if (htmlFiles.length === 0) {
    console.error(yellow(`⚠ No .html files found under ${relative(PROJECT_ROOT, BUILD_DIR)}/`));
    console.error(yellow(`  Did \`next build\` complete successfully?`));
    process.exit(2);
  }

  console.log(bold(`Validating JSON-LD in ${htmlFiles.length} built page(s)...`));
  console.log(gray(`  source: ${relative(PROJECT_ROOT, BUILD_DIR)}/`));
  console.log("");

  for (const file of htmlFiles) {
    stats.pages++;
    const rel = relative(PROJECT_ROOT, file);
    const html = await readFile(file, "utf8");
    const blocks = await extractJsonLdBlocks(html);

    if (blocks.length === 0) {
      // Not an error — some pages may not have any structured data.
      if (VERBOSE) {
        console.log(gray(`  ${rel}  (0 blocks)`));
      }
      continue;
    }

    console.log(`${blue("→")} ${rel}  ${gray(`(${blocks.length} block${blocks.length === 1 ? "" : "s"})`)}`);

    for (let i = 0; i < blocks.length; i++) {
      stats.blocks++;
      const b = blocks[i];
      if (b && typeof b === "object" && "__parseError" in b) {
        err(rel, i, "?", `could not JSON-parse the <script> body: ${b.__parseError} (raw: ${b.__raw}…)`);
        continue;
      }
      validateBlock(rel, i, b);
      if (VERBOSE) {
        const type = b && typeof b === "object" ? b["@type"] : "?";
        console.log(`    [${i}] ${green("@type")} ${type}`);
      }
    }
  }

  // ---------- Summary ----------

  console.log("");
  console.log(bold("─".repeat(60)));
  console.log(bold("Summary"));
  console.log(`  Pages scanned:    ${stats.pages}`);
  console.log(`  JSON-LD blocks:   ${stats.blocks}`);
  if (Object.keys(stats.byType).length > 0) {
    const types = Object.entries(stats.byType).sort((a, b) => b[1] - a[1]);
    console.log(`  By @type:`);
    for (const [t, n] of types) {
      console.log(`    ${gray("•")} ${t}: ${n}`);
    }
  }
  console.log(`  Errors:   ${stats.errors > 0 ? red(String(stats.errors)) : green("0")}`);
  console.log(`  Warnings: ${stats.warnings > 0 ? yellow(String(stats.warnings)) : green("0")}`);
  console.log("");

  if (errors.length > 0) {
    console.log(bold(red("Errors:")));
    for (const e of errors) {
      console.log(`  ${red("✗")} ${gray(e.page)} [block ${e.blockIndex}] ${e["@type"]}`);
      console.log(`      ${e.message}`);
    }
    console.log("");
  }
  if (warnings.length > 0) {
    console.log(bold(yellow("Warnings:")));
    for (const w of warnings) {
      console.log(`  ${yellow("⚠")} ${gray(w.page)} [block ${w.blockIndex}] ${w["@type"]}`);
      console.log(`      ${w.message}`);
    }
    console.log("");
  }

  if (errors.length === 0 && warnings.length === 0) {
    console.log(green("✓ All JSON-LD blocks are valid."));
  } else if (errors.length === 0) {
    console.log(yellow(`⚠ ${warnings.length} warning(s); no errors.`));
  } else {
    console.log(red(`✗ ${errors.length} error(s) found.`));
  }

  if (errors.length > 0 && !NO_FAIL) {
    process.exit(1);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(red("Validator crashed:"), e);
  process.exit(2);
});
