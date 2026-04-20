'use client';

import { useState } from 'react';
import { PhoneFrame } from './PhoneFrame';
import { StatusBar } from './StatusBar';
import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { QuickReplies } from './QuickReplies';
import { Transcript } from './Transcript';
import { Confetti } from './Confetti';
import { LevelUpToast } from './LevelUpToast';
import { AchievementToast } from './AchievementToast';
import { useMic } from '../_hooks/useMic';
import type { useRoboTeach } from '../_hooks/useRoboTeach';

type State = ReturnType<typeof useRoboTeach>;

interface ChatViewProps {
  state: State;
  onShowStats: () => void;
}

export function ChatView({ state, onShowStats }: ChatViewProps) {
  const [input, setInput] = useState('');
  const mic = useMic({
    onFinalText: setInput,
    disabled: state.busy,
  });

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    setInput('');
    mic.clearTranscript();
    state.send(text);
  };

  const sendPreset = (text: string) => state.send(text);

  return (
    <PhoneFrame withButtons>
      <Confetti active={state.showConfetti} />
      <div className="relative flex h-[100dvh] flex-col overflow-hidden bg-[#080818] sm:h-[844px] sm:rounded-[52px]">
        {state.levelUpShow && <LevelUpToast level={state.level} />}
        {state.newAchievement && <AchievementToast achievement={state.newAchievement} />}

        <StatusBar />
        <ChatHeader
          mood={state.mood}
          talking={state.talking}
          listening={mic.listening}
          voiceOn={state.voiceOn}
          level={state.level}
          xp={state.xp}
          streak={state.streak}
          difficulty={state.difficulty}
          onToggleVoice={state.toggleVoice}
          onShowStats={onShowStats}
        />
        <ChatMessages
          msgs={state.msgs}
          busy={state.busy}
          voiceOn={state.voiceOn}
          onReplay={state.robotSay}
        />
        <Transcript text={mic.transcript} />

        {!state.busy && state.msgs.length > 0 && !input && (
          <QuickReplies onPick={sendPreset} />
        )}

        <ChatInput
          value={input}
          onChange={setInput}
          onSubmit={submit}
          busy={state.busy}
          listening={mic.listening}
          micSupported={mic.supported}
          micStart={mic.start}
          micStop={mic.stop}
        />
      </div>
    </PhoneFrame>
  );
}
