"use client";
import { useState } from "react";
import { questions } from "../data/gmae_questions";

export default function Home() {
    const [step, setStep] = useState(0);
    const [message, setMessage] = useState("");
    const [score, setScore] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);

    const currentQuestion = questions[step];

    const handleAnswer = (isCorrect: boolean, index: number) => {
        setSelectedAnswerIndex(index);

        if (isCorrect) {
            setMessage("כל הכבוד! 🎉");
            setScore(score + 1);
        } else {
            setMessage("לא נורא, נסה שוב! 🙈");
        }

        setTimeout(() => {
            setMessage("");
            setSelectedAnswerIndex(null);
            if (step < questions.length - 1) {
                setStep(step + 1);
            } else {
                setMessage(`סיימת! הניקוד שלך: ${score + (isCorrect ? 1 : 0)} ⭐`);
            }
        }, 1500);
    };

    const getAnswerButtonClass = (index: number, isCorrect: boolean) => {
        if (selectedAnswerIndex === null) {
            return "bg-yellow-200 hover:bg-yellow-300";
        }

        if (index === selectedAnswerIndex) {
            return isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white";
        }

        return "bg-gray-200 text-gray-400";
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-purple-800 to-pink-600 relative overflow-hidden">

            {/* רקעים מעגליים */}
            <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-500 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] bg-pink-500 rounded-full opacity-20 animate-pulse"></div>

            <div className="relative z-10 bg-white p-8 rounded-[40px] shadow-2xl text-center w-[95%] max-w-xl border-4 border-purple-400">
                <div className="flex justify-between items-center mb-6">
                    <div className="p-2 w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        {step + 1}
                    </div>
                    <div className="flex items-center gap-2 text-xl font-bold text-gray-700">
                        ⭐ <span className="text-pink-600">{score}</span> / <span className="text-purple-600">{questions.length}</span>
                    </div>
                </div>

                {step < questions.length ? (
                    <>
                        <h1 className="text-3xl font-extrabold mb-8 text-purple-900">
                            {currentQuestion.q}
                        </h1>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {currentQuestion.answers.map((ans, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleAnswer(ans.isCorrect, i)}
                                    disabled={selectedAnswerIndex !== null}
                                    className={`
                                        p-4
                                        rounded-full
                                        shadow-lg
                                        text-lg
                                        font-semibold
                                        transition-all
                                        duration-300
                                        transform
                                        hover:scale-105
                                        ${getAnswerButtonClass(i, ans.isCorrect)}
                                        ${selectedAnswerIndex !== null && "cursor-not-allowed"}
                                    `}
                                >
                                    {ans.text}
                                </button>
                            ))}
                        </div>

                        {message && (
                            <div className={`
                                mt-8
                                text-2xl
                                font-bold
                                animate-bounce
                                ${message.includes("כל הכבוד") ? "text-green-600" : "text-red-600"}
                            `}>
                                {message}
                            </div>
                        )}
                    </>
                ) : (
                    <div className="mt-8 text-3xl font-extrabold text-green-600 animate-pulse">
                        {message}
                    </div>
                )}
            </div>

            {/* פס התקדמות */}
            <div className="w-[90%] max-w-md mt-8 h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                <div
                    className="h-full bg-yellow-400 transition-all duration-500 ease-in-out"
                    style={{ width: `${((step) / questions.length) * 100}%` }}
                ></div>
            </div>
        </main>
    );
}