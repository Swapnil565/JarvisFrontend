 'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionTransition } from '@/lib/motion';
import { Pattern } from '@/types/pattern';

interface PatternDetailOverlayProps {
  pattern: Pattern | null;
  onClose: () => void;
}

export const PatternDetailOverlay: React.FC<PatternDetailOverlayProps> = ({
  pattern,
  onClose
}) => {
  if (!pattern) return null;

  const dimensionConfig = {
    physical: {
      emoji: '💪',
      color: 'text-jarvis-cyan',
      bgGradient: 'from-jarvis-cyan/20 to-jarvis-cyan/5',
      ring: 'ring-jarvis-cyan/30'
    },
    mental: {
      emoji: '🧠',
      color: 'text-jarvis-amber',
      bgGradient: 'from-jarvis-amber/20 to-jarvis-amber/5',
      ring: 'ring-jarvis-amber/30'
    },
    spiritual: {
      emoji: '✨',
      color: 'text-jarvis-green',
      bgGradient: 'from-jarvis-green/20 to-jarvis-green/5',
      ring: 'ring-jarvis-green/30'
    }
  };

  const config = dimensionConfig[pattern.dimension];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={motionTransition}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={motionTransition}
          className="relative glass-glow max-w-5xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6 pb-6 border-b border-jarvis-gray/20">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{config.emoji}</span>
              <div>
                <h2 className={`heading-lg ${config.color}`}>{pattern.title}</h2>
                <p className="text-sm text-jarvis-gray mt-1">
                  {pattern.confidence}% confidence • Discovered{' '}
                  {new Date(pattern.discovered).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-jarvis-gray hover:text-jarvis-cyan transition-colors p-2 text-xl"
              aria-label="Close"
            >
              <span aria-hidden>✖️</span>
            </button>
          </div>

          {/* Three columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Column 1: Pattern */}
            <div className="space-y-4">
              <div>
                <h3 className="heading-sm mb-3 flex items-center gap-2">
                  <span>🔍</span> The Pattern
                </h3>
                <p className="text-jarvis-gray leading-relaxed">{pattern.pattern}</p>
              </div>
            </div>

            {/* Column 2: Evidence */}
            <div className="space-y-4">
              <div>
                <h3 className="heading-sm mb-3 flex items-center gap-2">
                  <span>📊</span> Evidence
                </h3>
                <div className="space-y-3">
                  {pattern.evidence.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...motionTransition, delay: index * 0.05 }}
                      className="flex items-start gap-2"
                    >
                      <span className={`${config.color} mt-1`}>→</span>
                      <p className="text-sm text-jarvis-gray">{item}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 3: Why It Matters */}
            <div className="space-y-4">
              <div>
                <h3 className="heading-sm mb-3 flex items-center gap-2">
                  <span>💡</span> Why It Matters
                </h3>
                <p className="text-jarvis-gray leading-relaxed mb-4">
                  {pattern.whyItMatters}
                </p>

                {pattern.suggestion && (
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${config.bgGradient} border border-${pattern.dimension === 'physical' ? 'jarvis-cyan' : pattern.dimension === 'mental' ? 'jarvis-amber' : 'jarvis-green'}/20`}>
                    <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                      <span>💪</span> What to do
                    </h4>
                    <p className="text-sm text-jarvis-gray">{pattern.suggestion}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer action */}
          <div className="mt-8 pt-6 border-t border-jarvis-gray/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-jarvis-gray">
                I'll keep monitoring this pattern and update you as it evolves
              </p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-jarvis-cyan/10 hover:bg-jarvis-cyan/20 text-jarvis-cyan transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
