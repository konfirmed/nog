interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "NAMES of G_D Across Cultures",
    description:
      "A collection of names of G_D across different cultures and languages.",
    url: defaultUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${defaultUrl}/names?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Organization",
      name: "NAMES of G_D Across Cultures",
      url: defaultUrl,
    },
  };

  return <JsonLd data={data} />;
}

interface NamePageJsonLdProps {
  name: string;
  meaning: string;
  language: string;
  pronunciation?: string;
  attributes?: string[];
  slug: string;
}

export function NamePageJsonLd({
  name,
  meaning,
  language,
  pronunciation,
  attributes,
  slug,
}: NamePageJsonLdProps) {
  const pageUrl = `${defaultUrl}/names/${slug}`;

  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: `${name} - Divine Name in ${language}`,
    description: `${name} means "${meaning}" in ${language}. ${attributes?.length ? `Associated with: ${attributes.join(", ")}.` : ""}`,
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "NAMES of G_D Across Cultures",
      url: defaultUrl,
    },
    about: {
      "@type": "Thing",
      name: name,
      description: meaning,
      alternateName: pronunciation || undefined,
    },
  };

  return <JsonLd data={data} />;
}

interface BreadcrumbJsonLdProps {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return <JsonLd data={data} />;
}

export function CollectionPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "All Names of G_D",
    description:
      "A comprehensive collection of divine names from cultures and languages around the world.",
    url: `${defaultUrl}/names`,
    mainEntity: {
      "@type": "ItemList",
      name: "Divine Names Collection",
      description: "Names of G_D across different cultures and languages",
    },
  };

  return <JsonLd data={data} />;
}
