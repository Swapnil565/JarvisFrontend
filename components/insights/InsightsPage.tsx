'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { popIn, slideUp, staggerChildren, childFade } from '@/lib/animations';
import { Container, PageLayout } from '@/components/ui';
import { copy } from '@/lib/copy';
import { PatternCard } from '@/components/insights/PatternCard';
import { NarrativeCard, NarrativeInsight } from '@/components/insights/NarrativeCard';
import { NarrativeDetailOverlay } from '@/components/insights/NarrativeDetailOverlay';
import { PatternDetailOverlay } from '@/components/insights/PatternDetailOverlay';
import { Pattern, PatternFilters } from '@/types/pattern';
import {
  Brain,
  Activity,
  Sparkles,
  TrendingDown,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { insightsAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

function apiTypeToFrontend(apiType: string, confidence: number): Pattern['type'] {
  if (apiType === 'strength' || apiType === 'correlation') return 'positive';
  if (apiType === 'alert') return 'alert';
  if (confidence < 0.65) return 'alert';
  return 'warning';
}

export const InsightsPage: React.FC = () => {
  const { isReady } = useAuth();
  const [filters, setFilters] = useState<PatternFilters>({ dimension: 'all', type: 'all' });
  const [selectedPattern, setSelectedPattern] = useState<Pattern | null>(null);
  const [selectedNarrative, setSelectedNarrative] = useState<NarrativeInsight | null>(null);
  const [patterns, setPatterns] = useState<Pattern[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isReady) return;
    insightsAPI.getPatterns()
      .then(raw => {
        const mapped: Pattern[] = (raw as any[]).map(p => ({
          id: String(p.id),
          title: p.title || p.pattern || 'Pattern Detected',
          dimension: (p.dimension || 'physical') as Pattern['dimension'],
          type: apiTypeToFrontend(p.type || '', p.confidence || 0),
          confidence: Math.round((p.confidence || 0) * 100),
          discovered: p.discovered || new Date().toISOString(),
          pattern: p.pattern || '',
          evidence: Array.isArray(p.evidence) ? p.evidence : [],
          whyItMatters: p.whyItMatters || '',
          suggestion: p.suggestion || '',
        }));
        setPatterns(mapped);
      })
      .catch(() => setPatterns([]))
      .finally(() => setLoading(false));
  }, [isReady]);

  const filteredPatterns = patterns.filter(pattern => {
    if (filters.dimension !== 'all' && pattern.dimension !== filters.dimension) return false;
    if (filters.type !== 'all' && pattern.type !== filters.type) return false;
    return true;
  });

  // Narrative snapshots derived from top patterns
  const narrativeInsights: NarrativeInsight[] = patterns.slice(0, 3).map((p, i) => ({
    id: `n${i}`,
    icon: i === 0 ? Brain : i === 1 ? Activity : Sparkles,
    title: p.title,
    daySpan: 'Last 30 days',
    summary: p.pattern,
    highlight: p.suggestion || '',
    trendLabel: p.type === 'positive' ? 'Improving' : p.type === 'alert' ? 'Needs attention' : 'Watch closely',
    trendIcon: p.type === 'positive' ? TrendingUp : p.type === 'alert' ? TrendingDown : ArrowRight,
  }));

  return (
    <PageLayout>
  <Container size="lg" className="py-12">
        {/* Header */}
        <motion.div
          variants={popIn}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="text-jarvis-cyan" size={32} />
            <h1 className="heading-xl">{copy.insights.patternsHeadline}</h1>
          </div>
          <p className="text-body-lg">{copy.insights.patternsSub}</p>
        </motion.div>

        {/* Narrative Highlights */}
        <motion.div
          variants={staggerChildren(0.08)}
          initial="hidden"
          animate="visible"
          className="mb-12 space-y-6"
        >
          <h2 className="heading-md mb-2">{copy.insights.snapshotsHeadline}</h2>
          <p className="text-xs text-jarvis-soft-gray mb-6">{copy.insights.snapshotsSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {narrativeInsights.map(n => (
              <motion.div key={n.id} variants={childFade}>
                <NarrativeCard
                  insight={n}
                  onOpen={() => setSelectedNarrative(n)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap gap-4 mb-12"
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
          variants={staggerChildren(0.05)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPatterns.map((pattern) => (
            <motion.div key={pattern.id} variants={childFade}>
              <PatternCard
                pattern={pattern}
                onClick={() => setSelectedPattern(pattern)}
              />
            </motion.div>
          ))}
        </motion.div>

        {loading && (
          <div className="text-center py-20 text-jarvis-gray">Loading patterns…</div>
        )}

        {!loading && filteredPatterns.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-body-lg">{copy.insights.emptyState}</p>
            <button
              onClick={() => setFilters({ dimension: 'all', type: 'all' })}
              className="mt-4 text-jarvis-cyan hover:underline"
            >
              {copy.insights.clearFilters}
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

      {selectedNarrative && (
        <NarrativeDetailOverlay
          insight={selectedNarrative}
          onClose={() => setSelectedNarrative(null)}
        />
      )}
    </PageLayout>
  );
};
