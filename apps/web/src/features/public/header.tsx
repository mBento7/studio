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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/logo";
import { AvatarRoot, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
          <Button variant="ghost" asChild size="sm">
            <Link href="/search" className="flex items-center">
              <Search className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">Explorar</span>
            </Link>
          </Button>

          {currentUserProfile?.socialLinks?.length > 0 && (
              <div className="hidden lg:flex items-center gap-2">
                {currentUserProfile.socialLinks.map((link: SocialLink) => {
                  const Icon =
                    socialIconMap[link.platform.toLowerCase()] || Globe;
                  return (
                    <Button
                      variant="ghost"
                      size="icon"
                      asChild
                      key={link.id}
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={link.platform}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    </Button>
                  );
                })}
              </div>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
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
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <AvatarRoot className="h-8 w-8">
                    <AvatarImage
                      src={currentUserProfile.profilePictureUrl}
                      alt={currentUserProfile.name}
                    />
                    <AvatarFallback>
                      {getInitial(currentUserProfile.name)}
                    </AvatarFallback>
                  </AvatarRoot>
                </Button>
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
                <DropdownMenuItem asChild>
                  <Link href={profileLink}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Ver Perfil</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
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
