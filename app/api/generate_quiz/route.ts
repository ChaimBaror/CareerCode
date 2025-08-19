// src/app/api/generate_quiz/route.ts
import { NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Environment validation
const geminiApiKey = process.env.GOOGLE_GEMINI_API_KEY;
if (!geminiApiKey) {
  throw new Error('GOOGLE_GEMINI_API_KEY environment variable is not set.');
}

const genAI = new GoogleGenerativeAI(geminiApiKey);

// Types
interface Answer {
  text: string;
  isCorrect: boolean;
}

interface QuizRequest {
  topic: string;
  difficulty: string;
  lang: string;
}

interface QuizAnswer {
  text: string;
  isCorrect: boolean;
}

interface QuizQuestion {
  q: string;
  answers: QuizAnswer[];
  points?: number;
}

// Constants
const SUPPORTED_LANGUAGES = ['he', 'en'] as const;
const SUPPORTED_DIFFICULTIES = ['easy', 'medium', 'hard'] as const;
const MAX_TOPIC_LENGTH = 200;
const QUESTION_COUNT = 10;
const DEFAULT_POINTS = 10;

// Utility functions
function shuffleArray<T>(array: T[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function validateRequest(body: unknown): { isValid: boolean; error?: string } {
  if (typeof body !== 'object' || body === null) {
    return { isValid: false, error: 'Invalid request body' };
  }
  
  const { topic, difficulty, lang } = body as Record<string, unknown>;

  if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
    return { isValid: false, error: 'Topic must be a non-empty string' };
  }

  if (topic.length > MAX_TOPIC_LENGTH) {
    return { isValid: false, error: `Topic must be less than ${MAX_TOPIC_LENGTH} characters` };
  }

  if (!difficulty || typeof difficulty !== 'string' || !SUPPORTED_DIFFICULTIES.includes(difficulty as typeof SUPPORTED_DIFFICULTIES[number])) {
    return { isValid: false, error: `Difficulty must be one of: ${SUPPORTED_DIFFICULTIES.join(', ')}` };
  }

  if (!lang || typeof lang !== 'string' || !SUPPORTED_LANGUAGES.includes(lang as typeof SUPPORTED_LANGUAGES[number])) {
    return { isValid: false, error: `Language must be one of: ${SUPPORTED_LANGUAGES.join(', ')}` };
  }

  return { isValid: true };
}

function sanitizeInput(input: string): string {
  return input.trim().replace(/[^\w\s\u0590-\u05FF]/g, '');
}

function createPrompt(topic: string, difficulty: string, lang: string): string {
  const sanitizedTopic = sanitizeInput(topic);
  
  if (lang === 'he') {
    return `
צור חידון טריוויה עם ${QUESTION_COUNT} שאלות על הנושא "${sanitizedTopic}" ברמת "${difficulty}".
השאלות והתשובות חייבות להיות **בעברית עם ניקוד מלא (תנועות מלאות על כל אות מתאימה)**.
אל תחזיר טקסט ללא ניקוד.

כל שאלה חייבת לכלול תשובה נכונה אחת ושלוש תשובות שגויות, עם ניקוד מלא.
התוצאה חייבת להיות אובייקט JSON חוקי אחד בלבד, מבנה של מערך אובייקטים:

[
  {
    "q": "שְׁאֵלָה בְּעִבְרִית מְנֻקֶּדֶת?",
    "answers": [
      {"text": "תְּשׁוּבָה נְכוֹנָה", "isCorrect": true},
      {"text": "תְּשׁוּבָה שְׁגוּיָה", "isCorrect": false},
      {"text": "תְּשׁוּבָה שְׁגוּיָה", "isCorrect": false},
      {"text": "תְּשׁוּבָה שְׁגוּיָה", "isCorrect": false}
    ],
    "points": ${DEFAULT_POINTS}
  }
]

ודא שה-JSON תקין לחלוטין וללא טקסט נוסף מחוץ למבנה ה-JSON.
`.trim();
  }

  return `
Create a trivia quiz with ${QUESTION_COUNT} questions about the topic "${sanitizedTopic}" at a "${difficulty}" level.
All questions and answers must be in English.
Each question must have exactly one correct answer and three incorrect answers.

The output must be a single valid JSON array with the following structure:

[
  {
    "q": "Question text?",
    "answers": [
      {"text": "Correct answer", "isCorrect": true},
      {"text": "Incorrect answer 1", "isCorrect": false},
      {"text": "Incorrect answer 2", "isCorrect": false},
      {"text": "Incorrect answer 3", "isCorrect": false}
    ],
    "points": ${DEFAULT_POINTS}
  }
]

Ensure the JSON is completely valid with no additional text, comments, or markdown formatting.
`.trim();
}

function cleanAIResponse(text: string): string {
  // Remove markdown code blocks
  let cleaned = text.replace(/```(?:json)?\s*([\s\S]*?)\s*```/g, '$1');
  
  // Remove any leading/trailing whitespace and non-JSON content
  cleaned = cleaned.trim();
  
  // Find the first '[' and last ']' to extract just the JSON array
  const firstBracket = cleaned.indexOf('[');
  const lastBracket = cleaned.lastIndexOf(']');
  
  if (firstBracket !== -1 && lastBracket !== -1 && firstBracket < lastBracket) {
    cleaned = cleaned.substring(firstBracket, lastBracket + 1);
  }
  
  return cleaned;
}

interface QuizQuestionWithAnswers {
  q: string;
  answers: Answer[];
  points?: number;
}

function validateQuizStructure(questions: unknown): { isValid: boolean; error?: string } {
  if (!Array.isArray(questions)) {
    return { isValid: false, error: 'Response must be an array' };
  }

  const typedQuestions = questions as QuizQuestionWithAnswers[];
  if (typedQuestions.length !== QUESTION_COUNT) {
    return { isValid: false, error: `Expected ${QUESTION_COUNT} questions, got ${typedQuestions.length}` };
  }

  for (let i = 0; i < typedQuestions.length; i++) {
    const q = typedQuestions[i];
    
    if (!q.q || typeof q.q !== 'string') {
      return { isValid: false, error: `Question ${i + 1} missing or invalid question text` };
    }

    if (!Array.isArray(q.answers) || q.answers.length !== 4) {
      return { isValid: false, error: `Question ${i + 1} must have exactly 4 answers` };
    }

    const correctAnswers = q.answers.filter((a) => a.isCorrect === true);
    if (correctAnswers.length !== 1) {
      return { isValid: false, error: `Question ${i + 1} must have exactly one correct answer` };
    }

    for (let j = 0; j < q.answers.length; j++) {
      const answer = q.answers[j];
      if (!answer.text || typeof answer.text !== 'string') {
        return { isValid: false, error: `Question ${i + 1}, answer ${j + 1} missing or invalid text` };
      }
      if (typeof answer.isCorrect !== 'boolean') {
        return { isValid: false, error: `Question ${i + 1}, answer ${j + 1} missing or invalid isCorrect flag` };
      }
    }
  }

  return { isValid: true };
}

export async function POST(request: Request) {
  try {
    // Parse and validate request body
    let body: QuizRequest;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }

    // Validate input
    const validation = validateRequest(body);
    if (!validation.isValid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const { topic, difficulty, lang } = body;

    // Generate quiz using AI
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.8,
        maxOutputTokens: 2048,
      }
    });

    const prompt = createPrompt(topic, difficulty, lang);
    
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    if (!rawText) {
      console.error('Empty response from AI model');
      return NextResponse.json(
        { error: 'Failed to generate quiz content' },
        { status: 500 }
      );
    }

    // Clean and parse AI response
    const cleanedText = cleanAIResponse(rawText);

    let questions: QuizQuestion[];
    try {
      questions = JSON.parse(cleanedText);
    } catch (parseError) {
      console.error('JSON parse error:', parseError, 'Raw text:', rawText);
      return NextResponse.json(
        { error: 'Invalid response format from AI' },
        { status: 500 }
      );
    }

    // Validate quiz structure
    const structureValidation = validateQuizStructure(questions);
    if (!structureValidation.isValid) {
      console.error('Invalid quiz structure:', structureValidation.error);
      return NextResponse.json(
        { error: 'Generated quiz has invalid structure' },
        { status: 500 }
      );
    }

    // Shuffle answers and add points if missing
    questions.forEach(question => {
      shuffleArray(question.answers);
      if (!question.points) {
        question.points = DEFAULT_POINTS;
      }
    });

    return NextResponse.json({ 
      questions,
      metadata: {
        topic,
        difficulty,
        language: lang,
        questionCount: questions.length,
        totalPoints: questions.reduce((sum, q) => sum + (q.points || DEFAULT_POINTS), 0)
      }
    });

  } catch (error: unknown) {
    console.error('API Error:', error);
    
    // Handle specific error types
    if (error instanceof Error) {
      if (error.message.includes('quota') || error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'Service temporarily unavailable. Please try again later.' },
          { status: 429 }
        );
      }
      
      if (error.message.includes('safety') || error.message.includes('blocked')) {
        return NextResponse.json(
          { error: 'Unable to generate quiz for this topic. Please try a different topic.' },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}