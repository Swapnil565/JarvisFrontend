'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, PageLayout } from '@/components/ui';
import { PatternCard } from '@/components/insights/PatternCard';
import { PatternDetailOverlay } from '@/components/insights/PatternDetailOverlay';
import { Pattern, PatternFilters } from '@/types/pattern';

// Mock data - will be replaced with API data in Phase 9
const mockPatterns: Pattern[] = [
  {
    id: '1',
    title: 'Sleep quality drops after high-stress days',
    dimension: 'physical',
    type: 'warning',
    confidence: 87,
    discovered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    pattern: 'When you report high stress at work, you consistently sleep 1-2 hours less that night. This has happened 6 times in the last 2 weeks.',
    evidence: [
      'Oct 22: High work stress → 5.5 hours sleep',
      'Oct 19: High work stress → 6 hours sleep',
      'Oct 15: High work stress → 5 hours sleep',
      'Oct 12: Moderate stress → 7.5 hours sleep (normal)',
      'Oct 8: High work stress → 5.5 hours sleep',
      'Oct 5: Low stress → 8 hours sleep (good)'
    ],
    whyItMatters: 'Poor sleep after stress days means your body never gets to fully recover. This creates a compounding effect where you start the next day already depleted, making it harder to handle normal stress.',
    suggestion: 'Try a 10-minute wind-down routine on high-stress days (walk, stretching, or journaling). Even small buffers can help break the cycle.'
  },
  {
    id: '2',
    title: 'Best workouts happen on 7+ hour sleep nights',
    dimension: 'physical',
    type: 'positive',
    confidence: 92,
    discovered: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    pattern: 'Your workout performance (energy, strength, focus) is consistently 40% better when you sleep 7+ hours vs 6 hours or less.',
    evidence: [
      'Oct 23: 8 hours sleep → "Crushed leg day, felt strong"',
      'Oct 21: 7.5 hours sleep → "Good session, solid lifts"',
      'Oct 18: 6 hours sleep → "Struggled, cut it short"',
      'Oct 16: 8 hours sleep → "PR on deadlifts!"',
      'Oct 13: 5.5 hours sleep → "No energy, skipped gym"',
      'Oct 10: 7 hours sleep → "Full session, felt great"'
    ],
    whyItMatters: 'Sleep is your performance multiplier. When you prioritize it, you get more out of every rep. When you skip it, you\'re training with a handicap.',
    suggestion: 'Protect your sleep on training days. Your body is already asking for recovery—give it the fuel it needs.'
  },
  {
    id: '3',
    title: 'Focus crashes around 2-3 PM consistently',
    dimension: 'mental',
    type: 'warning',
    confidence: 84,
    discovered: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    pattern: 'Almost every afternoon, your focus drops significantly between 2-3 PM, lasting 1-2 hours. This happens regardless of sleep quality.',
    evidence: [
      'Oct 24: "Can\'t concentrate, brain fog at 2:30"',
      'Oct 23: "Energy dip around 3 PM"',
      'Oct 22: "Afternoon slump, switched to easy tasks"',
      'Oct 20: "Focus gone by 2 PM"',
      'Oct 19: "2-4 PM was rough, struggled with deep work"',
      'Oct 17: "Same afternoon crash, like clockwork"'
    ],
    whyItMatters: 'This is your circadian rhythm at work—completely normal. But if you fight it with deep work, you waste energy and feel frustrated. If you work with it, you can use mornings for hard problems and afternoons for lighter tasks.',
    suggestion: 'Block mornings for your hardest work. Use 2-4 PM for meetings, admin, or physical movement (walk/gym). Don\'t fight your biology.'
  },
  {
    id: '4',
    title: 'You recharge through physical movement',
    dimension: 'spiritual',
    type: 'positive',
    confidence: 89,
    discovered: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    pattern: 'On days when you lift or move your body, your overall mood and energy are 35% higher, even when work is stressful.',
    evidence: [
      'Oct 24: Trained morning → "Felt calm all day despite busy schedule"',
      'Oct 22: Skipped gym → "Restless, harder to focus"',
      'Oct 21: Full workout → "Stress didn\'t hit as hard"',
      'Oct 19: Rest day → "Felt off, lower energy"',
      'Oct 18: Morning lift → "Crushed the day, felt centered"',
      'Oct 16: Trained → "Even bad work day felt manageable"'
    ],
    whyItMatters: 'Training isn\'t just physical for you—it\'s your reset button. It regulates your nervous system and gives you a sense of control when other things feel chaotic.',
    suggestion: 'Protect your training time, especially during high-stress periods. It\'s not "extra"—it\'s your foundation.'
  },
  {
    id: '5',
    title: 'Back-to-back meetings drain you fast',
    dimension: 'mental',
    type: 'alert',
    confidence: 91,
    discovered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    pattern: 'Days with 3+ consecutive meetings leave you reporting "drained" or "overwhelmed" by mid-afternoon. This has happened 5 times in the past 2 weeks.',
    evidence: [
      'Oct 24: 4 meetings in a row → "Exhausted by 3 PM"',
      'Oct 21: 3 back-to-back → "No energy left for deep work"',
      'Oct 19: 5 meetings straight → "Brain fried, called it early"',
      'Oct 17: 3 consecutive → "Felt scattered rest of day"',
      'Oct 14: 4 in a row → "Couldn\'t focus after, took walk"'
    ],
    whyItMatters: 'Meetings require constant context switching and social energy. Without breaks, your brain never gets a chance to reset. You end up running on fumes and can\'t do your best thinking work.',
    suggestion: 'Block 15-minute buffers between meetings. Even a quick walk or stretch makes a huge difference. Protect at least one 2-hour block per day with zero meetings.'
  }
];

