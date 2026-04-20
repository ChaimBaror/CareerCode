'use client';

import { PhoneFrame } from './PhoneFrame';
import { Robot } from './Robot';
import { SplashStars } from './SplashStars';

export type LevelChoice = 'beginner' | 'intermediate' | 'advanced';

interface Option {
  id: LevelChoice;
  emoji: string;
  title: string;
  desc: string;
  color: string;
}

const OPTIONS: Option[] = [
  { id: 'beginner', emoji: '🌱', title: 'מתחיל', desc: 'מילים בסיסיות, תרגומים קלים', color: '#34d399' },
  { id: 'intermediate', emoji: '🚀', title: 'ביניים', desc: 'משפטים, זמנים, שיחה', color: '#fbbf24' },
  { id: 'advanced', emoji: '🎓', title: 'מתקדם', desc: 'Idioms, דקדוק מורכב', color: '#ec4899' },
];

export function SplashScreen({ onStart }: { onStart: (level: LevelChoice) => void }) {
  return (
    <PhoneFrame>
      <div className="relative flex h-[100dvh] flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#080818] to-[#0d1b2a] px-7 pb-9 pt-12 sm:h-[844px] sm:rounded-[52px]">
        <SplashStars />

        <div className="z-10 mt-5 text-center">
          <Robot mood="happy" talking={false} listening={false} size={140} />
          <div className="mt-4 text-[11px] font-bold tracking-[4px] text-violet-400">AI ENGLISH TEACHER</div>
          <div className="text-[40px] font-black leading-none -tracking-wider text-white">RoboTeach</div>
          <div className="mt-1.5 text-sm font-semibold text-indigo-500">🎙️ מדבר · 🤖 חושב · ⚡ מאתגר</div>
        </div>

        <div className="z-10 w-full">
          <div className="mb-2.5 text-center text-[13px] font-bold tracking-widest text-slate-400">בחר רמה</div>
          <div className="flex flex-col gap-2.5">
            {OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => onStart(opt.id)}
                className="flex items-center gap-3.5 rounded-2xl border px-4 py-3.5 text-right transition-transform hover:-translate-y-0.5"
                style={{
                  background: `linear-gradient(135deg, ${opt.color}22, ${opt.color}11)`,
                  borderColor: `${opt.color}44`,
                }}
              >
                <div className="text-[28px]">{opt.emoji}</div>
                <div className="flex-1">
                  <div className="text-base font-extrabold text-white">{opt.title}</div>
                  <div className="mt-0.5 text-xs text-slate-400">{opt.desc}</div>
                </div>
                <div className="text-xl" style={{ color: opt.color }}>→</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </PhoneFrame>
  );
}
