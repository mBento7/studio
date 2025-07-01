'use client';
import { ChatMessengerCard } from '@/components/chat';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [minimized, setMinimized] = React.useState(false);
  return (
    <>
      {children}
      <ChatMessengerCard
        minimized={minimized}
        onOpenMessages={() => router.push('/dashboard/messages')}
        onMinimize={() => setMinimized(!minimized)}
      />
    </>
  );
} 