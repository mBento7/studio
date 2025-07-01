import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

interface ServicesBlockV2Props {
  services: any[];
  onChange: (services: any[]) => void;
}

export function ServicesBlockV2({ services, onChange }: ServicesBlockV2Props) {
  const safeServices = services ?? [];
  const [touched, setTouched] = useState(false);
  const addService = () => {
    onChange([...safeServices, { name: "" }]);
    setTouched(true);
  };
  const removeService = (idx: number) => {
    onChange(safeServices.filter((_, i) => i !== idx));
    setTouched(true);
  };
  const updateService = (idx: number, value: string) => {
    const newServices = [...safeServices];
    newServices[idx] = { ...newServices[idx], name: value };
    onChange(newServices);
  };
  const hasError = touched && safeServices.length === 0;
  return (
    <div className="space-y-4">
      {safeServices.map((service, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Label htmlFor={`service-${idx}`} className="sr-only">Serviço</Label>
          <Input
            id={`service-${idx}`}
            value={service.name ?? ""}
            onChange={e => updateService(idx, e.target.value)}
            placeholder="Ex: Consultoria, Design Gráfico, Tradução..."
            className="flex-1"
            autoComplete="off"
          />
          <Button onClick={() => removeService(idx)} variant="ghost" size="icon" aria-label="Remover serviço">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}
      <Button onClick={addService} variant="outline" type="button" className="w-full flex items-center gap-2 justify-center">
        <Plus className="w-4 h-4" /> Adicionar Serviço
      </Button>
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos um serviço.</div>}
    </div>
  );
} 