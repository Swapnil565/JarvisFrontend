"use client";

import { motion } from 'framer-motion';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
  isDismissible?: boolean;
  onDismiss?: () => void;
}

export default function ErrorMessage({ 
  message, 
  onRetry, 
  isDismissible = false,
  onDismiss 
}: ErrorMessageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card p-6 border-2 border-red-500/30"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">⚠️</span>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-white mb-1">
            Something went wrong
          </h3>
          <p className="text-sm text-jarvis-soft-gray">
            {message}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-4 px-4 py-2 rounded-lg bg-jarvis-electric-cyan/20 
                text-jarvis-electric-cyan text-sm font-medium hover:bg-jarvis-electric-cyan/30 
                transition-colors"
            >
              Try again
            </button>
          )}
        </div>
        {isDismissible && onDismiss && (
          <button
            onClick={onDismiss}
            className="text-jarvis-soft-gray hover:text-white transition-colors"
            aria-label="Dismiss"
          >
            ✕
          </button>
        )}
      </div>
    </motion.div>
  );
}
