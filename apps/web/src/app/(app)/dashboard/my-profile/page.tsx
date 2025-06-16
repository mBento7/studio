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
    <div className="space-y-10 max-w-6xl mx-auto py-8">
      <div className="animate-fade-in-up">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary drop-shadow-sm mb-2">Meu Perfil</h1>
        <p className="text-muted-foreground text-lg">Esta é uma visão geral do seu perfil. Use os atalhos abaixo ou o menu para editar suas informações.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 animate-fade-in-up">
        <div className="lg:col-span-2 space-y-8">
          {/* Card de Pré-visualização do Perfil */}
          <Card className="rounded-2xl shadow-xl border border-border bg-card/90 transition hover:shadow-2xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-bold">
                <User />
                Pré-visualização do Perfil Público
              </CardTitle>
              <CardDescription>
                É assim que os visitantes verão seu perfil. Use os botões para personalizá-lo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="scale-95 origin-top-left">
                  <PublicProfileCard profile={currentUserProfile} />
              </div>
              <div className="mt-4 flex gap-4">
                <Button asChild className="shadow-md">
                    <Link href="/dashboard/settings/content">
                    <Edit className="mr-2 h-4 w-4"/> Editar Conteúdo
                    </Link>
                </Button>
                <Button variant="outline" asChild className="shadow-md">
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
          <div className="rounded-2xl shadow-xl border border-border bg-card/90 p-4 animate-fade-in-up">
            <AchievementsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
