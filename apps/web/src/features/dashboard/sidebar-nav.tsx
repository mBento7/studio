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
    { href: "/dashboard", label: "Editar Perfil", icon: Pencil },
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
    <div className="relative h-full flex flex-col">
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        <TooltipProvider>
          {navItems.map((item) => (
            <div key={item.href}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger>
                  <Link href={item.href} passHref>
                    <Button
                      variant={pathname === item.href ? "secondary" : "ghost"}
                      className={cn("w-full justify-start gap-3", !isSidebarOpen && "justify-center")}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      <span className={cn("truncate", !isSidebarOpen && "hidden")}>{item.label}</span>
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
                        <TooltipTrigger>
                            <Link href={subItem.href} passHref>
                              <Button
                                variant={pathname === subItem.href ? "secondary" : "ghost"}
                                className="w-full justify-start gap-3 text-sm"
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
            <TooltipTrigger>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className={cn("w-full justify-start gap-3", !isSidebarOpen && "justify-center")}
                disabled={authLoading}
              >
                {authLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <LogOut className="w-5 h-5 shrink-0" />
                )}
                <span className={cn("truncate", !isSidebarOpen && "hidden")}>Sair</span>
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
    </div>
  );
}
