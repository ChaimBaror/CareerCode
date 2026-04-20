'use client';

import { useEffect, useState } from 'react';
import { SplashScreen } from './_components/SplashScreen';
import { StatsPanel } from './_components/StatsPanel';
import { ChatView } from './_components/ChatView';
import { useRoboTeach } from './_hooks/useRoboTeach';
import { getCtx } from './_lib/sfx';

export default function LearnEnglishPage() {
  const state = useRoboTeach();
  const [showStats, setShowStats] = useState(false);

  // Unlock WebAudio on first pointer interaction (required by browsers).
  useEffect(() => {
    const unlock = () => getCtx();
    document.addEventListener('pointerdown', unlock, { once: true });
    return () => document.removeEventListener('pointerdown', unlock);
  }, []);

  const accuracy = state.totalQ > 0 ? Math.round((state.correct / state.totalQ) * 100) : 0;

  return (
    <>
      {!state.started ? (
        <SplashScreen onStart={state.start} />
      ) : showStats ? (
        <StatsPanel
          xp={state.xp}
          level={state.level}
          accuracy={accuracy}
          bestStreak={state.bestStreak}
          correct={state.correct}
          totalQ={state.totalQ}
          achievements={state.achievements}
          onBack={() => setShowStats(false)}
          onReset={() => { setShowStats(false); state.reset(); }}
        />
      ) : (
        <ChatView state={state} onShowStats={() => setShowStats(true)} />
      )}
    </>
  );
}
