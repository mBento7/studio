"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import {
  Home,
  LogOut,
  Moon,
  Sun,
  User,
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
import { WhosdoLogo } from "@/components/common/whosdo-logo";

export function PublicHeader({ isTransparent = false }: { isTransparent?: boolean }) {
  const { user, loading, signOutUser, currentUserProfile } = useAuth();
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
    setTheme(initTheme);
    document.documentElement.classList.toggle("dark", initTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark", next === "dark");
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

  const navButtonStyles =
    "px-4 py-2 rounded-full font-semibold text-sm shadow-sm transition hover:brightness-110";

  return (
    <header className={headerClasses}>
      <div className="relative max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/home" aria-label="Página Inicial" className="flex items-center gap-2 font-bold text-green-600 hover:scale-105 transition-transform">
            <WhosdoLogo />
          </Link>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/dashboard/feed">
            <button
              className={cn(
                navButtonStyles,
                "bg-emerald-600 text-white hover:bg-emerald-700"
              )}
            >
              <Home className="h-4 w-4 mr-1 inline-block" />
              <span className="hidden sm:inline">Home</span>
            </button>
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <button
            className="rounded-full p-2 bg-muted text-muted-foreground hover:bg-muted-foreground/10 transition"
            onClick={toggleTheme}
            aria-label="Alternar tema"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

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
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <button
                className={cn(
                  navButtonStyles,
                  "bg-white text-foreground border border-border hover:bg-muted"
                )}
              >
                Entrar
              </button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
