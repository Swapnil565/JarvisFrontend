"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Search, ArrowLeft, Check } from 'lucide-react';
import TrendChart from './TrendChart';
import WeeklySummaryCard from './WeeklySummaryCard';
import HistoricalPatternsList from './HistoricalPatternsList';
import { Container, PageLayout } from '@/components/ui';
import type { TimeRange, TrendData, WeeklySummary, HistoricalPattern } from '@/types/progress';
import { progressAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ProgressPage() {
  const { isReady } = useAuth();
  const [timeRange, setTimeRange] = useState<TimeRange>('month');
  const [activeTab, setActiveTab] = useState<'trends' | 'summaries' | 'patterns'>('trends');
  const [trendData, setTrendData] = useState<TrendData[]>([]);
  const [weeklySummaries, setWeeklySummaries] = useState<WeeklySummary[]>([]);
  const [historicalPatterns, setHistoricalPatterns] = useState<HistoricalPattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    const days = timeRange === 'week' ? 7 : timeRange === 'month' ? 30 : 90;
    setLoading(true);
    Promise.all([
      Promise.all(
        (['physical', 'mental', 'spiritual'] as const).map(dim =>
          progressAPI.getTrendData(dim, timeRange).catch(() => null)
        )
      ),
      progressAPI.getWeeklySummaries(8).catch(() => []),
      progressAPI.getHistoricalPatterns().catch(() => []),
    ]).then(([trends, summaries, patterns]) => {
      const validTrends = (trends as any[]).filter(Boolean).map((t: any) => ({
        dimension: t.dimension as TrendData['dimension'],
        dataPoints: t.dataPoints || [],
        currentScore: t.currentScore ?? 5,
        weekChange: t.weekChange ?? 0,
        monthChange: t.monthChange ?? 0,
        trend: (t.trend || 'stable') as TrendData['trend'],
      }));
      setTrendData(validTrends);
      setWeeklySummaries(summaries as WeeklySummary[]);
      setHistoricalPatterns(
        (patterns as any[]).map((p: any, i: number) => ({
          id: String(p.id || i),
          title: (p.description || p.title || '').split('.')[0],
          dimension: (p.data?.dimension || 'physical') as HistoricalPattern['dimension'],
          discoveredDate: (p.first_detected || p.last_seen || '').slice(0, 10),
          wasActedOn: !p.is_active,
          outcome: p.data?.suggestion,
        }))
      );
    }).finally(() => setLoading(false));
  }, [isReady, timeRange]);

  const timeRangeButtons: { value: TimeRange; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'all', label: 'All Time' },
  ];

  const tabs = [
    { value: 'trends' as const, label: 'Trends', icon: TrendingUp },
    { value: 'summaries' as const, label: 'Summaries', icon: Calendar },
    { value: 'patterns' as const, label: 'Patterns', icon: Search },
  ];

  return (
    <PageLayout>
      <Container size="lg" className="pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-jarvis-navy/80 backdrop-blur-xl border-b border-white/5 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <button
                onClick={() => window.history.back()}
                className="flex items-center gap-2 text-jarvis-text-secondary hover:text-white transition-colors mb-2"
              >
                <ArrowLeft size={16} />
                <span>Back</span>
              </button>
              <h1 className="heading-lg text-white">Your Progress</h1>
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
                <tab.icon size={16} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {loading && (
          <div className="text-center py-20 text-jarvis-gray">Loading progress data…</div>
        )}

        {/* Trends Tab */}
        {!loading && activeTab === 'trends' && (
          <div className="space-y-6">
            {trendData.map((trend) => (
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
              {(['physical', 'mental', 'spiritual'] as const).map((dim, idx) => {
                const t = trendData.find(x => x.dimension === dim);
                const colors = ['text-jarvis-muted-green', 'text-jarvis-electric-cyan', 'text-jarvis-warm-amber'];
                return (
                  <motion.div
                    key={dim}
                    className="glass-card p-4 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + idx * 0.05 }}
                  >
                    <div className={`text-3xl font-bold mb-1 ${colors[idx]}`}>
                      {t ? `${t.weekChange > 0 ? '+' : ''}${t.weekChange.toFixed(1)}%` : '—'}
                    </div>
                    <div className="text-xs text-jarvis-soft-gray capitalize">{dim} (7d)</div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summaries Tab */}
        {!loading && activeTab === 'summaries' && (
          <div className="space-y-6">
            <div className="glass-card p-6 mb-6 flex items-start gap-3">
              <Calendar className="w-5 h-5 text-jarvis-electric-cyan shrink-0 mt-0.5" />
              <p className="text-sm text-jarvis-soft-gray">
                Weekly snapshots showing your journey. Highlights, lowlights, and movement across all three dimensions.
              </p>
            </div>
            {weeklySummaries.length === 0 && (
              <p className="text-center text-jarvis-gray py-10">No weekly summaries yet. Keep logging!</p>
            )}
            {weeklySummaries.map((summary, index) => (
              <WeeklySummaryCard key={summary.weekStart} summary={summary} index={index} />
            ))}
          </div>
        )}

        {/* Patterns Tab */}
        {!loading && activeTab === 'patterns' && (
          <div>
            <div className="glass-card p-6 mb-6">
              <div className="flex items-start gap-3 mb-4">
                <Search className="w-5 h-5 text-jarvis-electric-cyan shrink-0 mt-0.5" />
                <p className="text-sm text-jarvis-soft-gray">
                  Patterns we have discovered together. Tap to see full details and evidence.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-jarvis-soft-gray">
                <span className="px-2 py-1 rounded bg-jarvis-muted-green/20 text-jarvis-muted-green flex items-center gap-1">
                  <Check size={12} />
                  Acted on
                </span>
                <span>= You tried the suggestion</span>
              </div>
            </div>
            {historicalPatterns.length === 0 && (
              <p className="text-center text-jarvis-gray py-10">No patterns detected yet. Keep logging across dimensions!</p>
            )}
            <HistoricalPatternsList patterns={historicalPatterns} />
          </div>
        )}
      </div>
      </Container>
    </PageLayout>
  );
}
