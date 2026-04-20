export type Mood = 'happy' | 'sad' | 'thinking' | 'neutral' | 'celebrate';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type ChallengeType = 'vocab' | 'grammar' | 'translate' | 'sentence' | 'fill';

export interface ParsedReply {
  clean: string;
  mood: Mood;
  earnedXp: number;
  diff: Difficulty;
  type: ChallengeType;
}

export function parseReply(raw: string): ParsedReply {
  const mood = ((raw.match(/\[MOOD:(\w+)\]/) || [])[1] as Mood) || 'neutral';
  const earnedXp = parseInt((raw.match(/\[XP:(\d+)\]/) || [])[1] || '0', 10);
  const diff = ((raw.match(/\[DIFF:(\w+)\]/) || [])[1] as Difficulty) || 'easy';
  const type = ((raw.match(/\[TYPE:(\w+)\]/) || [])[1] as ChallengeType) || 'vocab';
  const clean = raw
    .replace(/\[MOOD:\w+\]/g, '')
    .replace(/\[XP:\d+\]/g, '')
    .replace(/\[DIFF:\w+\]/g, '')
    .replace(/\[TYPE:\w+\]/g, '')
    .trim();
  return { clean, mood, earnedXp, diff, type };
}

// Detect evaluation verdict from the assistant reply. We look for ✅/❌ at the
// start of a line so a quoted emoji in mid-sentence doesn't false-positive.
export function verdictOf(clean: string): 'correct' | 'wrong' | 'none' {
  if (/(^|\n)\s*✅/.test(clean)) return 'correct';
  if (/(^|\n)\s*❌/.test(clean)) return 'wrong';
  return 'none';
}
