'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Activity, 
  Brain, 
  Sparkles, 
  Mic,
  HeartPulse,
  Cpu,
  Leaf,
  Zap,
  Lightbulb,
  Moon,
  Radio,
  Waves,
  Bell,
  User,
  Flame,
  Smile,
  Meh,
  Frown
} from 'lucide-react';
import { Container, PageLayout, Button, Card } from '@/components/ui';
import { DimensionCard } from '@/components/dashboard/DimensionCard';
import { copy } from '@/lib/copy';
import { StreakCounter } from '@/components/dashboard/StreakCounter';

export const Dashboard: React.FC = () => {
  const streak = 7;
  const [showMoodCheck, setShowMoodCheck] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [hasInterventions, setHasInterventions] = useState(true); // Mock - will come from API in Phase 9

  // Mock data - will be replaced with real data from API in Phase 9
  const dimensionsData = {
    physical: {
      status: 'good' as const,
      score: 7.5,
      insight: 'Workouts consistent. Recovery could be better.',
      icon: Activity
    },
    mental: {
      status: 'warning' as const,
      score: 6.0,
      insight: 'Focus is slipping. Consider reducing context switching.',
      icon: Cpu
    },
    spiritual: {
      status: 'great' as const,
      score: 8.5,
      insight: 'Great balance. Keep prioritizing what matters.',
      icon: Sparkles
    }
  };

  const handleMoodSelect = (mood: number) => {
    console.log('Mood selected:', mood);
    setSelectedMood(mood);
    // TODO: Send to API in Phase 9
  };

  const handleLogSomething = () => {
    router.push('/log');
  };

  const router = useRouter();

  return (
    <PageLayout>
  <Container size="lg" className="py-8">
      {/* 1. THE HEADER (Exact Style) */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-start mb-10"
      >
        <div>
          {/* The Date: Cyan, Spaced out, Uppercase */}
          <p className="text-jarvis-cyan font-display text-[10px] tracking-[0.2em] uppercase mb-1 font-semibold">
            Wednesday, Oct 24
          </p>
          
          {/* The Greeting: Tight leading, Color contrast */}
          <h1 className="font-display font-bold text-5xl leading-[0.95] tracking-tight">
            <span className="text-white">Morning,</span>
            <br />
            {/* The Name is Grey to create visual hierarchy */}
            <span className="text-jarvis-text-secondary">Swapnil.</span>
          </h1>
        </div>

        {/* The Streak Badge & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#1A2C42] border border-white/5 px-3 py-1.5 rounded-full">
            <Flame size={14} className="text-orange-500" />
            <span className="font-display font-bold text-jarvis-cyan text-sm">{streak}</span>
          </div>
          
          <button 
            onClick={() => router.push('/notifications')}
            className="w-10 h-10 rounded-full bg-[#1A2C42] border border-white/5 flex items-center justify-center text-jarvis-text-secondary hover:text-white hover:bg-[#233b57] transition-colors"
          >
            <Bell size={20} strokeWidth={2} />
          </button>
          
          <button 
            onClick={() => router.push('/settings')}
            className="w-10 h-10 rounded-full bg-[#1A2C42] border border-white/5 flex items-center justify-center text-jarvis-text-secondary hover:text-white hover:bg-[#233b57] transition-colors"
          >
            <User size={20} strokeWidth={2} />
          </button>
        </div>
      </motion.div>



        {/* Mood selector (prominent) */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="heading-md">{copy.dashboard.moodPromptMorning}</h2>
            <p className="text-xs text-jarvis-gray">{copy.dashboard.moodQuickCheck}</p>
          </div>

          <div className="flex items-center gap-4">
            {[
              { icon: Flame, label: "Let's go", color: 'text-orange-500' },
              { icon: Smile, label: 'Good', color: 'text-jarvis-cyan' },
              { icon: Meh, label: 'Meh', color: 'text-jarvis-amber' },
              { icon: Frown, label: 'Struggling', color: 'text-orange-400' },
              { icon: Moon, label: 'Cooked', color: 'text-jarvis-gray' }
            ].map((m, i) => (
              <button
                key={m.label}
                onClick={() => handleMoodSelect(i)}
                className={`flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-transform focus:outline-none ${selectedMood === i ? 'ring-2 ring-jarvis-cyan bg-jarvis-cyan/10 scale-105' : 'bg-jarvis-navy-light/30 hover:bg-jarvis-navy-light/50'}`}
                aria-pressed={selectedMood === i}
                title={m.label}
              >
                <m.icon size={24} className={m.color} />
                <span className="text-[11px] text-jarvis-gray mt-1">{m.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Unified Today's Status (glass card) */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mb-8"
        >
          <div className="glass-card p-8">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="heading-sm font-semibold">{copy.dashboard.statusHeadline}</h3>
                <p className="text-xs text-jarvis-gray mt-1">You hit 2/3 dimensions</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-jarvis-cyan font-medium">Streak: 4 days</div>
                <div className="text-[10px] text-jarvis-gray mt-1">Longest: 28 days</div>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-6">
              <div className="flex flex-col items-start gap-2">
                <div className="text-xs text-jarvis-gray">Workout</div>
                <div className="text-sm font-medium">✗</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-xs text-jarvis-gray">Tasks</div>
                <div className="text-sm font-medium">2/3</div>
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="text-xs text-jarvis-gray">Meditation</div>
                <div className="text-sm font-medium">✗</div>
              </div>
            </div>

            <div className="mt-8 text-xs text-jarvis-gray">{copy.dashboard.statusFooter}</div>
          </div>
        </motion.div>

        {/* Dimension Cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
        >
          <DimensionCard
            dimension="physical"
            status={dimensionsData.physical.status}
            score={dimensionsData.physical.score}
            insight={dimensionsData.physical.insight}
            emoji={dimensionsData.physical.emoji}
            icon={dimensionsData.physical.icon}
          />
          <DimensionCard
            dimension="mental"
            status={dimensionsData.mental.status}
            score={dimensionsData.mental.score}
            insight={dimensionsData.mental.insight}
            emoji={dimensionsData.mental.emoji}
            icon={dimensionsData.mental.icon}
          />
          <DimensionCard
            dimension="spiritual"
            status={dimensionsData.spiritual.status}
            score={dimensionsData.spiritual.score}
            insight={dimensionsData.spiritual.insight}
            emoji={dimensionsData.spiritual.emoji}
            icon={dimensionsData.spiritual.icon}
          />
        </motion.div>

        {/* Bottom spacing */}
  <div className="h-12" />
      </Container>
    </PageLayout>
  );
};