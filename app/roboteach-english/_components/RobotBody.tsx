'use client';

import type { Mood } from '../_lib/prompt';

// Body + chest visualizer + arms.
export function RobotBody({ mood, talking, color: c }: { mood: Mood; talking: boolean; color: string }) {
  return (
    <>
      <rect x="18" y="80" width="64" height="46" rx="14" fill={`url(#body-${mood})`} stroke="#4f46e5" strokeWidth="1.5" />
      <rect x="26" y="88" width="48" height="30" rx="8" fill="#0a0a1a" stroke="#312e81" strokeWidth="1" />

      {talking
        ? [0, 1, 2, 3, 4].map((i) => (
            <rect key={i} x={30 + i * 8} y="98" width="5" height="10" rx="1" fill={c}>
              <animate attributeName="height" values="4;16;8;14;6" dur={`${0.3 + i * 0.08}s`} repeatCount="indefinite" />
              <animate attributeName="y" values="104;96;100;97;103" dur={`${0.3 + i * 0.08}s`} repeatCount="indefinite" />
            </rect>
          ))
        : [0, 1, 2].map((i) => (
            <rect key={i} x="32" y={94 + i * 7} width={22 + (i % 2) * 10} height="3" rx="1.5" fill={c} opacity="0.6">
              <animate
                attributeName="width"
                values={`${22 + i * 4};${14 + i * 4};${22 + i * 4}`}
                dur={`${1.5 + i * 0.4}s`}
                repeatCount="indefinite"
              />
            </rect>
          ))}

      <rect x="2" y="84" width="18" height="9" rx="4" fill="#312e81" stroke="#4f46e5" strokeWidth="1">
        {mood === 'celebrate' && (
          <animateTransform attributeName="transform" type="rotate" values="0 11 88;-30 11 88;0 11 88" dur="0.5s" repeatCount="indefinite" />
        )}
      </rect>
      <rect x="80" y="84" width="18" height="9" rx="4" fill="#312e81" stroke="#4f46e5" strokeWidth="1">
        {mood === 'celebrate' && (
          <animateTransform attributeName="transform" type="rotate" values="0 89 88;30 89 88;0 89 88" dur="0.5s" repeatCount="indefinite" />
        )}
      </rect>
    </>
  );
}
