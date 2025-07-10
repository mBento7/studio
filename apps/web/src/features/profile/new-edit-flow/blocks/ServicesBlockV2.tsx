import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { PLAN_LIMITS, PlanType } from '../layoutFeatures';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface ServicesBlockV2Props {
  services: any[];
  onChange: (services: any[]) => void;
  plan?: PlanType;
}

export function ServicesBlockV2({ services, onChange, plan = PlanType.FREE }: ServicesBlockV2Props) {
  const safeServices = services ?? [];
  const limit = PLAN_LIMITS[plan as PlanType].services;
  const [touched, setTouched] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentService, setCurrentService] = useState<{ name: string }>({ name: "" });
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleOpenModalForAdd = () => {
    const newServices = [...safeServices, { name: "" }];
    onChange(newServices);
    setCurrentService(newServices[newServices.length - 1]);
    setEditingIndex(newServices.length - 1);
    setIsModalOpen(true);
  };

  const handleOpenModalForEdit = (idx: number) => {
    setCurrentService(safeServices[idx]);
    setEditingIndex(idx);
    setIsModalOpen(true);
  };

  const handleSaveService = () => {
    if (editingIndex !== null) {
      const newServices = [...safeServices];
      newServices[editingIndex] = currentService;
      onChange(newServices);
    } else {
      // This case should ideally not be hit with the new handleOpenModalForAdd logic
      onChange([...safeServices, currentService]);
    }
    setTouched(true);
    setIsModalOpen(false);
  };

  const removeService = (idx: number) => {
    onChange(safeServices.filter((_, i) => i !== idx));
    setTouched(true);
  };

  const hasError = touched && safeServices.length === 0;

  return (
    <div className="space-y-4">
      {safeServices.map((service, idx) => (
        <div key={idx} className="flex gap-2 items-center">
          <Input
            id={`service-${idx}`}
            value={service.name ?? ""}
            onChange={(e) => {
              const newServices = [...safeServices];
              newServices[idx] = { ...newServices[idx], name: e.target.value };
              onChange(newServices);
            }}
            placeholder="Ex: Consultoria, Design Gráfico, Tradução..."
            className="flex-1 cursor-pointer"
            autoComplete="off"
            onClick={() => handleOpenModalForEdit(idx)}
          />
          <Button onClick={() => removeService(idx)} variant="ghost" size="icon" aria-label="Remover serviço">
            <Trash2 className="w-4 h-4 text-destructive" />
          </Button>
        </div>
      ))}

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={handleOpenModalForAdd}
            disabled={safeServices.length >= limit}
            variant="outline"
            type="button"
            className="w-full flex items-center gap-2 justify-center"
          >
            <Plus className="w-4 h-4" /> Adicionar Serviço
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{editingIndex !== null ? "Editar Serviço" : "Adicionar Serviço"}</DialogTitle>
            <DialogDescription>
              {editingIndex !== null ? "Edite os detalhes do seu serviço." : "Adicione um novo serviço ao seu perfil."}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serviceName" className="text-right">
                Nome
              </Label>
              <Input
                id="serviceName"
                value={currentService.name}
                onChange={(e) => setCurrentService(prev => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
            <Button type="submit" onClick={handleSaveService}>Salvar Serviço</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {safeServices.length >= limit && <div className="text-warning text-xs mt-1">Limite de {limit} serviços atingido para seu plano.</div>}
      {hasError && <div className="text-destructive text-xs mt-1">Adicione pelo menos um serviço.</div>}
    </div>
  );
} 