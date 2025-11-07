"use client";

import { motion } from 'framer-motion';
import { HistoricalPattern } from '@/types/progress';

interface HistoricalPatternsListProps {
  patterns: HistoricalPattern[];
}

const dimensionConfig = {
  physical: { emoji: '💪', color: '#34D399' },
  mental: { emoji: '🧠', color: '#00D9FF' },
  spiritual: { emoji: '✨', color: '#FFB020' },
};

export default function HistoricalPatternsList({ patterns }: HistoricalPatternsListProps) {
  if (patterns.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-jarvis-soft-gray text-sm">
          No patterns discovered yet. Keep logging to build your history.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {patterns.map((pattern, index) => {
        const config = dimensionConfig[pattern.dimension];
        const daysAgo = Math.floor(
          (Date.now() - new Date(pattern.discoveredDate).getTime()) / (1000 * 60 * 60 * 24)
        );

        return (
          <motion.div
            key={pattern.id}
            className="glass-card p-4 hover:scale-[1.01] transition-transform cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{config.emoji}</span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-white mb-1">
                  {pattern.title}
                </h4>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-jarvis-soft-gray">
                    {daysAgo === 0 ? 'Today' : `${daysAgo}d ago`}
                  </span>
                  {pattern.wasActedOn ? (
                    <span className="text-xs px-2 py-0.5 rounded bg-jarvis-muted-green/20 text-jarvis-muted-green">
                      ✓ Acted on
                    </span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 rounded bg-jarvis-soft-gray/10 text-jarvis-soft-gray">
                      Observed
                    </span>
                  )}
                </div>
                {pattern.outcome && (
                  <p className="text-xs text-jarvis-soft-gray mt-2">
                    💬 {pattern.outcome}
                  </p>
                )}
              </div>
              
              {/* View arrow */}
              <span className="text-jarvis-soft-gray text-sm">→</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
