'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout } from '@/components/ui';
import { MorningMoodFlow } from '@/components/logging/MorningMoodFlow';
import { QuickLogFlow } from '@/components/logging/QuickLogFlow';
import { EndOfDayFlow } from '@/components/logging/EndOfDayFlow';
import { VoiceLog } from '@/components/logging/VoiceLog';
import { loggingAPI } from '@/lib/api';

type LogType = 'morning' | 'quick' | 'endofday' | null;

export default function LogPage() {
  const router = useRouter();
  const [logType, setLogType] = useState<LogType>(null);

  React.useEffect(() => {
    const hour = new Date().getHours();
    const lastMorningLog = localStorage.getItem('jarvis_last_morning_log');
    const alreadyLoggedToday = lastMorningLog === new Date().toDateString();

    if (hour >= 6 && hour < 11 && !alreadyLoggedToday) {
      setLogType('morning');
    } else if (hour >= 20) {
      setLogType('endofday');
    } else {
      setLogType('quick');
    }
  }, []);

  const handleMorningComplete = (data: { mood: number; notes?: string }) => {
    loggingAPI.submitLog({
      type: 'morning_mood',
      timestamp: new Date().toISOString(),
      data: { mood: data.mood, notes: data.notes || '' },
    }).catch(() => {});
    localStorage.setItem('jarvis_last_morning_log', new Date().toDateString());
    router.push('/dashboard');
  };

  const handleQuickLogComplete = (data: Record<string, string>) => {
    loggingAPI.submitLog({
      type: 'quick_log',
      timestamp: new Date().toISOString(),
      data,
    }).catch(() => {});
    router.push('/dashboard');
  };

  const handleVoiceLogComplete = (data: { transcript: string; tags: string[] }) => {
    loggingAPI.submitLog({
      type: 'quick_log',
      timestamp: new Date().toISOString(),
      data: { transcript: data.transcript, tags: data.tags.join(','), event_type: 'voice_note' },
    }).catch(() => {});
    router.push('/dashboard');
  };

  const handleEndOfDayComplete = (data: Record<string, string>) => {
    loggingAPI.submitLog({
      type: 'end_of_day',
      timestamp: new Date().toISOString(),
      data,
    }).catch(() => {});
    router.push('/dashboard');
  };

  const handleSkip = () => {
    router.push('/dashboard');
  };

  return (
    <PageLayout>
      {logType === 'morning' && (
        <MorningMoodFlow onComplete={handleMorningComplete} onSkip={handleSkip} />
      )}
      {logType === 'quick' && (
        <VoiceLog onComplete={handleVoiceLogComplete} onCancel={handleSkip} />
      )}
      {logType === 'endofday' && (
        <EndOfDayFlow onComplete={handleEndOfDayComplete} onSkip={handleSkip} />
      )}
    </PageLayout>
  );
}
