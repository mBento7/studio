"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/hooks/use-auth";
import {
  Home,
  LogOut,
  Moon,
  Sun,
  Search,
  User,
  Instagram,
  Facebook,
  Linkedin,
  Twitter,
  Youtube,
  Globe,
  Pencil,
  Eye,
  Gift,
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
import { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";

const socialIconMap: { [key: string]: React.ElementType } = {
  instagram: Instagram,
  facebook: Facebook,
  linkedin: Linkedin,
  twitter: Twitter,
  youtube: Youtube,
  website: Globe,
  other: Globe,
};

export function PublicHeader({ isTransparent = false }: { isTransparent?: boolean }) {
  const { user, loading, signOutUser, currentUserProfile } = useAuth();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const changeNavbarColor = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    if (isTransparent) {
        window.addEventListener("scroll", changeNavbarColor);
    }

    return () => {
      if (isTransparent) {
        window.removeEventListener("scroll", changeNavbarColor);
      }
    };
  }, [isTransparent]);


  useEffect(() => {
    const stored = localStorage.getItem("theme") as "light" | "dark" | null;
    const system = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
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

  const handleLogout = async () => {
    await signOutUser();
  };

  const getInitial = (name: string) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const profileLink = currentUserProfile
    ? `/profile/${currentUserProfile.username}`
    : "/dashboard";

  const headerClasses = cn(
    "fixed top-0 z-50 w-full transition-all duration-300",
    {
      "border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60": !isTransparent || isScrolled,
      "bg-transparent border-none": isTransparent && !isScrolled,
    }
  );


  return (
    <header className={headerClasses}>
      <div className="max-w-screen-2xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
           <Link href="/home" aria-label="Página Inicial" className="flex items-center gap-2 font-bold text-green-600 hover:scale-105 transition-transform">
             <Logo />
           </Link>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link href="/dashboard/feed" className="flex items-center">
            <Button variant="default" size="sm">
              <Home className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Home</span>
            </Button>
          </Link>
          <Link href="/dashboard" className="flex items-center">
            <Button variant="default" size="sm">
              <Pencil className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Editar Perfil</span>
            </Button>
          </Link>
          <Link href={profileLink} className="flex items-center">
            <Button variant="default" size="sm">
              <Eye className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Ver Perfil Público</span>
            </Button>
          </Link>
          <Link href="/dashboard/referrals" className="flex items-center">
            <Button variant="default" size="sm">
              <Gift className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Indique e Ganhe</span>
            </Button>
          </Link>
          <Link href="/dashboard/account" className="flex items-center">
            <Button variant="default" size="sm">
              <User className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Conta</span>
            </Button>
          </Link>
          <Button variant="default" size="sm" onClick={handleLogout} className="flex items-center">
            <LogOut className="h-4 w-4 sm:mr-1.5" />
            <span className="hidden sm:inline">Sair</span>
          </Button>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="default"
            size="sm"
            className="rounded-full"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-5 w-5" />
            ) : (
              <Sun className="h-5 w-5" />
            )}
          </Button>
          {loading ? (
            <div className="w-8 h-8 bg-muted rounded-full animate-pulse" />
          ) : user && currentUserProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="relative h-8 w-8 rounded-full font-semibold transition-colors duration-150 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed bg-gray-700 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-400 active:bg-gray-900">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={currentUserProfile.profilePictureUrl}
                    alt={currentUserProfile.name}
                  />
                  <AvatarFallback>
                    {getInitial(currentUserProfile.name)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {currentUserProfile.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUserProfile.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={profileLink}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/dashboard/feed">
                    <Home className="mr-2 h-4 w-4" />
                    <span>Início</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild size="sm">
              <Link href="/login">Entrar</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
