"use client";

import React from 'react';

export const IntegrationsModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative bg-jarvis-deep-navy rounded-xl p-6 w-full max-w-md glass-card">
        <h3 className="text-lg font-semibold text-white mb-2">Connect accounts (optional)</h3>
        <p className="text-sm text-jarvis-soft-gray mb-4">Connecting makes it faster, but it isn't required. You can add integrations later in Settings.</p>

        <div className="space-y-3">
          <button className="w-full px-4 py-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1">Connect Google Fit</button>
          <button className="w-full px-4 py-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1">Connect Apple Health</button>
          <button className="w-full px-4 py-3 rounded-lg bg-white/5 text-white focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1">Connect Strava</button>
        </div>

        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="text-sm text-jarvis-soft-gray focus:outline-none focus:ring-2 focus:ring-jarvis-cyan/60 focus:ring-offset-1">Close</button>
        </div>
      </div>
    </div>
  );
};
