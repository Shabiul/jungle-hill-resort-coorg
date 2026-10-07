interface JsonLdProps {
  data: Record<string, unknown>;
}

/** Renders schema.org structured data. TODO: add LodgingBusiness data once contact info exists. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
