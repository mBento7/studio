"use client";
import React, { useEffect, useState } from "react";
import ProfileEditPageV2 from "@/features/profile/new-edit-flow/ProfileEditPageV2";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfileV2, saveUserProfileV2, filterValidProfileFields } from "@/features/profile/new-edit-flow/profile.service";
import { Loader2 } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import type { UserProfileV2 } from '@/features/profile/new-edit-flow/types';

// Página principal do novo fluxo de edição de perfil V2
export default function ProfileEditV2Page() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileV2 | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!user) return;
      setLoading(true);
      setError(null);
      try {
        const data = await getUserProfileV2(user.id);
        setProfile(data);
      } catch (err: any) {
        setError("Erro ao carregar perfil: " + (err.message || err.toString()));
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [user]);

  const handleSave = async (newProfile: UserProfileV2) => {
    if (!user) return;
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await saveUserProfileV2(user.id, filterValidProfileFields(newProfile));
      setProfile(newProfile);
      setSuccess("Perfil salvo com sucesso!");
    } catch (err: any) {
      setError("Erro ao salvar perfil: " + (err.message || err.toString()));
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[40vh]">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <span className="text-muted-foreground">Carregando perfil...</span>
    </div>
  );
  if (error) return (
    <div className="max-w-md mx-auto mt-8">
      <Alert variant="destructive">
        <AlertTitle>Erro</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      <div className="mt-6 flex justify-center">
        <Button asChild variant="outline">
          <Link href="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
    </div>
  );
  if (!profile) return <div>Nenhum dado de perfil encontrado.</div>;

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Button asChild variant="outline" size="sm">
          <Link href="/dashboard">Voltar ao Dashboard</Link>
        </Button>
      </div>
      {success && (
        <Alert variant="default" className="mb-4 border-green-400 bg-green-50 text-green-800">
          <AlertTitle className="text-green-700">Sucesso</AlertTitle>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}
      {/* Passa o perfil e o handler de salvar para o componente principal */}
      <ProfileEditPageV2 profile={profile} onProfileChange={setProfile} onSave={handleSave} />
    </div>
  );
} 