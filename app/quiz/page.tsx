'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { allQuestions, logicQuestions } from '../data/questions';
import { getHollandCode, Scores } from '../lib/holland';

export default function QuizPage() {
  const [step, setStep] = useState<'binary' | 'multiple'>('binary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const router = useRouter();

  const binaryQuestions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 25);
  }, []);

  // שלב 1 - שאלות כן/לא
  const handleBinaryAnswer = (liked: boolean) => {
    const currentQuestion = binaryQuestions[currentQuestionIndex];
    const currentType = liked
      ? currentQuestion.type as keyof Scores
      : currentQuestion.negativeType as keyof Scores;

    setScores(prev => ({
      ...prev,
      [currentType]: prev[currentType] + 1,
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < binaryQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setStep('multiple');
      setCurrentQuestionIndex(0);
    }
  };

  // שלב 2 - שאלות עם 4 תשובות
  const handleMultipleAnswer = (selectedType: keyof Scores) => {
    setScores(prev => ({
      ...prev,
      [selectedType]: prev[selectedType] + 1,
    }));

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < logicQuestions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      const hollandCode = getHollandCode(scores);
      router.push(`/results?hollandCode=${hollandCode}&scores=${JSON.stringify(scores)}`);
    }
  };

  // UI לפי השלב הנוכחי
  if (step === 'binary') {
    const currentQuestion = binaryQuestions[currentQuestionIndex];
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10 md:p-24">
        <div className="w-full max-w-md text-center">
          <p className="mb-2 text-sm text-gray-500">
            שאלה {currentQuestionIndex + 1} מתוך {binaryQuestions.length}
          </p>
          <h2 className="text-2xl font-semibold mb-8">
            האם היית נהנה {currentQuestion.text}
          </h2>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleBinaryAnswer(true)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded text-lg"
            >
              כן
            </button>
            <button
              onClick={() => handleBinaryAnswer(false)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded text-lg"
            >
              לא
            </button>
          </div>
        </div>
      </main>
    );
  } else {
    const currentQuestion = logicQuestions[currentQuestionIndex];
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-10 md:p-24">
        <div className="w-full max-w-xl text-center">
          <p className="mb-2 text-sm text-gray-500">
            שאלה {currentQuestionIndex + 1} מתוך {logicQuestions.length}
          </p>
          <h2 className="text-2xl font-semibold mb-8">{currentQuestion.text}</h2>
          <div className="grid gap-4">
            {currentQuestion.answers.map((answer, idx) => (
              <button
                key={idx}
                onClick={() => handleMultipleAnswer(answer.type)}
                className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded"
              >
                {answer.label}
              </button>
            ))}
          </div>
        </div>
      </main>
    );
  }
}
