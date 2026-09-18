import { useState } from "react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import {
  type Entry,
  type Mood,
  getEntriesSorted,
  saveEntry,
  todayKey,
} from "../lib/storage";
import { computeStreak } from "../lib/streak";
import { shareOrDownloadCard } from "../lib/shareCard";

const MOODS: { value: Mood; label: string; glyph: string }[] = [
  { value: 1, label: "Rough", glyph: "○" },
  { value: 2, label: "Meh", glyph: "◔" },
  { value: 3, label: "Okay", glyph: "◑" },
  { value: 4, label: "Good", glyph: "◕" },
  { value: 5, label: "Great", glyph: "●" },
];

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>(() => getEntriesSorted());
  const [good, setGood] = useState("");
  const [hard, setHard] = useState("");
  const [mood, setMood] = useState<Mood>(3);
  const [saved, setSaved] = useState(false);

  const streak = computeStreak(entries);
  const today = todayKey();
  const todaysEntry = entries.find((e) => e.date === today);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!good.trim() && !hard.trim()) return;
    const entry: Entry = {
      date: today,
      good: good.trim(),
      hard: hard.trim(),
      mood,
      createdAt: Date.now(),
    };
    saveEntry(entry);
    setEntries(getEntriesSorted());
    setSaved(true);
    setGood("");
    setHard("");
  }

  const recent = entries.filter((e) => e.date !== today).slice(0, 5);

  return (
    <div className="page">
      <SEO
        title="Ember — a one-line journal that keeps your streak alive"
        description="Write one good thing and one hard thing about today, in under a minute. Ember tracks your streak and turns each entry into a shareable day card."
        path="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Ember",
          applicationCategory: "LifestyleApplication",
          operatingSystem: "Any (web browser)",
          description:
            "A one-line-a-day journal that tracks streaks and generates shareable day cards.",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
      <Breadcrumbs trail={[{ label: "Journal", path: "/" }]} />

      <section className="hero">
        <p className="hero__streak-label">current streak</p>
        <p className="hero__streak-number">{streak.current}</p>
        <h1>One good thing. One hard thing. Every day.</h1>
        <p className="hero__sub">
          Thirty seconds is enough. Ember only asks for a single line each
          way, then keeps score of how many days you've shown up.
        </p>
      </section>

      {todaysEntry && !saved ? (
        <section className="card" aria-labelledby="already-logged">
          <h2 id="already-logged">You already logged today</h2>
          <p className="quiet">
            Come back tomorrow to keep the streak going, or revisit your
            entry below.
          </p>
          <blockquote className="entry-preview">
            <p>
              <strong>Good:</strong> {todaysEntry.good || "—"}
            </p>
            <p>
              <strong>Working through:</strong> {todaysEntry.hard || "—"}
            </p>
          </blockquote>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => shareOrDownloadCard(todaysEntry, streak.current)}
          >
            Share today's card
          </button>
        </section>
      ) : (
        <form className="card journal-form" onSubmit={handleSubmit}>
          <h2>Today, {new Date().toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}</h2>

          <label htmlFor="good">One good thing that happened</label>
          <textarea
            id="good"
            value={good}
            onChange={(e) => setGood(e.target.value)}
            placeholder="Passed my chem quiz without cramming"
            maxLength={220}
            rows={2}
          />

          <label htmlFor="hard">One thing you're working through</label>
          <textarea
            id="hard"
            value={hard}
            onChange={(e) => setHard(e.target.value)}
            placeholder="Still procrastinating on the group project"
            maxLength={220}
            rows={2}
          />

          <fieldset className="mood-picker">
            <legend>How was today, overall?</legend>
            <div className="mood-picker__options">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  className={
                    "mood-picker__option" +
                    (mood === m.value ? " is-selected" : "")
                  }
                  onClick={() => setMood(m.value)}
                  aria-pressed={mood === m.value}
                >
                  <span aria-hidden="true">{m.glyph}</span>
                  {m.label}
                </button>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn--primary">
            Log today
          </button>
        </form>
      )}

      {saved && todaysEntry && (
        <section className="card card--accent">
          <h2>Logged. Streak's at {streak.current}.</h2>
          <p className="quiet">Turn it into a card worth sharing.</p>
          <button
            type="button"
            className="btn btn--primary"
            onClick={() => shareOrDownloadCard(todaysEntry, streak.current)}
          >
            Get my day card
          </button>
        </section>
      )}

      {recent.length > 0 && (
        <section aria-labelledby="recent-heading" className="recent">
          <h2 id="recent-heading">Recent entries</h2>
          <ul className="recent-list">
            {recent.map((e) => (
              <li key={e.date} className="recent-list__item">
                <span className="recent-list__date">
                  {new Date(e.date + "T00:00:00").toLocaleDateString(
                    undefined,
                    { month: "short", day: "numeric" },
                  )}
                </span>
                <span className="recent-list__good">{e.good || "—"}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
