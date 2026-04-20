'use client';

export function Transcript({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="mx-3.5 mb-1.5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-2 text-[13px] font-medium text-emerald-400">
      🎙️ {text}
    </div>
  );
}
