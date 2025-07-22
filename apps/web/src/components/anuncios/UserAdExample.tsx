import React from 'react';
import { Button } from '@/components/ui/button';
import { Tag, Percent, Flame } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function UserAdExample() {
  return (
    <Card className="w-full shadow-xl shadow-black/20 dark:shadow-black/50 rounded-2xl bg-card/95 border border-white/10 overflow-hidden transition-all hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-black/40">
      <div className="relative h-32 bg-gradient-to-r from-teal-600 via-cyan-600 to-teal-600 overflow-hidden">
        <img
          src="https://picsum.photos/seed/useradexample/400/150"
          alt="TechSolutions Banner"
          className="w-full h-full object-cover opacity-85 user-ad-img transition-all duration-500 group-hover:scale-105 m-0 p-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
      </div>
      <div className="p-5">
        <div className="flex items-start gap-4">
          <img
            src="https://picsum.photos/seed/useradlogo/50/50"
            alt="TechSolutions"
            className="w-14 h-14 rounded-xl object-cover border-2 border-background shadow-lg shadow-black/10 transition-transform hover:scale-105"
          />
          <div className="flex-1">
            <h4 className="font-bold text-lg text-foreground">TechSolutions</h4>
            <p className="text-sm text-muted-foreground/80">Desenvolvimento de Apps</p>
            <div className="flex items-center gap-1 mt-1.5">
              <div className="flex text-yellow-400 text-base">{'★'.repeat(5)}</div>
              <span className="text-xs text-muted-foreground font-medium">(4.9)</span>
            </div>
          </div>
        </div>
        <p className="text-sm text-muted-foreground/90 leading-5 mt-4">
          Transforme sua ideia em realidade! Apps iOS e Android com qualidade profissional e suporte completo.
        </p>
        <div className="flex items-center gap-2 mt-4">
          <span className="text-sm bg-green-100/80 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full font-medium flex items-center gap-1">
            <Percent className="w-4 h-4" />
            20% OFF
          </span>
          <span className="text-sm text-muted-foreground font-medium">até 31/12</span>
        </div>
        <Button
          className="w-full rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-orange-900 font-semibold shadow-md transition-all duration-300 hover:shadow-lg hover:scale-[1.02] night-theme:shadow-black/50 mt-4"
        >
          <Flame className="w-4 h-4 mr-2 text-orange-900" />
          Ver Oferta Completa
        </Button>
      </div>
    </Card>
  );
}
