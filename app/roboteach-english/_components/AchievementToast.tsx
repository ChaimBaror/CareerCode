'use client';

import type { Achievement } from '../_lib/achievements';

export function AchievementToast({ achievement }: { achievement: Achievement }) {
  return (
    <div className="absolute left-1/2 top-[60px] z-40 flex -translate-x-1/2 items-center gap-2 rounded-[30px] bg-gradient-to-br from-amber-400 to-orange-500 px-4 py-2.5 text-[13px] font-extrabold text-black shadow-[0_10px_30px_rgba(251,191,36,0.5)] [animation:rt-slideDown_0.4s_ease-out]">
      <span className="text-xl">{achievement.icon}</span>
      <span>הישג חדש: {achievement.name}</span>
    </div>
  );
}
