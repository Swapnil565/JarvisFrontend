'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { Target, MessageCircle, Sunrise, Sun, Smile, Meh, Frown, CloudRain, LucideIcon, Moon } from 'lucide-react';

interface ReflectionQuestion {
  id: string;
  question: string;
  placeholder: string;
  icon: LucideIcon;
}

const reflectionQuestions: ReflectionQuestion[] = [
  {
    id: 'wins',
    question: 'What went well today?',
    placeholder: 'Even small wins count...',
    icon: Target
  },
  {
    id: 'challenges',
    question: 'What was challenging?',
    placeholder: 'What drained your energy?',
    icon: MessageCircle
  },
  {
    id: 'tomorrow',
    question: 'What would make tomorrow better?',
    placeholder: 'One thing you could adjust...',
    icon: Sunrise
  }
];

interface EndOfDayFlowProps {
  onComplete: (data: Record<string, string>) => void;
  onSkip: () => void;
}

export const EndOfDayFlow: React.FC<EndOfDayFlowProps> = ({
  onComplete,
  onSkip
}) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [overallMood, setOverallMood] = useState<number | null>(null);

  const moods: { icon: LucideIcon; label: string; value: number; color: string }[] = [
    { icon: Sun, label: 'Great day', value: 5, color: 'text-jarvis-cyan' },
    { icon: Smile, label: 'Good day', value: 4, color: 'text-jarvis-green' },
    { icon: Meh, label: 'Okay day', value: 3, color: 'text-jarvis-amber' },
    { icon: Frown, label: 'Tough day', value: 2, color: 'text-orange-400' },
    { icon: CloudRain, label: 'Hard day', value: 1, color: 'text-red-400' }
  ];

  const handleAnswerChange = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = () => {
    if (overallMood !== null) {
      onComplete({
        ...answers,
        overallMood: overallMood.toString()
      });
    }
  };

  const isValid = overallMood !== null;
  const hasAnyReflection = Object.values(answers).some(a => a.trim().length > 0);

  return (
    <div className="max-w-3xl mx-auto breathing-room">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Moon size={32} className="text-jarvis-cyan" />
            <h1 className="heading-xl">End of day reflection</h1>
          </div>
          <p className="text-jarvis-gray text-lg">
            Take a moment to check in. All fields are optional.
          </p>
        </div>

        {/* Overall mood */}
        <Card className="mb-6">
          <h3 className="heading-sm mb-4">How was your day overall?</h3>
          <div className="flex justify-between gap-3">
            {moods.map((mood, index) => (
              <motion.button
                key={mood.value}
                onClick={() => setOverallMood(mood.value)}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl transition-all flex-1 ${
                  overallMood === mood.value
                    ? 'bg-jarvis-cyan/20 ring-2 ring-jarvis-cyan'
                    : 'bg-jarvis-navy-light/40 hover:bg-jarvis-navy-light/60'
                }`}
              >
                <mood.icon size={32} className={mood.color} />
                <span className="text-xs text-center">{mood.label}</span>
              </motion.button>
            ))}
          </div>
        </Card>

        {/* Reflection questions */}
        <div className="space-y-6 mb-8">
          {reflectionQuestions.map((q, index) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <Card>
                <h3 className="heading-sm mb-3 flex items-center gap-2">
                  <q.icon size={18} className="text-jarvis-cyan" />
                  {q.question}
                </h3>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  placeholder={q.placeholder}
                  className="w-full bg-jarvis-navy-light/40 rounded-xl p-3 border border-jarvis-cyan/20 text-white placeholder:text-jarvis-gray focus:outline-none focus:border-jarvis-cyan focus:ring-2 focus:ring-jarvis-cyan/20 transition-all resize-none"
                  rows={3}
                />
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex gap-4"
        >
          <Button onClick={onSkip} variant="ghost" className="flex-1">
            Skip tonight
          </Button>
          <Button
            onClick={handleSubmit}
            variant="primary"
            className="flex-1"
            disabled={!isValid}
          >
            {hasAnyReflection ? "Save reflection" : "Just save mood"}
          </Button>
        </motion.div>

        {!isValid && (
          <p className="text-center text-sm text-jarvis-gray/60 mt-4">
            Select a mood to continue
          </p>
        )}
      </motion.div>
    </div>
  );
};
