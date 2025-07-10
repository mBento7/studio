import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { PLAN_LIMITS, PlanType } from '../layoutFeatures';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface ExperienceItem {
  title: string;
  company: string;
  years: string;
  description?: string; // Added description field
}

interface ExperienceBlockV2Props {
  experience: ExperienceItem[];
  onChange: (experience: ExperienceItem[]) => void;
  plan?: PlanType;
}

export function ExperienceBlockV2({ experience, onChange, plan = PlanType.FREE }: ExperienceBlockV2Props) {
  const safeExperience = experience ?? [];
  const limit = PLAN_LIMITS[plan as PlanType].experiences;
  const [touched, setTouched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ExperienceItem | null>(null);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenModalForAdd = () => {
    setCurrentItem({ title: '', company: '', years: '', description: '' });
    setEditingIndex(null);
    setIsModalOpen(true);
  };
  const handleOpenModalForEdit = (idx: number) => {
    setCurrentItem(safeExperience[idx]);
    setEditingIndex(idx);
    setIsModalOpen(true);
  };
  const handleSave = () => {
    let newExperience = [...safeExperience];
    if (editingIndex !== null) {
      newExperience[editingIndex] = currentItem;
    } else {
      newExperience.push(currentItem);
    }
    onChange(newExperience);
    setIsModalOpen(false);
  };

  const removeExperience = (idx: number) => {
    onChange(safeExperience.filter((_, i) => i !== idx));
    setTouched(true);
  };

  const hasError = touched && safeExperience.length === 0;

  return (
    <div className="space-y-6">
      <Button onClick={handleOpenModalForAdd}>Adicionar Experiência</Button>
      {safeExperience.map((item, idx) => (
        <div key={idx}>
          <div className="flex flex-col md:flex-row gap-4 items-end border-b pb-4 mb-4 cursor-pointer" onClick={() => handleOpenModalForEdit(idx)}>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
              <div>
                <Label htmlFor={`exp-title-${idx}`}>Título</Label>
                <Input
                  id={`exp-title-${idx}`}
                  value={item.title ?? ""}
                  placeholder="Cargo ou função"
                  autoComplete="off"
                  readOnly
                  className="pointer-events-none"
                />
              </div>
              <div>
                <Label htmlFor={`exp-company-${idx}`}>Empresa</Label>
                <Input
                  id={`exp-company-${idx}`}
                  value={item.company ?? ""}
                  placeholder="Nome da empresa"
                  autoComplete="off"
                  readOnly
                  className="pointer-events-none"
                />
              </div>
              <div>
                <Label htmlFor={`exp-years-${idx}`}>Período</Label>
                <Input
                  id={`exp-years-${idx}`}
                  value={item.years ?? ""}
                  placeholder="Ex: 2020-2023"
                  autoComplete="off"
                  readOnly
                  className="pointer-events-none"
                />
              </div>
            </div>
            <Button onClick={(e) => { e.stopPropagation(); removeExperience(idx); }} variant="ghost" size="icon" aria-label="Remover experiência">
              <Trash2 className="w-4 h-4 text-destructive" />
            </Button>
          </div>
          <Button onClick={() => handleOpenModalForEdit(idx)}>Editar</Button>
        </div>
      ))}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? 'Editar Experiência' : 'Adicionar Experiência'}</DialogTitle>
          </DialogHeader>
          {/* Campos do formulário: title, company, years, description */}
          <Input value={currentItem?.title || ''} onChange={e => setCurrentItem({ ...currentItem, title: e.target.value })} placeholder="Cargo" />
          <Input value={currentItem?.company || ''} onChange={e => setCurrentItem({ ...currentItem, company: e.target.value })} placeholder="Empresa" />
          <Input value={currentItem?.years || ''} onChange={e => setCurrentItem({ ...currentItem, years: e.target.value })} placeholder="Período" />
          <Input value={currentItem?.description || ''} onChange={e => setCurrentItem({ ...currentItem, description: e.target.value })} placeholder="Descrição" />
          <DialogFooter>
            <Button onClick={() => setIsModalOpen(false)} variant="outline">Cancelar</Button>
            <Button onClick={handleSave}>Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {safeExperience.length >= limit && <div className="text-warning text-xs mt-1">Limite de {limit} experiências atingido para seu plano.</div>}
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos uma experiência.</div>}
    </div>
  );
} 