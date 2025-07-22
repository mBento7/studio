'use client';
import { ChatMessengerCard } from '@/components/chat';
import { useRouter } from 'next/navigation';
import React from 'react';
import { LayoutDecider } from '@/components/layout/layout-decider';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [minimized, setMinimized] = React.useState(false);
  return (
    <LayoutDecider>
      {children}
      <ChatMessengerCard
        minimized={minimized}
        onOpenMessages={() => router.push('/dashboard/messages')}
        onMinimize={() => setMinimized(!minimized)}
      />
    </LayoutDecider>
  );
}
