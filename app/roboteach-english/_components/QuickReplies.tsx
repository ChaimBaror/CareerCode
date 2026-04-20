'use client';

const SUGGESTIONS = ['💡 רמז', '🔄 שאלה אחרת', '📚 הסבר'];

export function QuickReplies({ onPick }: { onPick: (text: string) => void }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto px-3.5 pb-1.5">
      {SUGGESTIONS.map((q) => (
        <button
          key={q}
          onClick={() => onPick(q)}
          className="whitespace-nowrap rounded-2xl border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-violet-400"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
