// LoadingScreen.tsx
import { FaSpinner } from 'react-icons/fa';

interface LoadingScreenProps {
    isHebrew: boolean;
    topic: string | null;
}

export function LoadingScreen({ isHebrew, topic }: LoadingScreenProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
            <div className="flex flex-col items-center gap-6 text-white bg-white/20 backdrop-blur-md p-8 rounded-3xl">
                <FaSpinner className="animate-spin text-6xl" />
                <p className="text-2xl font-bold text-center">
                    {isHebrew
                        ? "ה-AI חושב... נא המתן/י"
                        : "The AI is thinking... please wait"}
                </p>
                {topic && (
                    <p className="text-lg opacity-80">
                        {isHebrew ? `נושא: ${topic}` : `Topic: ${topic}`}
                    </p>
                )}
            </div>
        </main>
    );
}