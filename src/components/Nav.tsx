import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <NavLink to="/" className="wordmark" aria-label="Ember home">
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M12 2c1 3-2 4-2 7a4 4 0 0 0 8 0c0-1-.3-2-1-3 2 1 3 3.5 3 6a8 8 0 1 1-16 0c0-4 2-6.5 4-8 1.5-1.2 3-1.5 4-2Z"
              fill="currentColor"
            />
          </svg>
          ember
        </NavLink>
        <nav aria-label="Primary">
          <ul className="nav-links">
            <li>
              <NavLink to="/" end>
                Journal
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats">Streak</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
