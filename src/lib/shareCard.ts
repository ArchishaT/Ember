import type { Entry } from "./storage";

const MOOD_LABEL: Record<number, string> = {
  1: "Rough",
  2: "Meh",
  3: "Okay",
  4: "Good",
  5: "Great",
};

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxWidth: number,
  lineHeight: number,
): number {
  const words = text.split(" ");
  let line = "";
  let curY = y;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, curY);
      line = word;
      curY += lineHeight;
    } else {
      line = test;
    }
  }
  if (line) {
    ctx.fillText(line, x, curY);
    curY += lineHeight;
  }
  return curY;
}

export function renderShareCard(entry: Entry, streak: number): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const W = 1080;
  const H = 1350;
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // Background
  ctx.fillStyle = "#14110f";
  ctx.fillRect(0, 0, W, H);

  // Subtle grain-free vertical accent bar
  ctx.fillStyle = "#e8622c";
  ctx.fillRect(0, 0, 18, H);

  const pad = 96;

  // Wordmark
  ctx.fillStyle = "#f3ede4";
  ctx.font = "600 40px 'Space Grotesk', sans-serif";
  ctx.fillText("ember", pad, 150);

  // Date
  const dateObj = new Date(entry.date + "T00:00:00");
  const dateStr = dateObj.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  ctx.fillStyle = "#a89f92";
  ctx.font = "400 30px 'Space Grotesk', sans-serif";
  ctx.fillText(dateStr, pad, 200);

  // Streak flame
  ctx.fillStyle = "#e8622c";
  ctx.font = "700 120px 'Fraunces', serif";
  ctx.fillText(`${streak}`, pad, 380);
  ctx.fillStyle = "#f3ede4";
  ctx.font = "400 34px 'Space Grotesk', sans-serif";
  ctx.fillText("day streak", pad, 425);

  // Mood
  ctx.fillStyle = "#c9a15a";
  ctx.font = "500 32px 'Space Grotesk', sans-serif";
  ctx.fillText(`Feeling: ${MOOD_LABEL[entry.mood] ?? "—"}`, pad, 480);

  // Divider
  ctx.strokeStyle = "#3a352e";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(pad, 530);
  ctx.lineTo(W - pad, 530);
  ctx.stroke();

  // Good moment
  ctx.fillStyle = "#a89f92";
  ctx.font = "500 26px 'Space Grotesk', sans-serif";
  ctx.fillText("ONE GOOD THING", pad, 600);
  ctx.fillStyle = "#f3ede4";
  ctx.font = "400 44px 'Fraunces', serif";
  let y = wrapText(ctx, entry.good || "—", pad, 660, W - pad * 2, 56);

  // Hard moment
  y += 60;
  ctx.fillStyle = "#a89f92";
  ctx.font = "500 26px 'Space Grotesk', sans-serif";
  ctx.fillText("ONE THING I'M WORKING THROUGH", pad, y);
  ctx.fillStyle = "#f3ede4";
  ctx.font = "400 38px 'Fraunces', serif";
  wrapText(ctx, entry.hard || "—", pad, y + 56, W - pad * 2, 50);

  // Footer
  ctx.fillStyle = "#6b6459";
  ctx.font = "400 26px 'Space Grotesk', sans-serif";
  ctx.fillText("keep one spark lit — ember-journal.app", pad, H - 70);

  return canvas;
}

export async function shareOrDownloadCard(entry: Entry, streak: number) {
  const canvas = renderShareCard(entry, streak);
  const blob: Blob | null = await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/png"),
  );
  if (!blob) return;

  const file = new File([blob], `ember-${entry.date}.png`, {
    type: "image/png",
  });

  const nav = navigator as Navigator & {
    canShare?: (data: { files: File[] }) => boolean;
    share?: (data: { files: File[]; title?: string }) => Promise<void>;
  };

  if (nav.canShare && nav.canShare({ files: [file] }) && nav.share) {
    try {
      await nav.share({ files: [file], title: "My Ember day card" });
      return;
    } catch {
      // fall through to download
    }
  }

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = file.name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
