'use client';

// Overlay effects: listening rings + talking particles.
export function ListeningRings({ size }: { size: number }) {
  return (
    <>
      {[1, 2, 3].map((r) => (
        <div
          key={r}
          style={{
            position: 'absolute',
            left: '50%',
            top: '45%',
            width: size * 0.6,
            height: size * 0.6,
            marginLeft: -(size * 0.3),
            marginTop: -(size * 0.3),
            borderRadius: '50%',
            border: '2px solid #34d399',
            animation: `rt-ring${r} ${1 + r * 0.3}s ease-out infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export function TalkingParticles({ color }: { color: string }) {
  return (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${50 + (i - 2) * 8}%`,
            top: '60%',
            width: 4,
            height: 4,
            borderRadius: '50%',
            background: color,
            opacity: 0.8,
            animation: `rt-particle 0.8s ${i * 0.1}s ease-out infinite`,
          }}
        />
      ))}
    </>
  );
}
