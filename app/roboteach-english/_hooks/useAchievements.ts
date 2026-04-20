'use client';

import { useEffect, useState } from 'react';
import { ACHIEVEMENTS } from '../_lib/achievements';
import type { Achievement, AchievementState } from '../_lib/achievements';
import { SFX } from '../_lib/sfx';

export function useAchievements(state: AchievementState) {
  const [earned, setEarned] = useState<string[]>([]);
  const [latest, setLatest] = useState<Achievement | null>(null);

  useEffect(() => {
    ACHIEVEMENTS.forEach((a) => {
      if (!earned.includes(a.id) && a.check(state)) {
        setEarned((prev) => [...prev, a.id]);
        setLatest(a);
        SFX.achieve();
        setTimeout(() => setLatest(null), 3500);
      }
    });
  }, [state, earned]);

  return {
    earned,
    latest,
    resetAchievements: () => setEarned([]),
  };
}
