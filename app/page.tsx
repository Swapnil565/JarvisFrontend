'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isOnboarded, setIsOnboarded] = useState(false);

  useEffect(() => {
    // TODO: Check if user is onboarded from localStorage/API in Phase 9
    // For now, let's check localStorage
    const onboardingComplete = localStorage.getItem('jarvis_onboarding_complete');
    
    if (onboardingComplete === 'true') {
      setIsOnboarded(true);
      router.push('/dashboard');
    } else {
      router.push('/onboarding');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-jarvis-navy flex items-center justify-center">
      <div className="text-center">
        <h1 className="heading-xl text-jarvis-cyan mb-4">Loading JARVIS...</h1>
        <p className="text-jarvis-gray">Getting things ready for you</p>
      </div>
    </div>
  );
}