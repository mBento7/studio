import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Image as ImageIcon, Camera } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

interface MinimalistBlockV2Props {
  profile_picture_url?: string;
  cover_photo_url?: string;
  email?: string;
  phone?: string;
  onChange: (data: { profile_picture_url?: string; cover_photo_url?: string; email?: string; phone?: string }) => void;
  userId?: string;
  // Para usar um campo 'contact' (jsonb) no Supabase, ajuste as props e o backend conforme necessário.
}

/**
 * Para funcionar corretamente, passe o userId do usuário autenticado como prop.
 * Exemplo de uso:
 * <MinimalistBlockV2 userId={user?.id} ... />
 */
export function MinimalistBlockV2({ profile_picture_url, cover_photo_url, email, phone, onChange, userId }: MinimalistBlockV2Props) {
  // Função de upload local (mock) para foto de perfil
  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'avatar' | 'cover') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const url = reader.result as string;
        if (type === 'avatar') {
          onChange({ profile_picture_url: url, cover_photo_url, email, phone });
        } else {
          onChange({ profile_picture_url, cover_photo_url: url, email, phone });
        }
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <Card className="p-6 space-y-6">
      <h4 className="text-xl font-bold mb-2 text-center flex items-center gap-2 justify-center">
        <Camera className="w-6 h-6 text-primary" /> Adicione sua Foto
      </h4>
      <p className="text-center text-muted-foreground mb-4">Perfis com foto têm <span className="font-bold text-primary">3x mais visualizações</span>! Destaque-se com uma imagem profissional.</p>
      <div className="space-y-4">
        <div className="flex flex-col items-center gap-2">
          <Label className="font-semibold flex items-center gap-1"><ImageIcon className="w-5 h-5 text-primary" /> Foto de Perfil (Avatar)</Label>
          <input type="file" accept="image/*" className="hidden" id="avatar-upload" onChange={e => handleUpload(e, 'avatar')} />
          <label htmlFor="avatar-upload" className="cursor-pointer">
            {profile_picture_url ? (
              <img src={profile_picture_url} alt="Avatar" className="w-20 h-20 rounded-full object-cover border-2 border-primary shadow" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-primary text-primary">
                <Camera className="w-8 h-8" />
              </div>
            )}
          </label>
          <span className="text-xs text-muted-foreground">Clique para enviar sua foto</span>
        </div>
        <div className="flex flex-col items-center gap-2 mt-4">
          <Label className="font-semibold flex items-center gap-1">
            <ImageIcon className="w-5 h-5 text-primary" /> Imagem de Capa
          </Label>
          <input type="file" accept="image/*" className="hidden" id="cover-upload" onChange={e => handleUpload(e, 'cover')} />
          <label htmlFor="cover-upload" className="cursor-pointer">
            {cover_photo_url ? (
              <img src={cover_photo_url} alt="Capa" className="w-full max-w-lg h-28 object-cover rounded-lg border-2 border-primary shadow" />
            ) : (
              <div className="w-full max-w-lg h-28 rounded-lg bg-muted flex items-center justify-center border-2 border-dashed border-primary text-primary">
                <ImageIcon className="w-8 h-8" />
              </div>
            )}
          </label>
          <span className="text-xs text-muted-foreground">Clique para enviar sua capa</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label>Email</Label>
            <Input type="email" placeholder="Seu e-mail" value={email ?? ""} onChange={e => onChange({ profile_picture_url, cover_photo_url, email: e.target.value, phone })} />
          </div>
          <div>
            <Label>Telefone</Label>
            <Input type="tel" placeholder="Seu telefone" value={phone ?? ""} onChange={e => onChange({ profile_picture_url, cover_photo_url, email, phone: e.target.value })} />
          </div>
        </div>
      </div>
    </Card>
  );
} 
// Para usar um campo 'contact' (jsonb) no Supabase, ajuste o backend e as props deste componente. 