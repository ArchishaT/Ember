import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { SITE_URL } from "./SEO";

export interface Crumb {
  label: string;
  path: string;
}

export default function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  if (trail.length <= 1) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <ol>
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.path}>
              {isLast ? (
                <span aria-current="page">{crumb.label}</span>
              ) : (
                <Link to={crumb.path}>{crumb.label}</Link>
              )}
              {!isLast && <span className="breadcrumbs__sep">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
