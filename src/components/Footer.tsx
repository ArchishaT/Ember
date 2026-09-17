import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <p>Ember — a one-line journal for keeping a small spark lit every day.</p>
        <ul className="footer-links">
          <li>
            <Link to="/">Journal</Link>
          </li>
          <li>
            <Link to="/stats">Streak</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/privacy">Privacy</Link>
          </li>
          <li>
            <a
              href="https://github.com/ArchishaT/ember"
              target="_blank"
              rel="noreferrer noopener"
            >
              GitHub
            </a>
          </li>
        </ul>
        <p className="footer-fine">
          Built for First Commit. Entries are stored only on your device.
        </p>
      </div>
    </footer>
  );
}
