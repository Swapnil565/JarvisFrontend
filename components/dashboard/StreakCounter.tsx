'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Flame } from 'lucide-react';
import { motionTransition } from '../../lib/motion';

interface StreakCounterProps {
  currentStreak: number;
  longestStreak: number;
}

export const StreakCounter: React.FC<StreakCounterProps> = ({
  currentStreak,
  longestStreak
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={motionTransition}
      className="text-center py-6"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3
          }}
        >
          <Flame size={48} className="text-orange-500" />
        </motion.div>
        <span className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-jarvis-amber to-jarvis-cyan">
          {currentStreak}
        </span>
      </div>
      
      <p className="text-jarvis-gray text-sm mb-1">
        day streak
      </p>
      
      {longestStreak > currentStreak && (
        <p className="text-jarvis-gray/60 text-xs">
          Best: {longestStreak} days
        </p>
      )}
    </motion.div>
  );
};
