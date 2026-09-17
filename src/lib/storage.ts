export type Mood = 1 | 2 | 3 | 4 | 5;

export interface Entry {
  date: string; // YYYY-MM-DD, local time
  good: string;
  hard: string;
  mood: Mood;
  createdAt: number;
}

const STORAGE_KEY = "ember:entries:v1";

export function todayKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function loadEntries(): Record<string, Entry> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Entry>;
  } catch {
    return {};
  }
}

export function saveEntry(entry: Entry): Record<string, Entry> {
  const all = loadEntries();
  all[entry.date] = entry;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all;
}

export function deleteEntry(date: string): Record<string, Entry> {
  const all = loadEntries();
  delete all[date];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  return all;
}

export function clearAllEntries(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getEntriesSorted(): Entry[] {
  return Object.values(loadEntries()).sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}
