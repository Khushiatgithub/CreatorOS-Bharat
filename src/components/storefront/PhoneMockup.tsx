'use client';

import React from 'react';
import { Smartphone, Wifi, Battery, Signal } from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
}

export default function PhoneMockup({ children }: PhoneMockupProps) {
  return (
    <div className="relative mx-auto w-[360px] sm:w-[390px] h-[740px] rounded-[44px] border-[8px] border-[#161B2E] bg-[#05070B] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.1)] overflow-hidden flex flex-col ring-1 ring-royal-500/20">
      
      {/* Titanium Bezel Top & Dynamic Island */}
      <div className="relative z-30 h-7 w-full bg-[#161B2E] flex items-center justify-between px-7 shrink-0 text-white select-none">
        <span className="text-[10px] font-bold tracking-tight text-slate-300">9:41</span>
        
        {/* Dynamic Island pill */}
        <div className="h-3.5 w-20 rounded-full bg-black flex items-center justify-end px-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-royal-500 ring-1 ring-royal-400/40" />
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <Signal className="h-2.5 w-2.5" />
          <Wifi className="h-2.5 w-2.5" />
          <Battery className="h-3 w-3" />
        </div>
      </div>

      {/* Scrollable Phone Screen Content */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden no-scrollbar">
        {children}
      </div>

      {/* Bottom Home Indicator Bar */}
      <div className="h-4 w-full bg-[#161B2E] flex items-center justify-center shrink-0">
        <div className="h-1 w-28 rounded-full bg-white/30" />
      </div>

    </div>
  );
}
