"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  User,
  Palette,
  Pencil,
  Eye,
  UserCog,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Loader2,
  LucideIcon,
  Gift
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from '@/hooks/use-auth';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Estrutura de Navegação Aninhada
interface NavSubItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  subItems?: NavSubItem[];
}

interface SidebarNavProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

export function SidebarNav({ isSidebarOpen, toggleSidebar }: SidebarNavProps) {
  const pathname = usePathname();
  const { user, signOutUser, loading: authLoading, currentUserProfile } = useAuth();
  const publicProfileLink = currentUserProfile ? `/profile/${currentUserProfile.username}` : (user ? "/search" : "/login");

  // Itens de navegação com sub-itens para "Meu Perfil"
  const navItems: NavItem[] = [
    { href: "/dashboard/feed", label: "Home", icon: Home },
    { 
      href: "/dashboard/my-profile", 
      label: "Meu Perfil", 
      icon: User,
      subItems: [
        { href: "/dashboard", label: "Editar Perfil", icon: Pencil },
        { href: "/dashboard/settings/appearance", label: "Aparência", icon: Palette },
        { href: "/dashboard/settings/content", label: "Conteúdo", icon: Pencil },
      ]
    },
    { href: publicProfileLink, label: "Ver Perfil Público", icon: Eye },
    { href: "/dashboard/referrals", label: "Indique e Ganhe", icon: Gift },
    { href: "/dashboard/account", label: "Conta", icon: UserCog },
  ];

  const handleLogout = async () => {
    await signOutUser();
  };
  
  // Verifica se a rota atual está relacionada ao perfil para exibir os sub-itens
  const isProfileSectionActive = pathname.startsWith("/dashboard/my-profile") || pathname.startsWith("/dashboard/settings") || pathname === "/dashboard";

  return (
    <aside
      className={cn(
        "fixed top-16 left-2 h-[calc(100vh-4rem)] border-r shadow-lg flex flex-col transition-all duration-300 z-40 backdrop-blur-md bg-muted/80 dark:bg-muted/60",
        isSidebarOpen ? "w-64" : "w-16",
        "rounded-xl md:rounded-l-xl md:rounded-r-3xl overflow-hidden group/sidebar",
        "transition-[width,background] ease-in-out",
        "focus-within:ring-2 focus-within:ring-primary",
        "hover:bg-muted/90 dark:hover:bg-muted/70",
        "ring-1 ring-border/30 dark:ring-border/60",
        "[&::-webkit-scrollbar]:hidden scrollbar-hide"
      )}
      tabIndex={0}
      aria-label="Navegação lateral"
      role="navigation"
      data-testid="sidebar"
    >
      <div className="relative h-full flex flex-col">
        <nav className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-hide">
          <TooltipProvider>
            {navItems.map((item) => (
              <div key={item.href}>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Link href={item.href} passHref>
                      <Button
                        variant={pathname === item.href ? "secondary" : "ghost"}
                        className={cn(
                          "w-full justify-start gap-3 transition-colors duration-200 group/button focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none",
                          !isSidebarOpen && "justify-center",
                          pathname === item.href && "bg-accent/80 text-accent-foreground shadow-md",
                          "hover:bg-accent/60 hover:text-accent-foreground"
                        )}
                        tabIndex={0}
                        aria-current={pathname === item.href ? "page" : undefined}
                      >
                        <item.icon className="w-5 h-5 shrink-0" />
                        <span className={cn("truncate", !isSidebarOpen && "sr-only")}>{item.label}</span>
                      </Button>
                    </Link>
                  </TooltipTrigger>
                  {!isSidebarOpen && (
                    <TooltipContent side="right" sideOffset={5}>
                      {item.label}
                    </TooltipContent>
                  )}
                </Tooltip>

                {/* Renderiza sub-itens se a seção do perfil estiver ativa */}
                {isProfileSectionActive && item.subItems && isSidebarOpen && (
                  <div className="pl-6 mt-1 space-y-1">
                    {item.subItems.map((subItem) => (
                       <Tooltip key={subItem.href} delayDuration={0}>
                          <TooltipTrigger asChild>
                              <Link href={subItem.href} passHref>
                                <Button
                                  variant={pathname === subItem.href ? "secondary" : "ghost"}
                                  className="w-full justify-start gap-3 text-sm transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:bg-accent/40 hover:text-accent-foreground"
                                  tabIndex={0}
                                  aria-current={pathname === subItem.href ? "page" : undefined}
                                >
                                  <subItem.icon className="w-4 h-4 shrink-0" />
                                  <span>{subItem.label}</span>
                                </Button>
                              </Link>
                          </TooltipTrigger>
                       </Tooltip>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TooltipProvider>
        </nav>

        <div className="p-4 border-t mt-auto">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  onClick={handleLogout}
                  className={cn(
                    "w-full justify-start gap-3 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none hover:bg-destructive/80 hover:text-destructive-foreground",
                    !isSidebarOpen && "justify-center"
                  )}
                  disabled={authLoading}
                  tabIndex={0}
                >
                  {authLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <LogOut className="w-5 h-5 shrink-0" />
                  )}
                  <span className={cn("truncate", !isSidebarOpen && "sr-only")}>Sair</span>
                </Button>
              </TooltipTrigger>
              {!isSidebarOpen && (
                  <TooltipContent side="right" sideOffset={5}>
                      Sair
                  </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>

        <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            aria-label={isSidebarOpen ? "Recolher sidebar" : "Expandir sidebar"}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-muted hover:bg-primary/20 text-primary rounded-full h-8 w-8 shadow-lg border border-border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:outline-none"
        >
            {isSidebarOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </Button>
      </div>
    </aside>
  );
}
