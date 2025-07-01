import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface ExperienceBlockV2Props {
  experience: any[];
  onChange: (experience: any[]) => void;
}

export function ExperienceBlockV2({ experience, onChange }: ExperienceBlockV2Props) {
  const safeExperience = experience ?? [];
  const [touched, setTouched] = useState(false);
  const addExperience = () => {
    onChange([...safeExperience, { title: "", company: "", years: "" }]);
    setTouched(true);
  };
  const removeExperience = (idx: number) => {
    onChange(safeExperience.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateExperience = (idx: number, field: string, value: string) => {
    const newExp = [...safeExperience];
    newExp[idx] = { ...newExp[idx], [field]: value };
    onChange(newExp);
  };
  const hasError = touched && safeExperience.length === 0;
  return (
    <div className="space-y-6">
      {safeExperience.map((exp, idx) => (
        <div key={idx} className="flex flex-col md:flex-row gap-4 items-end border-b pb-4 mb-4">
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
            <div>
              <Label htmlFor={`exp-title-${idx}`}>Título</Label>
              <Input
                id={`exp-title-${idx}`}
                value={exp.title ?? ""}
                onChange={e => updateExperience(idx, "title", e.target.value)}
                placeholder="Cargo ou função"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor={`exp-company-${idx}`}>Empresa</Label>
              <Input
                id={`exp-company-${idx}`}
                value={exp.company ?? ""}
                onChange={e => updateExperience(idx, "company", e.target.value)}
                placeholder="Nome da empresa"
                autoComplete="off"
              />
            </div>
            <div>
              <Label htmlFor={`exp-years-${idx}`}>Período</Label>
              <Input
                id={`exp-years-${idx}`}
                value={exp.years ?? ""}
                onChange={e => updateExperience(idx, "years", e.target.value)}
                placeholder="Ex: 2020-2023"
                autoComplete="off"
              />
            </div>
          </div>
          <Button onClick={() => removeExperience(idx)} variant="ghost" size="icon" aria-label="Remover experiência">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button onClick={addExperience} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Experiência
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos uma experiência.</div>}
    </div>
  );
} 