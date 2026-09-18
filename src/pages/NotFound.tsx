import { Link } from "react-router-dom";
import SEO from "../components/SEO";

export default function NotFound() {
  return (
    <div className="page page--notfound">
      <SEO
        title="Page not found"
        description="This page doesn't exist. Head back to Ember to log today's entry."
        path="/404"
        noIndex
      />
      <p className="notfound__glyph" aria-hidden="true">
        ○
      </p>
      <h1>This page burned out.</h1>
      <p className="quiet">
        There's nothing here — the link might be old, or the address was
        typed wrong.
      </p>
      <Link to="/" className="btn btn--primary">
        Back to your journal
      </Link>
    </div>
  );
}
