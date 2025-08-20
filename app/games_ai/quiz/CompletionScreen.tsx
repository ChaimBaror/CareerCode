// CompletionScreen.tsx
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface CompletionScreenProps {
    score: number;
    totalQuestions: number;
    message: string;
    isHebrew: boolean;
}

export function CompletionScreen({ score, totalQuestions, message, isHebrew }: CompletionScreenProps) {
    const getScorePercentage = (): number => {
        return totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    };

    const getScoreColor = (): string => {
        const percentage = getScorePercentage();
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-300 via-orange-400 to-red-400 text-center">
            <div className="bg-white/10 backdrop-blur-md p-12 rounded-[40px] shadow-2xl max-w-2xl">
                <h1 className="text-4xl font-bold mb-8 text-white">
                    {isHebrew ? "סיימת את המשחק! 🎉" : "You finished the game! 🎉"}
                </h1>
                <div className={`text-6xl font-bold mb-6 ${getScoreColor()}`}>
                    {getScorePercentage()}%
                </div>
                <p className="text-2xl mb-8 text-white/90">{message}</p>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => (window.location.href = "/games_ai")}
                        className="py-4 px-10 bg-white text-orange-500 hover:text-orange-600 transition-all rounded-full shadow-xl text-xl font-bold transform hover:scale-105 hover:shadow-2xl"
                    >
                        {isHebrew ? "שחק/י שוב" : "Play again"}
                    </button>
                    <Link href="/games" className="block">
                        <button className="w-full py-4 px-10 bg-blue-500 hover:bg-blue-600 text-white transition-all rounded-full shadow-xl text-xl font-bold transform hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-2">
                            <FaHome />
                            {isHebrew ? "כל המשחקים" : "All Games"}
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}