let cachedVoices: SpeechSynthesisVoice[] = [];
let voicesSubscribed = false;

function refresh() {
  cachedVoices = window.speechSynthesis?.getVoices() ?? [];
}

export function ensureVoicesSubscription() {
  if (typeof window === 'undefined' || !window.speechSynthesis || voicesSubscribed) return;
  voicesSubscribed = true;
  window.speechSynthesis.addEventListener('voiceschanged', refresh);
  refresh();
}

export interface Segment {
  text: string;
  lang: 'he-IL' | 'en-US';
}

// Split text into Hebrew / English segments so each speaks with the right voice.
export function segment(text: string): Segment[] {
  const clean = text
    .replace(/[\u{1F000}-\u{1FFFF}]/gu, '')
    .replace(/\[.*?\]/g, '')
    .replace(/[✅❌🎙️🤖⭐🔥🔊🎯🏆⚡🚀💡]/g, '')
    .trim();
  if (!clean) return [];

  const segs: Segment[] = [];
  const re = /([\u0590-\u05FF][\u0590-\u05FF\s.,!?'"״'״-]*)|([A-Za-z][A-Za-z\s.,!?'"-]*)|([0-9]+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(clean)) !== null) {
    const t = m[0].trim();
    if (!t) continue;
    segs.push({ text: t, lang: m[1] ? 'he-IL' : 'en-US' });
  }
  return segs.length ? segs : [{ text: clean, lang: 'en-US' }];
}

export function pickVoice(lang: 'he-IL' | 'en-US'): SpeechSynthesisVoice | null {
  if (lang === 'he-IL') {
    return cachedVoices.find((v) => v.lang.startsWith('he')) ?? null;
  }
  return (
    cachedVoices.find((v) => v.lang.startsWith('en') && /samantha|daniel|karen|google/i.test(v.name)) ??
    cachedVoices.find((v) => v.lang.startsWith('en')) ??
    null
  );
}
