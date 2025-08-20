// ErrorScreen.tsx
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

interface ErrorScreenProps {
    error: string;
    isHebrew: boolean;
}

export function ErrorScreen({ error, isHebrew }: ErrorScreenProps) {
    return (
        <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-400 to-pink-500 text-center text-white">
            <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-lg">
                <h1 className="text-3xl font-bold mb-6">
                    {isHebrew ? "אירעה שגיאה" : "An error occurred"}
                </h1>
                <p className="mb-8 text-lg leading-relaxed">{error}</p>
                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => window.location.reload()}
                        className="py-3 px-8 bg-white text-red-500 rounded-full font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
                    >
                        {isHebrew ? "נסה/י שוב" : "Try again"}
                    </button>
                    <Link href="/games" className="block">
                        <button className="w-full py-3 px-8 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full font-bold text-lg transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
                            <FaHome />
                            {isHebrew ? "חזור למשחקים" : "Back to Games"}
                        </button>
                    </Link>
                </div>
            </div>
        </main>
    );
}