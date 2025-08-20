// hooks/useQuizLogic.ts
import { useState, useEffect } from 'react';
import { Question } from '@/types/types'; // Adjust the import path as necessary

export function useQuizLogic(
    topic: string | null, 
    difficulty: string | null, 
    lang: string | null,
    playAnswerSound?: (isCorrect: boolean) => void,
    speakText?: (text: string) => void
) {
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

                if (!response.ok) {
                    const errorData = await response.json().catch(() => ({}));
                    throw new Error(errorData.error || "Failed to fetch questions from AI.");
                }

                const data = await response.json();

                if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
                    throw new Error("No questions received from AI.");
                }

                setQuestions(data.questions);
            } catch {
                setError(
                    isHebrew
                        ? "שגיאה ביצירת החידון. אנא נסה שוב."
                        : "Error creating quiz. Please try again."
                );
            } finally {
                setLoading(false);
            }
        }

        fetchQuestions();
    }, [topic, difficulty, lang, isHebrew]);

    const handleAnswer = (isCorrect: boolean, index: number): void => {
        setSelectedAnswerIndex(index);

        // Play appropriate sound
        if (playAnswerSound) {
            playAnswerSound(isCorrect);
        }

        const newScore = score + (isCorrect ? 1 : 0);
        const correctAnswer = questions?.[currentQuestionIndex].answers.find(a => a.isCorrect);

        if (isCorrect) {
            const successMessage = isHebrew ? "כל הכבוד! 🎉" : "Correct! 🎉";
            setMessage(successMessage);
            setScore(newScore);

            if (speakText) {
                setTimeout(() => speakText(successMessage), 200);
            }
        } else {
            const failMessage = isHebrew ? "לא נורא 🙈" : "Not quite 🙈";
            setMessage(failMessage);

            if (speakText && correctAnswer) {
                const correctText = isHebrew
                    ? `לא נורא. התשובה הנכונה היא: ${correctAnswer.text}`
                    : `Not quite. The correct answer is: ${correctAnswer.text}`;
                setTimeout(() => speakText(correctText), 500);
            }
        }

        setTimeout(() => {
            setMessage("");
            setSelectedAnswerIndex(null);

            if (currentQuestionIndex < (questions?.length || 0) - 1) {
                setCurrentQuestionIndex((prev) => prev + 1);
            } else {
                const finalMessage = isHebrew
                    ? `סיימת! הניקוד שלך: ${newScore} מתוך ${questions?.length || 0} ⭐`
                    : `You finished! Your score: ${newScore} out of ${questions?.length || 0} ⭐`;

                setMessage(finalMessage);
                setQuestions(null);

                if (speakText) {
                    setTimeout(() => speakText(finalMessage), 500);
                }
            }
        }, 4500);
    };

    return {
        questions,
        currentQuestionIndex,
        loading,
        error,
        score,
        selectedAnswerIndex,
        message,
        handleAnswer
    };
}