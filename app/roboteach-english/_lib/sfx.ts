type AudioCtxCtor = typeof AudioContext;

let audioCtx: AudioContext | null = null;

export function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const Ctor =
    window.AudioContext ??
    (window as unknown as { webkitAudioContext?: AudioCtxCtor }).webkitAudioContext;
  if (!Ctor) return null;
  if (!audioCtx) audioCtx = new Ctor();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

interface Tone {
  freq: number;
  start: number;
  dur: number;
  vol?: number;
  type?: OscillatorType;
}

function playTones(tones: Tone[]) {
  try {
    const ctx = getCtx();
    if (!ctx) return;
    tones.forEach(({ freq, start, dur, vol = 0.15, type = 'sine' }) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, ctx.currentTime + start);
      g.gain.setValueAtTime(vol, ctx.currentTime + start);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      o.connect(g);
      g.connect(ctx.destination);
      o.start(ctx.currentTime + start);
      o.stop(ctx.currentTime + start + dur);
    });
  } catch {
    // SFX are best-effort — ignore audio errors
  }
}

export const SFX = {
  correct: () =>
    playTones([
      { freq: 523, start: 0, dur: 0.12 },
      { freq: 659, start: 0.08, dur: 0.12 },
      { freq: 784, start: 0.16, dur: 0.2, vol: 0.2 },
    ]),
  wrong: () =>
    playTones([
      { freq: 220, start: 0, dur: 0.15, type: 'square', vol: 0.1 },
      { freq: 185, start: 0.12, dur: 0.25, type: 'square', vol: 0.1 },
    ]),
  levelUp: () =>
    playTones([
      { freq: 523, start: 0, dur: 0.1 },
      { freq: 659, start: 0.08, dur: 0.1 },
      { freq: 784, start: 0.16, dur: 0.1 },
      { freq: 1047, start: 0.24, dur: 0.3, vol: 0.25 },
    ]),
  send: () => playTones([{ freq: 880, start: 0, dur: 0.08, vol: 0.1 }]),
  listen: () =>
    playTones([
      { freq: 440, start: 0, dur: 0.05, vol: 0.1 },
      { freq: 880, start: 0.06, dur: 0.08, vol: 0.1 },
    ]),
  achieve: () =>
    playTones([
      { freq: 659, start: 0, dur: 0.1 },
      { freq: 784, start: 0.08, dur: 0.1 },
      { freq: 988, start: 0.16, dur: 0.1 },
      { freq: 1319, start: 0.24, dur: 0.25, vol: 0.2 },
    ]),
};
