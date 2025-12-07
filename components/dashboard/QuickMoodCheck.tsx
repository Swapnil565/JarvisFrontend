'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Laugh, Smile, Meh, Frown, CloudRain, Sparkles } from 'lucide-react';
import { motionTransition, hoverSpring, tapSpring } from '../../lib/motion';
import { Card } from '@/components/ui';

const moods = [
  { icon: Laugh, label: 'Great', value: 5, color: 'text-green-400' },
  { icon: Smile, label: 'Good', value: 4, color: 'text-jarvis-cyan' },
  { icon: Meh, label: 'Okay', value: 3, color: 'text-jarvis-amber' },
  { icon: Frown, label: 'Meh', value: 2, color: 'text-orange-400' },
  { icon: CloudRain, label: 'Rough', value: 1, color: 'text-red-400' }
];

interface QuickMoodCheckProps {
  onMoodSelect: (mood: number) => void;
}

export const QuickMoodCheck: React.FC<QuickMoodCheckProps> = ({ onMoodSelect }) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showThankYou, setShowThankYou] = useState(false);

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setShowThankYou(true);
    onMoodSelect(value);

    // Reset after animation
    setTimeout(() => {
      setShowThankYou(false);
      setSelectedMood(null);
    }, 2000);
  };

  return (
    <Card className="relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!showThankYou ? (
          <motion.div
            key="mood-selector"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={motionTransition}
          >
            <h3 className="heading-sm mb-4 text-center">How are you feeling?</h3>
            <div className="flex items-center justify-between gap-2">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTransition, delay: index * 0.05, hover: hoverSpring, tap: tapSpring }}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl transition-all ${
                    selectedMood === mood.value
                      ? 'bg-jarvis-cyan/20 ring-2 ring-jarvis-cyan'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <mood.icon size={32} className={mood.color} strokeWidth={1.5} />
                  <span className="text-xs text-jarvis-gray">{mood.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-center py-8"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5 }}
              className="flex justify-center mb-3"
            >
              <Sparkles size={48} className="text-jarvis-cyan" />
            </motion.div>
            <p className="text-jarvis-cyan font-medium">Got it, thanks!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
