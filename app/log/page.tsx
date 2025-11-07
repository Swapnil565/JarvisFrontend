'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageLayout, Modal } from '@/components/ui';
import { MorningMoodFlow } from '@/components/logging/MorningMoodFlow';
import { QuickLogFlow } from '@/components/logging/QuickLogFlow';
import { EndOfDayFlow } from '@/components/logging/EndOfDayFlow';

type LogType = 'morning' | 'quick' | 'endofday' | null;

export default function LogPage() {
  const router = useRouter();
  const [logType, setLogType] = useState<LogType>(null);

  // Determine which flow to show by default based on time
  React.useEffect(() => {
    const hour = new Date().getHours();
    
    // Check if morning mood already logged today
    const lastMorningLog = localStorage.getItem('jarvis_last_morning_log');
    const today = new Date().toDateString();
    const alreadyLoggedToday = lastMorningLog === today;

    if (hour >= 6 && hour < 11 && !alreadyLoggedToday) {
      setLogType('morning');
    } else if (hour >= 20) {
      setLogType('endofday');
    } else {
      setLogType('quick');
    }
  }, []);

  const handleMorningComplete = (data: { mood: number; notes?: string }) => {
    console.log('Morning mood:', data);
    // TODO: Send to API in Phase 9
    localStorage.setItem('jarvis_last_morning_log', new Date().toDateString());
    router.push('/dashboard');
  };

  const handleQuickLogComplete = (data: Record<string, string>) => {
    console.log('Quick log:', data);
    // TODO: Send to API in Phase 9
    router.push('/dashboard');
  };

  const handleEndOfDayComplete = (data: Record<string, string>) => {
    console.log('End of day:', data);
    // TODO: Send to API in Phase 9
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
        <QuickLogFlow onComplete={handleQuickLogComplete} onCancel={handleSkip} />
      )}
      {logType === 'endofday' && (
        <EndOfDayFlow onComplete={handleEndOfDayComplete} onSkip={handleSkip} />
      )}
    </PageLayout>
  );
}
