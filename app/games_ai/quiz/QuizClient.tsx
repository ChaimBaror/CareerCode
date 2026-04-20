// QuizClient.tsx (Updated)
'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { QuizHeader } from './QuizHeader';
import { QuestionDisplay } from './QuestionDisplay';
import { AnswerGrid } from './AnswerGrid';
import { FeedbackSection } from './FeedbackSection';
import { ProgressBar } from './ProgressBar';
import { LoadingScreen } from './LoadingScreen';
import { ErrorScreen } from './ErrorScreen';
import { CompletionScreen } from './CompletionScreen';
import { useQuizLogic } from '@/hooks/useQuizLogic';
import { useAudio } from '@/hooks/useAudio';
import { useImageFetcher } from '@/hooks/useImageFetcher';

export default function QuizClient() {
    const searchParams = useSearchParams();
    const topic = searchParams.get("topic");
    const difficulty = searchParams.get("difficulty");
    const lang = searchParams.get("lang");
    const isHebrew = lang === "he";

    const audioHook = useAudio(isHebrew);
    const imageHook = useImageFetcher();

    const { ttsEnabled, soundEnabled, speakQuestion, playNewQuestionSound, playAnswerSound, speakText } = audioHook;
    const { imageEnabled, fetchImageForAnswer } = imageHook;

    const {
        questions,
        currentQuestionIndex,
        score,
        selectedAnswerIndex,
        message,
        loading,
        error,
        handleAnswer
    } = useQuizLogic(
        topic,
        difficulty,
        lang,
        playAnswerSound,
        speakText
    );

    // Auto-fetch image for correct answer and auto-speak
    useEffect(() => {
        if (questions && questions[currentQuestionIndex]) {
            const correctAnswer = questions[currentQuestionIndex].answers.find(a => a.isCorrect);
            if (correctAnswer && imageEnabled) {
                fetchImageForAnswer(correctAnswer.text);
            }

            if (ttsEnabled && !loading && !error) {
                const timer = setTimeout(() => {
                    speakQuestion(questions[currentQuestionIndex].q);
                }, 800);
                return () => clearTimeout(timer);
            }
        }
    }, [currentQuestionIndex, questions, imageEnabled, ttsEnabled, loading, error, fetchImageForAnswer, speakQuestion]);

    // Play sound when new question appears
    useEffect(() => {
        if (questions && questions.length > 0 && soundEnabled) {
            const timer = setTimeout(() => playNewQuestionSound(), 300);
            return () => clearTimeout(timer);
        }
    }, [currentQuestionIndex, questions, soundEnabled, playNewQuestionSound]);

    if (loading) return <LoadingScreen isHebrew={isHebrew} topic={topic} />;
    if (error) return <ErrorScreen error={error} isHebrew={isHebrew} />;
    if (!questions || questions.length === 0) {
        return <CompletionScreen score={score} totalQuestions={0} message={message} isHebrew={isHebrew} />;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-yellow-300 to-orange-400">
            <div className="relative z-10 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm p-8 md:p-12 lg:p-16 rounded-[45px] shadow-2xl text-center w-[98%] max-w-7xl border-4 border-yellow-400 dark:border-yellow-600 animate-slide-fade">

                <QuizHeader
                    currentQuestionIndex={currentQuestionIndex}
                    score={score}
                    totalQuestions={questions.length}
                    soundEnabled={audioHook.soundEnabled}
                    setSoundEnabled={audioHook.setSoundEnabled}
                    ttsEnabled={audioHook.ttsEnabled}
                    setTtsEnabled={audioHook.setTtsEnabled}
                    imageEnabled={imageHook.imageEnabled}
                    setImageEnabled={imageHook.setImageEnabled}
                    isHebrew={isHebrew}
                />

                <QuestionDisplay
                    question={currentQuestion.q}
                    isSpeaking={audioHook.isSpeaking}
                    speakQuestion={audioHook.speakQuestion}
                    lang={lang}
                    isHebrew={isHebrew}
                />

                <AnswerGrid
                    answers={currentQuestion.answers}
                    selectedAnswerIndex={selectedAnswerIndex}
                    onAnswer={handleAnswer}
                    currentQuestionIndex={currentQuestionIndex}
                    currentImage={imageHook.currentImage}
                    imageLoading={imageHook.imageLoading}
                    imageEnabled={imageHook.imageEnabled}
                    isHebrew={isHebrew}

                />

                <FeedbackSection
                    selectedAnswerIndex={selectedAnswerIndex}
                    message={message}
                    correctAnswer={currentQuestion.answers.find(a => a.isCorrect)?.text}
                    isHebrew={isHebrew}
                />
            </div>

            <ProgressBar
                currentQuestionIndex={currentQuestionIndex}
                totalQuestions={questions.length}
                isHebrew={isHebrew}
            />
        </main>
    );
}