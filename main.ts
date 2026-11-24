// Two Lines to Your Past Self — a warning and its consequence.
// The entry is exactly two lines joined by one newline, no trailing
// newline: line one warns about the moment, line two lands the consequence.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_ONE =
  "Don't click 'Remind me later' on the update that warns it will restart your laptop.";
const LINE_TWO =
  "It restarted during your presentation, and your boss still introduces you as the guy who lost the deck.";

function entryIsValid(text) {
  // Count Unicode code points, not UTF-16 units, so the gate matches the
  // scorer's character count.
  const chars = [...text].length;
  if (chars < 1 || chars > 280) return false;
  if (text.trim().length === 0) return false;
  // Exactly two non-empty lines: the warning, then the reason it mattered.
  const lines = text.split("\n").filter((l) => l.trim().length > 0);
  return lines.length === 2;
}

function outputDir() {
  return process.env.MAKEFUN_OUTPUT_DIR || "/output";
}

function main() {
  const entry = `${LINE_ONE}\n${LINE_TWO}`;
  if (!entryIsValid(entry)) {
    throw new Error("entry fails the two-line 1-280 character gate");
  }
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), entry, "utf8");
}

main();
