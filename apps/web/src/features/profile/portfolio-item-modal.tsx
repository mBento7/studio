"use client";

import React from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { PortfolioItem } from '@/lib/types';
import { Maximize, ExternalLink } from 'lucide-react';

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
      <DialogContent className="xxs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl p-0 bg-background shadow-2xl flex flex-col justify-center items-center min-h-[40vh]">
        <DialogHeader className="p-8 pb-0 w-full flex flex-col items-center justify-center">
          {item.caption && <DialogTitle className="text-3xl font-bold w-full text-center mb-4 text-blue-500 dark:text-blue-300">{item.caption}</DialogTitle>}
        </DialogHeader>
        <DialogDescription className="sr-only">Detalhes do projeto do portfólio</DialogDescription>
        <div className="px-8 pt-0 pb-6 w-full flex flex-col items-center justify-center">
          <div className="relative w-full max-w-2xl aspect-video min-h-[300px] rounded-2xl shadow-lg overflow-hidden flex items-center justify-center mb-4 bg-slate-100 dark:bg-slate-800">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.caption || 'Imagem do Portfólio'}
                fill
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                data-ai-hint={item.dataAiHint || "portfolio detail"}
                className="rounded-2xl shadow-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">Sem imagem</div>
            )}
          </div>
          {item.description && (
            <div className="w-full text-center text-base text-slate-500 dark:text-slate-300 mb-4 mt-2">
              {item.description}
            </div>
          )}
          {item.externalLink && (
            <a
              href={item.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow hover:bg-blue-700 transition mb-2 text-base mt-2 w-full max-w-xs justify-center"
            >
              Ver projeto <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>
        <DialogFooter className="p-6 pt-0 w-full flex items-center justify-center">
          <DialogClose asChild>
            <Button type="button" variant="outline" className="w-full max-w-xs">
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
