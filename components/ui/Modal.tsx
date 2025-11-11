'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { motionTransition } from '../../lib/motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={motionTransition}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="glass-glow max-w-lg w-full max-h-[90vh] overflow-y-auto focus:outline-none"
              tabIndex={-1}
            >
              {title && (
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-jarvis-gray/20">
                  <h2 className="heading-lg">{title}</h2>
                  <button
                    onClick={onClose}
                    className="text-jarvis-gray hover:text-jarvis-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1 rounded-md"
                    aria-label="Close modal"
                  >
                    <span aria-hidden className="text-2xl">✖️</span>
                  </button>
                </div>
              )}
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
