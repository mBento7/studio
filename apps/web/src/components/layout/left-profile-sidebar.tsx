import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Eye, Clock, Percent, Megaphone, Pencil, Award, Activity, Trophy, Plus, User, ChevronDown, Newspaper, Briefcase, Ticket, ImageIcon } from 'lucide-react';
import { ProfileBg } from '@/components/ui/profile-bg';
import { useAuth } from '@/hooks/use-auth';
import type { UserProfile } from '@/lib/types';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { useRouter } from 'next/navigation';

const quickActions = [
  { label: 'Storie 24h', icon: <Clock className="w-4 h-4 mr-2" />, href: '/create?type=status' },
  { label: 'Cupom de Desconto', icon: <Ticket className="w-4 h-4 mr-2" />, href: '/create?type=coupon' },
  { label: 'Anúncio Patrocinado', icon: <Megaphone className="w-4 h-4 mr-2" />, href: '/create?type=ad' },
];

const extraActions = [
  { label: 'Postagem no Feed', icon: <Newspaper className="w-4 h-4 mr-2" />, href: '/create?type=feed' },
  { label: 'Item de Portfólio', icon: <Briefcase className="w-4 h-4 mr-2" />, href: '/create?type=portfolio' },
  { label: 'Banner de Perfil', icon: <ImageIcon className="w-4 h-4 mr-2" />, href: '/create?type=banner' },
  { label: 'Showcase de Anúncios', icon: <Megaphone className="w-4 h-4 mr-2" />, href: '/showcase-lucas' },
  { label: 'Showcase do Feed', icon: <Newspaper className="w-4 h-4 mr-2" />, href: '/showcase-feed' },
];

