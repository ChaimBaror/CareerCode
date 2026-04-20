'use client';

import { PhoneFrame } from './PhoneFrame';
import { ACHIEVEMENTS } from '../_lib/achievements';

interface StatsPanelProps {
  xp: number;
  level: number;
  accuracy: number;
  bestStreak: number;
  correct: number;
  totalQ: number;
  achievements: string[];
  onBack: () => void;
  onReset: () => void;
}

export function StatsPanel(p: StatsPanelProps) {
  const tiles = [
    { label: 'דיוק', val: `${p.accuracy}%`, color: '#34d399', icon: '🎯' },
    { label: 'רצף מקס', val: p.bestStreak, color: '#f97316', icon: '🔥' },
    { label: 'תשובות נכונות', val: p.correct, color: '#60a5fa', icon: '✅' },
    { label: 'סה״כ שאלות', val: p.totalQ, color: '#a78bfa', icon: '📝' },
  ];

  return (
    <PhoneFrame>
      <div className="flex h-[100dvh] flex-col overflow-hidden bg-[#080818] px-6 pb-8 pt-12 sm:h-[844px] sm:rounded-[52px]">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={p.onBack} className="rounded-xl bg-white/5 px-3.5 py-2 text-sm text-white">← חזרה</button>
          <div className="text-xl font-extrabold text-white">📊 סטטיסטיקות</div>
          <div className="w-16" />
        </div>

        <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto">
          <div className="rounded-[20px] border border-violet-600/30 bg-gradient-to-br from-violet-600/20 to-indigo-700/10 p-5 text-center">
            <div className="text-[11px] font-bold tracking-widest text-violet-400">TOTAL XP</div>
            <div className="text-5xl font-black leading-[1.1] text-white">{p.xp}</div>
            <div className="text-sm font-semibold text-violet-400">Level {p.level}</div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {tiles.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-white/5 p-3.5">
                <div className="text-xl">{s.icon}</div>
                <div className="mt-1 text-2xl font-extrabold" style={{ color: s.color }}>{s.val}</div>
                <div className="text-[11px] font-semibold text-slate-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div className="mb-2 text-xs font-bold tracking-widest text-slate-400">
              🏆 הישגים ({p.achievements.length}/{ACHIEVEMENTS.length})
            </div>
            <div className="grid grid-cols-2 gap-2">
              {ACHIEVEMENTS.map((a) => {
                const got = p.achievements.includes(a.id);
                return (
                  <div
                    key={a.id}
                    className={
                      'flex items-center gap-2 rounded-xl border p-2.5 ' +
                      (got ? 'border-amber-400/30 bg-gradient-to-br from-amber-400/10 to-orange-500/10 opacity-100' : 'border-white/5 bg-white/5 opacity-40')
                    }
                  >
                    <div className={'text-[22px] ' + (got ? '' : 'grayscale')}>{a.icon}</div>
                    <div className={'text-[11px] font-bold ' + (got ? 'text-white' : 'text-slate-500')}>{a.name}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <button onClick={p.onReset} className="mt-2.5 rounded-2xl border border-red-400/30 bg-red-400/10 py-3 text-sm font-bold text-red-400">
            🔄 התחל מחדש
          </button>
        </div>
      </div>
    </PhoneFrame>
  );
}
