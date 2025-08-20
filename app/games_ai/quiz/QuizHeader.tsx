// QuizHeader.tsx
import Link from 'next/link';
import { FaHome, FaVolumeUp, FaVolumeOff, FaPlay, FaPause, FaImage } from 'react-icons/fa';

interface QuizHeaderProps {
    currentQuestionIndex: number;
    score: number;
    totalQuestions: number;
    soundEnabled: boolean;
    setSoundEnabled: (enabled: boolean) => void;
    ttsEnabled: boolean;
    setTtsEnabled: (enabled: boolean) => void;
    imageEnabled: boolean;
    setImageEnabled: (enabled: boolean) => void;
    isHebrew: boolean;
}

export function QuizHeader({
    currentQuestionIndex,
    score,
    totalQuestions,
    soundEnabled,
    setSoundEnabled,
    ttsEnabled,
    setTtsEnabled,
    imageEnabled,
    setImageEnabled,
    isHebrew
}: QuizHeaderProps) {
    return (
        <div className="mb-6 sm:mb-8 lg:mb-12">
            {/* Mobile Layout - Stacked */}
            <div className="block sm:hidden">
                {/* Question number and score - top row */}
                <div className="flex justify-between items-center mb-4">
                    <div className="p-2 w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                        {currentQuestionIndex + 1}
                    </div>
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-700 dark:text-gray-300">
                        ⭐ <span className="text-orange-600">{score}</span> /{" "}
                        <span className="text-yellow-600">{totalQuestions}</span>
                    </div>
                </div>

                {/* Control buttons - bottom row */}
                <div className="flex items-center justify-center gap-2 flex-wrap">
                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`p-2.5 rounded-full shadow-lg transition-all transform active:scale-95 ${soundEnabled
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        title={isHebrew ? (soundEnabled ? 'בטל צלילים' : 'הפעל צלילים') : (soundEnabled ? 'Disable sound' : 'Enable sound')}
                    >
                        {soundEnabled ? <FaVolumeUp className="text-base" /> : <FaVolumeOff className="text-base" />}
                    </button>

                    <button
                        onClick={() => setTtsEnabled(!ttsEnabled)}
                        className={`p-2.5 rounded-full shadow-lg transition-all transform active:scale-95 ${ttsEnabled
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        title={isHebrew ? (ttsEnabled ? 'בטל קריינות' : 'הפעל קריינות') : (ttsEnabled ? 'Disable TTS' : 'Enable TTS')}
                    >
                        {ttsEnabled ? <FaPlay className="text-base" /> : <FaPause className="text-base" />}
                    </button>

                    {!isHebrew && <button
                        onClick={() => setImageEnabled(!imageEnabled)}
                        className={`p-2.5 rounded-full shadow-lg transition-all transform active:scale-95 ${imageEnabled
                            ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        title={isHebrew ? (imageEnabled ? 'בטל תמונות' : 'הפעל תמונות') : (imageEnabled ? 'Disable images' : 'Enable images')}
                    >
                        <FaImage className="text-base" />
                    </button>
                    }
                    <Link href="/games">
                        <button
                            className="p-2.5 rounded-full shadow-lg transition-all transform active:scale-95 bg-blue-500 hover:bg-blue-600 text-white"
                            title={isHebrew ? 'חזור למשחקים' : 'Back to games'}
                        >
                            <FaHome className="text-base" />
                        </button>
                    </Link>
                </div>
            </div>

            {/* Desktop Layout - Original horizontal layout */}
            <div className="hidden sm:flex justify-between items-center">
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="p-2 md:p-3 w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-2xl md:text-4xl shadow-lg">
                        {currentQuestionIndex + 1}
                    </div>

                    <button
                        onClick={() => setSoundEnabled(!soundEnabled)}
                        className={`p-2 md:p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${soundEnabled
                            ? 'bg-green-500 hover:bg-green-600 text-white'
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        title={isHebrew ? (soundEnabled ? 'בטל צלילים' : 'הפעל צלילים') : (soundEnabled ? 'Disable sound' : 'Enable sound')}
                    >
                        {soundEnabled ? <FaVolumeUp className="text-base md:text-xl" /> : <FaVolumeOff className="text-base md:text-xl" />}
                    </button>

                    <button
                        onClick={() => setTtsEnabled(!ttsEnabled)}
                        className={`p-2 md:p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${ttsEnabled
                            ? 'bg-purple-500 hover:bg-purple-600 text-white'
                            : 'bg-gray-400 hover:bg-gray-500 text-white'
                            }`}
                        title={isHebrew ? (ttsEnabled ? 'בטל קריינות' : 'הפעל קריינות') : (ttsEnabled ? 'Disable TTS' : 'Enable TTS')}
                    >
                        {ttsEnabled ? <FaPlay className="text-base md:text-xl" /> : <FaPause className="text-base md:text-xl" />}
                    </button>
                    {!isHebrew &&
                        <button
                            onClick={() => setImageEnabled(!imageEnabled)}
                            className={`p-2 md:p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${imageEnabled
                                ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                                : 'bg-gray-400 hover:bg-gray-500 text-white'
                                }`}
                            title={isHebrew ? (imageEnabled ? 'בטל תמונות' : 'הפעל תמונות') : (imageEnabled ? 'Disable images' : 'Enable images')}
                        >
                            <FaImage className="text-base md:text-xl" />
                        </button>}

                    <Link href="/games">
                        <button
                            className="p-2 md:p-3 rounded-full shadow-lg transition-all transform hover:scale-110 bg-blue-500 hover:bg-blue-600 text-white"
                            title={isHebrew ? 'חזור למשחקים' : 'Back to games'}
                        >
                            <FaHome className="text-base md:text-xl" />
                        </button>
                    </Link>
                </div>

                <div className="flex items-center gap-2 md:gap-3 text-xl md:text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300">
                    ⭐ <span className="text-orange-600">{score}</span> /{" "}
                    <span className="text-yellow-600">{totalQuestions}</span>
                </div>
            </div>
        </div>
    );
}