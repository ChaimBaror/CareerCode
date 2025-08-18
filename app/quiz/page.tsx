'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { allQuestions, logicQuestions } from '../data/questions';
import { getHollandCode, Scores } from '../lib/holland';
import { BsCheckCircleFill, BsXCircleFill } from 'react-icons/bs';

export default function QuizPage() {
  const [step, setStep] = useState<'binary' | 'multiple'>('binary');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Scores>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const router = useRouter();

  const binaryQuestions = useMemo(() => {
    const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 25);
  }, []);

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

  const totalBinaryQuestions = binaryQuestions.length;
  const totalMultipleQuestions = logicQuestions.length;
  const isBinaryStep = step === 'binary';
  const progress = isBinaryStep
    ? (currentQuestionIndex / totalBinaryQuestions) * 50
    : 50 + (currentQuestionIndex / totalMultipleQuestions) * 50;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 text-gray-800">
      {/* Main content container */}
      <div className="w-[90%] max-w-2xl bg-white p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden">
        {/* Background circles for visual effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 rounded-full opacity-30 blur-2xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-300 rounded-full opacity-30 blur-2xl animate-pulse delay-200"></div>

        {isBinaryStep ? (
          <div className="text-center relative z-10">
            <p className="text-sm text-gray-500 mb-2">
              שלב 1: שאלות כן/לא
            </p>
            <h2 className="text-3xl font-bold mb-8 text-indigo-700">
              האם היית נהנה {binaryQuestions[currentQuestionIndex].text}
            </h2>
            <div className="flex justify-center gap-6 md:gap-10">
              <button
                onClick={() => handleBinaryAnswer(true)}
                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <BsCheckCircleFill className="w-6 h-6" /> כן
              </button>
              <button
                onClick={() => handleBinaryAnswer(false)}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-8 rounded-full text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
              >
                <BsXCircleFill className="w-6 h-6" /> לא
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center relative z-10">
            <p className="text-sm text-gray-500 mb-2">
              שלב 2: שאלות לוגיות
            </p>
            <h2 className="text-2xl font-bold mb-8 text-indigo-700">
              {logicQuestions[currentQuestionIndex].text}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logicQuestions[currentQuestionIndex].answers.map((answer, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMultipleAnswer(answer.type)}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {answer.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-[90%] max-w-2xl mt-8">
        <div className="flex justify-between items-center mb-1 text-sm text-gray-600">
          <span>התקדמות</span>
          <span>{isBinaryStep ? `${currentQuestionIndex + 1}/${totalBinaryQuestions}` : `${currentQuestionIndex + 1}/${totalMultipleQuestions}`}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-purple-500 h-2.5 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </main>
  );
}