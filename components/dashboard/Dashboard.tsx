'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, PageLayout, Button } from '@/components/ui';
import { DimensionCard } from '@/components/dashboard/DimensionCard';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { QuickMoodCheck } from '@/components/dashboard/QuickMoodCheck';

export const Dashboard: React.FC = () => {
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [hasInterventions, setHasInterventions] = useState(true); // Mock - will come from API in Phase 9

  // Mock data - will be replaced with real data from API in Phase 9
  const dimensionsData = {
    physical: {
      status: 'good' as const,
      score: 7.5,
      insight: 'Workouts consistent. Recovery could be better.',
      emoji: '💪'
    },
    mental: {
      status: 'warning' as const,
      score: 6.0,
      insight: 'Focus is slipping. Consider reducing context switching.',
      emoji: '🧠'
    },
    spiritual: {
      status: 'great' as const,
      score: 8.5,
      insight: 'Great balance. Keep prioritizing what matters.',
      emoji: '✨'
    }
  };

  const handleMoodSelect = (mood: number) => {
    console.log('Mood selected:', mood);
    // TODO: Send to API in Phase 9
  };

  const handleLogSomething = () => {
    window.location.href = '/log';
  };

  return (
    <PageLayout>
      <Container size="lg" className="py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="heading-lg">Welcome back</h1>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/progress'}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="View Progress"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/insights'}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="View Insights"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/interventions'}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="Interventions"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {hasInterventions && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-jarvis-amber rounded-full border-2 border-jarvis-navy" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/settings'}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors"
                title="Settings"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
          <p className="text-jarvis-gray">Here's where you stand today</p>
        </motion.div>

        {/* Streak Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <StreakCounter currentStreak={12} longestStreak={28} />
        </motion.div>

        {/* Quick Mood Check */}
        {showMoodCheck && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <QuickMoodCheck onMoodSelect={handleMoodSelect} />
          </motion.div>
        )}

        {/* Dimension Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <DimensionCard
            dimension="physical"
            status={dimensionsData.physical.status}
            score={dimensionsData.physical.score}
            insight={dimensionsData.physical.insight}
            emoji={dimensionsData.physical.emoji}
          />
          <DimensionCard
            dimension="mental"
            status={dimensionsData.mental.status}
            score={dimensionsData.mental.score}
            insight={dimensionsData.mental.insight}
            emoji={dimensionsData.mental.emoji}
          />
          <DimensionCard
            dimension="spiritual"
            status={dimensionsData.spiritual.status}
            score={dimensionsData.spiritual.score}
            insight={dimensionsData.spiritual.insight}
            emoji={dimensionsData.spiritual.emoji}
          />
        </motion.div>

        {/* Primary CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <Button onClick={handleLogSomething} variant="primary" className="w-full md:w-auto px-12 py-4 text-lg">
            Log something
          </Button>
          
          {!showMoodCheck && (
            <button
              onClick={() => setShowMoodCheck(true)}
              className="text-sm text-jarvis-gray hover:text-jarvis-cyan transition-colors"
            >
              or quick mood check
            </button>
          )}
        </motion.div>

        {/* Bottom spacing */}
        <div className="h-8" />
      </Container>
    </PageLayout>
  );
};
