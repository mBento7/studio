import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface SkillsBlockV2Props {
  skills: string[];
  onChange: (skills: string[]) => void;
}

export function SkillsBlockV2({ skills, onChange }: SkillsBlockV2Props) {
  const safeSkills = skills ?? [];
  const [touched, setTouched] = useState(false);
  const addSkill = () => {
    onChange([...safeSkills, ""]);
    setTouched(true);
  };
  const removeSkill = (idx: number) => {
    onChange(safeSkills.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateSkill = (idx: number, value: string) => {
    const newSkills = [...safeSkills];
    newSkills[idx] = value;
    onChange(newSkills);
  };
  const hasError = touched && safeSkills.length === 0;
  return (
    <div className="space-y-4">
      {safeSkills.map((skill, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Label htmlFor={`skill-${idx}`} className="sr-only">Habilidade</Label>
          <Input
            id={`skill-${idx}`}
            value={skill ?? ""}
            onChange={e => updateSkill(idx, e.target.value)}
            placeholder="Ex: React, Gestão de Projetos, Inglês..."
            className="flex-1"
            autoComplete="off"
          />
          <Button onClick={() => removeSkill(idx)} variant="ghost" size="icon" aria-label="Remover habilidade">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button onClick={addSkill} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Habilidade
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos uma habilidade.</div>}
    </div>
  );
} 