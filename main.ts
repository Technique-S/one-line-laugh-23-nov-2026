import { mkdirSync, writeFileSync } from 'node:fs';

// The One-Line Laugh: one sentence, at most 200 characters, plain text.
// Setup: a therapist's ordinary advice. Turn: taking it literally.
const line = 'My therapist told me to work on my boundaries, so I blocked her number and called it progress.';

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? './out';
mkdirSync(outputDir, { recursive: true });

// The gate checks UTF-8 text of 1..200 characters, not only whitespace.
if (line.length < 1 || line.length > 200) {
  throw new Error(`line must be 1-200 characters, got ${line.length}`);
}
if (line.trim().length === 0 || /[\r\n]/.test(line)) {
  throw new Error('line must be non-blank and fit on a single line');
}
// One sentence only: at most one sentence-ending mark, and no mid-line period.
const endMarks = line.match(/[.!?](?=\s|$)/g) ?? [];
if (endMarks.length !== 1 || !/[.!?]$/.test(line)) {
  throw new Error('line must be exactly one sentence');
}

writeFileSync(`${outputDir}/entry.txt`, line, 'utf8');
console.log(`Wrote entry.txt (${line.length} chars): ${line}`);
