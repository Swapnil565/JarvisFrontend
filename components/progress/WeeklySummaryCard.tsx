"use client";

import { motion } from 'framer-motion';
import { WeeklySummary } from '@/types/progress';
import { TrendingUp, TrendingDown, ArrowRight, Activity, Brain, Sparkles, MessageCircle, Flame } from 'lucide-react';

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

  const ChangeIcon = ({ change }: { change: number }) => {
    if (change > 0) return <TrendingUp size={14} />;
    if (change < 0) return <TrendingDown size={14} />;
    return <ArrowRight size={14} />;
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
          {summary.streakMaintained && <Flame size={14} className="text-orange-500" />}
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-4">
        {/* Physical */}
        <div className="flex items-start gap-3">
          <Activity size={24} className="text-jarvis-cyan" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Physical</span>
              <span className="text-lg font-bold text-jarvis-muted-green">
                {summary.physical.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium flex items-center gap-1 ${summary.physical.change > 0 ? 'text-jarvis-muted-green' : summary.physical.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                <ChangeIcon change={summary.physical.change} /> {Math.abs(summary.physical.change).toFixed(1)}
              </span>
            </div>
            {summary.physical.highlight && (
              <p className="text-xs text-jarvis-soft-gray flex items-center gap-1">
                <Sparkles size={12} /> {summary.physical.highlight}
              </p>
            )}
            {summary.physical.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70 flex items-center gap-1">
                <MessageCircle size={12} /> {summary.physical.lowlight}
              </p>
            )}
          </div>
        </div>

        {/* Mental */}
        <div className="flex items-start gap-3">
          <Brain size={24} className="text-jarvis-amber" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Mental</span>
              <span className="text-lg font-bold text-jarvis-electric-cyan">
                {summary.mental.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium flex items-center gap-1 ${summary.mental.change > 0 ? 'text-jarvis-muted-green' : summary.mental.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                <ChangeIcon change={summary.mental.change} /> {Math.abs(summary.mental.change).toFixed(1)}
              </span>
            </div>
            {summary.mental.highlight && (
              <p className="text-xs text-jarvis-soft-gray flex items-center gap-1">
                <Sparkles size={12} /> {summary.mental.highlight}
              </p>
            )}
            {summary.mental.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70 flex items-center gap-1">
                <MessageCircle size={12} /> {summary.mental.lowlight}
              </p>
            )}
          </div>
        </div>

        {/* Spiritual */}
        <div className="flex items-start gap-3">
          <Sparkles size={24} className="text-jarvis-green" />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm font-medium text-white">Spiritual</span>
              <span className="text-lg font-bold text-jarvis-warm-amber">
                {summary.spiritual.average.toFixed(1)}
              </span>
              <span 
                className={`text-xs font-medium flex items-center gap-1 ${summary.spiritual.change > 0 ? 'text-jarvis-muted-green' : summary.spiritual.change < 0 ? 'text-jarvis-warm-amber' : 'text-jarvis-gray'}`}
              >
                <ChangeIcon change={summary.spiritual.change} /> {Math.abs(summary.spiritual.change).toFixed(1)}
              </span>
            </div>
            {summary.spiritual.highlight && (
              <p className="text-xs text-jarvis-soft-gray flex items-center gap-1">
                <Sparkles size={12} /> {summary.spiritual.highlight}
              </p>
            )}
            {summary.spiritual.lowlight && (
              <p className="text-xs text-jarvis-soft-gray/70 flex items-center gap-1">
                <MessageCircle size={12} /> {summary.spiritual.lowlight}
              </p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
