"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui';
import { LucideIcon } from 'lucide-react';

export interface NarrativeInsight {
  id: string;
  title: string;
  icon: LucideIcon;
  daySpan: string; // e.g. "Days 12–18"
  summary: string; // short narrative summary
  highlight?: string; // optional key highlight sentence
  trendLabel?: string; // e.g. "Energy improving" / "Focus declining"
  trendIcon?: LucideIcon; // 📈 / 📉 / ➡️
}

interface NarrativeCardProps {
  insight: NarrativeInsight;
  onOpen?: (id: string) => void;
}

export const NarrativeCard: React.FC<NarrativeCardProps> = ({ insight, onOpen }) => {
  return (
    <Card
      onClick={() => onOpen && onOpen(insight.id)}
      className="p-4 group transition-colors"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-lg bg-jarvis-deep-navy/60 flex items-center justify-center text-jarvis-cyan shadow-inner shrink-0">
          <insight.icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-medium truncate text-jarvis-text-primary">
              {insight.title}
            </h3>
            {insight.trendIcon && insight.trendLabel && (
              <span className="inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded-full bg-jarvis-deep-navy/40 border border-jarvis-soft-gray/20">
                <insight.trendIcon size={10} />
                <span className="hidden sm:inline">{insight.trendLabel}</span>
              </span>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-wide text-jarvis-soft-gray/70 mb-1.5 font-medium">
            {insight.daySpan}
          </p>
          <p className="text-[11px] text-jarvis-soft-gray leading-relaxed line-clamp-3">
            {insight.summary}
          </p>
          {insight.highlight && (
            <p className="mt-2 text-[10px] text-jarvis-electric-cyan/90 font-medium">
              ✨ {insight.highlight}
            </p>
          )}
          <div className="mt-2 flex items-center justify-between text-[10px] text-jarvis-cyan">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Press Enter to open</span>
            <span className="font-medium">View details →</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
