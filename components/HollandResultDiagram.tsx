// src/components/HollandResultDiagram.tsx
'use client';

import React from 'react';

export default function HollandResultDiagram({
  topLabel = '',
  leftLabel = '',
  rightLabel = '',
  result = '',
}: {
  topLabel?: string;
  leftLabel?: string;
  rightLabel?: string;
  result?: string;
}) {
  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Top circle */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-40 md:w-48 md:h-48 rounded-full border-4 
                   border-blue-500 bg-blue-300/30 dark:bg-blue-700/30 
                   mix-blend-multiply flex items-center justify-center 
                   text-lg md:text-xl font-bold text-blue-700 dark:text-blue-200"
        aria-label="Top personality trait"
      >
        {topLabel}
      </div>

      {/* Left circle */}
      <div
        className="absolute top-24 left-4 w-40 h-40 md:w-48 md:h-48 rounded-full border-4 
                   border-green-500 bg-green-300/30 dark:bg-green-700/30 
                   mix-blend-multiply flex items-center justify-center 
                   text-lg md:text-xl font-bold text-green-700 dark:text-green-200"
        aria-label="Left personality trait"
      >
        {leftLabel}
      </div>

      {/* Right circle */}
      <div
        className="absolute top-24 right-4 w-40 h-40 md:w-48 md:h-48 rounded-full border-4 
                   border-red-500 bg-red-300/30 dark:bg-red-700/30 
                   mix-blend-multiply flex items-center justify-center 
                   text-lg md:text-xl font-bold text-red-700 dark:text-red-200"
        aria-label="Right personality trait"
      >
        {rightLabel}
      </div>

      {/* Center result */}
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                    px-4 py-2 rounded-full shadow-lg  
                   dark:border-gray-600 
                   text-lg font-bold text-gray-800 dark:text-white z-10"
        aria-label="Holland result code"
      >
        {result}
      </div>
    </div>
  );
}