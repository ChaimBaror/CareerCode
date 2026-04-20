'use client';

import { useMemo } from 'react';

const COLORS = ['#7c3aed', '#ec4899', '#34d399', '#fbbf24', '#60a5fa'];

interface Piece {
  left: number;
  size: number;
  colorIdx: number;
  round: boolean;
  dur: number;
  delay: number;
  rot: number;
}

// Random values are frozen per mount so they don't re-roll on every render.
function makePieces(count: number): Piece[] {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    size: 8 + Math.random() * 6,
    colorIdx: i % COLORS.length,
    round: Math.random() > 0.5,
    dur: 2 + Math.random() * 2,
    delay: Math.random() * 0.5,
    rot: Math.random() * 360,
  }));
}

export function Confetti({ active }: { active: boolean }) {
  const pieces = useMemo(() => makePieces(40), []);
  if (!active) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 100 }}>
      {pieces.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '-10%',
            width: p.size,
            height: p.size,
            background: COLORS[p.colorIdx],
            borderRadius: p.round ? '50%' : '2px',
            animation: `rt-fall ${p.dur}s ${p.delay}s linear forwards`,
            transform: `rotate(${p.rot}deg)`,
          }}
        />
      ))}
    </div>
  );
}
