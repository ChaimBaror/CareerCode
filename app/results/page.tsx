'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { recommendations } from '../data/recommendations';
import HollandResultDiagram from '@/components/HollandResultDiagram';
import { BsArrowRepeat, BsHouseFill } from 'react-icons/bs';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const hollandCode = searchParams.get('hollandCode');
  const scores = JSON.parse(searchParams.get('scores') || '{}');

  // If the hollandCode or scores are not found, display a fallback message
  if (!hollandCode || !scores) {
    return (
      <main className="flex min-h-screen items-center justify-center p-24 bg-white text-black dark:bg-gray-900 dark:text-white">
        <h1 className="text-2xl font-semibold">לא התקבל קוד הולנד או ניקוד</h1>
      </main>
    );
  }

  // Data for the chart
  const chartData = {
    labels: [
      'מציאותי (R)',
      'חוקר (I)',
      'אמנותי (A)',
      'חברתי (S)',
      'יזמי (E)',
      'קונבנציונלי (C)'
    ],
    datasets: [
      {
        label: 'הניקוד שלך',
        data: Object.values(scores),
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'הניקוד שלך לפי טיפוסי הולנד',
        font: {
          size: 18,
          weight: 'bold' as 'bold', // Explicitly cast the type
        },
        color: '#4b5563',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} נקודות`,
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12,
        grid: {
          color: '#e5e7eb',
        },
        ticks: {
          color: '#6b7280',
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
        },
      },
    },
  };

  const getRecommendations = (code: string) => {

    // Normalize the code to lowercase to handle case insensitivity
    const normalizedCode = code.toUpperCase();

    // Check if there's an exact match first
    if (recommendations[normalizedCode]) {
      return recommendations[normalizedCode];
    }

    // If no exact match, check combinations of the code and look for startsWith matches
    const possibleMatches = Object.keys(recommendations).filter(key =>
      normalizedCode.startsWith(key)
    );

    // If we have any possible matches, return the first one (the most complete match)
    if (possibleMatches.length > 0) {
      return recommendations[possibleMatches[0]];
    }

    // If no matches were found, return a default message
    return "קוד הולנד לא מוכר. נסה שנית.";
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-10 md:p-24 bg-white text-black dark:bg-gray-900 dark:text-white">
      <div className="w-full max-w-lg text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">התוצאות שלך</h1>

        <p className="text-xl mb-6">קוד הולנד שלך הוא:</p>
        <p className="text-6xl font-bold text-blue-600 dark:text-blue-400 mb-8 tracking-widest">
          <HollandResultDiagram
            topLabel={hollandCode[0]}
            leftLabel={hollandCode[1]}
            rightLabel={hollandCode[2]}
            result={hollandCode}
          />
        </p>

        {/* Bar Chart for Holland Code */}
        <div className="mb-8 h-72 w-full">
          <Bar data={chartData} options={chartOptions} />
        </div>

        {/* Dynamic recommendation based on the Holland Code */}
        <div className="mb-6 text-lg">
          <h3 className="font-semibold mb-2">המלצות עבורך:</h3>
          <p>{getRecommendations(hollandCode)}</p>
        </div>

        {/* Footer and Navigation */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-8">
          <Link href="/" passHref>
            <button className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full transition-all duration-300 transform hover:scale-105">
              <BsHouseFill />
              חזרה לדף הבית
            </button>
          </Link>
          <Link href="/quiz" passHref>
            <button className="flex items-center gap-2 px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-full transition-all duration-300 transform hover:scale-105">
              <BsArrowRepeat />
              התחל שאלון חדש
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
