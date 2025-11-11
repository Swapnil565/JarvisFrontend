'use client';

import React, { useState } from 'react';
import { motion, PanInfo, useAnimation } from 'framer-motion';
import { motionTransition, hoverSpring } from '@/lib/motion';
import { Card } from '@/components/ui';
import { Intervention } from '@/types/intervention';

interface InterventionCardProps {
  intervention: Intervention;
  onDismiss: (id: string) => void;
  onSnooze: (id: string, hours: number) => void;
  onAction?: (id: string, action: string) => void;
}

export const InterventionCard: React.FC<InterventionCardProps> = ({
  intervention,
  onDismiss,
  onSnooze,
  onAction
}) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const [showSnoozeOptions, setShowSnoozeOptions] = useState(false);
  const controls = useAnimation();

  const categoryConfig = {
    rest: { emoji: '😴', color: 'text-jarvis-cyan', label: 'Rest' },
    movement: { emoji: '🏃', color: 'text-jarvis-green', label: 'Movement' },
    social: { emoji: '💬', color: 'text-jarvis-amber', label: 'Social' },
    work: { emoji: '💼', color: 'text-jarvis-amber', label: 'Work' },
    general: { emoji: '💡', color: 'text-jarvis-cyan', label: 'General' }
  };

  const priorityConfig = {
    low: { label: 'Suggestion', color: 'text-jarvis-gray', bg: 'bg-jarvis-gray/10' },
    medium: { label: 'Heads up', color: 'text-jarvis-amber', bg: 'bg-jarvis-amber/10' },
    high: { label: 'Important', color: 'text-red-400', bg: 'bg-red-400/10' }
  };

  const config = categoryConfig[intervention.category];
  const priorityInfo = priorityConfig[intervention.priority];

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 150;
    
    if (Math.abs(info.offset.x) > swipeThreshold) {
      // Swipe to dismiss
      controls.start({
        x: info.offset.x > 0 ? 500 : -500,
        opacity: 0,
        transition: { ...motionTransition, duration: 0.3 }
      });
      setTimeout(() => onDismiss(intervention.id), 300);
    } else {
      // Snap back
      controls.start({ x: 0, transition: motionTransition });
    }
  };

  const snoozeOptions = [
    { label: '1 hour', hours: 1 },
    { label: '3 hours', hours: 3 },
    { label: 'Tomorrow', hours: 24 },
    { label: 'Next week', hours: 168 }
  ];

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={controls}
      className="relative"
    >
      <Card className="overflow-hidden">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{config.emoji}</span>
              <div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${priorityInfo.bg} ${priorityInfo.color}`}>
                  {priorityInfo.label}
                </span>
              </div>
            </div>
            <button
              onClick={() => onDismiss(intervention.id)}
              className="text-jarvis-gray hover:text-white transition-colors p-1"
              aria-label="Dismiss"
            >
              <span aria-hidden className="text-lg">✖️</span>
            </button>
          </div>

          {/* Title & Message */}
          <div>
            <h3 className={`heading-sm ${config.color} mb-2`}>{intervention.title}</h3>
            <p className="text-jarvis-gray leading-relaxed">{intervention.message}</p>
          </div>

          {/* Reasoning toggle */}
          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="text-sm text-jarvis-cyan hover:underline flex items-center gap-1"
          >
            {showReasoning ? '▼' : '▶'} Why am I seeing this?
          </button>

          {/* Reasoning expansion */}
                {showReasoning && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={motionTransition}
                    className="p-4 bg-jarvis-navy-light/40 rounded-xl border border-jarvis-cyan/20"
                  >
              <p className="text-sm text-jarvis-gray leading-relaxed">{intervention.reasoning}</p>
            </motion.div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => setShowSnoozeOptions(!showSnoozeOptions)}
              className="px-4 py-2 rounded-xl bg-jarvis-navy-light/40 hover:bg-jarvis-navy-light/60 text-jarvis-gray hover:text-white transition-all text-sm"
            >
              ⏰ Snooze
            </button>
            
            {onAction && (
              <button
                onClick={() => {
                  onAction(intervention.id, 'acknowledged');
                  onDismiss(intervention.id);
                }}
                className="px-4 py-2 rounded-xl bg-jarvis-cyan/10 hover:bg-jarvis-cyan/20 text-jarvis-cyan transition-all text-sm font-medium"
              >
                Got it 👍
              </button>
            )}

            <div className="ml-auto text-xs text-jarvis-gray">
              Swipe to dismiss →
            </div>
          </div>

          {/* Snooze options */}
          {showSnoozeOptions && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={motionTransition}
              className="grid grid-cols-2 gap-2 pt-2"
            >
              {snoozeOptions.map((option) => (
                <button
                  key={option.hours}
                  onClick={() => {
                    onSnooze(intervention.id, option.hours);
                    setShowSnoozeOptions(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-jarvis-navy-light/40 hover:bg-jarvis-navy-light/60 text-jarvis-gray hover:text-white transition-all text-sm"
                >
                  {option.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
