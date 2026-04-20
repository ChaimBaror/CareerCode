'use client';

import { useEffect, useRef } from 'react';
import { TypingDots } from './TypingDots';
import { stopSpeaking } from '../_lib/speech';
import type { ChatMsg } from '../_hooks/useRoboTeach';

interface Props {
  msgs: ChatMsg[];
  busy: boolean;
  voiceOn: boolean;
  onReplay: (text: string) => void;
}

const RobotAvatar = () => (
  <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-indigo-950 text-[13px]">🤖</div>
);

export function ChatMessages({ msgs, busy, voiceOn, onReplay }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [msgs, busy]);

  return (
    <div className="flex flex-1 flex-col gap-2.5 overflow-y-auto px-3.5 pb-1.5 pt-3.5">
      {msgs.map((m, i) => {
        const isUser = m.role === 'user';
        const bubble = isUser
          ? 'rounded-[18px_18px_4px_18px] bg-gradient-to-br from-violet-600 to-indigo-700 shadow-[0_2px_8px_rgba(124,58,237,0.3)]'
          : 'rounded-[18px_18px_18px_4px] border border-white/10 bg-white/5';
        return (
          <div
            key={i}
            className={'flex items-end gap-2 [animation:rt-fadeIn_0.3s_ease] ' + (isUser ? 'justify-end' : 'justify-start')}
          >
            {!isUser && <RobotAvatar />}
            <div className={'max-w-[78%] whitespace-pre-wrap px-3.5 py-2.5 text-sm leading-relaxed text-[#f0f0f8] ' + bubble}>
              {m.content}
              {!isUser && voiceOn && (
                <button
                  onClick={() => {
                    stopSpeaking();
                    onReplay(m.content);
                  }}
                  className="mt-1.5 block text-[11px] font-semibold text-indigo-500"
                >
                  🔊 שמע שוב
                </button>
              )}
            </div>
          </div>
        );
      })}
      {busy && (
        <div className="flex items-end gap-2">
          <RobotAvatar />
          <div className="rounded-[18px_18px_18px_4px] border border-white/10 bg-white/5">
            <TypingDots />
          </div>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
