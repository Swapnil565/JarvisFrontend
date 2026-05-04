'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
const DEMO_EMAIL = 'demo@jarvis.app';
const DEMO_PASSWORD = 'Jarvis2025!';
const TOKEN_KEY = 'jarvis_token';

interface AuthContextValue {
  token: string | null;
  isReady: boolean;
}

const AuthContext = createContext<AuthContextValue>({ token: null, isReady: false });

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(TOKEN_KEY);
    if (stored) {
      setToken(stored);
      setIsReady(true);
      return;
    }
    // Auto-login as demo user
    (async () => {
      try {
        // First ensure seed data exists
        await fetch(`${API_BASE}/api/seed`, { method: 'POST' }).catch(() => {});

        const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: DEMO_EMAIL, password: DEMO_PASSWORD }),
        });
        if (res.ok) {
          const data = await res.json();
          const t = data.access_token || data.token || '';
          if (t) {
            localStorage.setItem(TOKEN_KEY, t);
            setToken(t);
          }
        }
      } catch {
        // silently continue — API might be offline
      } finally {
        setIsReady(true);
      }
    })();
  }, []);

  return <AuthContext.Provider value={{ token, isReady }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
