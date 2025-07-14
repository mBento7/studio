'use client';

export const dynamic = 'force-dynamic';

import React, { useEffect, useState } from "react";
import { ProfilePreviewV2 } from "@/features/profile/new-edit-flow/ProfilePreviewV2";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfileV2 } from "@/features/profile/new-edit-flow/profile.service";

// Página de preview do novo fluxo de edição de perfil V2
export default function ProfileEditV2PreviewPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (loading) return <div>Carregando preview do perfil...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!profile) return <div>Nenhum dado de perfil encontrado.</div>;

  const plan = profile.plan || "free";
  const layout = profile.layout || "minimalist";

  return <ProfilePreviewV2 profile={profile} plan={plan} layout={layout} />;
}