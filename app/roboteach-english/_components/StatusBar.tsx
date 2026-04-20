'use client';

// Fake iOS status bar — only visible inside the desktop phone-frame (≥sm).
// Hidden on mobile where the real OS status bar already exists.
export function StatusBar() {
  return (
    <div className="relative hidden justify-between px-7 pt-3.5 text-sm font-semibold text-white sm:flex">
      <span>9:41</span>
      <div className="absolute left-1/2 top-0 h-8 w-[110px] -translate-x-1/2 rounded-[18px] bg-black" />
      <span className="text-xs">🔋</span>
    </div>
  );
}
