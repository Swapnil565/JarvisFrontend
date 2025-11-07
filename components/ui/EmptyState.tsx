"use client";

import { motion } from 'framer-motion';

interface EmptyStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  emoji?: string;
}

export default function EmptyState({ title, description, actionLabel, onAction, emoji = '✨' }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="glass-card p-8 text-center"
    >
      <div className="text-5xl mb-4">{emoji}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      {description && <p className="text-sm text-jarvis-soft-gray mb-4">{description}</p>}
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-4 py-2 rounded-lg bg-jarvis-electric-cyan text-jarvis-deep-navy font-medium"
        >
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
}
