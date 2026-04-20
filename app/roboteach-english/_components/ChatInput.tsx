'use client';

import { useRef, useEffect } from 'react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  onSubmit: () => void;
  busy: boolean;
  listening: boolean;
  micSupported: boolean;
  micStart: () => void;
  micStop: () => void;
}

const CIRCLE_BTN = 'flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full text-lg transition-all';

export function ChatInput(p: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!p.busy) setTimeout(() => inputRef.current?.focus(), 150);
  }, [p.busy]);

  const canSubmit = p.value.trim().length > 0 && !p.busy;

  return (
    <div className="border-t border-white/5 bg-black/30 px-3.5 pb-[max(env(safe-area-inset-bottom),0.75rem)] pt-2 sm:pb-8">
      <div className="flex items-center gap-2">
        {p.micSupported && (
          <button
            onPointerDown={p.micStart}
            onPointerUp={p.micStop}
            onPointerLeave={p.micStop}
            className={
              CIRCLE_BTN +
              ' ' +
              (p.listening
                ? 'scale-105 border-2 border-emerald-400 bg-gradient-to-br from-emerald-600 to-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.6)]'
                : 'border border-[#222] bg-white/5')
            }
          >
            🎙️
          </button>
        )}
        <input
          ref={inputRef}
          value={p.value}
          onChange={(e) => p.onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              p.onSubmit();
            }
          }}
          placeholder={p.listening ? 'מקשיב...' : 'כתוב או דבר...'}
          disabled={p.busy}
          className="flex-1 rounded-[22px] border border-white/10 bg-white/5 px-4 py-3 text-sm text-[#f0f0f8] outline-none"
        />
        <button
          onClick={p.onSubmit}
          disabled={!canSubmit}
          className={
            CIRCLE_BTN +
            ' text-[19px] text-white ' +
            (canSubmit
              ? 'bg-gradient-to-br from-violet-600 to-pink-500 shadow-[0_4px_16px_rgba(124,58,237,0.5)]'
              : 'cursor-default bg-white/5')
          }
        >
          ➤
        </button>
      </div>
    </div>
  );
}
