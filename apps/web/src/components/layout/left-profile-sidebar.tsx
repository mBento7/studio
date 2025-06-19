import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Eye, Clock, Percent, Megaphone } from 'lucide-react';
import { ProfileBg } from '@/components/ui/profile-bg';
import { useAuth } from '@/hooks/use-auth';
import type { UserProfile } from '@/lib/types';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';

// QuickActions
function QuickActions({ onCouponClick }: { onCouponClick: () => void }) {
  return (
    <div className="space-y-4 p-5 bg-card/90 backdrop-blur-md rounded-2xl shadow-xl border border-border">
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
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
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
        <Button variant="outline" size="sm" className="w-full mt-2">Ver Relatório Completo</Button>
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
    <Card className="w-full p-4 rounded-2xl bg-card/90 border-0">
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
    </Card>
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

  // Progresso do perfil: lógica simples baseada em campos obrigatórios preenchidos
  const requiredFields = [userProfile.name, userProfile.username, userProfile.email, userProfile.bio, userProfile.profilePictureUrl];
  const filledFields = requiredFields.filter(Boolean).length;
  const profileProgress = Math.round((filledFields / requiredFields.length) * 100) || 0;

  // Estatísticas mockadas (poderiam vir de outro lugar no futuro)
  const stats = profile?.stats || { views: 1234, connections: 89, projects: 12 };

  const publicProfileLink = userProfile.username ? `/profile/${userProfile.username}` : '/dashboard';
  return (
    <aside className="flex flex-col items-center gap-3 max-w-[350px] w-full">
      <Card className="w-full max-w-[350px] flex flex-col items-center p-0 shadow-lg rounded-2xl bg-card/90 border-0 overflow-hidden">
        {/* Capa do perfil */}
        {userProfile.coverPhotoUrl ? (
          <div className="w-full h-24 bg-cover bg-center" style={{ backgroundImage: `url(${userProfile.coverPhotoUrl})` }} />
        ) : (
          <ProfileBg />
        )}
        {/* Avatar sobreposto */}
        <div className="relative w-full flex justify-center -mt-14 mb-2">
          <Avatar className="w-28 h-28 rounded-xl border-4 border-background shadow-lg bg-muted overflow-hidden">
            {userProfile.profilePictureUrl ? (
              <AvatarImage src={userProfile.profilePictureUrl} alt={userProfile.name || 'User'} className="object-cover w-full h-full rounded-xl" />
            ) : (
              <AvatarFallback className="text-2xl">
                {userProfile.name && userProfile.name.trim() !== '' ? userProfile.name.substring(0, 2) : 'U'}
              </AvatarFallback>
            )}
          </Avatar>
        </div>
        <div className="text-center mt-2 w-full px-4 pb-4">
          <h2 className="text-xl font-bold text-primary">
            {userProfile.name && userProfile.name.trim() !== '' ? userProfile.name : 'Nome não cadastrado'}
          </h2>
          <p className="text-muted-foreground text-sm">{userProfile.email}</p>
          <div className="w-full mt-6 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground">Progresso do Perfil</span>
              <span className="text-primary font-medium">{profileProgress}%</span>
            </div>
            <Progress value={profileProgress} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {profileProgress < 100 ? 'Quase lá! Complete seu perfil.' : 'Perfil completo!'}
            </p>
          </div>
          {userProfile.username && (
            <>
              <Link href={publicProfileLink} className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 text-white font-semibold shadow transition-colors duration-150 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 active:bg-teal-700 px-4 py-2">
                <Eye className="w-4 h-4 mr-2" />
                Ver Perfil Público
              </Link>
              <Link href="/dashboard" className="w-full mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-semibold shadow transition-colors duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 active:bg-blue-800 px-4 py-2">
                <span className="w-4 h-4 mr-2">✏️</span>
                Editar Perfil
              </Link>
            </>
          )}
        </div>
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Visualizações</span>
            <span className="text-sm font-medium">{stats.views}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Conexões</span>
            <span className="text-sm font-medium">{stats.connections}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Projetos</span>
            <span className="text-sm font-medium">{stats.projects}</span>
          </div>
        </div>
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <AchievementsCard />
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <QuickActions onCouponClick={() => {}} />
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <ActivityStats />
      </Card>
    </aside>
  );
} 