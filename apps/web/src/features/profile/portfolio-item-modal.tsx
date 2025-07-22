'use client';

import React from 'react';
import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import type { PortfolioItem } from '@/lib/types';
import { ExternalLink } from 'lucide-react';

interface PortfolioItemModalProps {
  item: PortfolioItem | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const PortfolioItemModal: React.FC<PortfolioItemModalProps> = ({
  item,
  open,
  onOpenChange
}) => {
  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="xxs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl bg-background/95 rounded-2xl shadow-2xl flex flex-col items-center p-0 overflow-hidden">
        <DialogHeader className="w-full px-6 pt-8 pb-2 text-center">
          {item.caption && (
            <DialogTitle className="text-2xl md:text-4xl font-extrabold text-primary drop-shadow-sm">
              {item.caption}
            </DialogTitle>
          )}
          <DialogDescription className="sr-only">
            Detalhes do projeto do portfólio
          </DialogDescription>
        </DialogHeader>

        <div className="w-full px-4 md:px-8 pt-4 pb-6 flex flex-col items-center">
          {/* Área da Imagem */}
          <div className="relative w-full max-w-2xl aspect-[16/10] min-h-[240px] md:min-h-[300px] rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-xl group">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={item.caption || 'Imagem do Portfólio'}
                fill
                className="object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                data-ai-hint={item.dataAiHint || 'portfolio detail'}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400 text-base font-medium">
                Imagem não disponível
              </div>
            )}
          </div>

          {/* Descrição */}
          {item.description && (
            <div className="w-full text-center text-base sm:text-lg text-muted-foreground mt-6 mb-4 px-2 md:px-8">
              {item.description}
            </div>
          )}

          {/* Link externo */}
          {item.externalLink && (
            <a
              href={item.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 mt-2 mb-6 bg-primary text-white text-sm sm:text-base rounded-xl font-semibold shadow-md hover:bg-primary/90 transition-all w-full max-w-xs"
            >
              Ver projeto <ExternalLink className="w-5 h-5" />
            </a>
          )}
        </div>

        {/* Botão Fechar */}
        <DialogFooter className="w-full px-6 pb-8">
          <DialogClose asChild>
            <Button
              type="button"
              variant="default"
              className="w-full max-w-xs bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl shadow transition"
            >
              Fechar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
