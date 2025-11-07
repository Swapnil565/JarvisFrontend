'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';

interface PrivacyScreenProps {
  onNext: () => void;
  onBack: () => void;
}

export const PrivacyScreen: React.FC<PrivacyScreenProps> = ({ onNext, onBack }) => {
  return (
    <div className="breathing-room text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="mb-4"
      >
        <h2 className="heading-md mb-1">Privacy — quick note</h2>
        <p className="text-sm text-jarvis-gray">Your data stays yours. Delete anytime from Settings.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.28 }} className="space-y-3 mb-6">
        <Card className="p-3 text-left">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🔒</div>
            <div>
              <p className="font-medium text-white">Encrypted & private</p>
              <p className="text-xs text-jarvis-gray">We don’t sell your data or train external models on it.</p>
            </div>
          </div>
        </Card>

        <Card className="p-3 text-left">
          <div className="flex items-start gap-3">
            <div className="text-2xl">🗑️</div>
            <div>
              <p className="font-medium text-white">Delete anytime</p>
              <p className="text-xs text-jarvis-gray">One button removes everything.</p>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.44 }} className="flex gap-3 justify-center">
        <Button onClick={onBack} variant="ghost" className="px-4 py-2">Back</Button>
        <Button onClick={onNext} variant="primary" className="px-5 py-2">Sounds good</Button>
      </motion.div>
    </div>
  );
};