function QuickActions() {
  const router = useRouter();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="w-full bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-5 space-y-4 transition-all hover:shadow-lg">
      <h3 className="text-lg font-semibold text-center flex items-center gap-2 justify-center">
        <Plus className="w-5 h-5 text-primary" />
        Criar Novo
      </h3>
      <TooltipProvider>
        <div className="space-y-3">
          {quickActions.map((action) => (
            <Tooltip key={action.label}>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary rounded-full transition-all hover:scale-[1.02] hover:shadow-sm flex items-center"
                  onClick={() => router.push(action.href)}
                >
                  {action.icon}
                  {action.label}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
      <Button
        variant="ghost"
        onClick={() => setShowMore((v) => !v)}
        className="w-full flex items-center justify-center mt-2"
      >
        <ChevronDown className="mr-2 w-4 h-4" />
        Mais opções de criação
      </Button>
      {showMore && (
        <div className="mt-2 space-y-2">
          {extraActions.map((action) => (
            <Button
              key={action.label}
              onClick={() => router.push(action.href)}
              variant="outline"
              className="w-full flex items-center justify-start"
            >
              {action.icon}
              {action.label}
            </Button>
          ))}
          <Button
            variant="link"
            onClick={() => router.push('/create')}
            className="w-full justify-center"
          >
            Ver todas as opções
          </Button>
        </div>
      )}
    </div>
  );
}

function ActivityStats() {
  return (
    <div className="w-full bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-5 space-y-5 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sua Atividade</h3>
        <Activity className="w-5 h-5 text-blue-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Visualizações hoje</span>
          </div>
          <span className="font-semibold text-primary text-lg">127</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Novos seguidores</span>
          </div>
          <span className="font-semibold text-green-600 text-lg">+12</span>
        </div>
        
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Engajamento</span>
          </div>
          <span className="font-semibold text-blue-600 text-lg">8.4%</span>
        </div>
        
        <Progress value={65} className="h-2 bg-muted/30" />
        
        <Button 
          asChild
          variant="outline" 
          size="sm" 
          className="w-full mt-2 rounded-full border-primary/50 text-primary hover:bg-primary/10 hover:text-primary transition-all hover:scale-[1.02] hover:shadow-sm"
        >
          <Link href="/dashboard/activity">
            Ver Relatório Completo
          </Link>
        </Button>
      </div>
    </div>
  );
}

// Novo card de conquistas
function AchievementsCard() {
  const achievements = [
    { icon: Award, label: 'Primeiro Projeto', desc: 'Você publicou seu primeiro projeto!' },
    { icon: Activity, label: 'Perfil 100%', desc: 'Perfil completo e otimizado.' },
    { icon: Trophy, label: 'Primeira Avaliação', desc: 'Recebeu sua primeira avaliação.' },
  ];
  
  return (
    <div className="w-full bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-5 space-y-4 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Minhas Conquistas</h3>
        <Trophy className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="space-y-3">
        {achievements.map((a, i) => (
          <div 
            key={i} 
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-all cursor-pointer group"
          >
            <a.icon className="w-8 h-8 text-yellow-500 group-hover:rotate-12 transition-transform" />
            <div className="flex-1">
              <p className="font-bold text-sm leading-tight">{a.label}</p>
              <p className="text-xs text-muted-foreground">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

interface LeftProfileSidebarProps {
  profile?: {
    name?: string;
    email?: string;
    profile_picture_url?: string;
    username?: string;
    progress?: number;
    stats?: { views: number; connections: number; projects: number };
    cover_photo_url?: string;
  };
}

export function LeftProfileSidebar({ profile }: LeftProfileSidebarProps) {
  const { currentUserProfile } = useAuth();
  const userProfile: Partial<UserProfile> = currentUserProfile || profile || {};

  const stats = profile?.stats || { views: 1234, connections: 89, projects: 12 };
  const publicProfileLink = userProfile.username ? `/profile/${userProfile.username}` : '/dashboard';

  return (
    <aside className="flex flex-col gap-4 max-w-[280px] xl:max-w-[320px] 2xl:max-w-[350px] w-full">
      <div className="w-full max-w-[280px] xl:max-w-[320px] 2xl:max-w-[350px]">
        <div className="w-full flex flex-col items-center bg-card rounded-2xl shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 transition-all hover:shadow-lg">
          {/* Cover Photo with gradient overlay */}
          <div className="w-full h-24 bg-cover bg-center relative">
            {userProfile.cover_photo_url ? (
              <img 
                src={userProfile.cover_photo_url} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-24 bg-gradient-to-r from-primary to-secondary" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/30" />
          </div>

          {/* Profile Content */}
          <div className="w-full flex flex-col items-center p-6 space-y-6 -mt-10">
            {/* Avatar with hover effect */}
            <div className="relative">
              <div className="w-36 h-36 rounded-full bg-background/80 dark:bg-muted/30 p-1.5 border-4 border-white dark:border-muted shadow-xl shadow-black/30 transition-all hover:shadow-2xl hover:scale-105">
                <Avatar className="w-full h-full rounded-full overflow-hidden">
                  {userProfile.profile_picture_url ? (
                    <AvatarImage 
                      src={userProfile.profile_picture_url} 
                      alt={userProfile.name || 'User'} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <AvatarFallback className="text-4xl font-bold rounded-full bg-primary/10 text-primary">
                      {userProfile.name?.substring(0, 2) || 'U'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </div>

            {/* User Info */}
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-foreground">
                {userProfile.name || 'Nome não cadastrado'}
              </h2>
              <p className="text-muted-foreground text-sm">{userProfile.email}</p>
            </div>

            {/* Action Buttons */}
            {userProfile.username && (
              <div className="w-full flex flex-col gap-3">
                <Button 
                  asChild 
                  className="bg-primary text-primary-foreground font-semibold shadow-md rounded-full transition-all hover:scale-[1.02] hover:shadow-lg"
                >
                  <Link href={publicProfileLink} className="flex items-center justify-center">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Perfil Público
                  </Link>
                </Button>
                
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary hover:border-primary rounded-full transition-all hover:scale-[1.02]"
                >
                  <Link href="/dashboard" className="flex items-center justify-center">
                    <Pencil className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <QuickActions />
      <AchievementsCard />
      <ActivityStats />
    </aside>
  );
} 