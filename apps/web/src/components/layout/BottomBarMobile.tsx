import React from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, PlusCircle, Bell, User } from "lucide-react";

export function BottomBarMobile() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-background z-50 flex justify-around items-center py-2 border-t md:hidden">
      <Button variant="ghost" size="icon" aria-label="Home">
        <Home className="w-6 h-6" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Buscar">
        <Search className="w-6 h-6" />
      </Button>
      <Button variant="action" size="icon" aria-label="Criar">
        <PlusCircle className="w-7 h-7" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Notificações">
        <Bell className="w-6 h-6" />
      </Button>
      <Button variant="ghost" size="icon" aria-label="Perfil">
        <User className="w-6 h-6" />
      </Button>
    </nav>
  );
} 