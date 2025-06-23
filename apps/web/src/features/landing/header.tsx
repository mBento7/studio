"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useAuth } from "@/hooks/use-auth";
import {
  Home,
  LogOut,
  Moon,
  Search,
  Sun,
  User,
  Crown,
  Bell,
  PlusSquare,
  Settings,
  UserCog,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

export function PublicHeader({ isTransparent = false }: { isTransparent?: boolean }) {
  const { user, loading, signOutUser, currentUserProfile } = useAuth();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (isTransparent) {
      const handleScroll = () => setIsScrolled(window.scrollY > 10);
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isTransparent]);

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    const initTheme = stored || system;
    setThemeMode(initTheme);
  }, []);

  const setThemeMode = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.remove("dark");
    if (newTheme === 'dark') {
      document.documentElement.classList.add("dark");
    }
  };

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setThemeMode(next);
  };

  const handleLogout = async () => await signOutUser();

  const profileLink = currentUserProfile ? `/profile/${currentUserProfile.username}` : "/dashboard";

  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    {
      "border-b border-border/40 bg-background/80 backdrop-blur-md": !isTransparent || isScrolled,
      "bg-transparent border-none": isTransparent && !isScrolled,
    }
  );

  const navLinks = [
    { href: "/dashboard/feed", label: "Home", icon: Home },
    { href: "/search", label: "Buscar", icon: Search },
    { href: "/create", label: "Criar", icon: PlusSquare },
  ];

  return (
    <header className={headerClasses}>
      <div className="relative max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/home" aria-label="Página Inicial" className="flex items-center gap-2 font-bold text-green-600 hover:scale-105 transition-transform">
            <Logo className="h-12 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 flex justify-center items-center gap-2 sm:gap-4">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Button key={href} asChild variant={isActive ? "default" : "outline"} className={cn(
                "rounded-full transition-all duration-300 ease-in-out",
                isActive
                  ? "bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md"
                  : "border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094]"
              )}>
                <Link href={href}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <Button
            asChild
            variant={pathname === "/planos" ? "premium" : "premium"}
            className={cn(
              "rounded-full font-semibold px-4 py-2 mr-2 transition-all duration-300 ease-in-out group overflow-hidden",
              pathname === "/planos" && "ring-2 ring-yellow-400"
            )}
          >
            <Link href="/planos" className="flex items-center justify-center">
              <Crown className="h-4 w-4 transition-all duration-300" />
              <span
                className="max-w-0 overflow-hidden opacity-0 group-hover:max-w-xs group-hover:opacity-100 group-hover:ml-2 transition-all duration-300 hidden sm:inline"
                style={{ display: 'inline-block' }}
              >
                Planos
              </span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-[#0e9094]/10 hover:text-[#0e9094]"
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full text-muted-foreground hover:bg-[#0e9094]/10 hover:text-[#0e9094]"
            aria-label="Notificações"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {loading ? (
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          ) : user && currentUserProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-8 w-8 rounded-full focus:outline-none">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={currentUserProfile.profilePictureUrl}
                    alt={currentUserProfile.name}
                  />
                  <AvatarFallback>
                    {currentUserProfile.name?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{currentUserProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUserProfile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={profileLink}>
                    <User className="mr-2 h-4 w-4" />
                    Ver Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">
                    <UserCog className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account">
                    <Settings className="mr-2 h-4 w-4" />
                    Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" className="border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094] rounded-full">
              <Link href="/login">
                Entrar
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
