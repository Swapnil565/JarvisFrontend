'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motionTransition } from '../../lib/motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  ...rest
}) => {
  const cardClass = glow ? 'glass-glow' : 'glass-card';
  const clickable = !!(rest as React.HTMLAttributes<HTMLDivElement>).onClick;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTransition}
      className={`${cardClass} ${clickable ? 'cursor-pointer hover:scale-[1.04] transition-transform focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1' : ''} ${className}`}
      {...(clickable
        ? {
            role: (rest as any).role || 'button',
            tabIndex: (rest as any).tabIndex ?? 0,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const fn = (rest as any).onClick as (() => void) | undefined;
                fn && fn();
              }
              // Forward any provided onKeyDown
              (rest as any).onKeyDown && (rest as any).onKeyDown(e);
            },
            ...rest,
          }
        : rest as any)}
    >
      {children}
    </motion.div>
  );
};
