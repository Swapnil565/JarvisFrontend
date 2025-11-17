"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Container, PageLayout, Button } from '@/components/ui';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ErrorMessage from '@/components/ui/ErrorMessage';
import LoadingSkeleton from '@/components/ui/LoadingSkeleton';
import { DimensionCard } from '@/components/dashboard/DimensionCard';
import { StreakCounter } from '@/components/dashboard/StreakCounter';
import { QuickMoodCheck } from '@/components/dashboard/QuickMoodCheck';
import { useAPI } from '@/hooks/useAPI';
import { dashboardAPI, loggingAPI } from '@/lib/api';

export const Dashboard: React.FC = () => {
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const router = useRouter();

  // Fetch dashboard data with loading/error states
  const { data: dashboardData, loading, error, refetch } = useAPI(
    () => dashboardAPI.getDashboardData(),
    true // fetch immediately
  );

  const handleMoodSelect = async (mood: number) => {
    try {
      await loggingAPI.submitLog({
        type: 'quick_log',
        timestamp: new Date().toISOString(),
        data: { mood, context: 'quick_check' },
      });
      // Refetch dashboard data after logging
      refetch();
    } catch (error) {
      console.error('Failed to submit mood:', error);
    }
  };

  const handleLogSomething = () => {
    window.location.href = '/log';
  };

  // Loading state
  if (loading) {
    return (
      <PageLayout>
        <Container size="lg" className="py-8">
          <div className="mb-8">
            <LoadingSkeleton variant="text" className="w-48 h-8 mb-2" />
            <LoadingSkeleton variant="text" className="w-32 h-4" />
          </div>
          <LoadingSkeleton variant="card" className="mb-8 h-24" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
            <LoadingSkeleton variant="card" />
          </div>
        </Container>
      </PageLayout>
    );
  }

  // Error state
  if (error) {
    return (
      <PageLayout>
        <Container size="lg" className="py-8">
          <ErrorMessage 
            message={error} 
            onRetry={refetch}
          />
        </Container>
      </PageLayout>
    );
  }

  // No data state (shouldn't happen, but handle gracefully)
  if (!dashboardData) {
    return (
      <PageLayout>
        <Container size="lg" className="py-8">
          <LoadingSpinner message="Loading your dashboard..." />
        </Container>
      </PageLayout>
    );
  }

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
                onClick={() => router.push('/progress')}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="View Progress"
              >
                <span className="text-2xl">📈</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/insights')}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="View Insights"
              >
                <span className="text-2xl">📊</span>
                {dashboardData.hasNewInsights && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-jarvis-electric-cyan rounded-full" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/interventions')}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors relative"
                title="Interventions"
              >
                <span className="text-2xl">🔔</span>
                {dashboardData.hasActiveInterventions && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-jarvis-amber rounded-full border-2 border-jarvis-navy" />
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => router.push('/settings')}
                className="text-jarvis-gray hover:text-jarvis-cyan transition-colors"
                title="Settings"
              >
                <span className="text-2xl">⚙️</span>
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
          <StreakCounter 
            currentStreak={dashboardData.currentStreak} 
            longestStreak={dashboardData.longestStreak} 
          />
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
          {dashboardData.dimensions.map((dim) => (
            <DimensionCard
              key={dim.dimension}
              dimension={dim.dimension}
              status={dim.status}
              score={dim.score}
              insight={dim.insight}
              emoji={dim.dimension === 'physical' ? '💪' : dim.dimension === 'mental' ? '🧠' : '✨'}
            />
          ))}
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
