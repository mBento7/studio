import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';
import { Eye } from 'lucide-react';
import { ProfileBg } from '@/components/ui/profile-bg';
import { QuickActions, ActivityStats } from './right-widgets-column';

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
  };
}

export function LeftProfileSidebar({ profile }: LeftProfileSidebarProps) {
  const profileProgress = profile?.progress ?? 85;
  return (
    <aside className="flex flex-col items-center gap-3 max-w-[350px] w-full">
      <Card className="w-full max-w-[350px] flex flex-col items-center p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <ProfileBg />
        <Avatar className="h-20 w-20 -mt-10 border-4 border-background bg-muted shadow-sm">
          <AvatarImage src={profile?.profilePictureUrl || undefined} alt={profile?.name || 'User'} />
          <AvatarFallback>
            {profile?.name?.substring(0, 2) || 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="text-center mt-4 w-full">
          <h2 className="text-xl font-bold text-primary">{profile?.name || 'Seu Nome'}</h2>
          <p className="text-muted-foreground text-sm">{profile?.email}</p>
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
          {profile?.username && (
            <Link href={`/profile/${profile.username}`} className="w-full mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-teal-500 text-white font-semibold shadow transition-colors duration-150 hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300 active:bg-teal-700 px-4 py-2">
              <Eye className="w-4 h-4 mr-2" />
              Ver Perfil Público
            </Link>
          )}
        </div>
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <div className="space-y-2 w-full">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Visualizações</span>
            <span className="text-sm font-medium">{profile?.stats?.views ?? 1234}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Conexões</span>
            <span className="text-sm font-medium">{profile?.stats?.connections ?? 89}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Projetos</span>
            <span className="text-sm font-medium">{profile?.stats?.projects ?? 12}</span>
          </div>
        </div>
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <QuickActions onCouponClick={() => {}} />
      </Card>
      <Card className="w-full max-w-[350px] p-4 shadow-lg rounded-2xl bg-card/90 border-0">
        <ActivityStats />
      </Card>
      <AchievementsCard />
    </aside>
  );
} 