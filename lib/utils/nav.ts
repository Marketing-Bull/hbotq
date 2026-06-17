/**
 * Returns true when the given nav item `href` should be treated as the
 * currently-active link for the rendered `pathname`.
 *
 * Rules:
 * - The homepage link ("/") only matches the exact "/" pathname so it does
 *   not light up on every other page.
 * - Trailing slashes are normalized on both sides so "/conditions/" and
 *   "/conditions" compare equal.
 * - For non-home hrefs, a prefix match lights the link for the top-level
 *   page and any nested route beneath it (e.g. href "/conditions/" matches
 *   "/condition/chronic-pain/"… actually no — we want a STRICT match or a
 *   same-segment prefix to avoid "/conditions/" lighting up on
 *   "/condition/[slug]/", which is a different nav group).
 *
 * The strict rule used here:
 *   - Normalize both href and pathname by lowercasing and stripping a
 *     single trailing slash.
 *   - Active if they are equal, OR the pathname starts with `${href}/`
 *     (i.e. pathname is a nested route beneath href, not a sibling).
 *
 * That way:
 *   - href "/conditions/" lights "/conditions/" but not
 *     "/condition/chronic-pain/" (sibling, not a child).
 *   - href "/treatment/" lights "/treatment/" and any future
 *     "/treatment/[slug]/" page.
 */
export function isNavItemActive(href: string, pathname: string): boolean {
  const normalize = (s: string) => {
    const lower = s.toLowerCase();
    return lower.length > 1 && lower.endsWith("/")
      ? lower.slice(0, -1)
      : lower;
  };
  const target = normalize(href);
  const current = normalize(pathname);

  if (target === "/") {
    // Only the homepage lights the home link.
    return current === "/";
  }
  if (current === target) return true;
  // Nested route: pathname begins with "href/" so href is an ancestor.
  return current.startsWith(target + "/");
}
