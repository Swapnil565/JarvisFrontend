'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { motionTransition, hoverSpring, tapSpring } from '@/lib/motion';
import { copy } from '@/lib/copy';

const moods = [
  { emoji: '😊', label: 'Great', value: 5, description: "I'm crushing it" },
  { emoji: '🙂', label: 'Good', value: 4, description: 'Feeling solid' },
  { emoji: '😐', label: 'Okay', value: 3, description: 'Just okay' },
  { emoji: '😕', label: 'Meh', value: 2, description: 'Not great' },
  { emoji: '😢', label: 'Rough', value: 1, description: 'Struggling today' }
];

interface MorningMoodFlowProps {
  onComplete: (data: { mood: number; notes?: string }) => void;
  onSkip: () => void;
}

export const MorningMoodFlow: React.FC<MorningMoodFlowProps> = ({
  onComplete,
  onSkip
}) => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [notes, setNotes] = useState('');
  const [step, setStep] = useState<'mood' | 'notes'>('mood');

  const handleMoodSelect = (value: number) => {
    setSelectedMood(value);
    setTimeout(() => {
      setStep('notes');
    }, 300);
  };

  const handleSubmit = () => {
    if (selectedMood !== null) {
      onComplete({ mood: selectedMood, notes: notes || undefined });
    }
  };

  const handleSkipNotes = () => {
    if (selectedMood !== null) {
      onComplete({ mood: selectedMood });
    }
  };

  return (
    <div className="max-w-2xl mx-auto breathing-room">
      <AnimatePresence mode="wait">
        {step === 'mood' && (
          <motion.div
            key="mood"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={motionTransition}
          >
            <div className="text-center mb-8">
              <h1 className="heading-xl mb-3">{copy.morning.greeting}</h1>
              <p className="text-body-lg">{copy.morning.prompt}</p>
            </div>

            <div className="grid grid-cols-5 gap-4 mb-6">
              {moods.map((mood, index) => (
                <motion.button
                  key={mood.value}
                  onClick={() => handleMoodSelect(mood.value)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ...motionTransition, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5, transition: hoverSpring }}
                  whileTap={{ scale: 0.95, transition: tapSpring }}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                    selectedMood === mood.value
                      ? 'bg-jarvis-cyan/20 ring-2 ring-jarvis-cyan'
                      : 'bg-jarvis-navy-light/40 hover:bg-jarvis-navy-light/60'
                  }`}
                >
                  <span className="text-4xl">{mood.emoji}</span>
                  <span className="text-xs font-medium">{mood.label}</span>
                  <span className="text-[11px] text-jarvis-gray text-center">{mood.description}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex justify-center">
              <button
                onClick={onSkip}
                className="text-sm text-jarvis-gray hover:text-jarvis-cyan transition-colors"
              >
                {copy.morning.skipForNow}
              </button>
            </div>
          </motion.div>
        )}

        {step === 'notes' && (
          <motion.div
            key="notes"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-6xl mb-4"
              >
                {moods.find(m => m.value === selectedMood)?.emoji}
              </motion.div>
              <h2 className="heading-md mb-3">{copy.morning.wantContext}</h2>
              <p className="text-body">{copy.morning.optionalHelps}</p>
            </div>

            <Card className="mb-6">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={copy.morning.notesPlaceholder}
                className="w-full bg-transparent border-none text-white placeholder:text-jarvis-gray focus:outline-none resize-none"
                rows={4}
                autoFocus
              />
            </Card>

            <div className="flex gap-4">
              <Button onClick={() => setStep('mood')} variant="ghost" className="flex-1">
                {copy.morning.back}
              </Button>
              <Button onClick={handleSkipNotes} variant="secondary" className="flex-1">
                {copy.morning.skip}
              </Button>
              <Button onClick={handleSubmit} variant="primary" className="flex-1">
                {copy.morning.done}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
