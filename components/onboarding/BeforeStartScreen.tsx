"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const BeforeStartScreen: React.FC<{ onNext: (data?: any) => void; onBack: () => void }> = ({ onNext, onBack }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="glass-card p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-white mb-3">Before we start...</h2>
      <p className="text-sm text-jarvis-soft-gray mb-4">
        JARVIS learns from YOUR patterns — not averages, not other people's data. For the next 7 days, just log a couple of quick things:
      </p>

      <ul className="text-sm text-jarvis-soft-gray list-disc list-inside space-y-1 mb-6">
        <li>Workouts (10 seconds)</li>
        <li>Tasks when you complete them</li>
        <li>Meditation: yes/no</li>
      </ul>

      <p className="text-sm text-jarvis-soft-gray mb-6">
        By Day 7 I'll show you patterns you can't see yourself. No integrations required — you can always add them later to speed things up.
      </p>

      <div className="flex gap-3">
        <button
          onClick={() => onNext()}
          className="px-4 py-3 rounded-lg bg-jarvis-electric-cyan text-jarvis-deep-navy font-medium"
        >
          Let's go
        </button>

        <button
          onClick={() => onNext({ skippedIntegration: true })}
          className="px-4 py-3 rounded-lg bg-jarvis-deep-navy/50 text-jarvis-soft-gray font-medium border border-jarvis-soft-gray/10"
        >
          Skip — I'll log manually
        </button>
      </div>

      <div className="mt-4 text-xs text-jarvis-soft-gray">
        <button onClick={() => onNext({ openIntegrations: true })} className="underline">Want to connect accounts? (optional)</button>
      </div>

      <div className="mt-6 text-xs text-jarvis-soft-gray">
        <button onClick={onBack} className="text-sm text-jarvis-soft-gray hover:text-white">← Back</button>
      </div>
    </motion.div>
  );
};
