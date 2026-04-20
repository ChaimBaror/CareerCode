'use client';

import { useCallback, useState } from 'react';
import { SFX } from '../_lib/sfx';

export type Verdict = 'correct' | 'wrong' | 'none';

export function useScore() {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [totalQ, setTotalQ] = useState(0);
  const [levelUpShow, setLevelUpShow] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const applyVerdict = useCallback((v: Verdict) => {
    if (v === 'correct') {
      SFX.correct();
      setStreak((s) => {
        const n = s + 1;
        setBestStreak((b) => Math.max(b, n));
        return n;
      });
      setCorrect((c) => c + 1);
      setTotalQ((t) => t + 1);
    } else if (v === 'wrong') {
      SFX.wrong();
      setStreak(0);
      setTotalQ((t) => t + 1);
    }
  }, []);

  const addXp = useCallback((amount: number) => {
    if (amount <= 0) return;
    setXp((prev) => {
      const next = prev + amount;
      const oldLevel = Math.floor(prev / 100) + 1;
      const newLevel = Math.floor(next / 100) + 1;
      if (newLevel > oldLevel) {
        setLevel(newLevel);
        setLevelUpShow(true);
        setShowConfetti(true);
        SFX.levelUp();
        setTimeout(() => setLevelUpShow(false), 2500);
        setTimeout(() => setShowConfetti(false), 3500);
      }
      return next;
    });
  }, []);

  const resetScore = useCallback(() => {
    setXp(0);
    setLevel(1);
    setStreak(0);
    setBestStreak(0);
    setCorrect(0);
    setTotalQ(0);
  }, []);

  return {
    xp, level, streak, bestStreak, correct, totalQ,
    levelUpShow, showConfetti,
    applyVerdict, addXp, resetScore,
  };
}
