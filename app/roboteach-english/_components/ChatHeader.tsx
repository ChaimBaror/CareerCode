'use client';

import { Robot } from './Robot';
import type { Mood, Difficulty } from '../_lib/prompt';

interface ChatHeaderProps {
  mood: Mood;
  talking: boolean;
  listening: boolean;
  voiceOn: boolean;
  level: number;
  xp: number;
  streak: number;
  difficulty: Difficulty;
  onToggleVoice: () => void;
  onShowStats: () => void;
}

const DIFF_COLOR: Record<Difficulty, string> = { easy: '#34d399', medium: '#fbbf24', hard: '#f87171' };

export function ChatHeader(p: ChatHeaderProps) {
  const xpPct = ((p.xp % 100) / 100) * 100;
  const diffColor = DIFF_COLOR[p.difficulty];
  const statusText = p.listening ? 'מקשיב...' : p.talking ? 'מדבר...' : 'מוכן לשיעור';
  const statusColor = p.listening ? 'text-emerald-400' : p.talking ? 'text-amber-400' : 'text-emerald-400';

  return (
    <div className="border-b border-white/5 px-4 pb-3 pt-2.5">
      <div className="flex items-center gap-3">
        <Robot mood={p.mood} talking={p.talking} listening={p.listening} size={70} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-1.5">
            <div className="text-base font-extrabold text-white">RoboTeach 🤖</div>
            <div className="flex gap-1.5">
              <button onClick={p.onShowStats} className="rounded-[10px] bg-white/5 px-2 py-1 text-xs font-semibold text-violet-400">📊</button>
              <button
                onClick={p.onToggleVoice}
                className={
                  'rounded-[10px] border px-2 py-1 text-xs font-bold ' +
                  (p.voiceOn ? 'border-indigo-500 bg-indigo-500/25 text-violet-400' : 'border-[#333] bg-white/5 text-neutral-600')
                }
              >
                {p.voiceOn ? '🔊' : '🔇'}
              </button>
            </div>
          </div>
          <div className={'mt-px text-[11px] font-medium ' + statusColor}>● {statusText}</div>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="min-w-7 text-[11px] font-extrabold text-violet-400">Lv{p.level}</span>
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-pink-500 shadow-[0_0_8px_rgba(124,58,237,0.6)] transition-[width] duration-500"
                style={{ width: `${xpPct}%` }}
              />
            </div>
            <span className="text-[10px] font-semibold text-slate-500">{p.xp}xp</span>
            {p.streak >= 2 && (
              <span className="rounded-[10px] bg-gradient-to-br from-orange-500 to-red-500 px-1.5 py-0.5 text-[10px] font-extrabold text-white shadow-[0_2px_8px_rgba(249,115,22,0.4)]">
                🔥{p.streak}
              </span>
            )}
            <span
              className="rounded-lg border px-1.5 py-0.5 text-[9px] font-bold uppercase"
              style={{ background: `${diffColor}22`, borderColor: `${diffColor}44`, color: diffColor }}
            >
              {p.difficulty}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
