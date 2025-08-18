// src/app/page.tsx
"use client";
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 bg-gradient-to-br from-blue-300 to-purple-400">
      <div className="text-center p-10 bg-white rounded-3xl shadow-2xl max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">

        <h1 className="text-5xl font-extrabold mb-4 text-purple-700">
          ברוכים הבאים 🚀
        </h1>
        <h2 className="text-2xl font-semibold mb-6 text-blue-600">
          שאלון נטיות תעסוקתיות ומפגש עם טריוויה
        </h2>
        <p className="mb-8 text-lg text-gray-700 leading-relaxed">
          גלו אילו סביבות עבודה וקריירות מתאימות לכם ביותר לפי מודל הולנד, או פשוט תיהנו ממשחק טריוויה מרתק!
        </p>

        <div className="flex flex-col space-y-4">
          <Link href="/quiz" passHref>
            <button className="w-full py-4 px-6 bg-blue-500 text-white font-bold rounded-full shadow-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75">
              התחל/י שאלון נטיות
            </button>
          </Link>
          <Link href="/games" passHref>
            <button className="w-full py-4 px-6 bg-purple-500 text-white font-bold rounded-full shadow-lg hover:bg-purple-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-75">
              שחק/י במשחק טריוויה
            </button>
          </Link>
          <Link href="/games_ai" passHref>
            <button className="w-full py-4 px-6 bg-yellow-500 text-white font-bold rounded-full shadow-lg hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75">
              שחק/י במשחק טריוויה AI
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}