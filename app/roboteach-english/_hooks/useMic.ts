'use client';

import { useCallback, useRef, useState } from 'react';
import { SR } from '../_lib/recognition';
import type { SpeechRecognitionLike } from '../_lib/recognition';
import { SFX } from '../_lib/sfx';
import { stopSpeaking } from '../_lib/speech';

interface Options {
  onFinalText: (text: string) => void;
  disabled?: boolean;
}

export function useMic({ onFinalText, disabled }: Options) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recogRef = useRef<SpeechRecognitionLike | null>(null);
  const supported = Boolean(SR);

  const start = useCallback(() => {
    if (!SR || listening || disabled) return;
    try {
      stopSpeaking();
      const r = new SR();
      recogRef.current = r;
      r.lang = 'en-US';
      r.interimResults = true;
      r.continuous = false;
      r.onstart = () => { setListening(true); SFX.listen(); };
      r.onresult = (e) => {
        let fin = '';
        let int = '';
        for (let i = 0; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) fin += res[0].transcript;
          else int += res[0].transcript;
        }
        setTranscript(fin || int);
        if (fin) onFinalText(fin);
      };
      r.onend = () => setListening(false);
      r.onerror = () => setListening(false);
      r.start();
    } catch {
      setListening(false);
    }
  }, [listening, disabled, onFinalText]);

  const stop = useCallback(() => {
    try { recogRef.current?.stop(); } catch { /* ignore */ }
    setListening(false);
  }, []);

  const clearTranscript = useCallback(() => setTranscript(''), []);

  return { listening, transcript, supported, start, stop, clearTranscript };
}
