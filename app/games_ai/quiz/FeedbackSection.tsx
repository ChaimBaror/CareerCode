// FeedbackSection.tsx
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface FeedbackSectionProps {
    selectedAnswerIndex: number | null;
    message: string;
    correctAnswer: string | undefined;
    isHebrew: boolean;
}

export function FeedbackSection({
    selectedAnswerIndex,
    message,
    correctAnswer,
    isHebrew
}: FeedbackSectionProps) {
    if (selectedAnswerIndex === null) return null;

    const isCorrect = message.includes(isHebrew ? "כל הכבוד" : "Correct");

    return (
        <div className="flex flex-col items-center mt-10">
            <div
                className={`text-3xl lg:text-4xl font-extrabold flex items-center gap-4 animate-bounce ${isCorrect ? "text-green-600" : "text-red-600"
                    }`}
            >
                {isCorrect ? (
                    <FaCheckCircle className="text-4xl lg:text-5xl" />
                ) : (
                    <FaTimesCircle className="text-4xl lg:text-5xl" />
                )}
                {message}
            </div>

            {correctAnswer && (
                <div className="mt-8 px-8 py-6 bg-green-100/80 dark:bg-green-800/80 backdrop-blur-sm text-green-800 dark:text-green-200 rounded-3xl shadow-xl text-xl lg:text-2xl font-bold animate-fade-in max-w-4xl">
                    {isHebrew ? "✅ התשובה הנכונה היא: " : "✅ The correct answer is: "}
                    <span className="font-extrabold block mt-2 text-2xl lg:text-3xl">
                        {correctAnswer}
                    </span>
                </div>
            )}
        </div>
    );
}