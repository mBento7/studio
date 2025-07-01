"use client";

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { PublicHeader } from '@/features/landing/header';
import { Loader2 } from 'lucide-react';
import { LeftProfileSidebar } from './left-profile-sidebar';
import { RightWidgetsColumn } from './right-widgets-column';

// Novo componente reutilizável de grid
export function MainGridLayout({
  children,
  leftSidebar,
  rightSidebar,
}: {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}) {
  const hasLeft = !!leftSidebar;
  const hasRight = !!rightSidebar;

  let gridCols = 'grid-cols-1';
  if (hasLeft && hasRight) gridCols = 'lg:grid-cols-[280px_1fr_320px]';
  else if (hasLeft) gridCols = 'lg:grid-cols-[280px_1fr]';
  else if (hasRight) gridCols = 'lg:grid-cols-[1fr_320px]';
  else gridCols = 'grid-cols-1';

  console.log('MainGridLayout', { hasLeft, hasRight, gridCols, rightSidebar });

  return (
    <div className={`max-w-screen-xl mx-auto grid ${gridCols} gap-6 p-4 items-start min-h-[calc(100vh-4rem)]`}>
      {hasLeft && <div className="order-2 lg:order-1 h-full self-start lg:sticky lg:top-20">{leftSidebar}</div>}
      <div className="min-w-0 h-full self-stretch flex flex-col order-1 lg:order-2">{children}</div>
      {hasRight && <div className="order-3 lg:order-3 h-full self-start lg:sticky lg:top-20">{rightSidebar}</div>}
    </div>
  );
}

export function AppContainer({ children, hideSidebar = false, hideRightSidebar = false }: { children: React.ReactNode, hideSidebar?: boolean, hideRightSidebar?: boolean }) {
  const { loading, user, currentUserProfile } = useAuth();

  console.log('AppContainer hideRightSidebar:', hideRightSidebar);

  // Mock de dados do usuário (substitua por dados reais do contexto/auth futuramente)
  const mockProfile = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    profilePictureUrl: '',
    username: 'joaosilva',
    progress: 85,
    stats: { views: 1234, connections: 89, projects: 12 },
  };

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <PublicHeader />
      <main className={`flex-1 bg-transparent ${hideSidebar && hideRightSidebar ? '' : 'pt-16'}`}>
        <MainGridLayout
          leftSidebar={!hideSidebar && user ? <LeftProfileSidebar profile={currentUserProfile || mockProfile} /> : null}
          rightSidebar={!hideRightSidebar && user ? <RightWidgetsColumn /> : null}
        >
          {children}
        </MainGridLayout>
      </main>
    </div>
  );
}
