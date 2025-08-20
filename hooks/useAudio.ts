// hooks/useAudio.ts
import { useState, useEffect, useRef, useCallback } from 'react';

// Extend window type to support webkitAudioContext
declare global {
    interface Window {
        webkitAudioContext?: typeof AudioContext;
    }
}

// Sound effects using Web Audio API
const createBeepSound = (frequency: number, duration: number, type: 'sine' | 'square' | 'triangle' = 'sine'): void => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext!)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
        console.warn('Could not create beep sound:', error);
    }
};

const playQuestionSound = (): void => {
    const sounds = [
        () => createBeepSound(800, 0.1, 'sine'),
        () => createBeepSound(600, 0.15, 'triangle'),
        () => createBeepSound(1000, 0.1, 'square'),
        () => {
            createBeepSound(440, 0.2);
            setTimeout(() => createBeepSound(550, 0.2), 50);
            setTimeout(() => createBeepSound(660, 0.2), 100);
        },
        () => {
            createBeepSound(400, 0.05);
            setTimeout(() => createBeepSound(500, 0.05), 50);
            setTimeout(() => createBeepSound(600, 0.05), 100);
        }
    ];

    const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
    randomSound();
};

const playCorrectSound = (): void => {
    createBeepSound(523, 0.1);
    setTimeout(() => createBeepSound(659, 0.1), 100);
    setTimeout(() => createBeepSound(784, 0.2), 200);
};

const playIncorrectSound = (): void => {
    createBeepSound(400, 0.15, 'square');
    setTimeout(() => createBeepSound(300, 0.2, 'square'), 150);
};

export function useAudio(isHebrew: boolean) {
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [ttsEnabled, setTtsEnabled] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const audioContextRef = useRef<AudioContext | null>(null);
    const speechRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Initialize audio context
    useEffect(() => {
        try {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext!)();
        } catch (error) {
            console.warn('Web Audio API not supported', error);
        }

        if ('speechSynthesis' in window) {
            speechSynthesis.onvoiceschanged = () => {
                console.log('Speech synthesis voices loaded');
            };
        } else {
            console.warn('Speech synthesis not supported');
        }

        return () => {
            if (speechRef.current) {
                speechSynthesis.cancel();
            }
        };
    }, []);

    const speakText = (text: string, force: boolean = false): void => {
        if (!ttsEnabled && !force) return;

        if (!('speechSynthesis' in window)) {
            console.warn('Speech synthesis not supported');
            return;
        }

        speechSynthesis.cancel();
        setIsSpeaking(false);

        const utterance = new SpeechSynthesisUtterance(text);
        speechRef.current = utterance;

        utterance.rate = 0.8;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        if (isHebrew) {
            utterance.lang = 'he-IL';
        } else {
            utterance.lang = 'en-US';
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => {
            setIsSpeaking(false);
            console.warn('Speech synthesis error');
        };

        try {
            speechSynthesis.speak(utterance);
        } catch (error) {
            console.warn('Could not speak text:', error);
            setIsSpeaking(false);
        }
    };

    const stopSpeaking = (): void => {
        speechSynthesis.cancel();
        setIsSpeaking(false);
    };

    const speakQuestion = useCallback((questionText: string): void => {
        speakText(questionText, true);
    }, [ttsEnabled]);

    const toggleSound = (): void => {
        setSoundEnabled(!soundEnabled);
        if (!soundEnabled) {
            try {
                playQuestionSound();
            } catch (error) {
                console.warn('Could not play test sound:', error);
            }
        }
    };

    const toggleTTS = (): void => {
        if (isSpeaking) {
            stopSpeaking();
        }
        setTtsEnabled(!ttsEnabled);

        if (!ttsEnabled) {
            // Test TTS when enabling
            setTimeout(() => {
                speakText(isHebrew ? "קריינות הופעלה" : "Text-to-speech enabled");
            }, 100);
        }
    };

    const playAnswerSound = (isCorrect: boolean): void => {
        if (!soundEnabled) return;
        
        try {
            if (isCorrect) {
                playCorrectSound();
            } else {
                playIncorrectSound();
            }
        } catch (error) {
            console.warn('Could not play sound:', error);
        }
    };

    const playNewQuestionSound = (): void => {
        if (!soundEnabled) return;
        
        try {
            playQuestionSound();
        } catch (error) {
            console.warn('Could not play sound:', error);
        }
    };

    return {
        soundEnabled,
        setSoundEnabled,
        ttsEnabled,
        setTtsEnabled,
        isSpeaking,
        speakQuestion,
        speakText,
        stopSpeaking,
        toggleSound,
        toggleTTS,
        playAnswerSound,
        playNewQuestionSound
    };
}