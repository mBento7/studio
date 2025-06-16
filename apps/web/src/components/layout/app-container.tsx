"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { SidebarNav } from '@/features/dashboard/sidebar-nav';
import { PublicHeader } from '@/features/public/header';
import { cn } from '@/lib/utils';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function AppContainer({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Since LayoutDecider now handles what pages get this container,
  // we can assume that if a user is logged in, they should see the sidebar.
  const showSidebar = !loading && user;

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
      <div className="flex flex-1 pt-16">
        {showSidebar && (
          <aside
            className={cn(
              "flex-shrink-0 h-full min-h-screen bg-muted text-muted-foreground border-r shadow-sm transition-all duration-300 flex flex-col relative pt-16",
              isSidebarOpen ? "w-56" : "w-16"
            )}
          >
            <SidebarNav isSidebarOpen={isSidebarOpen} toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="absolute top-1/2 -right-3 -translate-y-1/2 z-50">
              <Button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                size="icon"
                variant="ghost"
                className="h-7 w-7 rounded-full shadow border border-border bg-card/70 backdrop-blur-sm hover:bg-accent/40 transition"
              >
                {isSidebarOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              </Button>
            </div>
          </aside>
        )}
        <main className="flex-1 overflow-x-auto">
          <div className="p-0 md:p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
