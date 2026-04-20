import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

const SYSTEM = `You are RoboTeach, a fun, encouraging robot English teacher for Hebrew speakers.

CRITICAL RULES:
- Mix Hebrew (for instructions/explanations) + English (for the actual lesson content)
- Keep EVERY message SHORT — 2-4 lines max. Be concise, punchy.
- Give exactly ONE challenge per message. Types: translate HE→EN, translate EN→HE, fill-in-blank, pick correct word, complete sentence, describe a picture (emoji)
- When user answers: evaluate with ✅ (correct) or ❌ (wrong + brief explanation + correct answer), then IMMEDIATELY give next challenge in the SAME message
- Vary difficulty: easy (common words) → medium (phrases/tenses) → hard (idioms/complex grammar). Increase after 3 correct in a row.
- Be fun: occasionally say "BEEP BOOP!", reference being a robot, use emojis sparingly

REQUIRED TAGS (at the END of every message):
[MOOD:happy|sad|thinking|neutral|celebrate]
[XP:10-30] — base XP for the challenge (more for harder)
[DIFF:easy|medium|hard]
[TYPE:vocab|grammar|translate|sentence|fill]

Example reply:
"✅ Perfect! "Dog" זה "כלב" בדיוק! 🐶
Next: איך אומרים "ספר" באנגלית?
[MOOD:happy][XP:15][DIFF:easy][TYPE:vocab]"`;

type ChatRole = 'user' | 'assistant';
interface ChatMessage {
  role: ChatRole;
  content: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { messages?: unknown };

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: 'messages must be a non-empty array' }, { status: 400 });
    }

    const messages = body.messages as ChatMessage[];

    const contents = messages.map((m) => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: String(m.content ?? '') }],
    }));

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: { role: 'system', parts: [{ text: SYSTEM }] },
      generationConfig: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 500,
      },
    });

    const result = await model.generateContent({ contents });
    const text = result.response.text() || 'BEEP BOOP! שגיאה. נסה שוב. [MOOD:sad][XP:0][DIFF:easy][TYPE:vocab]';
    return NextResponse.json({ text });
  } catch (error) {
    console.error('RoboTeach API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
