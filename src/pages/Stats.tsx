import { useState } from "react";
import SEO from "../components/SEO";
import Breadcrumbs from "../components/Breadcrumbs";
import { type Entry, getEntriesSorted } from "../lib/storage";
import { computeStreak } from "../lib/streak";

const MOOD_LABEL: Record<number, string> = {
  1: "Rough",
  2: "Meh",
  3: "Okay",
  4: "Good",
  5: "Great",
};

export default function Stats() {
  const [entries] = useState<Entry[]>(() => getEntriesSorted());

  const streak = computeStreak(entries);
  const moodCounts = entries.reduce<Record<number, number>>((acc, e) => {
    acc[e.mood] = (acc[e.mood] ?? 0) + 1;
    return acc;
  }, {});
  const bestMood = Object.entries(moodCounts).sort(
    (a, b) => b[1] - a[1],
  )[0]?.[0];

  return (
    <div className="page">
      <SEO
        title="Your streak"
        description="See your current streak, longest streak, and total entries logged in Ember."
        path="/stats"
      />
      <Breadcrumbs
        trail={[
          { label: "Journal", path: "/" },
          { label: "Streak", path: "/stats" },
        ]}
      />

      <h1>Your streak</h1>

      {entries.length === 0 ? (
        <div className="card">
          <p>
            No entries yet. <a href="/">Log your first day</a> to start
            building a streak.
          </p>
        </div>
      ) : (
        <>
          <section className="stat-grid">
            <div className="stat-grid__item">
              <p className="stat-grid__number">{streak.current}</p>
              <p className="stat-grid__label">current streak</p>
            </div>
            <div className="stat-grid__item">
              <p className="stat-grid__number">{streak.longest}</p>
              <p className="stat-grid__label">longest streak</p>
            </div>
            <div className="stat-grid__item">
              <p className="stat-grid__number">{streak.totalEntries}</p>
              <p className="stat-grid__label">days logged</p>
            </div>
          </section>

          {bestMood && (
            <p className="quiet">
              Most common mood so far:{" "}
              <strong>{MOOD_LABEL[Number(bestMood)]}</strong>
            </p>
          )}

          <section aria-labelledby="history-heading">
            <h2 id="history-heading">Full history</h2>
            <ul className="history-list">
              {entries.map((e) => (
                <li key={e.date} className="history-list__item">
                  <span className="history-list__date">
                    {new Date(e.date + "T00:00:00").toLocaleDateString(
                      undefined,
                      { month: "short", day: "numeric", year: "numeric" },
                    )}
                  </span>
                  <span className="history-list__mood">
                    {MOOD_LABEL[e.mood]}
                  </span>
                  <span className="history-list__good">{e.good || "—"}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
