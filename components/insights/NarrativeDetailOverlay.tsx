'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUp, fadeIn } from '@/lib/animations';
import { copy } from '@/lib/copy';
import { NarrativeInsight } from '@/components/insights/NarrativeCard';

interface NarrativeDetailOverlayProps {
  insight: NarrativeInsight | null;
  onClose: () => void;
}

export const NarrativeDetailOverlay: React.FC<NarrativeDetailOverlayProps> = ({ insight, onClose }) => {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  // Close on ESC
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    if (insight) {
      document.addEventListener('keydown', handleKeyDown);
      // initial focus
      closeBtnRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [insight, handleKeyDown]);

  // Focus trap: cycle tab within overlay
  useEffect(() => {
    if (!insight) return;
    const node = contentRef.current;
    if (!node) return;
    const getFocusable = () => Array.from(node.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )).filter(el => !el.hasAttribute('disabled'));
    const keyHandler = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusable = getFocusable();
        if (focusable.length === 0) return;
        const index = focusable.indexOf(document.activeElement as HTMLElement);
        if (e.shiftKey) {
          if (index <= 0) {
            e.preventDefault();
            focusable[focusable.length - 1].focus();
          }
        } else {
          if (index === focusable.length - 1) {
            e.preventDefault();
            focusable[0].focus();
          }
        }
      }
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [insight]);

  if (!insight) return null;

  return (
    <AnimatePresence>
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={`Narrative insight: ${insight.title}`}>        
        {/* Backdrop */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Content */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative glass-glow max-w-4xl w-full max-h-[90vh] overflow-y-auto focus:outline-none p-8"
          onClick={(e) => e.stopPropagation()}
          ref={contentRef}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-8 pb-8 border-b border-jarvis-gray/20">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-jarvis-deep-navy/60 flex items-center justify-center text-2xl">
                <span aria-hidden>{insight.emoji}</span>
              </div>
              <div>
                <h2 className="heading-lg">{insight.title}</h2>
                <p className="text-xs text-jarvis-gray mt-1">{insight.daySpan}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-jarvis-gray hover:text-jarvis-cyan transition-colors p-2 text-xl focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1 rounded-md"
              aria-label="Close"
              ref={closeBtnRef}
            >
              <span aria-hidden>✖️</span>
            </button>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Narrative summary */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h3 className="heading-sm mb-4 flex items-center gap-2">
                  <span>🧾</span> Summary
                </h3>
                <p className="text-body leading-relaxed">{insight.summary}</p>
              </div>

              {insight.highlight && (
                <div>
                  <h3 className="heading-sm mb-4 flex items-center gap-2">
                    <span>✨</span> Key highlight
                  </h3>
                  <p className="text-xs text-jarvis-electric-cyan/90">{insight.highlight}</p>
                </div>
              )}
            </div>

            {/* Context and trend */}
            <div className="space-y-6">
              {insight.trendEmoji && insight.trendLabel && (
                <div className="p-4 rounded-xl bg-jarvis-deep-navy/50 border border-jarvis-soft-gray/20 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span>{insight.trendEmoji}</span>
                    <span className="text-jarvis-soft-gray">{insight.trendLabel}</span>
                  </div>
                  <p className="text-[11px] text-jarvis-soft-gray">
                    This is a high-level direction based on your recent logs and behavior.
                  </p>
                </div>
              )}

              <div className="p-4 rounded-xl bg-jarvis-electric-cyan/5 border border-jarvis-electric-cyan/20 space-y-2">
                <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                  <span>💡</span> What this might mean
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-jarvis-soft-gray">
                  <li>There is a repeating pattern across the specified days.</li>
                  <li>Small behavior changes could shift this trend positively.</li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-jarvis-amber/5 border border-jarvis-amber/20 space-y-2">
                <h4 className="text-xs font-semibold mb-2 flex items-center gap-2">
                  <span>🛠️</span> Suggested next steps
                </h4>
                <ul className="list-disc list-inside space-y-1 text-xs text-jarvis-soft-gray">
                  <li>Experiment with a 10–15 minute wind-down on higher stress days.</li>
                  <li>Protect one morning deep-work block on meeting-heavy days.</li>
                </ul>
              </div>

              {/* Related patterns (mock) */}
              <div className="mt-8 p-4 rounded-xl bg-jarvis-deep-navy/40 border border-jarvis-soft-gray/20 space-y-2">
                <h4 className="text-xs font-semibold mb-3 flex items-center gap-2">
                  <span>🔗</span> Related patterns
                </h4>
                <ul className="space-y-2 text-[11px]">
                  <li className="flex items-center gap-2">
                    <span className="text-jarvis-cyan">→</span>
                    <span className="text-jarvis-soft-gray">Afternoon focus dip after multi-meeting mornings</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-jarvis-cyan">→</span>
                    <span className="text-jarvis-soft-gray">Sleep variance on stressful work days</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-jarvis-cyan">→</span>
                    <span className="text-jarvis-soft-gray">Energy lift on training mornings</span>
                  </li>
                </ul>
                <button
                  className="mt-4 text-jarvis-cyan text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 rounded"
                  onClick={onClose}
                >
                  View all patterns →
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-jarvis-gray/20">
            <div className="flex items-center justify-between">
              <p className="text-xs text-jarvis-gray">{copy.insights.narrativeFooter}</p>
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-jarvis-cyan/10 hover:bg-jarvis-cyan/20 text-jarvis-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1"
              >
                {copy.insights.gotIt}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
