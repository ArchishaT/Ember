import { Helmet } from "react-helmet-async";

const SITE_NAME = "Ember";
const SITE_URL = "https://ember-journal.app";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

interface SEOProps {
  title: string;
  description: string;
  path: string; // e.g. "/", "/stats"
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  noIndex?: boolean;
}

export default function SEO({
  title,
  description,
  path,
  jsonLd,
  noIndex,
}: SEOProps) {
  const url = `${SITE_URL}${path === "/" ? "" : path}`;
  const fullTitle = path === "/" ? title : `${title} · ${SITE_NAME}`;
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={DEFAULT_OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={DEFAULT_OG_IMAGE} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME };
