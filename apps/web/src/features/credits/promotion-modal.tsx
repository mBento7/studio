"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gem } from "lucide-react";
import React from "react";

// Define a interface para garantir a consistência dos dados da promoção
export interface PromotionOption {
  title: string;
  description: string;
  cost: number;
  icon: React.ReactNode;
  type: string;
  highlight?: boolean;
  badge?: React.ReactNode;
  iconButton?: React.ReactNode;
}

interface PromotionModalProps {
  isOpen: boolean;
  onClose: () => void;
  promotion: PromotionOption | null;
  onConfirm: () => void;
}

export function PromotionModal({
  isOpen,
  onClose,
  promotion,
  onConfirm,
}: PromotionModalProps) {
  if (!promotion) {
    return null;
  }

  const handleConfirm = () => {
    // Futuramente, aqui será chamada a função para debitar os créditos
    console.log(`Promoção confirmada: ${promotion.title}`);
    onConfirm();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {promotion.icon}
            {promotion.title}
          </DialogTitle>
          <DialogDescription className="pt-2">{promotion.description}</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <p className="text-center text-lg">
            Você está prestes a usar{" "}
            <span className="font-bold text-primary">{promotion.cost} créditos</span>{" "}
            para ativar esta promoção.
          </p>
          <p className="text-center text-sm text-muted-foreground mt-1">
            O valor será debitado do seu saldo.
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DialogClose>
          <Button onClick={handleConfirm}>
            <Gem className="w-4 h-4 mr-2" />
            Confirmar e Usar Créditos
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
} 