'use client';

import { useMemo } from 'react';

interface Star {
  size: number;
  left: number;
  top: number;
  opacity: number;
  dur: number;
  delay: number;
}

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => ({
    size: 1 + Math.random() * 2,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: 0.4 + Math.random() * 0.5,
    dur: 2 + Math.random() * 3,
    delay: Math.random() * 2,
  }));
}

export function SplashStars() {
  const stars = useMemo(() => makeStars(20), []);
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {stars.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: s.size,
            height: s.size,
            background: '#a78bfa',
            borderRadius: '50%',
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
            animation: `rt-twinkle ${s.dur}s ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
