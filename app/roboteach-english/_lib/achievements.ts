export interface Achievement {
  id: string;
  icon: string;
  name: string;
  check: (s: AchievementState) => boolean;
}

export interface AchievementState {
  totalQ: number;
  streak: number;
  level: number;
  correct: number;
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first', icon: '🎯', name: 'First Answer', check: (s) => s.totalQ >= 1 },
  { id: 'streak3', icon: '🔥', name: 'Hot Streak', check: (s) => s.streak >= 3 },
  { id: 'streak5', icon: '⚡', name: 'On Fire!', check: (s) => s.streak >= 5 },
  { id: 'streak10', icon: '🌟', name: 'Unstoppable', check: (s) => s.streak >= 10 },
  { id: 'lvl2', icon: '🎖️', name: 'Rising Star', check: (s) => s.level >= 2 },
  { id: 'lvl5', icon: '🏆', name: 'Scholar', check: (s) => s.level >= 5 },
  { id: 'correct10', icon: '💯', name: '10 Correct', check: (s) => s.correct >= 10 },
  { id: 'correct25', icon: '🧠', name: '25 Correct', check: (s) => s.correct >= 25 },
];
