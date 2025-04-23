// src/app/page.tsx (שינוי חלקי)
"use client"
import Link from 'next/link'; // <-- 1. ייבוא Link

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          ברוכים הבאים לשאלון נטיות תעסוקתיות
        </h1>
        <p className="mb-8 text-lg">
          גלו אילו סביבות עבודה וקריירות מתאימות לכם ביותר לפי מודל הולנד.
          השאלון לוקח כ-10 דקות.
        </p>
        {/* 2. שימוש ב-Link במקום button */}
        <Link href="/quiz">
          <span className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
            התחל/י שאלון
          </span>
        </Link>
      </div>
    </main>
  );
}