import { ensureVoicesSubscription, pickVoice, segment } from './voices';

interface SpeakOptions {
  onDone?: () => void;
}

export function speakText(text: string, { onDone }: SpeakOptions = {}): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) {
      onDone?.();
      resolve();
      return;
    }
    ensureVoicesSubscription();
    window.speechSynthesis.cancel();

    const segs = segment(text);
    if (!segs.length) {
      onDone?.();
      resolve();
      return;
    }

    let i = 0;
    const next = () => {
      if (i >= segs.length) {
        onDone?.();
        resolve();
        return;
      }
      const { text: t, lang } = segs[i++];
      const utt = new SpeechSynthesisUtterance(t);
      const v = pickVoice(lang);
      if (v) utt.voice = v;
      utt.lang = lang;
      utt.rate = lang === 'en-US' ? 0.88 : 1;
      utt.pitch = 1;
      utt.volume = 1;
      utt.onend = next;
      utt.onerror = next;
      window.speechSynthesis.speak(utt);
    };
    next();
  });
}

export function stopSpeaking() {
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
}
