"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { AppContainer } from '@/components/layout/app-container';
import { useProfileLayout } from '@/contexts/ProfileLayoutContext';

interface LayoutDeciderProps {
  children: React.ReactNode;
  hideSidebar?: boolean;
}

export function LayoutDecider({ children, hideSidebar }: LayoutDeciderProps) {
  const pathname = usePathname();
  const { hideRightSidebar, layoutTier } = useProfileLayout();

  const publicPages = ['/home', '/login', '/'];

  if (publicPages.includes(pathname)) {
    return (
      <div className="flex flex-col min-h-screen">
        {children}
      </div>
    );
  }

  // Se for página de perfil público, oculta a sidebar
  if (pathname.startsWith('/profile/')) {
    // Usa AppContainer para garantir que o header/nav principal sempre apareça
    // Exemplo: pode usar layoutTier === 'premium' para outras regras
    return <AppContainer hideSidebar={true} hideRightSidebar={hideRightSidebar}>{children}</AppContainer>;
  }

  // Oculta a coluna esquerda na página de busca
  if (pathname.startsWith('/search')) {
    return <AppContainer hideSidebar={true} hideRightSidebar={hideRightSidebar}>{children}</AppContainer>;
  }

  // Se não for uma página pública, usa o layout do aplicativo com sidebar
  return <AppContainer hideSidebar={hideSidebar}>{children}</AppContainer>;
}
