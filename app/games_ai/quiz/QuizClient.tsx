'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { FaSpinner, FaCheckCircle, FaTimesCircle, FaVolumeUp, FaVolumeOff, FaHome, FaPause, FaPlay } from 'react-icons/fa';

// Extend window type to support webkitAudioContext
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
    }
}

interface Answer {
    text: string;
    isCorrect: boolean;
}

interface Question {
    q: string;
    answers: Answer[];
    points?: number;
}


// Sound effects using Web Audio API
const createBeepSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine'): void => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext!)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.warn('Could not create beep sound:', error);
    }
};

const playQuestionSound = (): void => {
    const sounds = [
        () => createBeepSound(800, 0.1, 'sine'),
        () => createBeepSound(600, 0.15, 'triangle'),
        () => createBeepSound(1000, 0.1, 'square'),
        () => {
            createBeepSound(440, 0.2);
            setTimeout(() => createBeepSound(550, 0.2), 50);
            setTimeout(() => createBeepSound(660, 0.2), 100);
        },
        () => {
            createBeepSound(400, 0.05);
            setTimeout(() => createBeepSound(500, 0.05), 50);
            setTimeout(() => createBeepSound(600, 0.05), 100);
        }
    ];

    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
};

const playCorrectSound = (): void => {
    createBeepSound(523, 0.1);
    setTimeout(() => createBeepSound(659, 0.1), 100);
    setTimeout(() => createBeepSound(784, 0.2), 200);
};

const playIncorrectSound = (): void => {
    createBeepSound(400, 0.15, 'square');
    setTimeout(() => createBeepSound(300, 0.2, 'square'), 150);
};

