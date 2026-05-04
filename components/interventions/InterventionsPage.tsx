'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Users, ArrowLeft } from 'lucide-react';
import { Container, PageLayout } from '@/components/ui';
import { InterventionFeed } from '@/components/interventions/InterventionFeed';
import { Intervention } from '@/types/intervention';
import { interventionsAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

function mapApiIntervention(raw: any): Intervention {
  const data = raw.data || {};
  return {
    id: String(raw.id),
    title: raw.title || '',
    message: raw.message || '',
    reasoning: data.reasoning || '',
    priority: (data.priority || raw.urgency || 'low') as Intervention['priority'],
    category: (data.category || 'general') as Intervention['category'],
    timestamp: raw.created_at || new Date().toISOString(),
    dismissed: !!raw.acknowledged_at,
    snoozedUntil: data.snoozedUntil,
  };
}

export const InterventionsPage: React.FC = () => {
  const { isReady } = useAuth();
  const [interventions, setInterventions] = useState<Intervention[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isReady) return;
    interventionsAPI.getActiveInterventions()
      .then(raw => setInterventions((raw as any[]).map(mapApiIntervention)))
      .catch(() => setInterventions([]))
      .finally(() => setLoading(false));
  }, [isReady]);

  const handleDismiss = (id: string) => {
    setInterventions(prev => prev.filter(i => i.id !== id));
    interventionsAPI.dismissIntervention(id).catch(() => {});
  };

  const handleSnooze = (id: string, hours: number) => {
    const snoozeUntil = new Date(Date.now() + hours * 60 * 60 * 1000).toISOString();
    setInterventions(prev => prev.map(i => (i.id === id ? { ...i, snoozedUntil: snoozeUntil } : i)));
    interventionsAPI.snoozeIntervention(id, snoozeUntil).catch(() => {});
  };

  const handleAction = (id: string, action: string) => {
    interventionsAPI.dismissIntervention(id, action).catch(() => {});
  };

  return (
    <PageLayout>
      <Container size="lg" className="py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <h1 className="heading-xl">Interventions</h1>
              <Users className="text-jarvis-cyan" size={32} />
            </div>
            <button
              onClick={() => router.push('/dashboard')}
              className="text-jarvis-gray hover:text-jarvis-cyan transition-colors text-sm flex items-center gap-1"
            >
              <ArrowLeft size={16} /> Back to dashboard
            </button>
          </div>
          <p className="text-jarvis-gray text-lg">
            Timely nudges to help you stay balanced. Dismiss what doesn't resonate.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-jarvis-cyan mb-1">
              {interventions.length}
            </div>
            <div className="text-sm text-jarvis-gray">Active</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-jarvis-green mb-1">
              {interventions.filter(i => i.priority === 'high').length}
            </div>
            <div className="text-sm text-jarvis-gray">Important</div>
          </div>
          <div className="glass-card p-4 text-center">
            <div className="text-3xl font-bold text-jarvis-amber mb-1">
              {interventions.filter(i => i.priority === 'medium').length}
            </div>
            <div className="text-sm text-jarvis-gray">Heads up</div>
          </div>
        </motion.div>

        {/* Intervention feed */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {loading ? (
            <div className="text-center py-20 text-jarvis-gray">Loading interventions…</div>
          ) : (
            <InterventionFeed
              interventions={interventions}
              onDismiss={handleDismiss}
              onSnooze={handleSnooze}
              onAction={handleAction}
            />
          )}
        </motion.div>

        {/* Help text */}
        {interventions.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 glass-card"
          >
            <h3 className="heading-sm mb-3 flex items-center gap-2">
              <span>💡</span> How interventions work
            </h3>
            <ul className="space-y-2 text-sm text-jarvis-gray">
              <li className="flex items-start gap-2">
                <span className="text-jarvis-cyan">→</span>
                <span>I only show interventions when I'm confident they'll help based on your patterns</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-jarvis-cyan">→</span>
                <span>Swipe left/right to dismiss, or click the X if you don't find it helpful</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-jarvis-cyan">→</span>
                <span>Snooze if the timing isn't right—I'll remind you later</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-jarvis-cyan">→</span>
                <span>Click "Why am I seeing this?" to understand the reasoning behind each nudge</span>
              </li>
            </ul>
          </motion.div>
        )}
      </Container>
    </PageLayout>
  );
};
