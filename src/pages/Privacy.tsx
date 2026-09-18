import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Privacy() {
  return (
    <div className="page page--prose">
      <SEO
        title="Privacy"
        description="Ember stores journal entries only in your browser's local storage. No accounts, no server, no tracking of entry content."
        path="/privacy"
      />
      <Breadcrumbs
        trail={[
          { label: "Journal", path: "/" },
          { label: "Privacy", path: "/privacy" },
        ]}
      />

      <h1>Privacy</h1>

      <p>
        Ember doesn't have a backend. Every entry you write is saved with
        your browser's <code>localStorage</code>, on your device only. Clearing
        your browser data, using a different browser, or switching devices
        will not carry your entries over, because nothing is sent anywhere
        to sync.
      </p>

      <h2>What that means in practice</h2>
      <ul>
        <li>No account, email, or sign-in is required or collected.</li>
        <li>No journal content is transmitted to a server.</li>
        <li>Sharing a day card is a manual action you take — it downloads
          or opens your device's share sheet, and nothing is uploaded on
          Ember's end.</li>
      </ul>

      <h2>Basic site analytics</h2>
      <p>
        If this site is deployed with hosting-level analytics (for example,
        anonymized page-view counts from the hosting provider), those
        measure traffic to pages, not journal content, which never leaves
        your browser.
      </p>
    </div>
  );
}
