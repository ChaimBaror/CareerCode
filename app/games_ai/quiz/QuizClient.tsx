'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaSpinner, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    q: string;
    answers: Answer[];
}

export default function QuizClient() {
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const lang = searchParams.get("lang");

    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [message, setMessage] = useState("");

    const isHebrew = lang === "he";

    useEffect(() => {
        async function fetchQuestions() {
            if (!topic || !difficulty || !lang) {
                setError(
                    isHebrew
                        ? "חסר מידע בסיסי כדי להתחיל את המשחק."
                        : "Topic, difficulty, or language is missing."
                );
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            try {
                const response = await fetch("/api/generate_quiz", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ topic, difficulty, lang }),
                });

                if (!response.ok) throw new Error("Failed to fetch questions from AI.");
                const data = await response.json();
                setQuestions(data.questions);
            } catch {
                setError("Unknown error");
            } finally {
                setLoading(false);
            }
        }
        fetchQuestions();
    }, [topic, difficulty, lang, isHebrew]);

    const handleAnswer = (isCorrect: boolean, index: number) => {
        setSelectedAnswerIndex(index);
        if (isCorrect) {
            setMessage(isHebrew ? "כל הכבוד! 🎉" : "Correct! 🎉");
            setScore((prev) => prev + 1);
        } else {
            setMessage(isHebrew ? "לא נורא 🙈" : "Not quite 🙈");
        }

        setTimeout(() => {
            setMessage("");
            setSelectedAnswerIndex(null);
            if (currentQuestionIndex < (questions?.length || 0) - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                setMessage(
                    isHebrew
                        ? `סיימת! הניקוד שלך: ${score + (isCorrect ? 1 : 0)} ⭐`
                        : `You finished! Your score is: ${score + (isCorrect ? 1 : 0)} ⭐`
                );
                setQuestions(null);
            }
        }, 2500);
    };

    const getAnswerButtonClass = (index: number) => {
        if (selectedAnswerIndex === null) {
            return "bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600";
        }
        if (selectedAnswerIndex === index) {
            return questions?.[currentQuestionIndex].answers[index].isCorrect
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white";
        }
        return "bg-gray-300 dark:bg-gray-600 cursor-not-allowed";
    };

    if (loading) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center gap-4 text-gray-600 dark:text-gray-400">
                    <FaSpinner className="animate-spin text-5xl" />
                    <p className="text-xl">
                        {isHebrew
                            ? "ה-AI חושב... נא המתן/י"
                            : "The AI is thinking... please wait"}
                    </p>
                </div>
            </main>
        );
    }

    if (error) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900 text-center text-red-500">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                    <h1 className="text-2xl font-bold mb-4">
                        {isHebrew ? "אירעה שגיאה" : "An error occurred"}
                    </h1>
                    <p className="mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="py-2 px-4 bg-blue-500 text-white rounded-full"
                    >
                        {isHebrew ? "נסה/י שוב" : "Try again"}
                    </button>
                </div>
            </main>
        );
    }

    if (!questions || questions.length === 0) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-300 to-orange-400 text-center">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-[30px] shadow-2xl">
                    <h1 className="text-3xl font-bold mb-6">
                        {isHebrew ? "סיימת את המשחק! 🎉" : "You finished the game! 🎉"}
                    </h1>
                    <p className="text-xl mb-6">{message}</p>
                    <button
                        onClick={() => (window.location.href = "/games_ai")}
                        className="py-3 px-6 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full shadow-lg text-lg font-bold"
                    >
                        {isHebrew ? "שחק/י שוב" : "Play again"}
                    </button>
                </div>
            </main>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-yellow-300 to-orange-400">
            <div className="relative z-10 bg-white dark:bg-gray-800 p-10 rounded-[35px] shadow-2xl text-center w-[95%] max-w-2xl border-4 border-yellow-400 dark:border-yellow-600 animate-slide-fade">
                {/* Top bar */}
                <div className="flex justify-between items-center mb-6">
                    <div className="p-2 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {currentQuestionIndex + 1}
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-700 dark:text-gray-300">
                        ⭐ <span className="text-orange-600">{score}</span> /{" "}
                        <span className="text-yellow-600">{questions.length}</span>
                    </div>
                </div>

                {/* Question */}
                <h1
                    key={currentQuestionIndex}
                    className="text-2xl md:text-3xl font-extrabold mb-8 text-yellow-900 dark:text-yellow-200 animate-slide-fade"
                >
                    {currentQuestion.q}
                </h1>

                {/* Answers */}
                <div
                    key={currentQuestionIndex + "-answers"}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-slide-fade"
                >
                    {currentQuestion.answers.map((ans, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(ans.isCorrect, i)}
                            disabled={selectedAnswerIndex !== null}
                            className={`p-4 rounded-2xl shadow-lg text-lg font-semibold transition-all duration-300 ${getAnswerButtonClass(
                                i
                            )}`}
                        >
                            {ans.text}
                        </button>
                    ))}
                </div>

                {/* Feedback */}
                {selectedAnswerIndex !== null && (
                    <div className="flex flex-col items-center">
                        <div
                            className={`mt-6 text-2xl font-extrabold flex items-center gap-2 animate-bounce ${message.includes(isHebrew ? "כל הכבוד" : "Correct")
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {message.includes(isHebrew ? "כל הכבוד" : "Correct") ? (
                                <FaCheckCircle />
                            ) : (
                                <FaTimesCircle />
                            )}
                            {message}
                        </div>

                        <div className="mt-6 px-6 py-3 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-2xl shadow-md text-lg font-semibold animate-fade-in">
                            {isHebrew ? "✅ התשובה הנכונה היא: " : "✅ The correct answer is: "}
                            <span className="font-bold">
                                {currentQuestion.answers.find((a) => a.isCorrect)?.text}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div className="w-[90%] max-w-md mt-8">
                <div className="flex justify-between text-sm font-bold mb-1 text-gray-700 dark:text-gray-300">
                    <span>{isHebrew ? "התקדמות" : "Progress"}</span>
                    <span>
                        {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                    </span>
                </div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                    <div
                        className="h-full bg-orange-500 transition-all duration-700 ease-in-out"
                        style={{
                            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </main>
    );
}
