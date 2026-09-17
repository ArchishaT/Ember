import { type Entry, todayKey } from "./storage";

function shiftDate(dateKey: string, days: number): string {
  const [y, m, d] = dateKey.split("-").map(Number);
  const dt = new Date(y, m - 1, d);
  dt.setDate(dt.getDate() + days);
  return todayKey(dt);
}

export interface StreakInfo {
  current: number;
  longest: number;
  totalEntries: number;
  loggedToday: boolean;
}

export function computeStreak(entries: Entry[]): StreakInfo {
  const dates = new Set(entries.map((e) => e.date));
  const total = entries.length;

  if (total === 0) {
    return { current: 0, longest: 0, totalEntries: 0, loggedToday: false };
  }

  const today = todayKey();
  const loggedToday = dates.has(today);

  // Current streak: walk backwards from today (or yesterday, if today
  // hasn't been logged yet) while consecutive days exist.
  let current = 0;
  let cursor = loggedToday ? today : shiftDate(today, -1);
  while (dates.has(cursor)) {
    current += 1;
    cursor = shiftDate(cursor, -1);
  }

  // Longest streak across the whole history.
  const sortedDates = Array.from(dates).sort();
  let longest = 0;
  let run = 0;
  let prev: string | null = null;
  for (const d of sortedDates) {
    if (prev && shiftDate(prev, 1) === d) {
      run += 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
    prev = d;
  }

  return { current, longest, totalEntries: total, loggedToday };
}
