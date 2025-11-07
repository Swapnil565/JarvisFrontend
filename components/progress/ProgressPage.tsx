"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import TrendChart from './TrendChart';
import WeeklySummaryCard from './WeeklySummaryCard';
import HistoricalPatternsList from './HistoricalPatternsList';
import { TimeRange, TrendData, WeeklySummary, HistoricalPattern } from '@/types/progress';

export default function ProgressPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [activeTab, setActiveTab] = useState<'trends' | 'summaries' | 'patterns'>('trends');

  // Mock trend data - last 30 days
  const generateMockDataPoints = (dimension: 'physical' | 'mental' | 'spiritual') => {
    const points = [];
    const baseValues = { physical: 7, mental: 6.5, spiritual: 6 };
    const base = baseValues[dimension];
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const randomVariation = (Math.random() - 0.5) * 2;
      const trendEffect = (dimension === 'physical' ? 0.02 : dimension === 'mental' ? -0.01 : 0.015) * (30 - i);
      const value = Math.max(1, Math.min(10, base + randomVariation + trendEffect));
      points.push({
        date: date.toISOString(),
        value: parseFloat(value.toFixed(1)),
        dimension,
      });
    }
    return points;
  };

  const mockTrendData: TrendData[] = [
    {
      dimension: 'physical',
      dataPoints: generateMockDataPoints('physical'),
      currentScore: 7.8,
      weekChange: 5.2,
      monthChange: 12.3,
      trend: 'improving',
    },
    {
      dimension: 'mental',
      dataPoints: generateMockDataPoints('mental'),
      currentScore: 6.2,
      weekChange: -3.1,
      monthChange: -4.5,
      trend: 'declining',
    },
    {
      dimension: 'spiritual',
      dataPoints: generateMockDataPoints('spiritual'),
      currentScore: 6.9,
      weekChange: 1.2,
      monthChange: 8.7,
      trend: 'improving',
    },
  ];

  // Mock weekly summaries
  const mockWeeklySummaries: WeeklySummary[] = [
    {
      weekStart: '2025-10-20',
      weekEnd: '2025-10-26',
      physical: {
        average: 7.8,
        change: 0.5,
        highlight: 'Hit PRs on 2 lifts this week',
        lowlight: 'Skipped Friday workout',
      },
      mental: {
        average: 6.2,
        change: -0.8,
        highlight: 'Finished big project',
        lowlight: 'Felt overwhelmed Tue-Thu',
      },
      spiritual: {
        average: 6.9,
        change: 0.3,
        highlight: 'Meditated 5/7 days',
      },
      totalLogs: 12,
      streakMaintained: true,
    },
    {
      weekStart: '2025-10-13',
      weekEnd: '2025-10-19',
      physical: {
        average: 7.3,
        change: 0.2,
        highlight: 'Consistent sleep schedule',
        lowlight: 'Lower energy mid-week',
      },
      mental: {
        average: 7.0,
        change: 0.5,
        highlight: 'Good focus days Mon-Wed',
      },
      spiritual: {
        average: 6.6,
        change: -0.2,
        lowlight: 'Felt disconnected from purpose',
      },
      totalLogs: 10,
      streakMaintained: true,
    },
    {
      weekStart: '2025-10-06',
      weekEnd: '2025-10-12',
      physical: {
        average: 7.1,
        change: -0.3,
        highlight: 'Started new program',
        lowlight: 'Sore recovery days',
      },
      mental: {
        average: 6.5,
        change: -0.4,
        lowlight: 'Stressful week at work',
      },
      spiritual: {
        average: 6.8,
        change: 0.4,
        highlight: 'Reconnected with old friend',
      },
      totalLogs: 9,
      streakMaintained: false,
    },
  ];

  // Mock historical patterns
  const mockHistoricalPatterns: HistoricalPattern[] = [
    {
      id: '1',
      title: 'Best workouts after 7+ hours sleep',
      dimension: 'physical',
      discoveredDate: '2025-10-15',
      wasActedOn: true,
      outcome: 'Started prioritizing sleep. Hit 3 PRs in 2 weeks.',
    },
    {
      id: '2',
      title: 'Focus crashes 2-3 PM daily',
      dimension: 'mental',
      discoveredDate: '2025-10-08',
      wasActedOn: true,
      outcome: 'Blocked afternoon walks. Focus improved significantly.',
    },
    {
      id: '3',
      title: 'High stress → skipped workouts',
      dimension: 'physical',
      discoveredDate: '2025-10-01',
      wasActedOn: false,
    },
    {
      id: '4',
      title: 'Connection through movement',
      dimension: 'spiritual',
      discoveredDate: '2025-09-25',
      wasActedOn: true,
      outcome: 'Started gym with friend 2x/week. Feel more energized.',
    },
    {
      id: '5',
      title: 'Back-to-back meetings drain energy',
      dimension: 'mental',
      discoveredDate: '2025-09-18',
      wasActedOn: false,
    },
  ];

  const timeRangeButtons: { value: TimeRange; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'all', label: 'All Time' },
  ];

  const tabs = [
    { value: 'trends' as const, label: 'Trends', emoji: '📈' },
    { value: 'summaries' as const, label: 'Summaries', emoji: '📅' },
    { value: 'patterns' as const, label: 'Patterns', emoji: '🔍' },
  ];

  return (
    <div className="min-h-screen bg-jarvis-deep-navy pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-jarvis-deep-navy/80 backdrop-blur-xl border-b border-jarvis-soft-gray/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => window.history.back()}
                className="text-jarvis-soft-gray hover:text-white transition-colors mb-2"
              >
                ← Back
              </button>
              <h1 className="text-3xl font-bold text-white">Your Progress</h1>
              <p className="text-sm text-jarvis-soft-gray mt-1">
                Movement over time. No judgment, just awareness.
              </p>
            </div>

            {/* Time range selector */}
            <div className="flex gap-2 p-1 rounded-lg bg-jarvis-deep-navy/50">
              {timeRangeButtons.map((btn) => (
                <button
                  key={btn.value}
                  onClick={() => setTimeRange(btn.value)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    timeRange === btn.value
                      ? 'bg-jarvis-electric-cyan/20 text-jarvis-electric-cyan'
                      : 'text-jarvis-soft-gray hover:text-white'
                  }`}
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  activeTab === tab.value
                    ? 'bg-jarvis-electric-cyan/20 text-jarvis-electric-cyan'
                    : 'text-jarvis-soft-gray hover:text-white hover:bg-jarvis-deep-navy/50'
                }`}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Trends Tab */}
        {activeTab === 'trends' && (
          <div className="space-y-6">
            {mockTrendData.map((trend) => (
              <TrendChart
                key={trend.dimension}
                dimension={trend.dimension}
                dataPoints={trend.dataPoints}
                currentScore={trend.currentScore}
                trend={trend.trend}
              />
            ))}

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <motion.div
                className="glass-card p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="text-3xl font-bold text-jarvis-muted-green mb-1">
                  {mockTrendData[0].weekChange > 0 ? '+' : ''}{mockTrendData[0].weekChange.toFixed(1)}%
                </div>
                <div className="text-xs text-jarvis-soft-gray">
                  Physical (7d)
                </div>
              </motion.div>
              
              <motion.div
                className="glass-card p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <div className="text-3xl font-bold text-jarvis-electric-cyan mb-1">
                  {mockTrendData[1].weekChange > 0 ? '+' : ''}{mockTrendData[1].weekChange.toFixed(1)}%
                </div>
                <div className="text-xs text-jarvis-soft-gray">
                  Mental (7d)
                </div>
              </motion.div>
              
              <motion.div
                className="glass-card p-4 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="text-3xl font-bold text-jarvis-warm-amber mb-1">
                  {mockTrendData[2].weekChange > 0 ? '+' : ''}{mockTrendData[2].weekChange.toFixed(1)}%
                </div>
                <div className="text-xs text-jarvis-soft-gray">
                  Spiritual (7d)
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Summaries Tab */}
        {activeTab === 'summaries' && (
          <div className="space-y-6">
            <div className="glass-card p-6 mb-6">
              <p className="text-sm text-jarvis-soft-gray">
                📅 Weekly snapshots showing your journey. Highlights, lowlights, and movement across all three dimensions.
              </p>
            </div>
            {mockWeeklySummaries.map((summary, index) => (
              <WeeklySummaryCard key={summary.weekStart} summary={summary} index={index} />
            ))}
          </div>
        )}

        {/* Patterns Tab */}
        {activeTab === 'patterns' && (
          <div>
            <div className="glass-card p-6 mb-6">
              <p className="text-sm text-jarvis-soft-gray mb-4">
                🔍 Patterns we have discovered together. Tap to see full details and evidence.
              </p>
              <div className="flex items-center gap-2 text-xs text-jarvis-soft-gray">
                <span className="px-2 py-1 rounded bg-jarvis-muted-green/20 text-jarvis-muted-green">✓ Acted on</span>
                <span>= You tried the suggestion</span>
              </div>
            </div>
            <HistoricalPatternsList patterns={mockHistoricalPatterns} />
          </div>
        )}
      </div>
    </div>
  );
}
