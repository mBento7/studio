import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Eye, Clock, Percent, Megaphone, Pencil } from 'lucide-react';
import { ProfileBg } from '@/components/ui/profile-bg';
import { useAuth } from '@/hooks/use-auth';
import type { UserProfile } from '@/lib/types';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// QuickActions
function QuickActions({ onCouponClick }: { onCouponClick: () => void }) {
  return (
    <div className="space-y-4 p-5 bg-card/90 backdrop-blur-md rounded-none shadow-xl border border-border">
      <h3 className="text-lg font-semibold text-center">Criar Novo</h3>
      <TooltipProvider>
        <div className="space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105">
                <Clock className="w-4 h-4" />
                Status (24h)
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Publique um conteúdo que dura 24 horas.</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105" onClick={onCouponClick}>
                <Percent className="w-4 h-4" />
                Cupom / Oferta
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ofereça um desconto ou promoção especial.</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105">
                <Megaphone className="w-4 h-4" />
                Anúncio Patrocinado
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Impulsione seu conteúdo com mais visibilidade.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

function ActivityStats() {
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg shadow-black/10 dark:shadow-green-500/10 space-y-3">
      <h3 className="text-lg font-semibold">Sua Atividade</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Visualizações hoje</span>
          <span className="font-semibold text-primary">127</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Novos seguidores</span>
          <span className="font-semibold text-green-600">+12</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Engajamento</span>
          <span className="font-semibold text-blue-600">8.4%</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2 rounded-lg border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094]">Ver Relatório Completo</Button>
      </div>
    </div>
  );
}

// Novo card de conquistas
function AchievementsCard() {
  // Exemplo de conquistas mockadas
  const achievements = [
    { icon: '🏆', label: 'Primeiro Projeto', desc: 'Você publicou seu primeiro projeto!' },
    { icon: '🔥', label: 'Perfil 100%', desc: 'Perfil completo e otimizado.' },
    { icon: '💬', label: 'Primeira Avaliação', desc: 'Recebeu sua primeira avaliação.' },
  ];
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-lg shadow-lg shadow-black/10 dark:shadow-green-500/10 space-y-3">
      <h3 className="text-lg font-semibold mb-2">Minhas Conquistas</h3>
      <div className="space-y-2">
        {achievements.map((a, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-2xl">{a.icon}</span>
            <div>
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
    profilePictureUrl?: string;
    username?: string;
    progress?: number;
    stats?: { views: number; connections: number; projects: number };
    coverPhotoUrl?: string;
  };
}

export function LeftProfileSidebar({ profile }: LeftProfileSidebarProps) {
  const { currentUserProfile } = useAuth();
  // Prioriza dados do usuário logado, se existir
  const userProfile: Partial<UserProfile> = currentUserProfile || profile || {};

  // Estatísticas mockadas (poderiam vir de outro lugar no futuro)
  const stats = profile?.stats || { views: 1234, connections: 89, projects: 12 };

  const publicProfileLink = userProfile.username ? `/profile/${userProfile.username}` : '/dashboard';
  return (
    <aside className="flex flex-col gap-3 max-w-[350px] w-full">
      <Card className="w-full max-w-[350px] p-3 shadow-lg rounded-md bg-card/90 border-0">
        <div className="w-full flex flex-col items-center bg-card rounded-md shadow-lg shadow-black/10 dark:shadow-green-500/10 overflow-hidden border border-black/5 dark:border-white/10">
          {/* Capa do perfil */}
          {userProfile.coverPhotoUrl ? (
            <div className="w-full h-20 bg-cover bg-center" style={{ backgroundImage: `url(${userProfile.coverPhotoUrl})` }} />
          ) : (
            <div className="w-full h-20 bg-red-500" />
          )}

          {/* Conteúdo do Card */}
          <div className="w-full flex flex-col items-center p-4 space-y-4">
            {/* Camada da Foto de Perfil */}
            <div className="-mt-16 bg-background/50 dark:bg-muted/20 rounded-lg p-2 border border-black/5 dark:border-white/10 inline-block shadow-lg shadow-black/10 dark:shadow-teal-500/20">
              <Avatar className="w-24 h-24 rounded-md bg-muted overflow-hidden">
                {userProfile.profilePictureUrl ? (
                  <AvatarImage src={userProfile.profilePictureUrl} alt={userProfile.name || 'User'} className="object-cover w-full h-full rounded-md" />
                ) : (
                  <AvatarFallback className="text-2xl rounded-md">
                    {userProfile.name?.substring(0, 2) || 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>

            {/* Informações do Usuário */}
            <div className="text-center">
              <h2 className="text-xl font-bold text-primary">
                {userProfile.name || 'Nome não cadastrado'}
              </h2>
              <p className="text-muted-foreground text-sm">{userProfile.email}</p>
            </div>

            {/* Botões de Ação */}
            {userProfile.username && (
                <div className="w-full flex flex-col gap-3">
                  <Button asChild className="bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md">
                    <Link href={publicProfileLink}>
                      <Eye className="w-4 h-4 mr-2" />
                      Ver Perfil Público
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094] hover:border-[#0e9094]">
                    <Link href="/dashboard">
                      <Pencil className="w-4 h-4 mr-2" />
                      Editar Perfil
                    </Link>
                  </Button>
                </div>
            )}
          </div>
        </div>
      </Card>
      <Card className="w-full max-w-[350px] p-3 shadow-lg rounded-md bg-card/90 border-0">
        <AchievementsCard />
      </Card>
      <Card className="w-full max-w-[350px] p-3 shadow-lg rounded-md bg-card/90 border-0">
        <ActivityStats />
      </Card>
    </aside>
  );
} 