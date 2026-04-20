'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { SFX } from '../_lib/sfx';
import { speakText, stopSpeaking } from '../_lib/speech';
import { parseReply, verdictOf } from '../_lib/prompt';
import type { Mood, Difficulty } from '../_lib/prompt';
import { callAI, INTRO_BY_LEVEL } from '../_lib/callAI';
import type { LevelChoice } from '../_components/SplashScreen';
import { useScore } from './useScore';
import { useAchievements } from './useAchievements';

export interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
  raw?: string;
}

export function useRoboTeach() {
  const [msgs, setMsgs] = useState<ChatMsg[]>([]);
  const [busy, setBusy] = useState(false);
  const [mood, setMood] = useState<Mood>('neutral');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [started, setStarted] = useState(false);
  const [talking, setTalking] = useState(false);
  const [voiceOn, setVoiceOn] = useState(true);

  const voiceOnRef = useRef(voiceOn);
  useEffect(() => { voiceOnRef.current = voiceOn; }, [voiceOn]);

  const score = useScore();
  const ach = useAchievements({
    totalQ: score.totalQ, streak: score.streak, level: score.level, correct: score.correct,
  });

  const robotSay = useCallback(async (text: string) => {
    if (!voiceOnRef.current) return;
    setTalking(true);
    await speakText(text, { onDone: () => setTalking(false) });
  }, []);

  const applyReply = useCallback((raw: string, prevMsgs: ChatMsg[]) => {
    const { clean, mood: m, earnedXp, diff } = parseReply(raw);
    setMood(m);
    setDifficulty(diff);
    score.applyVerdict(verdictOf(clean));
    score.addXp(earnedXp);
    setMsgs([...prevMsgs, { role: 'assistant', content: clean, raw }]);
    setBusy(false);
    setTimeout(() => robotSay(clean), 150);
  }, [robotSay, score]);

  const send = useCallback(async (text: string) => {
    const t = text.trim();
    if (!t || busy) return;
    setBusy(true);
    setMood('thinking');
    SFX.send();
    const next: ChatMsg[] = [...msgs, { role: 'user', content: t }];
    setMsgs(next);
    const history = next.map((mm) => ({ role: mm.role, content: mm.raw || mm.content }));
    const raw = await callAI(history);
    applyReply(raw, next);
  }, [busy, msgs, applyReply]);

  const start = useCallback(async (choice: LevelChoice) => {
    setStarted(true);
    setBusy(true);
    const raw = await callAI([{ role: 'user', content: INTRO_BY_LEVEL[choice] }]);
    const { clean, mood: m } = parseReply(raw);
    setMood(m);
    setMsgs([{ role: 'assistant', content: clean, raw }]);
    setBusy(false);
    setTimeout(() => robotSay(clean), 200);
  }, [robotSay]);

  const reset = useCallback(() => {
    stopSpeaking();
    setStarted(false);
    setMsgs([]);
    setMood('neutral');
    setDifficulty('easy');
    score.resetScore();
    ach.resetAchievements();
  }, [score, ach]);

  const toggleVoice = useCallback(() => {
    setVoiceOn((v) => { if (v) stopSpeaking(); return !v; });
  }, []);

  return {
    msgs, busy, mood, difficulty, started,
    talking, voiceOn,
    xp: score.xp, level: score.level, streak: score.streak, bestStreak: score.bestStreak,
    correct: score.correct, totalQ: score.totalQ,
    levelUpShow: score.levelUpShow, showConfetti: score.showConfetti,
    achievements: ach.earned, newAchievement: ach.latest,
    send, start, reset, toggleVoice, robotSay,
  };
}
