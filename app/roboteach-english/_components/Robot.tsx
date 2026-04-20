'use client';

import type { Mood } from '../_lib/prompt';
import { MOOD_COLORS } from '../_lib/robotStyle';
import { ListeningRings, TalkingParticles } from './RobotEffects';
import { RobotHead } from './RobotHead';
import { RobotBody } from './RobotBody';

interface RobotProps {
  mood: Mood;
  talking: boolean;
  listening: boolean;
  size?: number;
}

export function Robot({ mood, talking, listening, size = 110 }: RobotProps) {
  const c = MOOD_COLORS[mood];

  return (
    <div style={{ position: 'relative', width: size, height: size * 1.2 }}>
      {listening && <ListeningRings size={size} />}
      {talking && <TalkingParticles color={c} />}

      <svg
        width={size}
        height={size * 1.2}
        viewBox="0 0 100 130"
        style={{ filter: `drop-shadow(0 6px 20px ${c}66)`, transition: 'filter 0.5s' }}
      >
        <defs>
          <linearGradient id={`body-${mood}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#312e81" />
            <stop offset="100%" stopColor="#1e1b4b" />
          </linearGradient>
          <linearGradient id={`screen-${mood}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0a0a1a" />
            <stop offset="100%" stopColor="#1a0f2e" />
          </linearGradient>
          <radialGradient id={`eye-${mood}`}>
            <stop offset="0%" stopColor="#fff" stopOpacity="0.9" />
            <stop offset="40%" stopColor={c} />
            <stop offset="100%" stopColor={c} stopOpacity="0.6" />
          </radialGradient>
        </defs>

        <RobotHead mood={mood} talking={talking} color={c} />
        <RobotBody mood={mood} talking={talking} color={c} />
      </svg>
    </div>
  );
}
