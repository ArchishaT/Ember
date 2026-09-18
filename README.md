# Ember

A one-line-a-day journal. Every day you write one good thing and one thing
you're working through, pick a mood, and Ember keeps a streak going. Each
entry can be turned into a shareable "day card" image.

Live demo: _add your deployed URL here once hosted_
Repo: https://github.com/ArchishaT/ember

---

## Overview

Most journaling apps ask for more time and more structure than most people
will actually give them on a weeday. Ember cuts an entry down to two
sentences and a mood, then borrows the streak mechanic from habit apps
(Duolingo, fitness trackers) to make showing up visible over time.

**Core features:**
- Log one good thing + one hard thing + a mood, once per day
- Automatic streak tracking (current streak, longest streak, total days)
- A full history view of past entries
- A canvas-generated, downloadable/shareable "day card" image for each entry
- Fully client-side: entries are stored in the browser's `localStorage`,
  there is no account system and no backend

This was built for the **First Commit** hackathon.

## Technologies used

- [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling and the production build
- [React Router](https://reactrouter.com/) for client-side routing
- [react-helmet-async](https://github.com/staylor/react-helmet-async) for
  per-page `<title>`/meta tag management
- Plain CSS (no UI framework) for a custom design system
- The HTML `<canvas>` API for generating shareable day-card images
- Browser `localStorage` for persistence — no database, no backend

## Setup instructions

```bash
# clone the repo
git clone https://github.com/ArchishaT/ember.git
cd ember

# install dependencies
npm install

# run the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

To create a production build:

```bash
npm run build   # outputs to /dist
npm run preview # serve the production build locally to sanity-check it
```

### Deploying

The build in `/dist` is a static site and can be deployed to any static
host. A few notes depending on where you deploy:

- **GitHub Pages** — the `public/CNAME` file is already set up for a custom
  domain; update it to your own domain (or delete it to use the default
  `<username>.github.io` URL). `public/404.html` is a copy of `index.html`
  so that unknown routes still boot the app and let React Router render the
  real "page not found" screen instead of GitHub's default 404.
- **Netlify** — `public/_redirects` already routes all paths to
  `index.html` so client-side routes resolve correctly.
- **Vercel** — `vercel.json` at the project root does the same via a
  rewrite rule.

### Before you point this at a real domain

Search the project for `ember-journal.app` (a placeholder domain) and
replace it with your actual domain in:
- `index.html`
- `src/components/SEO.tsx` (`SITE_URL`)
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`
- `public/CNAME`

## Credits and external resources

- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces) and
  [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), both
  loaded from Google Fonts under the Open Font License.
- Scaffolded from the official [Vite `react-ts` template](https://vite.dev/).
- All application code, copy, the flame icon/favicon, and the design system
  were written for this project.
- No third-party UI kits, icon packs, or paid APIs are used.

## AI usage disclosure

AI assistance (Claude, Anthropic) was used substantially throughout this
project — for scaffolding the page/component structure, writing the streak
calculation logic, the canvas share-card renderer, styling, and the SEO/
production setup (meta tags, sitemap, robots.txt, favicon generation, build
config). Every AI-assisted section was reviewed, tested, and can be
explained by the team. Chat history/screenshots can be provided to
organizers on request, per the hackathon rules.

## Project demo checklist

When recording/presenting the demo, cover:
- **What it does** — log a daily entry, see your streak, generate a share
  card.
- **How it works** — client-only React app, `localStorage` for persistence,
  streak logic walks backward from today/yesterday through consecutive
  logged dates, share cards are drawn on an off-screen `<canvas>` and
  exported as a PNG (or handed to the OS share sheet on mobile via the Web
  Share API when supported).
- **Development process** — scaffolded with Vite, built page-by-page
  (journal → streak page → about/privacy → 404), styled last.
- **Challenges faced** — e.g. getting the streak logic right across day
  boundaries and time zones, designing a share card that looks good with
  variable-length text, wiring up SEO metadata per route in a single-page
  app.
- **What was learned** — e.g. React state/effects, client-side routing,
  the Canvas API, and what actually goes into a production-ready static
  site (sitemap, structured data, social share images, etc.).

## License

MIT — see [LICENSE](./LICENSE).
