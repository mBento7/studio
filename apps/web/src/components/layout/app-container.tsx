"use client";

import React, { useState } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { SidebarNav } from '@/features/dashboard/sidebar-nav';
import { PublicHeader } from '@/features/public/header';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

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

  // Render the standard app shell
  return (
    <div className="flex h-screen flex-col">
      <PublicHeader />
      <div className="flex flex-1 pt-16">
        {showSidebar && (
          <SidebarNav 
            isSidebarOpen={isSidebarOpen} 
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
          />
        )}
        <main className={cn(
          "flex-1 overflow-auto transition-all duration-300",
          showSidebar && (isSidebarOpen ? "lg:ml-64 md:ml-16" : "lg:ml-16 md:ml-16")
        )}>
           <div className="p-0 md:p-6">
             {children}
           </div>
        </main>
      </div>
    </div>
  );
}
