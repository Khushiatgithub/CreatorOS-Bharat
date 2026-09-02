'use client';

import React from 'react';
import { LucideIcon, Sparkles } from 'lucide-react';
import { RippleButton } from '@/components/ui/motion';
import { motion } from 'framer-motion';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  badge?: string;
  className?: string;
}

export default function PremiumEmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
  badge = 'Ready to Launch',
  className = ''
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={`rounded-[24px] border border-dashed border-white/[0.12] bg-[#0A0E1A]/60 p-8 sm:p-12 text-center flex flex-col items-center justify-center relative overflow-hidden group ${className}`}
    >
      {/* Background ambient mesh glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-royal-600/10 blur-[80px] pointer-events-none rounded-full" />

      {/* Ambient glowing icon ring */}
      <div className="relative mb-4 flex h-16 w-16 items-center justify-center rounded-[20px] bg-gradient-to-b from-royal-600/20 to-royal-600/5 border border-royal-500/30 text-royal-400 shadow-royal-sm group-hover:scale-105 transition-transform duration-300">
        <Icon className="h-8 w-8" />
        <div className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-royal-600 text-white shadow-sm">
          <Sparkles className="h-2.5 w-2.5" />
        </div>
      </div>

      {badge && (
        <span className="rounded-full bg-royal-600/15 border border-royal-500/30 px-3 py-0.5 text-[10px] font-bold text-royal-300 font-mono uppercase tracking-wider mb-2">
          {badge}
        </span>
      )}

      <h3 className="font-display text-lg sm:text-xl font-bold text-white max-w-sm">
        {title}
      </h3>
      
      <p className="text-xs sm:text-sm text-slate-400 max-w-md mt-1.5 leading-relaxed">
        {description}
      </p>

      {actionLabel && onAction && (
        <div className="mt-6">
          <RippleButton
            onClick={onAction}
            className="rounded-[16px] bg-royal-600 hover:bg-royal-500 px-6 py-2.5 text-xs font-bold text-white shadow-royal"
          >
            <span>{actionLabel}</span>
          </RippleButton>
        </div>
      )}
    </motion.div>
  );
}
