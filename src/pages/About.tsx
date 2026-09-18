import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className="page page--prose">
      <SEO
        title="About Ember"
        description="Why Ember exists: a one-line journal built for First Commit, designed to make daily reflection quick enough that it actually sticks."
        path="/about"
      />
      <Breadcrumbs
        trail={[
          { label: "Journal", path: "/" },
          { label: "About", path: "/about" },
        ]}
      />

      <h1>About Ember</h1>

      <p>
        Most journaling apps ask for too much. A blank page, a prompt you
        have to think about, five minutes you don't have between classes.
        Ember asks for two sentences: one good thing, one thing you're
        working through. That's the whole entry.
      </p>

      <p>
        The idea came from noticing how well streaks work in apps like
        language learning or fitness trackers — the mechanic isn't
        complicated, it just makes showing up visible. Ember applies the
        same idea to reflection: log a day, watch the flame count go up,
        and every entry can turn into a small shareable card if you want to
        post it.
      </p>

      <h2>How it works</h2>
      <p>
        Everything is stored locally in your browser using{" "}
        <code>localStorage</code> — there's no account and no server, so
        your entries stay on your device. The streak counter checks whether
        you've logged today or yesterday to decide if your streak continues
        or resets, and the share card is drawn on an HTML canvas and
        exported as a PNG.
      </p>

      <h2>Built for First Commit</h2>
      <p>
        This project was built as a submission to the First Commit
        hackathon. Technologies used, setup instructions, and full credits
        live in the project's{" "}
        <a
          href="https://github.com/ArchishaT/ember#readme"
          target="_blank"
          rel="noreferrer noopener"
        >
          README on GitHub
        </a>
        .
      </p>

      <p>
        Have a look at your <Link to="/stats">streak so far</Link>, or head
        back to the <Link to="/">journal</Link> to log today.
      </p>
    </div>
  );
}
