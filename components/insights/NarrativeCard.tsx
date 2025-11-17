"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';

export interface NarrativeInsight {
  id: string;
  title: string;
  emoji: string;
  daySpan: string; // e.g. "Days 12–18"
  summary: string; // short narrative summary
  highlight?: string; // optional key highlight sentence
  trendLabel?: string; // e.g. "Energy improving" / "Focus declining"
  trendEmoji?: string; // 📈 / 📉 / ➡️
}

interface NarrativeCardProps {
  insight: NarrativeInsight;
  onOpen?: (id: string) => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({ insight, onOpen }) => {
  return (
    <Card
      onClick={() => onOpen && onOpen(insight.id)}
      className="p-5 group transition-colors"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-jarvis-deep-navy/60 flex items-center justify-center text-2xl shadow-inner">
          <span aria-hidden>{insight.emoji}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-semibold truncate">
              {insight.title}
            </h3>
            {insight.trendEmoji && insight.trendLabel && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-jarvis-deep-navy/40 border border-jarvis-soft-gray/20">
                <span>{insight.trendEmoji}</span>
                <span className="text-jarvis-soft-gray">{insight.trendLabel}</span>
              </span>
            )}
          </div>
          <p className="text-[11px] uppercase tracking-wide text-jarvis-soft-gray/70 mb-2 font-medium">
            {insight.daySpan}
          </p>
          <p className="text-xs text-jarvis-soft-gray leading-relaxed line-clamp-3">
            {insight.summary}
          </p>
          {insight.highlight && (
            <p className="mt-2 text-[11px] text-jarvis-electric-cyan/90 font-medium">
              ✨ {insight.highlight}
            </p>
          )}
          <div className="mt-3 flex items-center justify-between text-xs text-jarvis-cyan">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Press Enter to open</span>
            <span className="font-medium">View details →</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
