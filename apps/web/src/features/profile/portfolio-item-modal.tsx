"use client";

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { PortfolioItem } from '@/lib/types';
import { Maximize } from 'lucide-react';

interface PortfolioItemModalProps {
  item: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({ item, open, onOpenChange }) => {
  if (!item) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl md:max-w-3xl lg:max-w-4xl xl:max-w-5xl p-0">
        <DialogHeader className="p-6 pb-0">
          {item.caption && <DialogTitle className="text-2xl">{item.caption}</DialogTitle>}
          {item.description && <DialogDescription className="mt-1">{item.description}</DialogDescription>}
        </DialogHeader>
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden border">
            <Image
              src={item.imageUrl}
              alt={item.caption || 'Imagem do Portfólio'}
              fill
              style={{ objectFit: 'contain' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              data-ai-hint={item.dataAiHint || "portfolio detail"}
            />
          </div>
        </div>
        <DialogFooter className="p-6 pt-0">
          <DialogClose>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
