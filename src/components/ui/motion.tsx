'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

import { formatINR, formatINRDecimal } from '@/lib/gst';

/**
 * 1. Animated Number Counter with Easing
 */
interface AnimatedCounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}

export function AnimatedCounter({
  value,
  duration = 1.2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = ''
}: AnimatedCounterProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-20px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const step = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      
      const current = easedProgress * value;
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [value, duration, isInView]);

  const formatted = decimals > 0
    ? formatINRDecimal(displayValue, decimals)
    : formatINR(displayValue);

  return (
    <span ref={ref} className={className}>
      {prefix}{formatted}{suffix}
    </span>
  );
}

/**
 * 2. Button with Ripple Effect & Spring Feedback
 */
interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export function RippleButton({ children, className = '', onClick, ...props }: RippleButtonProps) {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now();

    setRipples((prev) => [...prev, { x, y, id }]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 600);

    if (onClick) onClick(e);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`relative overflow-hidden ${className}`}
      onClick={handleRipple}
      {...(props as any)}
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          className="absolute rounded-full bg-white/25 pointer-events-none animate-ripple"
          style={{
            left: r.x,
            top: r.y,
            transform: 'translate(-50%, -50%)',
            width: 120,
            height: 120
          }}
        />
      ))}
      <span className="relative z-10 flex items-center justify-center gap-1.5 w-full">
        {children}
      </span>
    </motion.button>
  );
}

/**
 * 3. Hover Lift Card with Glass Glow
 */
interface HoverCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverY?: number;
}

export function HoverCard({
  children,
  className = '',
  onClick,
  hoverY = -4
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        y: hoverY,
        transition: { type: 'spring', stiffness: 350, damping: 22 }
      }}
      onClick={onClick}
      className={`transition-colors ${className}`}
    >
      {children}
    </motion.div>
  );
}

/**
 * 4. Fade-in on Scroll Section
 */
interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  className = ''
}: FadeInProps) {
  const getOffset = () => {
    switch (direction) {
      case 'up': return { y: 24, x: 0 };
      case 'down': return { y: -24, x: 0 };
      case 'left': return { x: 24, y: 0 };
      case 'right': return { x: -24, y: 0 };
      default: return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * 5. Skeleton Loading State with Shimmer Animation
 */
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-[14px] bg-white/[0.05] before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.8s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.08] before:to-transparent ${className}`}
    />
  );
}

/**
 * 6. Smooth Page Transition Wrapper
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
