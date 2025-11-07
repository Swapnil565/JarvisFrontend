'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { WelcomeScreen } from './WelcomeScreen';
import { PrivacyScreen } from './PrivacyScreen';
import { QuestionScreen } from './QuestionScreen';
import { HypothesisScreen } from './HypothesisScreen';
import { MorningCheckInScreen } from './MorningCheckInScreen';
import { BeforeStartScreen } from './BeforeStartScreen';
import { IntegrationsModal } from './IntegrationsModal';
import { useEffect } from 'react';

export interface OnboardingData {
  liftingFrequency?: string;
  stressLevel?: string;
  sleepQuality?: string;
  workIntensity?: string;
  morningCheckInTime?: string;
  // flags from BeforeStartScreen
  skippedIntegration?: boolean;
  openIntegrations?: boolean;
}

type OnboardingStep = 
  | 'welcome'
  | 'privacy'
  | 'beforeStart'
  | 'lifting'
  | 'stress'
  | 'sleep'
  | 'work'
  | 'hypothesis'
  | 'morningCheckIn';

export const OnboardingFlow: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [data, setData] = useState<OnboardingData>({});
  const [showIntegrations, setShowIntegrations] = useState<boolean>(false);

  const handleNext = (stepData?: Partial<OnboardingData>) => {
    if (stepData) {
      setData(prev => ({ ...prev, ...stepData }));

      // Persist any integration-related flags so other parts of the app
      // (like an integrations modal or settings screen) can pick them up.
      try {
        if ((stepData as any).openIntegrations) {
          localStorage.setItem('jarvis_open_integrations', 'true');
          // open integrations modal immediately
          setShowIntegrations(true);
        }
        if ((stepData as any).skippedIntegration) {
          localStorage.setItem('jarvis_skipped_integrations', 'true');
        }
      } catch (e) {
        console.warn('Could not persist onboarding flags', e);
      }
    }

    const stepOrder: OnboardingStep[] = [
      'welcome',
      'privacy',
      'beforeStart',
      'lifting',
      'stress',
      'sleep',
      'work',
      'hypothesis',
      'morningCheckIn'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    const stepOrder: OnboardingStep[] = [
      'welcome',
      'privacy',
      'beforeStart',
      'lifting',
      'stress',
      'sleep',
      'work',
      'hypothesis',
      'morningCheckIn'
    ];

    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex > 0) {
      setCurrentStep(stepOrder[currentIndex - 1]);
    }
  };

  const handleComplete = async () => {
    // TODO: Send data to backend in Phase 9
    console.log('Onboarding complete:', data);
    
    // Mark onboarding as complete
    localStorage.setItem('jarvis_onboarding_complete', 'true');
    
    // Redirect to dashboard
    router.push('/dashboard');
  };

  useEffect(() => {
    try {
      const shouldOpen = localStorage.getItem('jarvis_open_integrations');
      if (shouldOpen === 'true') setShowIntegrations(true);
    } catch (e) {
      // ignore
    }
  }, []);

  const slideVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 }
  };

  return (
    <div className="min-h-screen bg-jarvis-navy flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.3 }}
          className="w-full max-w-2xl"
        >
          {currentStep === 'welcome' && (
            <WelcomeScreen onNext={handleNext} />
          )}
          {currentStep === 'privacy' && (
            <PrivacyScreen onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 'beforeStart' && (
            <BeforeStartScreen onNext={handleNext} onBack={handleBack} />
          )}
          {currentStep === 'lifting' && (
            <QuestionScreen
              question="How often do you lift?"
              subtitle="Quick estimate"
              options={[
                { label: '5-7x per week', value: '5-7', rationale: 'Great — you’ll get strong signal fast.' },
                { label: '3-4x per week', value: '3-4', rationale: 'Solid consistency — good data.' },
                { label: '1-2x per week', value: '1-2', rationale: 'We’ll still learn trends over time.' },
                { label: 'Just getting started', value: 'beginner', rationale: 'Perfect — we’ll track your progress.' }
              ]}
              dataKey="liftingFrequency"
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 'stress' && (
            <QuestionScreen
              question="How's your stress level lately?"
              subtitle="Short answer"
              options={[
                { label: "I'm crushing it", value: 'low', rationale: 'Nice — we’ll watch for sustained low stress.' },
                { label: 'Manageable, mostly', value: 'medium', rationale: 'Typical—good baseline to compare.' },
                { label: 'Pretty high tbh', value: 'high', rationale: 'We can look for drivers and patterns.' },
                { label: "I'm drowning", value: 'very-high', rationale: 'We’ll highlight quick wins and gentle interventions.' }
              ]}
              dataKey="stressLevel"
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 'sleep' && (
            <QuestionScreen
              question="How's your sleep been?"
              subtitle="Past week"
              options={[
                { label: '7-9 hours, solid', value: 'good', rationale: 'Strong sleep — expect clearer patterns.' },
                { label: '6-7 hours, okay', value: 'fair', rationale: 'Average — we’ll watch trends.' },
                { label: 'Under 6 hours', value: 'poor', rationale: 'Short sleep — interventions may help.' },
                { label: 'All over the place', value: 'inconsistent', rationale: 'Irregular sleep — we’ll detect variance.' }
              ]}
              dataKey="sleepQuality"
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 'work' && (
            <QuestionScreen
              question="How intense is work right now?"
              subtitle="Short answer"
              options={[
                { label: 'Cruising—steady pace', value: 'low', rationale: 'Low load — great for focus.' },
                { label: 'Busy but manageable', value: 'medium', rationale: 'Typical busy period — we’ll track load.' },
                { label: 'Packed—lots of context switching', value: 'high', rationale: 'High interruptions — may affect recovery.' },
                { label: 'Non-stop—barely breathing', value: 'very-high', rationale: 'Consider micro-breaks; we can suggest interventions.' }
              ]}
              dataKey="workIntensity"
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 'hypothesis' && (
            <HypothesisScreen
              data={data}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          {currentStep === 'morningCheckIn' && (
            <MorningCheckInScreen
              onNext={handleNext}
              onBack={handleBack}
            />
          )}
          <IntegrationsModal open={showIntegrations} onClose={() => setShowIntegrations(false)} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
