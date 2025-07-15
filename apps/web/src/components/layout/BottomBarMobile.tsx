"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";

export function BottomBarMobile() {
  const router = useRouter();

  const handleSearchClick = () => {
    router.push('/search');
  };

  const handleHomeClick = () => {
    router.push('/dashboard/feed');
  };

  const handleCreateClick = () => {
    router.push('/create');
  };

  const handleNotificationsClick = () => {
    router.push('/dashboard/notifications');
  };

  const handleProfileClick = () => {
    router.push('/dashboard');
  };

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background z-50 flex justify-around items-center py-2 border-t md:hidden">
      <Button variant="ghost" size="icon" aria-label="Home" onClick={handleHomeClick}>
        <Home className="w-6 h-6" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Buscar" onClick={handleSearchClick}>
        <Search className="w-6 h-6" />
      </Button>
      <Button variant="action" size="icon" aria-label="Criar" onClick={handleCreateClick}>
        <PlusCircle className="w-7 h-7" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Notificações" onClick={handleNotificationsClick}>
        <Bell className="w-6 h-6" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Perfil" onClick={handleProfileClick}>
        <User className="w-6 h-6" />
      </Button>
    </nav>
  );
}