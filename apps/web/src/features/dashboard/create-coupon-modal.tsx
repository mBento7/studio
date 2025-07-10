"use client";

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Tag, Ticket, Coins } from 'lucide-react';

interface CreateCouponModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onSave?: (newCoupon: { code: string; description: string; discount?: string; validUntil?: string; }) => void;
}

export function CreateCouponModal({ isOpen, onOpenChange, onSave }: CreateCouponModalProps) {
  const [couponCode, setCouponCode] = useState("");
  const [couponDesc, setCouponDesc] = useState("");
  const { toast } = useToast();
  
  const handlePublish = () => {
    // Lógica de publicação (simulada)
    console.log("Publishing coupon:", { code: couponCode, desc: couponDesc });
    if (onSave) {
      onSave({
        code: couponCode,
        description: couponDesc,
        // Pode adicionar mais campos aqui se necessário, como discount, validUntil, etc.
      });
    }
    toast({
      title: "Cupom Publicado!",
      description: `O cupom "${couponCode}" foi publicado com sucesso.`,
    });
    onOpenChange(false); // Fecha o modal
    setCouponCode("");
    setCouponDesc("");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-6 h-6" />
            Criar Novo Cupom
          </DialogTitle>
          <DialogDescription>
            Preencha os detalhes abaixo para criar uma nova oferta para seus clientes. A publicação terá um custo em moedas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coupon-code" className="text-right">
              <Tag className="w-4 h-4 inline-block mr-1" />
              Código
            </Label>
            <Input
              id="coupon-code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
              className="col-span-3"
              placeholder="Ex: VERÃO24"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="coupon-desc" className="text-right">
              Descrição
            </Label>
            <Input
              id="coupon-desc"
              value={couponDesc}
              onChange={(e) => setCouponDesc(e.target.value)}
              className="col-span-3"
              placeholder="Ex: 15% OFF em todos os serviços"
            />
          </div>
        </div>
        <DialogFooter className="flex-col sm:flex-row sm:justify-between items-center sm:items-end gap-4">
           <div className="flex items-center gap-2 text-sm font-semibold text-primary p-2 bg-primary/10 rounded-md">
                <Coins className="w-5 h-5" />
                <span>Custo: 10 moedas</span>
            </div>
          <Button onClick={handlePublish} disabled={!couponCode || !couponDesc}>
            Publicar Cupom
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
