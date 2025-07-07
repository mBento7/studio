import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from '@/lib/supabase/client';

interface PortfolioProject {
  title: string;
  description?: string;
  image?: string;
}

interface PortfolioBlockV2Props {
  portfolio: PortfolioProject[];
  onChange: (portfolio: PortfolioProject[]) => void;
}

export function PortfolioBlockV2({ portfolio, onChange }: PortfolioBlockV2Props) {
  const safePortfolio = portfolio ?? [];
  const [touched, setTouched] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);

  const addProject = () => {
    onChange([
      ...safePortfolio,
      { title: "", description: "", image: "" }
    ]);
    setTouched(true);
  };
  const removeProject = (idx: number) => {
    onChange(safePortfolio.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateProject = (idx: number, field: keyof PortfolioProject, value: string) => {
    const newPortfolio = [...safePortfolio];
    newPortfolio[idx] = { ...newPortfolio[idx], [field]: value };
    onChange(newPortfolio);
  };

  // Função de upload para Supabase Storage
  const handleImageUpload = async (idx: number, file: File) => {
    setUploadingIdx(idx);
    const fileExt = file.name.split('.').pop();
    const filePath = `user-portfolio/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('portfolio').upload(filePath, file);
    if (error) {
      alert('Erro ao fazer upload da imagem: ' + error.message);
      setUploadingIdx(null);
      return;
    }
    const { publicUrl } = supabase.storage.from('portfolio').getPublicUrl(filePath).data;
    updateProject(idx, 'image', publicUrl);
    setUploadingIdx(null);
  };

  const hasError = touched && safePortfolio.length === 0;
  return (
    <div className="space-y-6">
      {safePortfolio.map((item, idx) => (
        <div key={idx} className="border rounded-lg p-4 space-y-2 bg-muted/30 relative">
          <div className="flex gap-2 items-center mb-2">
            <Label htmlFor={`portfolio-title-${idx}`} className="font-semibold">Título*</Label>
            <Input
              id={`portfolio-title-${idx}`}
              value={item.title ?? ""}
              onChange={e => updateProject(idx, "title", e.target.value)}
              placeholder="Ex: Site institucional, App mobile, Ilustração..."
              className="flex-1"
              autoComplete="off"
              required
            />
            <Button onClick={() => removeProject(idx)} variant="ghost" size="icon" aria-label="Remover projeto">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <div>
            <Label htmlFor={`portfolio-desc-${idx}`}>Descrição</Label>
            <Textarea
              id={`portfolio-desc-${idx}`}
              value={item.description ?? ""}
              onChange={e => updateProject(idx, "description", e.target.value)}
              placeholder="Conte mais sobre este projeto..."
              className="mt-1"
              rows={2}
            />
          </div>
          <div>
            <Label htmlFor={`portfolio-img-${idx}`}>Imagem</Label>
            <div className="flex items-center gap-2 mt-1">
              <Input
                id={`portfolio-img-${idx}`}
                value={item.image ?? ""}
                onChange={e => updateProject(idx, "image", e.target.value)}
                placeholder="URL da imagem ou faça upload"
                type="url"
                className="flex-1"
              />
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                id={`portfolio-upload-${idx}`}
                onChange={e => {
                  if (e.target.files && e.target.files[0]) {
                    handleImageUpload(idx, e.target.files[0]);
                  }
                }}
              />
              <label htmlFor={`portfolio-upload-${idx}`}>
                <Button asChild variant="outline" className="w-16 h-16 flex items-center justify-center" type="button" disabled={uploadingIdx === idx}>
                  <span>
                    <ImageIcon className="w-8 h-8" />
                  </span>
                </Button>
              </label>
              {uploadingIdx === idx && <span className="text-xs ml-2">Enviando...</span>}
            </div>
            {item.image && (
              <img src={item.image} alt="Prévia do projeto" className="mt-2 rounded max-h-32 border" />
            )}
          </div>
        </div>
      ))}
      <Button onClick={addProject} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Projeto
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos um projeto.</div>}
    </div>
  );
} 