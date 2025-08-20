import { FaVolumeUp, FaPause } from 'react-icons/fa';

interface QuestionDisplayProps {
    question: string;
    isSpeaking: boolean;
    speakQuestion: (text: string) => void;
    lang: string | null;
    isHebrew: boolean;
}

export function QuestionDisplay({
    question,
    isSpeaking,
    speakQuestion,
    lang,
    isHebrew
}: QuestionDisplayProps) {
    return (
        <div className="mb-6 sm:mb-10 lg:mb-16">
            {/* Mobile layout - stacked vertically */}
            <div className="block sm:hidden">
                <h1
                    dir={lang === "he" ? 'rtl' : 'ltr'}
                    className="text-2xl font-extrabold text-gray-800 dark:text-yellow-200 animate-slide-fade leading-tight mb-4"
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        lineHeight: '1.3'
                    }}
                >
                    {question}
                </h1>
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => speakQuestion(question)}
                        disabled={isSpeaking}
                        className={`p-3 rounded-full shadow-lg transition-all transform active:scale-95 ${isSpeaking
                            ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                            : 'bg-purple-500 hover:bg-purple-600'
                            } text-white text-lg disabled:opacity-70`}
                        title={isHebrew ? (isSpeaking ? 'עצור קריאה' : 'קרא שאלה') : (isSpeaking ? 'Stop reading' : 'Read question')}
                    >
                        {isSpeaking ? <FaPause /> : <FaVolumeUp />}
                    </button>
                </div>
            </div>

            {/* Desktop layout - horizontal */}
            <div className="hidden sm:flex items-center justify-center gap-4 md:gap-6 mb-6 md:mb-8">
                <h1
                    dir={lang === "he" ? 'rtl' : 'ltr'}
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 dark:text-yellow-200 animate-slide-fade leading-tight flex-1"
                    style={{
                        textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                        lineHeight: '1.2'
                    }}
                >
                    {question}
                </h1>
                <button
                    onClick={() => speakQuestion(question)}
                    disabled={isSpeaking}
                    className={`p-3 md:p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${isSpeaking
                        ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                        : 'bg-purple-500 hover:bg-purple-600'
                        } text-white text-xl md:text-2xl disabled:opacity-70`}
                    title={isHebrew ? (isSpeaking ? 'עצור קריאה' : 'קרא שאלה') : (isSpeaking ? 'Stop reading' : 'Read question')}
                >
                    {isSpeaking ? <FaPause /> : <FaVolumeUp />}
                </button>
            </div>
        </div>
    );
}