export default function QuizClient() {
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const lang = searchParams.get("lang");

    // Quiz state
    const [questions, setQuestions] = useState<Question[] | null>(null);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [score, setScore] = useState(0);
    const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(null);
    const [message, setMessage] = useState("");

    // Audio state
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    const isHebrew = lang === "he";

    // Initialize audio context
    useEffect(() => {
        try {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext!)();
        } catch (error) {
            console.warn('Web Audio API not supported', error);
        }

        if ('speechSynthesis' in window) {
            speechSynthesis.onvoiceschanged = () => {
                console.log('Speech synthesis voices loaded');
            };
        } else {
            console.warn('Speech synthesis not supported');
        }

        return () => {
            if (speechRef.current) {
                speechSynthesis.cancel();
            }
        };
    }, []);

    // Fetch questions
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

    // Play sound when new question appears
    useEffect(() => {
        if (questions && questions.length > 0 && soundEnabled) {
            const timer = setTimeout(() => {
                try {
                    playQuestionSound();
                } catch (error) {
                    console.warn('Could not play sound:', error);
                }
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, questions, soundEnabled]);

    // Text-to-speech functionality
    const speakText = (text: string, force: boolean = false): void => {
        if (!ttsEnabled && !force) return;

        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return;
        }

        speechSynthesis.cancel();
        setIsSpeaking(false);

        const utterance = new SpeechSynthesisUtterance(text);
        speechRef.current = utterance;

        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        if (isHebrew) {
            utterance.lang = 'he-IL';
        } else {
            utterance.lang = 'en-US';
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
            setIsSpeaking(false);
            console.warn('Speech synthesis error');
        };

        try {
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.warn('Could not speak text:', error);
            setIsSpeaking(false);
        }
    };

    const stopSpeaking = (): void => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const speakQuestion = useCallback((questionText: string): void => {
        speakText(questionText, true);
    }, []);

    // Auto-speak new questions
    useEffect(() => {
        if (questions && questions.length > 0 && ttsEnabled && !loading && !error) {
            const timer = setTimeout(() => {
                speakQuestion(questions[currentQuestionIndex].q);
            }, 800);
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, questions, ttsEnabled, loading, error, speakQuestion]);


    const handleAnswer = (isCorrect: boolean, index: number): void => {
        setSelectedAnswerIndex(index);

        // Stop any ongoing speech
        stopSpeaking();

        // Play appropriate sound
        if (soundEnabled) {
            try {
                if (isCorrect) {
                    playCorrectSound();
                } else {
                    playIncorrectSound();
                }
            } catch (error) {
                console.warn('Could not play sound:', error);
            }
        }

        const newScore = score + (isCorrect ? 1 : 0);
        const correctAnswer = questions?.[currentQuestionIndex].answers.find(a => a.isCorrect);

        if (isCorrect) {
            const successMessage = isHebrew ? "כל הכבוד! 🎉" : "Correct! 🎉";
            setMessage(successMessage);
            setScore(newScore);

            if (ttsEnabled) {
                setTimeout(() => speakText(successMessage), 200);
            }
        } else {
            const failMessage = isHebrew ? "לא נורא 🙈" : "Not quite 🙈";
            setMessage(failMessage);

            if (ttsEnabled && correctAnswer) {
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

                if (ttsEnabled) {
                    setTimeout(() => speakText(finalMessage), 500);
                }
            }
        }, 3500); // Increased time for TTS
    };

    const getAnswerButtonClass = (index: number): string => {
        if (selectedAnswerIndex === null) {
            return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border-2 border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400 transform hover:scale-105 hover:shadow-lg text-gray-800 dark:text-gray-200";
        }

        if (selectedAnswerIndex === index) {
            return questions?.[currentQuestionIndex].answers[index].isCorrect
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400 shadow-lg transform scale-105"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400 shadow-lg transform scale-105";
        }

        return "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 cursor-not-allowed opacity-60 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400";
    };

    const toggleSound = (): void => {
        setSoundEnabled(!soundEnabled);
        if (!soundEnabled) {
            try {
                playQuestionSound();
            } catch (error) {
                console.warn('Could not play test sound:', error);
            }
        }
    };

    const toggleTTS = (): void => {
        if (isSpeaking) {
            stopSpeaking();
        }
        setTtsEnabled(!ttsEnabled);

        if (!ttsEnabled && questions && questions.length > 0) {
            // Test TTS when enabling
            setTimeout(() => {
                speakText(isHebrew ? "קריינות הופעלה" : "Text-to-speech enabled");
            }, 100);
        }
    };

    const getScorePercentage = (): number => {
        return questions ? Math.round((score / questions.length) * 100) : 0;
    };

    const getScoreColor = (): string => {
        const percentage = getScorePercentage();
        if (percentage >= 80) return "text-green-600";
        if (percentage >= 60) return "text-yellow-600";
        return "text-red-600";
    };

    if (loading) {
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

    if (error) {
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

    if (!questions || questions.length === 0) {
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

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-300 to-orange-400">
            {/* Main quiz container */}
            <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-8 md:p-12 lg:p-16 rounded-[45px] shadow-2xl text-center w-[98%] max-w-7xl border-4 border-yellow-400 dark:border-yellow-600 animate-slide-fade">

                {/* Top bar with controls */}
                <div className="flex justify-between items-center mb-8 lg:mb-12">
                    <div className="flex items-center gap-3">
                        <div className="p-3 w-16 h-16 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-4xl shadow-lg">
                            {currentQuestionIndex + 1}
                        </div>
                        <button
                            onClick={toggleSound}
                            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${soundEnabled
                                ? 'bg-green-500 hover:bg-green-600 text-white'
                                : 'bg-gray-400 hover:bg-gray-500 text-white'
                                }`}
                            title={isHebrew ? (soundEnabled ? 'בטל צלילים' : 'הפעל צלילים') : (soundEnabled ? 'Disable sound' : 'Enable sound')}
                        >
                            {soundEnabled ? <FaVolumeUp className="text-xl" /> : <FaVolumeOff className="text-xl" />}
                        </button>
                        <button
                            onClick={toggleTTS}
                            className={`p-3 rounded-full shadow-lg transition-all transform hover:scale-110 ${ttsEnabled
                                ? 'bg-purple-500 hover:bg-purple-600 text-white'
                                : 'bg-gray-400 hover:bg-gray-500 text-white'
                                }`}
                            title={isHebrew ? (ttsEnabled ? 'בטל קריינות' : 'הפעל קריינות') : (ttsEnabled ? 'Disable TTS' : 'Enable TTS')}
                        >
                            {ttsEnabled ? <FaPlay className="text-xl" /> : <FaPause className="text-xl" />}
                        </button>
                        <Link href="/games">
                            <button className="p-3 rounded-full shadow-lg transition-all transform hover:scale-110 bg-blue-500 hover:bg-blue-600 text-white" title={isHebrew ? 'חזור למשחקים' : 'Back to games'}>
                                <FaHome className="text-xl" />
                            </button>
                        </Link>
                    </div>
                    <div className="flex items-center gap-3 text-2xl lg:text-3xl font-bold text-gray-700 dark:text-gray-300">
                        ⭐ <span className="text-orange-600">{score}</span> /{" "}
                        <span className="text-yellow-600">{questions.length}</span>
                    </div>
                </div>

                {/* Question with TTS button */}
                <div className="mb-10 lg:mb-16">
                    <div className="flex items-center justify-center gap-6 mb-8">
                        <h1
                            dir={lang === "he" ? 'rtl' : 'ltr'}
                            key={currentQuestionIndex}
                            className="text-4xl md:text-6xl lg:text-5xl xl:text-6xl font-extrabold text-gray-800 dark:text-yellow-200 animate-slide-fade leading-tight flex-1"
                            style={{
                                textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                                lineHeight: '1.2'
                            }}
                        >
                            {currentQuestion.q}
                        </h1>
                        <button
                            onClick={() => speakQuestion(currentQuestion.q)}
                            disabled={isSpeaking}
                            className={`p-4 rounded-full shadow-lg transition-all transform hover:scale-110 ${isSpeaking
                                ? 'bg-red-500 hover:bg-red-600 animate-pulse'
                                : 'bg-purple-500 hover:bg-purple-600'
                                } text-white text-2xl disabled:opacity-70`}
                            title={isHebrew ? (isSpeaking ? 'עצור קריאה' : 'קרא שאלה') : (isSpeaking ? 'Stop reading' : 'Read question')}
                        >
                            {isSpeaking ? <FaPause /> : <FaVolumeUp />}
                        </button>
                    </div>
                </div>

                {/* Answers */}
                <div
                    key={currentQuestionIndex + "-answers"}
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 animate-slide-fade max-w-5xl mx-auto"
                >
                    {currentQuestion.answers.map((ans, i) => (
                        <button
                            key={i}
                            onClick={() => handleAnswer(ans.isCorrect, i)}
                            disabled={selectedAnswerIndex !== null}
                            className={`p-6 lg:p-8 rounded-3xl shadow-xl text-xl lg:text-2xl xl:text-3xl font-bold transition-all duration-300 min-h-[120px] lg:min-h-[150px] flex items-center justify-center text-center leading-relaxed ${getAnswerButtonClass(i)}`}
                            style={{
                                textShadow: selectedAnswerIndex === i ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                            }}
                        >
                            <span className="break-words">{ans.text}</span>
                        </button>
                    ))}
                </div>

                {/* Feedback */}
                {selectedAnswerIndex !== null && (
                    <div className="flex flex-col items-center mt-10">
                        <div
                            className={`text-3xl lg:text-4xl font-extrabold flex items-center gap-4 animate-bounce ${message.includes(isHebrew ? "כל הכבוד" : "Correct")
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                        >
                            {message.includes(isHebrew ? "כל הכבוד" : "Correct") ? (
                                <FaCheckCircle className="text-4xl lg:text-5xl" />
                            ) : (
                                <FaTimesCircle className="text-4xl lg:text-5xl" />
                            )}
                            {message}
                        </div>

                        <div className="mt-8 px-8 py-6 bg-green-100/80 dark:bg-green-800/80 backdrop-blur-sm text-green-800 dark:text-green-200 rounded-3xl shadow-xl text-xl lg:text-2xl font-bold animate-fade-in max-w-4xl">
                            {isHebrew ? "✅ התשובה הנכונה היא: " : "✅ The correct answer is: "}
                            <span className="font-extrabold block mt-2 text-2xl lg:text-3xl">
                                {currentQuestion.answers.find((a) => a.isCorrect)?.text}
                            </span>
                        </div>
                    </div>
                )}
            </div>

            {/* Progress bar */}
            <div className="w-[90%] max-w-2xl mt-10">
                <div className="flex justify-between text-lg font-bold mb-3 text-white">
                    <span>{isHebrew ? "התקדמות" : "Progress"}</span>
                    <span>
                        {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
                    </span>
                </div>
                <div className="h-6 bg-white/30 backdrop-blur-sm rounded-full overflow-hidden shadow-inner border-2 border-white/50">
                    <div
                        className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700 ease-in-out shadow-lg"
                        style={{
                            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                        }}
                    ></div>
                </div>
            </div>
        </main>
    );
}