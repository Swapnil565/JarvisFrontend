'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { copy } from '@/lib/copy';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  return (
    <div className="breathing-room">
      <div className="glass-card p-8 max-w-2xl mx-auto text-center space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.35 }}
      >
  <h1 className="heading-lg mb-2">{copy.onboarding.welcomeHeadline}</h1>
  <p className="text-body max-w-lg mx-auto mb-8">{copy.onboarding.welcomeSub}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.28 }}
      >
        <Button onClick={onNext} variant="primary" className="px-6 py-3">
          {copy.onboarding.startButton}
        </Button>
      </motion.div>
      </div>
    </div>
  );
};
