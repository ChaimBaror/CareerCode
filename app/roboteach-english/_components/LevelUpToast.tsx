'use client';

export function LevelUpToast({ level }: { level: number }) {
  return (
    <div className="absolute left-1/2 top-[40%] z-50 -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-gradient-to-br from-violet-600 to-pink-500 px-10 py-5 text-center text-2xl font-black text-white shadow-[0_20px_60px_rgba(124,58,237,0.6)] [animation:rt-popUp_2.5s_ease-out_forwards]">
      <div className="mb-1 text-4xl">🎉</div>
      <div>LEVEL UP!</div>
      <div className="mt-1 text-sm font-semibold opacity-90">Level {level}</div>
    </div>
  );
}
