'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="text-center breathing-room">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
      >
  <h1 className="heading-lg mb-2">Hey — I’m JARVIS. I got your back.</h1>
  <p className="text-sm text-jarvis-gray max-w-lg mx-auto mb-6">Quick setup: tell me a few things and I’ll spot patterns between your training, work, and recovery.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
      >
        <Button onClick={onNext} variant="primary" className="px-6 py-2">
          Start
        </Button>
      </motion.div>
    </div>
  );
};
