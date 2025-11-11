'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui';
import { Card } from '@/components/ui';
import { OnboardingData } from './OnboardingFlow';

interface QuestionOption {
  label: string;
  value: string;
  rationale?: string;
}

interface QuestionScreenProps {
  question: string;
  subtitle: string;
  options: QuestionOption[];
  dataKey: keyof OnboardingData;
  onNext: (data: Partial<OnboardingData>) => void;
  onBack: () => void;
  autoAdvance?: boolean;
  questionIndex?: number;
  totalQuestions?: number;
}

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  subtitle,
  options,
  dataKey,
  onNext,
  onBack
  ,autoAdvance = true
  ,questionIndex = 0
  ,totalQuestions = 0
}) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [rationale, setRationale] = useState<string>('');

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    const opt = options.find(o => o.value === value);
    setRationale(opt?.rationale || '');
    // Auto-advance after a short delay for smooth UX
    if (autoAdvance) {
      setTimeout(() => {
        onNext({ [dataKey]: value });
      }, 300);
    }
  };

  return (
    <div className="breathing-room">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-6"
      >
        {totalQuestions > 0 && (
          <div className="mb-3 max-w-md mx-auto">
            <div className="h-2 bg-white/6 rounded-full overflow-hidden">
              <div
                  className="h-full bg-jarvis-cyan progress-fill"
                  style={{ ['--w' as any]: `${((questionIndex + 1) / Math.max(1, totalQuestions)) * 100}%` }}
                  aria-hidden
                />
            </div>
            <div className="text-xs text-jarvis-soft-gray mt-2">Question {questionIndex + 1} of {totalQuestions}</div>
          </div>
        )}

        <h1 className="heading-xl mb-3">{question}</h1>
        <p className="text-jarvis-gray text-lg">{subtitle}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-8"
      >
        {options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            <Card
              onClick={() => handleSelect(option.value)}
              className={`cursor-pointer transition-all duration-200 ${
                selectedValue === option.value
                  ? 'ring-2 ring-jarvis-cyan bg-jarvis-cyan/10'
                  : 'hover:bg-white/5'
              }`}
            >
              <div className="text-center py-2">
                <p className="text-lg font-medium">{option.label}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {rationale && (
        <div role="status" aria-live="polite" className="text-center text-sm text-jarvis-soft-gray mb-4">{rationale}</div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex justify-center"
      >
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
      </motion.div>
    </div>
  );
};
