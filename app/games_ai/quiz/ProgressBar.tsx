// ProgressBar.tsx
interface ProgressBarProps {
    currentQuestionIndex: number;
    totalQuestions: number;
    isHebrew: boolean;
}

export function ProgressBar({ currentQuestionIndex, totalQuestions, isHebrew }: ProgressBarProps) {
    const progressPercentage = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

    return (
        <div className="w-[90%] max-w-2xl mt-10">
            <div className="flex justify-between text-lg font-bold mb-3 text-white">
                <span>{isHebrew ? "התקדמות" : "Progress"}</span>
                <span>{progressPercentage}%</span>
            </div>
            <div className="h-6 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border-2 border-white/50">
                <div
                    className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 ease-in-out shadow-lg"
                    style={{ width: `${progressPercentage}%` }}
                />
            </div>
        </div>
    );
}