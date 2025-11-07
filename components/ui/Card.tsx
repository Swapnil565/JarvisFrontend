'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { motionTransition } from '../../lib/motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  onClick,
}) => {
  const cardClass = glow ? 'glass-glow' : 'glass-card';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
  transition={motionTransition}
      className={`${cardClass} ${onClick ? 'cursor-pointer hover:scale-[1.04] transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};
