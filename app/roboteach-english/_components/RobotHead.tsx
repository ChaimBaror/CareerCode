'use client';

import type { Mood } from '../_lib/prompt';

// Antenna + head shell + eyes + mouth + ears.
export function RobotHead({ mood, talking, color: c }: { mood: Mood; talking: boolean; color: string }) {
  return (
    <>
      <line x1="50" y1="2" x2="50" y2="18" stroke="#6366f1" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="50" cy="4" r="4.5" fill={c}>
        <animate attributeName="opacity" values="1;0.3;1" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="50" cy="4" r="8" fill={c} opacity="0.3">
        <animate attributeName="r" values="8;12;8" dur="1.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="1.5s" repeatCount="indefinite" />
      </circle>

      <rect x="14" y="18" width="72" height="60" rx="16" fill={`url(#body-${mood})`} stroke="#4f46e5" strokeWidth="1.5" />
      <rect x="20" y="24" width="60" height="48" rx="12" fill={`url(#screen-${mood})`} />

      <circle cx="36" cy="44" r="10" fill="#050510" />
      <circle cx="64" cy="44" r="10" fill="#050510" />
      {[36, 64].map((cx) => (
        <circle key={cx} cx={cx} cy="44" r="7" fill={`url(#eye-${mood})`} style={{ transition: 'fill 0.4s' }}>
          {mood === 'thinking' && (
            <animateTransform attributeName="transform" type="translate" values="0 0;2 -2;0 0;-2 -2;0 0" dur="1.5s" repeatCount="indefinite" />
          )}
        </circle>
      ))}

      {talking ? (
        <rect x="32" y="58" width="36" height="8" rx="3" fill={c}>
          <animate attributeName="height" values="8;14;6;12;8" dur="0.3s" repeatCount="indefinite" />
          <animate attributeName="y" values="58;55;60;56;58" dur="0.3s" repeatCount="indefinite" />
        </rect>
      ) : mood === 'happy' || mood === 'celebrate' ? (
        <path d="M 30 58 Q 50 72 70 58" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : mood === 'sad' ? (
        <path d="M 30 66 Q 50 54 70 66" stroke={c} strokeWidth="3" fill="none" strokeLinecap="round" />
      ) : (
        <line x1="32" y1="62" x2="68" y2="62" stroke={c} strokeWidth="3" strokeLinecap="round" />
      )}

      <rect x="6" y="32" width="9" height="20" rx="3" fill="#312e81" stroke="#4f46e5" strokeWidth="1" />
      <circle cx="10.5" cy="36" r="1.5" fill={c} />
      <rect x="85" y="32" width="9" height="20" rx="3" fill="#312e81" stroke="#4f46e5" strokeWidth="1" />
      <circle cx="89.5" cy="36" r="1.5" fill={c} />
    </>
  );
}
