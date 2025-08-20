// AnswerGrid.tsx
import { Answer } from '@/types/types';
import Image from 'next/image';
import { FaSpinner } from 'react-icons/fa';
import { ImageData } from '../../../types/types';

interface AnswerGridProps {
    answers: Answer[];
    selectedAnswerIndex: number | null;
    onAnswer: (isCorrect: boolean, index: number) => void;
    currentQuestionIndex: number;
    currentImage: ImageData | null;
    imageLoading: boolean;
    imageEnabled: boolean;
    isHebrew: boolean;

}

export function AnswerGrid({ answers, selectedAnswerIndex, onAnswer, currentQuestionIndex, currentImage,
    imageLoading,
    imageEnabled,
    isHebrew }: AnswerGridProps) {
    const getAnswerButtonClass = (index: number): string => {
        if (selectedAnswerIndex === null) {
            return "bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 dark:from-gray-700 dark:to-gray-600 dark:hover:from-gray-600 dark:hover:to-gray-500 border-2 border-gray-300 dark:border-gray-500 hover:border-gray-400 dark:hover:border-gray-400 transform hover:scale-105 hover:shadow-lg text-gray-800 dark:text-gray-200";
        }

        if (selectedAnswerIndex === index) {
            return answers[index].isCorrect
                ? "bg-gradient-to-r from-green-500 to-green-600 text-white border-2 border-green-400 shadow-lg transform scale-105"
                : "bg-gradient-to-r from-red-500 to-red-600 text-white border-2 border-red-400 shadow-lg transform scale-105";
        }

        return "bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700 cursor-not-allowed opacity-60 border-2 border-gray-400 dark:border-gray-500 text-gray-600 dark:text-gray-400";
    };

    return (
        <div className={imageEnabled ? "flex flex-col  md:flex-row " : ""}>
            {/* Image hint section */}
            {(imageEnabled || imageLoading) && (
                <div className="mt-6 md:mt-0 md:mr-6 flex-1">
                    {imageLoading ? (
                        <div className="flex items-center justify-center p-8 bg-blue-100/80 dark:bg-blue-800/80 backdrop-blur-sm rounded-2xl shadow-lg">
                            <FaSpinner className="animate-spin text-3xl text-blue-600 mr-3" />
                            <span className="text-blue-800 dark:text-blue-200 font-semibold">
                                {isHebrew ? "טוען תמונה..." : "Loading image..."}
                            </span>
                        </div>
                    ) : currentImage && (
                        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg relative">
                            <Image
                                src={currentImage.imageUrl}
                                alt="Question hint image"
                                width={600}
                                height={400}
                                className="w-full h-auto rounded-lg object-cover"
                            />
                        </div>
                    )}
                </div>
            )}
            <div
                key={currentQuestionIndex + "-answers"}
                className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8 animate-slide-fade max-w-5xl mx-auto"
            >
                {answers.map((ans, i) => (
                    <button
                        key={i}
                        onClick={() => onAnswer(ans.isCorrect, i)}
                        disabled={selectedAnswerIndex !== null}
                        className={`p-6 lg:p-8 rounded-3xl shadow-xl text-xl lg:text-2xl xl:text-3xl font-bold transition-all duration-300 min-h-[120px] lg:min-h-[150px] flex items-center justify-center text-center leading-relaxed cursor-pointer ${getAnswerButtonClass(i)}`}
                        style={{
                            textShadow: selectedAnswerIndex === i ? '1px 1px 2px rgba(0,0,0,0.3)' : 'none'
                        }}
                    >
                        <span className="break-words">{ans.text}</span>
                    </button>
                ))}
            </div>
        </ div>
    );
}