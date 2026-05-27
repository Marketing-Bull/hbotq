export function JsonLd({ data }: { data: object | object[] }) {
  const serialized = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // Hardened: < is escaped to < above to prevent XSS via injected JSON values.
      dangerouslySetInnerHTML={{ __html: serialized }}
    />
  );
}
