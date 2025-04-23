'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { recommendations } from '../data/recommendations';

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
        label: 'Scores',
        data: Object.values(scores), // Use the scores values for the chart
        backgroundColor: [
          'rgba(38, 150, 255, 0.6)',  // R (Realistic)
          'rgba(255, 99, 132, 0.6)',   // I (Investigative)
          'rgba(54, 162, 235, 0.6)',   // A (Artistic)
          'rgba(75, 192, 192, 0.6)',   // S (Social)
          'rgba(153, 102, 255, 0.6)',  // E (Enterprising)
          'rgba(255, 159, 64, 0.6)'    // C (Conventional)
        ], // Each type gets a distinct color
        borderColor: 'rgba(0, 0, 0, 0.1)', // Soft border color for the bars
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Make the chart responsive
    plugins: {
      title: {
        display: true,
        text: 'Your Holland Code Scores',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => `${tooltipItem.raw} points`, // Display score in the tooltip
        },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 12, // Set maximum value to match the expected score range
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
          {hollandCode}
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

        <Link href="/">
          <span className="text-blue-500 hover:underline dark:text-blue-300">
            חזרה לדף הבית
          </span>
        </Link>
      </div>
    </main>
  );
}
