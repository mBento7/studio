"use client";

import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Edit, Settings } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PublicProfileCard } from '@/features/public/public-profile-card';
import { AchievementsCard } from '@/features/dashboard/achievements-card';
import { useAuth } from '@/hooks/use-auth';

export default function MyProfilePage() {
  const { currentUserProfile } = useAuth();
  
  if (!currentUserProfile) {
    return (
        <div className="flex justify-center items-center h-full">
            <p>Carregando perfil...</p>
        </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Esta é uma visão geral do seu perfil. Use os atalhos abaixo ou o menu para editar suas informações.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Card de Pré-visualização do Perfil */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User />
                Pré-visualização do Perfil Público
              </CardTitle>
              <CardDescription>
                É assim que os visitantes verão seu perfil. Use os botões para personalizá-lo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="scale-90 origin-top-left">
                  <PublicProfileCard profile={currentUserProfile} />
              </div>
              <div className="mt-4 flex gap-4">
                <Button asChild>
                    <Link href="/dashboard/settings/content">
                    <Edit className="mr-2 h-4 w-4"/> Editar Conteúdo
                    </Link>
                </Button>
                <Button variant="outline" asChild>
                    <Link href="/dashboard/settings/appearance">
                    <Settings className="mr-2 h-4 w-4"/> Editar Aparência
                    </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Coluna da Direita com Conquistas */}
        <div className="space-y-8">
          <AchievementsCard />
        </div>
      </div>
    </div>
  );
}
