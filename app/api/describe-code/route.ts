// src/app/api/describe-code/route.ts
import { NextResponse } from 'next/server';
// 1. ייבוא הספריה של גוגל
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// 2. בדיקה וקריאה של מפתח ה-API של גוגל
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

if (!GOOGLE_API_KEY) {
  throw new Error("Missing Google API Key");
}

// 3. אתחול ה-SDK של גוגל
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

export async function POST(request: Request) {
  try {
    // קבלת קוד הולנד מגוף הבקשה (נשאר זהה)
    const { hollandCode } = await request.json();

    if (!hollandCode || typeof hollandCode !== 'string' || hollandCode.length !== 3) {
      return NextResponse.json({ error: 'Invalid Holland Code provided' }, { status: 400 });
    }

    // 4. ניסוח ההנחיה (Prompt) ל-Gemini (דומה מאוד, אולי נרצה התאמות קלות)
    const prompt = `
        You are a helpful career advisor bot.
        Based on the Holland Code "${hollandCode}", describe the user's personality profile and career inclinations.
        Focus on their likely strengths, preferred work environments, and types of activities they might enjoy.
        Keep the description concise (around 3-4 sentences) and encouraging.
        Address the user directly (e.g., "As someone with the code ${hollandCode}, you likely...").
        Respond in Hebrew.
      `;

    // 5. קריאה ל-API של Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // או מודל אחר זמין

    // הגדרות בטיחות (אופציונלי אך מומלץ להתאים לפי הצורך)
    const generationConfig = {
        temperature: 0.7,
        // maxOutputTokens: 150, // אפשר להגדיר גם כאן
    };
    const safetySettings = [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
    ];

    const result = await model.generateContent(prompt, /* generationConfig, safetySettings */); // אפשר להוסיף הגדרות
    const response = result.response;
    const description = response.text()?.trim(); // קבלת הטקסט מהתגובה

    if (!description) {
        // בדוק אם התוכן נחסם עקב הגדרות בטיחות או סיבה אחרת
        console.warn("Gemini response was empty or blocked. Finish reason:", response.promptFeedback);
        throw new Error('Failed to get description from AI or content blocked.');
    }

    // 6. החזרת התיאור שנוצר על ידי Gemini (נשאר זהה)
    return NextResponse.json({ description });

  } catch (error) {
    console.error("Error calling Google Gemini API:", error);
    // שיניתי את הודעת השגיאה כדי שתהיה ספציפית לגוגל
    return NextResponse.json({ error: 'Failed to fetch description from Google Gemini AI' }, { status: 500 });
  }
}