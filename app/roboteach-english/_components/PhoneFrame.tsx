'use client';

import type { ReactNode } from 'react';

// On phones: fills the viewport.
// On ≥sm (640px+): renders the iPhone-style bezel with a fixed 390×844 canvas.
export function PhoneFrame({ children, withButtons = false }: { children: ReactNode; withButtons?: boolean }) {
  return (
    <div className="flex min-h-[100dvh] items-stretch justify-center bg-gradient-to-br from-[#080818] via-[#130a26] to-[#0a1628] font-sans sm:items-center sm:p-5">
      <div className="relative w-full bg-black sm:w-[390px] sm:rounded-[55px] sm:px-[3px] sm:shadow-[0_0_0_1px_#333,0_0_0_3px_#111,0_30px_80px_#000d,inset_0_0_0_2px_#3a3a3a]">
        {withButtons && <SideButtons />}
        {children}
      </div>
    </div>
  );
}

function SideButtons() {
  return (
    <div className="hidden sm:block">
      {[140, 200, 260].map((t) => (
        <div
          key={t}
          className="absolute -left-1 h-9 w-1 rounded-l-[2px] bg-[#333]"
          style={{ top: t }}
        />
      ))}
      <div className="absolute -right-1 top-40 h-16 w-1 rounded-r-[2px] bg-[#333]" />
    </div>
  );
}
