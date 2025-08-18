// src/app/games_ai/page.tsx
"use client";
import Link from "next/link";
import { useState } from "react";

const topics = [
    { name: "חיות", emoji: "🐾", name_en: "Animals" },
    { name: "עולם", emoji: "🌍", name_en: "World" },
    { name: "אנשים", emoji: "🧑‍🤝‍🧑", name_en: "People" },
    { name: "אוכל", emoji: "🍔", name_en: "Food" },
    { name: "היסטוריה", emoji: "📜", name_en: "History" },
    { name: "מדע", emoji: "🔬", name_en: "Science" },
    { name: "אנגלית", emoji: "📝", name_en: "English" }
];

const difficulties = [
    { name: "קל", emoji: "🙂", level: "easy", name_en: "Easy" },
    { name: "בינוני", emoji: "🧐", level: "medium", name_en: "Medium" },
    { name: "קשה", emoji: "🤯", level: "hard", name_en: "Hard" },
];

export default function GamesAiPage() {
    const [language, setLanguage] = useState<"he" | "en">("he");
    const [customTopic, setCustomTopic] = useState("");
    const isHebrew = language === "he";

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-100 via-gray-50 to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-200">
            <div className="text-center p- md:p-5 bg-white dark:bg-gray-800 rounded-3xl shadow-2xl max-w-6xl w-full">
                {/* Language selection toggle */}
                <div className="flex justify-center mb-6">
                    <button
                        onClick={() => setLanguage("he")}
                        className={`px-4 py-2 rounded-l-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${isHebrew
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                    >
                        עברית
                    </button>
                    <button
                        onClick={() => setLanguage("en")}
                        className={`px-4 py-2 rounded-r-full font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 ${!isHebrew
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                            }`}
                    >
                        English
                    </button>
                </div>

                <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-purple-700 dark:text-purple-400">
                    {isHebrew ? "בחר נושא ורמת קושי" : "Select a Topic and Difficulty"}
                </h1>
                <p className="mb-8 text-lg text-gray-600 dark:text-gray-400">
                    {isHebrew
                        ? "הבינה המלאכותית תיצור שאלות במיוחד עבורך"
                        : "The AI will generate questions especially for you."}
                </p>

                {/* Topics */}
                <h2 className="text-2xl font-bold mb-6 text-purple-600 dark:text-purple-300">
                    {isHebrew ? "בחר נושא:" : "Select a Topic:"}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300"
                        >
                            <div className="text-4xl mb-2">{topic.emoji}</div>
                            <h3 className="mb-4 font-semibold text-lg text-center">
                                {isHebrew ? topic.name : topic.name_en}
                            </h3>
                            <div className="flex flex-col gap-2 w-full">
                                {difficulties.map((difficulty, diffIndex) => (
                                    <Link
                                        key={diffIndex}
                                        href={`/games_ai/quiz?topic=${isHebrew ? topic.name : topic.name_en
                                            }&difficulty=${difficulty.level}&lang=${language}`}
                                        passHref
                                    >
                                        <button className="flex items-center justify-center gap-2 w-full py-2 px-4 bg-yellow-500 text-white font-bold rounded-full shadow-md hover:bg-yellow-600 active:scale-95 transition-all duration-200">
                                            <span>{difficulty.emoji}</span>
                                            {isHebrew ? difficulty.name : difficulty.name_en}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}

                    {/* Custom Topic Card */}
                    <div className="flex flex-col items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-2xl shadow hover:shadow-lg transition-all duration-300">
                        <div className="text-4xl mb-2">✏️</div>
                        <h3 className="mb-4 font-semibold text-lg text-center">
                            {isHebrew ? "נושא מותאם אישית" : "Custom Topic"}
                        </h3>
                        <input
                            type="text"
                            value={customTopic}
                            onChange={(e) => setCustomTopic(e.target.value)}
                            placeholder={isHebrew ? "הכנס נושא..." : "Enter topic..."}
                            className="w-full px-3 py-2 mb-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                        <div className="flex flex-col gap-2 w-full">
                            {difficulties.map((difficulty, diffIndex) => (
                                <Link
                                    key={diffIndex}
                                    href={`/games_ai/quiz?topic=${customTopic || "Custom"}&difficulty=${difficulty.level}&lang=${language}`}
                                    passHref
                                >
                                    <button
                                        disabled={!customTopic.trim()}
                                        className={`flex items-center justify-center gap-2 w-full py-2 px-4 font-bold rounded-full shadow-md transition-all duration-200 ${customTopic.trim()
                                            ? "bg-green-500 text-white hover:bg-green-600 active:scale-95"
                                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                            }`}
                                    >
                                        <span>{difficulty.emoji}</span>
                                        {isHebrew ? difficulty.name : difficulty.name_en}
                                    </button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
