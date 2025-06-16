"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppContainer } from '@/components/layout/app-container';
import { PublicHeader } from '@/features/public/header';
import { PublicFooter } from '@/features/public/footer';

export function LayoutDecider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const publicPages = ['/home', '/login', '/'];

  if (publicPages.includes(pathname)) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  // Se não for uma página pública, usa o layout do aplicativo com sidebar
  return <AppContainer>{children}</AppContainer>;
}