export const InsightsPage: React.FC = () => {
  const [filters, setFilters] = useState<PatternFilters>({
    dimension: 'all',
    type: 'all'
  });
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);

  const filteredPatterns = mockPatterns.filter(pattern => {
    if (filters.dimension !== 'all' && pattern.dimension !== filters.dimension) {
      return false;
    }
    if (filters.type !== 'all' && pattern.type !== filters.type) {
      return false;
    }
    return true;
  });

  return (
    <PageLayout>
      <Container size="lg" className="py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="heading-xl mb-3">Your Patterns 🔍</h1>
          <p className="text-jarvis-gray text-lg">
            Insights discovered from your data. Tap any card to dive deeper.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {/* Dimension filters */}
          <div className="flex gap-2">
            {(['all', 'physical', 'mental', 'spiritual'] as const).map((dim) => (
              <button
                key={dim}
                onClick={() => setFilters({ ...filters, dimension: dim })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filters.dimension === dim
                    ? 'bg-jarvis-cyan text-jarvis-navy'
                    : 'bg-jarvis-navy-light/40 text-jarvis-gray hover:bg-jarvis-navy-light/60'
                }`}
              >
                {dim === 'all' ? 'All' : dim.charAt(0).toUpperCase() + dim.slice(1)}
              </button>
            ))}
          </div>

          {/* Type filters */}
          <div className="flex gap-2">
            {(['all', 'positive', 'warning', 'alert'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilters({ ...filters, type })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  filters.type === type
                    ? 'bg-jarvis-cyan text-jarvis-navy'
                    : 'bg-jarvis-navy-light/40 text-jarvis-gray hover:bg-jarvis-navy-light/60'
                }`}
              >
                {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Pattern grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPatterns.map((pattern, index) => (
            <motion.div
              key={pattern.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <PatternCard
                pattern={pattern}
                onClick={() => setSelectedPattern(pattern)}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredPatterns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-jarvis-gray text-lg">No patterns found with these filters</p>
            <button
              onClick={() => setFilters({ dimension: 'all', type: 'all' })}
              className="mt-4 text-jarvis-cyan hover:underline"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </Container>

      {/* Detail overlay */}
      {selectedPattern && (
        <PatternDetailOverlay
          pattern={selectedPattern}
          onClose={() => setSelectedPattern(null)}
        />
      )}
    </PageLayout>
  );
};
