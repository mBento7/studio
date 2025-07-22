'use client';

import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import PublicHeader from '@/features/landing/header';
import { Loader2 } from 'lucide-react';
import { LeftProfileSidebar } from './left-profile-sidebar';
import { RightWidgetsColumn } from './right-widgets-column';

/**
 * Componente de grid responsivo principal.
 */
export function MainGridLayout({
  children,
  leftSidebar,
  rightSidebar
}: {
  children: React.ReactNode;
  leftSidebar?: React.ReactNode;
  rightSidebar?: React.ReactNode;
}) {
  const hasLeft = !!leftSidebar;
  const hasRight = !!rightSidebar;

  // Grid responsivo com 1 a 3 colunas (em telas grandes)
  let gridCols = 'grid-cols-1';
  if (hasLeft && hasRight) gridCols = 'lg:grid-cols-[280px_1fr_320px]';
  else if (hasLeft) gridCols = 'lg:grid-cols-[280px_1fr]';
  else if (hasRight) gridCols = 'lg:grid-cols-[1fr_320px]';

  return (
    <div className={`grid ${gridCols} gap-6 px-4 lg:px-8 py-6 max-w-screen-xl mx-auto min-h-0 scrollbar-hide`}>
      {hasLeft && (
        <aside className="order-2 lg:order-1 hidden lg:flex flex-col h-full scrollbar-hide sticky top-0">
          {leftSidebar}
        </aside>
      )}

      <section className="order-1 lg:order-2 min-w-0 w-full h-full overflow-y-auto scrollbar-hide">{children}</section>

      {hasRight && (
        <aside className="order-3 sticky top-0 self-start hidden lg:flex flex-col h-full scrollbar-hide">
          {rightSidebar}
        </aside>
      )}
    </div>
  );
}

/**
 * Componente que envolve toda a estrutura da página protegida/pública.
 */
export function AppContainer({
  children,
  hideSidebar = false,
  hideRightSidebar = false
}: {
  children: React.ReactNode;
  hideSidebar?: boolean;
  hideRightSidebar?: boolean;
}) {
  const { loading, user, currentUserProfile } = useAuth();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background text-foreground">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <PublicHeader />
      <main className="flex-1 pt-16">
        <MainGridLayout
          leftSidebar={
            !hideSidebar && user && currentUserProfile ? (
              <LeftProfileSidebar profile={currentUserProfile} />
            ) : undefined
          }
          rightSidebar={!hideRightSidebar && user ? <RightWidgetsColumn /> : undefined}
        >
          {children}
        </MainGridLayout>
      </main>
    </div>
  );
}
