import React, { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Image as ImageIcon } from "lucide-react";
import { supabase } from '@/lib/supabase/client';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PLAN_LIMITS, PlanType } from '../layoutFeatures';

interface PortfolioProject {
  title: string;
  description?: string;
  image?: string;
}

interface PortfolioItem {
  id: string;
  caption: string;
  imageUrl: string;
  description: string;
  externalLink: string;
}

interface PortfolioBlockV2Props {
  portfolio: PortfolioProject[];
  onChange: (portfolio: PortfolioProject[]) => void;
  plan?: PlanType;
}

export function PortfolioBlockV2({ portfolio, onChange, plan = PlanType.FREE }: PortfolioBlockV2Props) {
  const safePortfolio = portfolio ?? [];
  const limit = PLAN_LIMITS[plan as PlanType].portfolio;
  const [touched, setTouched] = useState(false);
  const [uploadingIdx, setUploadingIdx] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<PortfolioItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenModalForAdd = () => {
    setCurrentItem({ id: Date.now().toString(), caption: '', imageUrl: '', description: '', externalLink: '' });
    setEditingIndex(null);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (idx: number) => {
    setCurrentItem(safePortfolio[idx]);
    setEditingIndex(idx);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    let newPortfolio = [...safePortfolio];
    if (editingIndex !== null) {
      newPortfolio[editingIndex] = currentItem;
    } else {
      newPortfolio.push(currentItem);
    }
    onChange(newPortfolio);
    setIsModalOpen(false);
  };

  const removeProject = (idx: number) => {
    onChange(safePortfolio.filter((_, i) => i !== idx));
    setTouched(true);
  };

  // Função de upload para Supabase Storage
  const handleImageUpload = async (file: File) => {
    const fileExt = file.name.split('.').pop();
    const filePath = `user-portfolio/${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
    const { data, error } = await supabase.storage.from('portfolio').upload(filePath, file);
    if (error) {
      alert('Erro ao fazer upload da imagem: ' + error.message);
      return;
    }
    const { publicUrl } = supabase.storage.from('portfolio').getPublicUrl(filePath).data;
    setCurrentItem(prev => ({ ...prev, imageUrl: publicUrl }));
  };

  const hasError = touched && safePortfolio.length === 0;

  return (
    <div className="space-y-6">
      {safePortfolio.map((item, idx) => (
        <div key={item.id} className="border rounded-lg p-4 space-y-2 bg-muted/30 relative cursor-pointer" onClick={() => handleOpenModalForEdit(idx)}>
          <div className="flex gap-2 items-center mb-2">
            <Label htmlFor={`portfolio-title-${idx}`} className="font-semibold">Título*</Label>
            <Input
              id={`portfolio-title-${idx}`}
              value={item.title ?? ""}
              placeholder="Ex: Site institucional, App mobile, Ilustração..."
              className="flex-1 pointer-events-none"
              autoComplete="off"
              required
              readOnly
            />
            <Button onClick={(e) => { e.stopPropagation(); removeProject(idx); }} variant="ghost" size="icon" aria-label="Remover projeto">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <div>
            <Label htmlFor={`portfolio-desc-${idx}`}>Descrição</Label>
            <Textarea
              id={`portfolio-desc-${idx}`}
              value={item.description ?? ""}
              placeholder="Conte mais sobre este projeto..."
              className="mt-1 pointer-events-none"
              rows={2}
              readOnly
            />
          </div>
          <div>
            <Label htmlFor={`portfolio-img-${idx}`}>Imagem</Label>
            {item.image && (
              <img src={item.image} alt="Prévia do projeto" className="mt-2 rounded max-h-32 border" />
            )}
          </div>
        </div>
      ))}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpenModalForAdd}
            disabled={safePortfolio.length >= limit}
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" /> Adicionar Projeto
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? "Editar Projeto" : "Adicionar Projeto"}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null ? "Edite os detalhes do seu projeto." : "Adicione um novo projeto ao seu portfólio."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectTitle" className="text-right">
                Título
              </Label>
              <Input
                id="projectTitle"
                value={currentItem?.caption || ''}
                onChange={e => setCurrentItem({ ...currentItem, caption: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectDescription" className="text-right">
                Descrição
              </Label>
              <Textarea
                id="projectDescription"
                value={currentItem?.description || ''}
                onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="projectImage" className="text-right">
                Imagem
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  id="projectImage"
                  value={currentItem?.imageUrl || ''}
                  onChange={e => setCurrentItem({ ...currentItem, imageUrl: e.target.value })}
                  placeholder="URL da imagem ou faça upload"
                  type="url"
                  className="flex-1"
                />
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="project-upload-modal"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />
                <label htmlFor="project-upload-modal">
                  <Button asChild variant="outline" className="w-10 h-10 flex items-center justify-center" type="button" disabled={uploadingIdx !== null}>
                    <span>
                      <ImageIcon className="w-5 h-5" />
                    </span>
                  </Button>
                </label>
                {uploadingIdx !== null && <span className="text-xs ml-2">Enviando...</span>}
              </div>
            </div>
            {currentItem?.imageUrl && (
              <div className="col-span-4 flex justify-center">
                <img src={currentItem.imageUrl} alt="Prévia do projeto" className="mt-2 rounded max-h-40 border" />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleSave}>Salvar Projeto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {safePortfolio.length >= limit && <div className="text-warning text-xs mt-1">Limite de {limit} projetos atingido para seu plano.</div>}
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos um projeto.</div>}
    </div>
  );
} 