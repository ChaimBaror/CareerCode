// src/app/api/generate_quiz/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;

if (!geminiApiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

export async function POST(request: Request) {
  try {
    const { topic, difficulty, lang } = await request.json();

    if (!topic || !difficulty || !lang) {
      return NextResponse.json({ error: 'Topic, difficulty, and language are required' }, { status: 400 });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
      Create a trivia quiz with 10 questions about the topic "${topic}" at a "${difficulty}" level.
      The questions and answers must be in ${lang === 'he' ? 'Hebrew' : 'English'}.
      Each question must have one correct answer and three incorrect answers.
      The output should be a single JSON object.
      The JSON structure should be an array of objects, where each object has the following format:
      {
        "q": "Question text?",
        "answers": [
          {"text": "Correct answer", "isCorrect": true},
          {"text": "Incorrect answer 1", "isCorrect": false},
          {"text": "Incorrect answer 2", "isCorrect": false},
          {"text": "Incorrect answer 3", "isCorrect": false}
        ]
      }
      Please ensure the JSON is valid and does not contain any extra text or comments.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const cleanedText = text.replace(/```json\n|```/g, '').trim();

    try {
      const questions = JSON.parse(cleanedText);
      return NextResponse.json({ questions });
    } catch (parseError) {
      console.error('Failed to parse JSON from AI response:', parseError);
      return NextResponse.json({ error: 'Failed to parse AI response' }, { status: 500 });
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}