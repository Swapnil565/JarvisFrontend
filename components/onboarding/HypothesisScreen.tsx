'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button, Card } from '@/components/ui';
import { OnboardingData } from './OnboardingFlow';

interface HypothesisScreenProps {
  data: OnboardingData;
  onNext: () => void;
  onBack: () => void;
}

export const HypothesisScreen: React.FC<HypothesisScreenProps> = ({
  data,
  onNext,
  onBack
}) => {
  // Generate personalized hypothesis based on user inputs
  const generateHypothesis = () => {
    const isHighStress = data.stressLevel === 'high' || data.stressLevel === 'very-high';
    const isPoorSleep = data.sleepQuality === 'poor' || data.sleepQuality === 'inconsistent';
    const isHighWork = data.workIntensity === 'high' || data.workIntensity === 'very-high';
    const isFrequentLifter = data.liftingFrequency === '5-7' || data.liftingFrequency === '3-4';

    if (isHighStress && isPoorSleep && isFrequentLifter) {
      return {
        title: "You're training hard while your recovery tank is empty",
        insight: "Your body needs recovery to build strength, but high stress + poor sleep means you're not getting it. This combo is a fast track to overtraining and burnout.",
        watchFor: ["Workout performance dropping", "Feeling wired but tired", "Motivation to train declining"]
      };
    }

    if (isHighWork && isFrequentLifter && isPoorSleep) {
      return {
        title: "You're trying to perform at 100% in two demanding arenas",
        insight: "Both lifting and intense knowledge work require deep focus and recovery. Running both on poor sleep means neither gets what it needs.",
        watchFor: ["Decision fatigue by afternoon", "Workouts feeling harder than they should", "Sleep getting worse"]
      };
    }

    if (isHighStress && isHighWork) {
      return {
        title: "Your nervous system is in overdrive",
        insight: "High work intensity + high stress keeps you in fight-or-flight mode. Your body doesn't know the difference between a deadline and a bear chase.",
        watchFor: ["Can't wind down at night", "Irritability increasing", "Gym becoming another stressor"]
      };
    }

    // Default hypothesis
    return {
      title: "You're balancing a lot—let's find the patterns",
      insight: "Between training, work, and life, you're managing multiple demands on your energy. Small shifts in one area often ripple into others.",
      watchFor: ["Energy dips at specific times", "Recovery taking longer", "Stress showing up in unexpected places"]
    };
  };

  const hypothesis = generateHypothesis();

  return (
    <div className="breathing-room">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <div className="text-5xl mb-4">🎯</div>
        <h1 className="heading-lg mb-4">Here's my working hypothesis</h1>
        <p className="text-jarvis-gray">
          Based on what you told me, here's what I think we should watch for
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="space-y-6 mb-12"
      >
        <Card glow>
          <h2 className="heading-md text-jarvis-cyan mb-4">
            {hypothesis.title}
          </h2>
          <p className="text-jarvis-gray mb-6 leading-relaxed">
            {hypothesis.insight}
          </p>
          <div>
            <h3 className="heading-sm mb-3">What I'll watch for:</h3>
            <div className="space-y-2">
              {hypothesis.watchFor.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center gap-3 text-jarvis-gray"
                >
                  <span className="text-jarvis-cyan">→</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start gap-3">
            <div className="text-2xl">💡</div>
            <div className="text-sm text-jarvis-gray">
              <span className="font-medium text-white">This is just a starting point.</span>
              {' '}I'll refine this as I learn more about your patterns. 
              Think of it like a coach adjusting your program based on how you respond.
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 justify-center"
      >
        <Button onClick={onBack} variant="ghost">
          Back
        </Button>
        <Button onClick={onNext} variant="primary">
          Makes sense
        </Button>
      </motion.div>
    </div>
  );
};
