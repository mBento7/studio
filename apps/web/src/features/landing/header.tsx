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
import { IoHomeOutline, IoSearchOutline, IoAddCircleOutline, IoCameraOutline, IoShareSocialOutline, IoHeartOutline, IoNotificationsOutline, IoSunnyOutline, IoMoonOutline, IoLogInOutline, IoDiamondOutline, IoVideocam, IoChatbubbleEllipsesOutline } from 'react-icons/io5';

export function PublicHeader({ isTransparent = false }: { isTransparent?: boolean }) {
  const { user, loading, signOutUser, currentUserProfile } = useAuth();
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

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

  useEffect(() => {
    if (!user?.id) return;
    const fetchUnread = async () => {
      // Busca conversas onde há mensagens não lidas para o usuário logado
      // Supondo que a tabela messages tenha um campo 'read_by' (array de user_id)
      // Se não existir, só conta mensagens onde sender_id != user.id
      const { data, error } = await fetch(`/api/unread-messages?userId=${user.id}`).then(r => r.json());
      if (!error && data) setUnreadCount(data.count);
    };
    fetchUnread();
  }, [user?.id]);

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
    "fixed top-0 z-50 w-full transition-all duration-500",
    {
      "border-b border-border/40 bg-background/80 backdrop-blur-lg shadow-lg": !isTransparent || isScrolled,
      "bg-transparent border-none backdrop-blur-lg": isTransparent && !isScrolled,
    }
  );

  const navLinks = [
    { href: "/dashboard/feed", label: "Home", icon: IoHomeOutline },
    { href: "/search", label: "Buscar", icon: IoSearchOutline },
    { href: "/create", label: "Criar", icon: IoAddCircleOutline },
  ];

  return (
    <header id="whosdo-header" className={headerClasses}>
      <div className="relative max-w-screen-xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Link href="/home" aria-label="Página Inicial" className="flex items-center gap-2 font-bold text-green-600 hover:scale-105 transition-transform duration-300">
            <Logo className="h-12 w-auto" />
          </Link>
        </div>

        <nav className="flex-1 flex justify-center items-center gap-4">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Button
                key={href}
                asChild
                variant="ghost"
                className={`group flex items-center gap-2 h-[44px] w-[44px] px-0 shadow-lg rounded-full border border-transparent hover:border-primary/40 transition-all duration-300 font-semibold text-xs text-black dark:text-white uppercase tracking-wide overflow-hidden hover:w-auto hover:px-6 ${theme === 'light' ? 'bg-white/40' : 'bg-white/70 dark:bg-black/40'}`}
              >
                <Link href={href} className="flex items-center gap-2">
                  <Icon className="h-5 w-5" />
                  <span className="sr-only">{label}</span>
                  <span className="ml-2 hidden group-hover:inline">{label}</span>
                </Link>
              </Button>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="ghost"
            className={`group flex items-center justify-center h-[44px] w-[44px] px-0 shadow-lg rounded-full border border-transparent hover:border-primary/40 transition-all duration-300 gap-2 overflow-hidden hover:w-auto hover:px-6 ${theme === 'light' ? 'bg-white/40' : 'bg-white/70 dark:bg-black/40'}`}
          >
            <Link href="/planos" className="flex items-center gap-2">
              <IoDiamondOutline className="h-5 w-5 text-yellow-500" />
              <span className="sr-only">Planos</span>
              <span className="ml-2 hidden group-hover:inline uppercase tracking-wide text-xs text-black dark:text-white font-semibold">Planos</span>
            </Link>
          </Button>

          <Button
            variant="ghost"
            className={`group flex items-center justify-center h-[44px] w-[44px] px-0 shadow-lg rounded-full border border-transparent hover:border-primary/40 transition-all duration-300 gap-2 overflow-hidden hover:w-auto hover:px-6 ${theme === 'light' ? 'bg-white/40' : 'bg-white/70 dark:bg-black/40'}`}
            onClick={toggleTheme}
            aria-label="Alternar tema claro/escuro"
          >
            {theme === "light" ? <IoMoonOutline className="h-5 w-5" /> : <IoSunnyOutline className="h-5 w-5" />}
            <span className="sr-only">Tema</span>
            <span className="ml-2 hidden group-hover:inline uppercase tracking-wide text-xs text-black dark:text-white font-semibold">Tema</span>
          </Button>

          {loading ? (
            <div className="w-10 h-10 rounded-full bg-muted animate-pulse" />
          ) : user && currentUserProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 w-10 rounded-full focus:outline-none hover:ring-2 hover:ring-[#0e9094]/50 transition-all">
                <Avatar className="h-10 w-10 ring-2 ring-transparent hover:ring-[#0e9094]/30 transition-all">
                  <AvatarImage
                    src={currentUserProfile.profile_picture_url}
                    alt={currentUserProfile.name}
                  />
                  <AvatarFallback className="bg-[#0e9094]/10 text-[#0e9094]">
                    {currentUserProfile.name?.charAt(0).toUpperCase() || "?"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 rounded-lg border border-border bg-popover shadow-md" align="end">
                <DropdownMenuLabel>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{currentUserProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUserProfile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={profileLink} className="flex items-center hover:text-[#0e9094]">
                    <User className="mr-2 h-4 w-4" />
                    Ver Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center hover:text-[#0e9094]">
                    <UserCog className="mr-2 h-4 w-4" />
                    Editar Perfil
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard/account" className="flex items-center hover:text-[#0e9094]">
                    <Settings className="mr-2 h-4 w-4" />
                    Conta
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="flex items-center hover:text-red-500">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="outline" className={`group border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094] rounded-full transition-colors duration-300 h-[44px] w-[44px] px-0 overflow-hidden hover:w-auto hover:px-6 flex items-center justify-center ${theme === 'light' ? 'bg-white/40' : 'bg-white/70 dark:bg-black/40'}`}>
              <Link href="/login" className="flex items-center gap-2">
                <IoLogInOutline className="h-5 w-5" />
                <span className="sr-only">Entrar</span>
                <span className="ml-2 hidden group-hover:inline">Entrar</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}

const menuItems = [
  { title: 'Home', icon: <IoHomeOutline />, gradientFrom: '#a955ff', gradientTo: '#ea51ff' },
  { title: 'Video', icon: <IoVideocam />, gradientFrom: '#56CCF2', gradientTo: '#2F80ED' },
  { title: 'Photo', icon: <IoCameraOutline />, gradientFrom: '#FF9966', gradientTo: '#FF5E62' },
  { title: 'Share', icon: <IoShareSocialOutline />, gradientFrom: '#80FF72', gradientTo: '#7EE8FA' },
  { title: 'Tym', icon: <IoHeartOutline />, gradientFrom: '#ffa9c6', gradientTo: '#f434e2' }
];

export function GradientMenu() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-dark">
      <ul className="flex gap-6">
        {menuItems.map(({ title, icon, gradientFrom, gradientTo }, idx) => (
          <li
            key={idx}
            className="relative w-[60px] h-[60px] bg-white shadow-lg rounded-full flex items-center justify-center cursor-pointer"
          >
            {/* Gradient background (fixo, sem hover) */}
            <span className="absolute inset-0 rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] opacity-100"></span>
            {/* Blur glow (fixo, sem hover) */}
            <span className="absolute top-[10px] inset-x-0 h-full rounded-full bg-[linear-gradient(45deg,var(--gradient-from),var(--gradient-to))] blur-[15px] opacity-50 -z-10"></span>

            {/* Icon sempre visível */}
            <span className="relative z-10">
              <span className="text-2xl text-gray-500">{icon}</span>
            </span>

            {/* Title sempre visível ao lado do ícone */}
            <span className="ml-2 relative z-10 text-white uppercase tracking-wide text-sm">
              {title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
