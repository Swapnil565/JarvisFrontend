'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { InterventionCard } from './InterventionCard';
import { Intervention } from '@/types/intervention';

interface InterventionFeedProps {
  interventions: Intervention[];
  onDismiss: (id: string) => void;
  onSnooze: (id: string, hours: number) => void;
  onAction?: (id: string, action: string) => void;
}

export const InterventionFeed: React.FC<InterventionFeedProps> = ({
  interventions,
  onDismiss,
  onSnooze,
  onAction
}) => {
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set(prev).add(id));
    setTimeout(() => onDismiss(id), 300);
  };

  const activeInterventions = interventions.filter(
    i => !dismissedIds.has(i.id) && !i.dismissed
  );

  // Sort by priority: high -> medium -> low
  const sortedInterventions = [...activeInterventions].sort((a, b) => {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  if (sortedInterventions.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 flex flex-col items-center"
      >
        <div className="mb-4 text-jarvis-cyan">
          <Sparkles size={48} strokeWidth={1.5} />
        </div>
        <h3 className="heading-md mb-2">You're all caught up</h3>
        <p className="text-jarvis-gray">No interventions right now. Keep doing what you're doing!</p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {sortedInterventions.map((intervention, index) => (
          <motion.div
            key={intervention.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ delay: index * 0.05 }}
            layout
          >
            <InterventionCard
              intervention={intervention}
              onDismiss={handleDismiss}
              onSnooze={onSnooze}
              onAction={onAction}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
