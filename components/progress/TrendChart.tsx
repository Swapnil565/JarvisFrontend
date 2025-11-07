"use client";

import { motion } from 'framer-motion';
import { motionTransition } from '@/lib/motion';
import { DataPoint, Dimension } from '@/types/progress';

interface TrendChartProps {
  dimension: Dimension;
  dataPoints: DataPoint[];
  currentScore: number;
  trend: 'improving' | 'declining' | 'stable';
}

const dimensionConfig = {
  physical: { emoji: '💪', color: '#34D399', name: 'Physical' },
  mental: { emoji: '🧠', color: '#00D9FF', name: 'Mental' },
  spiritual: { emoji: '✨', color: '#FFB020', name: 'Spiritual' },
};

export default function TrendChart({ dimension, dataPoints, currentScore, trend }: TrendChartProps) {
  const config = dimensionConfig[dimension];
  const maxValue = 10;
  const chartHeight = 200;
  const chartWidth = 100;

  // Calculate SVG path from data points
  const points = dataPoints.map((point, index) => {
    const x = (index / (dataPoints.length - 1)) * chartWidth;
    const y = chartHeight - (point.value / maxValue) * chartHeight;
    return { x, y, value: point.value, date: point.date };
  });

  const pathD = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    return `${acc} L ${point.x} ${point.y}`;
  }, '');

  // Create gradient fill area
  const fillPathD = `${pathD} L ${chartWidth} ${chartHeight} L 0 ${chartHeight} Z`;

  const trendEmoji = trend === 'improving' ? '📈' : trend === 'declining' ? '📉' : '➡️';
  const trendColor = trend === 'improving' ? '#34D399' : trend === 'declining' ? '#FFB020' : '#8B95A5';

  return (
    <motion.div
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...motionTransition, duration: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{config.emoji}</span>
          <div>
            <h3 className="text-lg font-semibold text-jarvis-soft-gray">
              {config.name}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-3xl font-bold" style={{ color: config.color }}>
                {currentScore.toFixed(1)}
              </span>
              <span className="text-sm text-jarvis-soft-gray">/10</span>
            </div>
          </div>
        </div>
        
        {/* Trend indicator */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-jarvis-deep-navy/50">
          <span className="text-lg">{trendEmoji}</span>
          <span className="text-sm font-medium capitalize" style={{ color: trendColor }}>
            {trend}
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full h-[200px] mb-4">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          {/* Grid lines */}
          {[0, 2.5, 5, 7.5, 10].map((value) => {
            const y = chartHeight - (value / maxValue) * chartHeight;
            return (
              <g key={value}>
                <line
                  x1={0}
                  y1={y}
                  x2={chartWidth}
                  y2={y}
                  stroke="#8B95A5"
                  strokeOpacity={0.1}
                  strokeWidth={0.5}
                />
                <text
                  x={-2}
                  y={y}
                  fontSize={3}
                  fill="#8B95A5"
                  textAnchor="end"
                  dominantBaseline="middle"
                >
                  {value}
                </text>
              </g>
            );
          })}

          {/* Gradient fill */}
          <defs>
            <linearGradient id={`gradient-${dimension}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={config.color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={config.color} stopOpacity={0} />
            </linearGradient>
          </defs>

          {/* Fill area */}
          <motion.path
            d={fillPathD}
            fill={`url(#gradient-${dimension})`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...motionTransition, duration: 0.6, delay: 0.2 }}
          />

          {/* Line */}
          <motion.path
            d={pathD}
            fill="none"
            stroke={config.color}
            strokeWidth={1}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ ...motionTransition, duration: 1, ease: 'easeInOut' }}
          />

          {/* Data points */}
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r={1.5}
              fill={config.color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ ...motionTransition, duration: 0.3, delay: 0.2 + index * 0.05 }}
            />
          ))}
        </svg>
      </div>

      {/* Date range labels */}
      <div className="flex justify-between text-xs text-jarvis-soft-gray">
        <span>{new Date(dataPoints[0].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
        <span>{new Date(dataPoints[dataPoints.length - 1].date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>
    </motion.div>
  );
}
