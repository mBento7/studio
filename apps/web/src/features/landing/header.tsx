'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import {
  IoHomeOutline,
  IoSearchOutline,
  IoAddCircleOutline,
  IoDiamondOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoLogInOutline,
} from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Logo } from '@/components/common/logo';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function PublicHeader() {
  const { user, currentUserProfile, loading, signOutUser } = useAuth();
  const pathname = usePathname();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  /** define / alterna tema -------------------------------------------------- */
  useEffect(() => {
    const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (storedTheme) {
      setThemeState(storedTheme);
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeState(systemPrefersDark ? 'dark' : 'light');
    }
  }, []);

  const setThemeState = (t: 'light' | 'dark') => {
    setTheme(t);
    localStorage.setItem('theme', t);
    document.documentElement.classList.toggle('dark', t === 'dark');
  };

  const toggleTheme = () => setThemeState(theme === 'light' ? 'dark' : 'light');

  /** links de navegação ------------------------------------------------------ */
  const nav = [
    { href: '/dashboard/feed', label: 'Home', icon: IoHomeOutline },
    { href: '/search',         label: 'Buscar', icon: IoSearchOutline },
    { href: '/create',         label: 'Criar',  icon: IoAddCircleOutline },
  ];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-lg bg-[rgba(255,255,255,0.55)] dark:bg-[rgba(24,27,32,0.45)] shadow-soft
      before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-white/20 before:dark:from-[#181B20]/60 before:dark:to-[#23262C]/20 before:rounded-b-2xl before:pointer-events-none before:z-[-1] backdrop-saturate-150">
      <div className="mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8 max-w-screen-xl relative">
        {/* LOGO -------------------------------------------------------------- */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-10 w-10 text-accent" />
        </Link>

        {/* NAV LINKS -------------------------------------------------------- */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-4">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                'group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                pathname === href
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50 text-muted-foreground'
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                pathname === href ? "text-orange-500" : ""
              )} />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        {/* ICON‑ONLY NAV  (mobile < md) ------------------------------------ */}
        <nav className="flex md:hidden items-center gap-1">
          {nav.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              aria-label={label}
              className={cn(
                'p-2 rounded-full transition-colors',
                pathname === href
                  ? 'bg-primary/10 text-primary'
                  : 'text-muted-foreground hover:bg-muted/50'
              )}
            >
              <Icon className={cn(
                "h-5 w-5",
                pathname === href ? "text-orange-500" : ""
              )} />
            </Link>
          ))}
        </nav>

        {/* AÇÕES À DIREITA --------------------------------------------------- */}
        <div className="flex items-center gap-2">
          {/* planos (sempre visível) */}
          {/* <Button variant="action" className="flex items-center gap-1">
            <IoDiamondOutline className="h-4 w-4" />
            <span className="hidden sm:inline">Planos</span>
          </Button> */}

          {/* alternar tema */}
          <ThemeToggle />

          {/* PERFIL / LOGIN -------------------------------------------------- */}
          {loading ? (
            <div className="h-10 w-10 animate-pulse rounded-full bg-muted" />
          ) : user && currentUserProfile ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-primary/40 transition">
                  <AvatarImage src={currentUserProfile.profile_picture_url} />
                  <AvatarFallback>
                    {currentUserProfile.name?.charAt(0).toUpperCase() ?? '?'}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{currentUserProfile.name}</p>
                    <p className="text-xs text-muted-foreground">{currentUserProfile.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/profile/${currentUserProfile.username}`}>Ver perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Editar perfil</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={signOutUser} className="text-destructive">
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-full bg-primary/10 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary/20 transition"
            >
              <IoLogInOutline className="h-4 w-4" />
              <span className="hidden sm:inline">Entrar</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
