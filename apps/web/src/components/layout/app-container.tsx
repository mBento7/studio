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
  return (
    <div className="max-w-full mx-auto grid grid-cols-1 lg:grid-cols-[16rem_1fr_16rem] gap-1 p-0 md:p-2 px-0 items-stretch min-h-[calc(100vh-4rem)]">
      {/* Coluna esquerda (sidebar) */}
      <div className="hidden lg:block sticky top-20 h-full self-stretch">
        {leftSidebar}
      </div>
      {/* Conteúdo principal */}
      <div className="min-w-0 h-full self-stretch flex flex-col">
        {children}
      </div>
      {/* Coluna direita (widgets) */}
      <div className="hidden lg:block sticky top-20 h-full self-stretch">
        {rightSidebar}
      </div>
    </div>
  );
}

export function AppContainer({ children }: { children: React.ReactNode }) {
  const { loading } = useAuth();

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
      <main className="flex-1 overflow-x-hidden pt-16">
        <MainGridLayout
          leftSidebar={<LeftProfileSidebar profile={mockProfile} />}
          rightSidebar={<RightWidgetsColumn />}
        >
          {children}
        </MainGridLayout>
      </main>
    </div>
  );
}
