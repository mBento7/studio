import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pencil } from 'lucide-react';

/**
 * Props para o componente ServicesList
 * @param services Array de serviços (name, description, price, id?)
 * @param maxToShow Número máximo de serviços a exibir (default: 6)
 * @param variant Variante visual: "free" | "standard" | "premium"
 * @param onEdit Callback ao clicar em editar (opcional)
 * @param isCurrentUserProfile Se é o próprio perfil (exibe botão de editar)
 */
export interface ServiceItem {
  id?: string;
  name: string;
  description: string;
  price?: string;
}

export interface ServicesListProps {
  services: ServiceItem[];
  maxToShow?: number;
  variant?: 'free' | 'standard' | 'premium';
  onEdit?: (index: number) => void;
  isCurrentUserProfile?: boolean;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services = [],
  maxToShow = 6,
  variant = 'free',
  onEdit,
  isCurrentUserProfile = false
}) => {
  const displayed = services.slice(0, maxToShow);

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 justify-center items-stretch"
      style={{ justifyItems: 'center' }}
    >
      {displayed.map((service, idx) => (
        <Card key={service.id || idx} className="p-5 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-[#23272f] shadow-lg shadow-black/30 transition hover:scale-[1.02] hover:shadow-xl min-h-[140px] flex flex-col justify-between w-full text-slate-800 dark:text-slate-200">
          <div className="font-semibold text-blue-800 dark:text-blue-300 text-lg mb-1">{service.name}</div>
          <div className="text-sm text-slate-700 dark:text-slate-300 mb-2">{service.description}</div>
          {service.price && (
            <div className="text-xs text-primary font-bold mt-2">{service.price}</div>
          )}
        </Card>
      ))}
    </div>
  );
};
