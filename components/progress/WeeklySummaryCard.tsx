"use client";

import { motion } from 'framer-motion';
import { WeeklySummary } from '@/types/progress';

interface WeeklySummaryCardProps {
  summary: WeeklySummary;
  index: number;
}

export default function WeeklySummaryCard({ summary, index }: WeeklySummaryCardProps) {
  const weekStart = new Date(summary.weekStart);
  const weekEnd = new Date(summary.weekEnd);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getChangeColor = (change: number) => {
    if (change > 0) return '#34D399';
    if (change < 0) return '#FFB020';
    return '#8B95A5';
  };

  const getChangeEmoji = (change: number) => {
    if (change > 0) return '↗️';
    if (change < 0) return '↘️';
    return '→';
  };

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-4 border-b border-jarvis-soft-gray/10">
        <div>
          <h4 className="text-sm text-jarvis-soft-gray">Week of</h4>
          <p className="text-lg font-semibold text-white mt-0.5">
            {formatDate(weekStart)} - {formatDate(weekEnd)}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-jarvis-deep-navy/50">
          <span className="text-sm text-jarvis-soft-gray">{summary.totalLogs} logs</span>
          {summary.streakMaintained && <span className="text-sm">🔥</span>}
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        {/* Physical */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">💪</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Physical</span>
              <span className="text-lg font-bold text-jarvis-muted-green">
                {summary.physical.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium ${summary.physical.change > 0 ? 'text-jarvis-muted-green' : summary.physical.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                {getChangeEmoji(summary.physical.change)} {Math.abs(summary.physical.change).toFixed(1)}
              </span>
            </div>
            {summary.physical.highlight && (
              <p className="text-xs text-jarvis-soft-gray">
                ✨ {summary.physical.highlight}
              </p>
            )}
            {summary.physical.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70">
                💭 {summary.physical.lowlight}
              </p>
            )}
          </div>
        </div>

        {/* Mental */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">🧠</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Mental</span>
              <span className="text-lg font-bold text-jarvis-electric-cyan">
                {summary.mental.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium ${summary.mental.change > 0 ? 'text-jarvis-muted-green' : summary.mental.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                {getChangeEmoji(summary.mental.change)} {Math.abs(summary.mental.change).toFixed(1)}
              </span>
            </div>
            {summary.mental.highlight && (
              <p className="text-xs text-jarvis-soft-gray">
                ✨ {summary.mental.highlight}
              </p>
            )}
            {summary.mental.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70">
                💭 {summary.mental.lowlight}
              </p>
            )}
          </div>
        </div>

        {/* Spiritual */}
        <div className="flex items-start gap-3">
          <span className="text-2xl">✨</span>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Spiritual</span>
              <span className="text-lg font-bold text-jarvis-warm-amber">
                {summary.spiritual.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium ${summary.spiritual.change > 0 ? 'text-jarvis-muted-green' : summary.spiritual.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                {getChangeEmoji(summary.spiritual.change)} {Math.abs(summary.spiritual.change).toFixed(1)}
              </span>
            </div>
            {summary.spiritual.highlight && (
              <p className="text-xs text-jarvis-soft-gray">
                ✨ {summary.spiritual.highlight}
              </p>
            )}
            {summary.spiritual.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70">
                💭 {summary.spiritual.lowlight}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
