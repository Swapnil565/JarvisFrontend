"use client";

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error | null;
}

export class ErrorBoundary extends React.Component<{
  children: React.ReactNode;
}, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: any) {
    // You can send error to monitoring here (Sentry etc.)
    console.error('Uncaught error:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-jarvis-deep-navy">
          <div className="glass-card p-8 text-center max-w-md">
            <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-jarvis-soft-gray mb-4">An unexpected error occurred. We'll look into it.</p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="px-4 py-2 rounded-lg bg-jarvis-electric-cyan text-jarvis-deep-navy font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
