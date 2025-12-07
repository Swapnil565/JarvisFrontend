'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { motionTransition } from '@/lib/motion';
import { 
  BatteryFull, 
  BatteryMedium, 
  BatteryLow, 
  BatteryWarning,
  Smile, 
  Meh, 
  Frown, 
  Moon, 
  Sun, 
  Zap, 
  Brain,
  LucideIcon
} from 'lucide-react';

interface Question {
  id: string;
  question: string;
  context: string;
  options: Array<{ label: string; value: string; icon: LucideIcon }>;
}

// Smart contextual questions based on time and patterns
const getContextualQuestions = (): Question[] => {
  const hour = new Date().getHours();
  
  if (hour < 12) {
    return [
      {
        id: 'energy',
        question: "How's your energy?",
        context: 'Just started the day',
        options: [
          { label: 'Fully charged', value: 'high', icon: BatteryFull },
          { label: 'Pretty good', value: 'medium', icon: BatteryMedium },
          { label: 'Still waking up', value: 'low', icon: BatteryLow },
          { label: 'Dragging', value: 'very-low', icon: BatteryWarning }
        ]
      },
      {
        id: 'sleep',
        question: 'How did you sleep?',
        context: 'Last night',
        options: [
          { label: 'Solid 7-9 hours', value: 'good', icon: Moon },
          { label: '6-7 hours, okay', value: 'okay', icon: Moon },
          { label: 'Less than 6 hours', value: 'poor', icon: Moon },
          { label: 'Restless/broken', value: 'restless', icon: Moon }
        ]
      }
    ];
  } else if (hour < 17) {
    return [
      {
        id: 'focus',
        question: "How's your focus been?",
        context: 'So far today',
        options: [
          { label: 'Laser focused', value: 'high', icon: Brain },
          { label: 'Getting things done', value: 'medium', icon: Brain },
          { label: 'Distracted', value: 'low', icon: Brain },
          { label: 'Brain fog', value: 'very-low', icon: Brain }
        ]
      }
    ];
  } else {
    return [
      {
        id: 'mood',
        question: "How was the day?",
        context: 'Wrapping up',
        options: [
          { label: 'Great day', value: 'great', icon: Smile },
          { label: 'Good', value: 'good', icon: Smile },
          { label: 'Meh / Okay', value: 'okay', icon: Meh },
          { label: 'Rough one', value: 'bad', icon: Frown }
        ]
      }
    ];
  }
};

interface QuickLogFlowProps {
  onComplete: (data: Record<string, string>) => void;
  onCancel: () => void;
}

export const QuickLogFlow: React.FC<QuickLogFlowProps> = ({
  onComplete,
  onCancel
}) => {
  const [questions] = useState<Question[]>(getContextualQuestions());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (isLastQuestion) {
        onComplete(newAnswers);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 300);
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else {
      onCancel();
    }
  };

  return (
    <div className="max-w-2xl mx-auto breathing-room">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-jarvis-gray">Quick check-in</span>
          <span className="text-sm text-jarvis-cyan font-medium">
            {currentQuestionIndex + 1} / {questions.length}
          </span>
        </div>
        <div className="h-1.5 bg-jarvis-navy-light rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ...motionTransition, duration: 0.3 }}
            className="h-full bg-gradient-to-r from-jarvis-cyan to-jarvis-amber"
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ ...motionTransition, duration: 0.2 }}
        >
          <div className="text-center mb-8">
            <p className="text-sm text-jarvis-gray mb-2">{currentQuestion.context}</p>
            <h2 className="heading-xl mb-6">{currentQuestion.question}</h2>
          </div>

          <div className="space-y-3 mb-8">
            {currentQuestion.options.map((option, index) => (
              <motion.div
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ ...motionTransition, delay: index * 0.05 }}
              >
                <Card
                  onClick={() => handleAnswer(option.value)}
                  className={`cursor-pointer transition-all ${
                    answers[currentQuestion.id] === option.value
                      ? 'ring-2 ring-jarvis-cyan bg-jarvis-cyan/10'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="text-center py-3 flex items-center justify-center gap-3">
                    <option.icon size={20} className={answers[currentQuestion.id] === option.value ? 'text-jarvis-cyan' : 'text-jarvis-gray'} />
                    <p className="text-lg font-medium">{option.label}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center">
            <Button onClick={handleBack} variant="ghost">
              {currentQuestionIndex === 0 ? 'Cancel' : 'Back'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
