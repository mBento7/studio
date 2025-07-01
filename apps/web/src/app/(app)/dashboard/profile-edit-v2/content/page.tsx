"use client";
import React, { useEffect, useState } from "react";
import { ProfileContentTabV2 } from "@/features/profile/new-edit-flow/ProfileContentTabV2";
import { useAuth } from "@/hooks/use-auth";
import { getUserProfileV2, saveUserProfileV2, filterValidProfileFields } from "@/features/profile/new-edit-flow/profile.service";

// Página da aba 'Conteúdo' do novo fluxo de edição de perfil V2
export default function ProfileEditV2ContentPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
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

  const handleSave = async (newProfile: any) => {
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

  if (loading) return <div>Carregando perfil...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!profile) return <div>Nenhum dado de perfil encontrado.</div>;

  const plan = profile.plan || "free";
  const layout = profile.layout || "minimalist";

  return (
    <div>
      {success && <div style={{ color: 'green' }}>{success}</div>}
      <ProfileContentTabV2 data={profile} plan={plan} layout={layout} onChange={setProfile} />
      <button onClick={() => handleSave(profile)} style={{ marginTop: 16 }}>Salvar</button>
    </div>
  );
} 