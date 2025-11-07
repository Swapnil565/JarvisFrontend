"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import ToggleSwitch from './ToggleSwitch';
import TimePicker from './TimePicker';
import DangerButton from './DangerButton';
import ConfirmationModal from './ConfirmationModal';
import { AppSettings } from '@/types/settings';

export default function SettingsPage() {
  // Mock settings - will come from API in Phase 9
  const [settings, setSettings] = useState<AppSettings>({
    notifications: {
      morningCheckInEnabled: true,
      morningCheckInTime: '08:00',
      interventionsEnabled: true,
      insightsEnabled: true,
      weeklyReviewEnabled: true,
    },
    privacy: {
      dataRetentionDays: 365,
      shareAnonymousUsage: false,
    },
    profile: {
      name: 'Alex',
      email: 'alex@example.com',
      joinedDate: '2025-10-01T00:00:00Z',
      totalLogs: 89,
      longestStreak: 28,
      currentStreak: 12,
    },
  });

  const [showExportModal, setShowExportModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showClearDataModal, setShowClearDataModal] = useState(false);

  // Handlers
  const handleNotificationToggle = (key: keyof typeof settings.notifications, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }));
    // TODO: Save to API in Phase 9
  };

  const handleTimeChange = (time: string) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        morningCheckInTime: time,
      },
    }));
    // TODO: Save to API in Phase 9
  };

  const handlePrivacyToggle = (key: keyof typeof settings.privacy, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }));
    // TODO: Save to API in Phase 9
  };

  const handleDataRetentionChange = (days: number) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        dataRetentionDays: days,
      },
    }));
    // TODO: Save to API in Phase 9
  };

  const handleExportData = () => {
    console.log('Exporting data...');
    // TODO: API call to export data in Phase 9
    // This should download a JSON file with all user data
  };

  const handleClearData = () => {
    console.log('Clearing all data...');
    // TODO: API call to clear data in Phase 9
    // Reset to onboarding state
  };

  const handleDeleteAccount = () => {
    console.log('Deleting account...');
    // TODO: API call to delete account in Phase 9
    // Redirect to goodbye page
  };

  const daysSinceJoined = Math.floor(
    (Date.now() - new Date(settings.profile.joinedDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-jarvis-deep-navy pb-20">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-jarvis-deep-navy/80 backdrop-blur-xl border-b border-jarvis-soft-gray/10">
        <div className="container mx-auto px-6 py-6">
          <button
            onClick={() => window.history.back()}
            className="text-jarvis-soft-gray hover:text-white transition-colors mb-2"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-sm text-jarvis-soft-gray mt-1">
            Your data. Your control.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-2xl space-y-6">
        {/* Profile Section */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>👤</span>
            <span>Profile</span>
          </h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-xs text-jarvis-soft-gray mb-1">Name</p>
              <p className="text-sm text-white">{settings.profile.name || 'Not set'}</p>
            </div>
            
            <div>
              <p className="text-xs text-jarvis-soft-gray mb-1">Email</p>
              <p className="text-sm text-white">{settings.profile.email || 'Not set'}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-jarvis-soft-gray/10">
              <div>
                <p className="text-xs text-jarvis-soft-gray mb-1">Days with JARVIS</p>
                <p className="text-2xl font-bold text-jarvis-electric-cyan">{daysSinceJoined}</p>
              </div>
              <div>
                <p className="text-xs text-jarvis-soft-gray mb-1">Total logs</p>
                <p className="text-2xl font-bold text-jarvis-electric-cyan">{settings.profile.totalLogs}</p>
              </div>
              <div>
                <p className="text-xs text-jarvis-soft-gray mb-1">Best streak</p>
                <p className="text-2xl font-bold text-jarvis-electric-cyan">{settings.profile.longestStreak}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔔</span>
            <span>Notifications</span>
          </h2>
          
          <div className="space-y-4">
            <ToggleSwitch
              enabled={settings.notifications.morningCheckInEnabled}
              onChange={(val) => handleNotificationToggle('morningCheckInEnabled', val)}
              label="Morning check-in"
              description="Get a reminder to log your morning mood"
            />
            
            {settings.notifications.morningCheckInEnabled && (
              <div className="pl-4 border-l-2 border-jarvis-electric-cyan/30">
                <TimePicker
                  value={settings.notifications.morningCheckInTime}
                  onChange={handleTimeChange}
                  label="Check-in time"
                />
              </div>
            )}

            <ToggleSwitch
              enabled={settings.notifications.interventionsEnabled}
              onChange={(val) => handleNotificationToggle('interventionsEnabled', val)}
              label="Interventions"
              description="Get proactive nudges when patterns suggest burnout risk"
            />

            <ToggleSwitch
              enabled={settings.notifications.insightsEnabled}
              onChange={(val) => handleNotificationToggle('insightsEnabled', val)}
              label="New insights"
              description="Get notified when we discover a new pattern"
            />

            <ToggleSwitch
              enabled={settings.notifications.weeklyReviewEnabled}
              onChange={(val) => handleNotificationToggle('weeklyReviewEnabled', val)}
              label="Weekly review"
              description="Get a summary every Monday morning"
            />
          </div>
        </motion.div>

        {/* Privacy Section */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>🔒</span>
            <span>Privacy & Data</span>
          </h2>
          
          <div className="space-y-4">
            {/* Data Retention */}
            <div>
              <label className="text-sm font-medium text-white mb-2 block">
                Data retention
              </label>
              <p className="text-xs text-jarvis-soft-gray mb-3">
                How long should we keep your data?
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[30, 90, 365, -1].map((days) => (
                  <button
                    key={days}
                    onClick={() => handleDataRetentionChange(days)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      settings.privacy.dataRetentionDays === days
                        ? 'bg-jarvis-electric-cyan/20 text-jarvis-electric-cyan border-2 border-jarvis-electric-cyan'
                        : 'bg-jarvis-deep-navy/50 text-jarvis-soft-gray border-2 border-jarvis-soft-gray/20 hover:border-jarvis-soft-gray/40'
                    }`}
                  >
                    {days === -1 ? 'Forever' : `${days} days`}
                  </button>
                ))}
              </div>
            </div>

            <ToggleSwitch
              enabled={settings.privacy.shareAnonymousUsage}
              onChange={(val) => handlePrivacyToggle('shareAnonymousUsage', val)}
              label="Share anonymous usage data"
              description="Help us improve JARVIS. No personal data shared."
            />

            {/* Info box */}
            <div className="mt-4 p-4 rounded-lg bg-jarvis-electric-cyan/10 border border-jarvis-electric-cyan/20">
              <p className="text-xs text-jarvis-soft-gray">
                <span className="font-semibold text-jarvis-electric-cyan">Your privacy matters:</span> All data is encrypted end-to-end. 
                We never sell your data. You can export or delete everything anytime.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Data Management Section */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>📦</span>
            <span>Data Management</span>
          </h2>
          
          <div className="space-y-3">
            <button
              onClick={() => setShowExportModal(true)}
              className="w-full px-4 py-3 rounded-lg bg-jarvis-deep-navy/50 
                text-white font-medium text-sm hover:bg-jarvis-deep-navy/70 
                transition-colors flex items-center justify-center gap-2"
            >
              <span>📥</span>
              <span>Export all data</span>
            </button>

            <DangerButton
              onClick={() => setShowClearDataModal(true)}
              label="Clear all data"
              icon="🗑️"
            />

            <DangerButton
              onClick={() => setShowDeleteModal(true)}
              label="Delete account"
              icon="⚠️"
            />
          </div>

          <p className="text-xs text-jarvis-soft-gray mt-4">
            Export downloads a JSON file with all your data. Clear data resets JARVIS but keeps your account. 
            Delete account removes everything permanently.
          </p>
        </motion.div>

        {/* App Info */}
        <motion.div
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            <span>ℹ️</span>
            <span>About</span>
          </h2>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-jarvis-soft-gray">Version</span>
              <span className="text-white">1.0.0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-jarvis-soft-gray">Last updated</span>
              <span className="text-white">Oct 27, 2025</span>
            </div>
            <button className="text-jarvis-electric-cyan hover:underline text-sm mt-2">
              View changelog
            </button>
          </div>
        </motion.div>
      </div>

      {/* Modals */}
      <ConfirmationModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        onConfirm={handleExportData}
        title="Export your data"
        message="We'll download a JSON file with all your logs, patterns, and settings. This may take a moment."
        confirmLabel="Export"
      />

      <ConfirmationModal
        isOpen={showClearDataModal}
        onClose={() => setShowClearDataModal(false)}
        onConfirm={handleClearData}
        title="Clear all data?"
        message="This will delete all your logs, patterns, and insights. Your account will remain active. This cannot be undone."
        confirmLabel="Clear data"
        isDangerous={true}
      />

      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteAccount}
        title="Delete account?"
        message="This will permanently delete your account and all data. You cannot undo this. We'll miss you."
        confirmLabel="Delete forever"
        cancelLabel="Keep account"
        isDangerous={true}
      />
    </div>
  );
}
