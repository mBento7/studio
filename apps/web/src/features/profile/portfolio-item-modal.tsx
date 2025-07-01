"use client";

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
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
      <DialogContent className="sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-0 bg-background shadow-lg flex flex-col justify-center items-center min-h-[40vh]">
        <DialogHeader className="p-6 pb-0 w-full flex flex-col items-center justify-center">
          {item.caption && <DialogTitle className="text-2xl w-full text-center">{item.caption}</DialogTitle>}
          {item.description && <DialogDescription className="mt-1 w-full text-center">{item.description}</DialogDescription>}
        </DialogHeader>
        <div className="p-6 w-full flex flex-col items-center justify-center">
          <div className="relative aspect-video w-full bg-muted rounded-md overflow-hidden border flex items-center justify-center">
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
        <DialogFooter className="p-6 pt-0 w-full flex items-center justify-center">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
