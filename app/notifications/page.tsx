'use client';

import React from 'react';
import { Container, PageLayout } from '@/components/ui';

export default function NotificationsPage() {
  return (
    <PageLayout>
      <Container size="lg" className="py-8">
        <h1 className="heading-lg mb-6">Notifications</h1>
        <div className="glass-card p-6 text-center text-jarvis-gray">
          <p>No new notifications.</p>
        </div>
      </Container>
    </PageLayout>
  );
}
