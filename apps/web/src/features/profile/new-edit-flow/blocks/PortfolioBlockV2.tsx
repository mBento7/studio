import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface PortfolioBlockV2Props {
  portfolio: any[];
  onChange: (portfolio: any[]) => void;
}

export function PortfolioBlockV2({ portfolio, onChange }: PortfolioBlockV2Props) {
  const safePortfolio = portfolio ?? [];
  const [touched, setTouched] = useState(false);
  const addProject = () => {
    onChange([...safePortfolio, { title: "" }]);
    setTouched(true);
  };
  const removeProject = (idx: number) => {
    onChange(safePortfolio.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateProject = (idx: number, value: string) => {
    const newPortfolio = [...safePortfolio];
    newPortfolio[idx] = { ...newPortfolio[idx], title: value };
    onChange(newPortfolio);
  };
  const hasError = touched && safePortfolio.length === 0;
  return (
    <div className="space-y-4">
      {safePortfolio.map((item, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Label htmlFor={`portfolio-${idx}`} className="sr-only">Projeto</Label>
          <Input
            id={`portfolio-${idx}`}
            value={item.title ?? ""}
            onChange={e => updateProject(idx, e.target.value)}
            placeholder="Ex: Site institucional, App mobile, Ilustração..."
            className="flex-1"
            autoComplete="off"
          />
          <Button onClick={() => removeProject(idx)} variant="ghost" size="icon" aria-label="Remover projeto">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button onClick={addProject} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Projeto
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos um projeto.</div>}
    </div>
  );
} 