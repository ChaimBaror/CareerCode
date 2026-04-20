'use client';

export function TypingDots() {
  return (
    <div className="flex items-center gap-1 px-4 py-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-[7px] w-[7px] rounded-full bg-indigo-500"
          style={{ animation: `rt-td 1s ${i * 0.15}s ease-in-out infinite` }}
        />
      ))}
    </div>
  );
}
