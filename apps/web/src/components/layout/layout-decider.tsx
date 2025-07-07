"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppContainer } from '@/components/layout/app-container';
import { useProfileLayout } from '@/contexts/ProfileLayoutContext';

interface LayoutDeciderProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
  hideRightSidebar?: boolean;
}

export function LayoutDecider({
  children,
  hideSidebar,
  hideRightSidebar,
}: LayoutDeciderProps) {
  const pathname = usePathname();
  const { hideRightSidebar: contextHideRightSidebar } = useProfileLayout();

  if (!pathname) return null;

  // 🟢 Páginas públicas que não usam AppContainer
  const isPublic = ["/", "/home", "/login"].includes(pathname);
  if (isPublic) {
    return <div className="flex flex-col min-h-screen">{children}</div>;
  }

  // 🟡 Página de perfil público → sem sidebar esquerda
  if (pathname.startsWith("/profile/")) {
    return (
      <AppContainer
        hideSidebar
        hideRightSidebar={contextHideRightSidebar}
      >
        {children}
      </AppContainer>
    );
  }

  // 🔵 Página de busca → sem sidebar esquerda
  if (pathname.startsWith("/search")) {
    return (
      <AppContainer
        hideSidebar
        hideRightSidebar={contextHideRightSidebar}
      >
        {children}
      </AppContainer>
    );
  }

  // 🟣 Demais páginas protegidas (ex: feed, dashboard, planos, etc)
  return (
    <AppContainer
      hideSidebar={hideSidebar}
      hideRightSidebar={hideRightSidebar}
    >
      {children}
    </AppContainer>
  );
}
