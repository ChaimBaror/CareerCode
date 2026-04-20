import type { LevelChoice } from '../_components/SplashScreen';

export interface ApiMsg {
  role: 'user' | 'assistant';
  content: string;
}

export async function callAI(messages: ApiMsg[]): Promise<string> {
  const res = await fetch('/api/roboteach', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const data = (await res.json()) as { text?: string };
  return (
    data.text ||
    'BEEP BOOP! שגיאה. נסה שוב. [MOOD:sad][XP:0][DIFF:easy][TYPE:vocab]'
  );
}

export const INTRO_BY_LEVEL: Record<LevelChoice, string> = {
  beginner: 'התחל! אני מתחיל ללמוד אנגלית. הצג את עצמך קצר ותן אתגר קל ראשון.',
  intermediate: 'התחל! יש לי אנגלית בסיסית. הצג את עצמך ותן אתגר ברמת ביניים.',
  advanced: 'התחל! אני ברמה מתקדמת. הצג את עצמך ותן אתגר מאתגר (idioms/grammar).',
};
