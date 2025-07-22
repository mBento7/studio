'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { Briefcase as ServicesIcon, Image as PortfolioIcon, PlusCircle, Trash2, Upload, ArrowUp, ArrowDown } from 'lucide-react';
import type { Service, PortfolioItem } from '@/lib/types';

interface ContentSettingsProps {
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  portfolio: PortfolioItem[];
  setPortfolio: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
  onSaveContent: () => void;
  userPlan: 'free' | 'standard' | 'premium';
  serviceLimit: number;
  portfolioLimit: number;
}

export function ContentSettings({
  services,
  setServices,
  portfolio,
  setPortfolio,
  onSaveContent,
  userPlan,
  serviceLimit,
  portfolioLimit
}: ContentSettingsProps) {

  const handleMoveItem = <T,>(items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>, index: number, direction: 'up' | 'down') => {
    const newItems = [...items];
    const itemToMove = newItems[index];
    newItems.splice(index, 1);
    newItems.splice(index + (direction === 'up' ? -1 : 1), 0, itemToMove);
    setItems(newItems);
  };

  const handleAddService = () => {
    if (services.length >= serviceLimit) {
      alert(`Limite de ${serviceLimit} serviços atingido para o seu plano.`);
      return;
    }
    setServices(prev => [...prev, { id: Date.now().toString(), name: '', description: '' }]);
  };

  const handleRemoveService = (id: string) => setServices(prev => prev.filter(s => s.id !== id));
  const handleServiceChange = (id: string, field: 'name' | 'description', value: string) => setServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const handleAddPortfolioItem = () => {
    if (portfolio.length >= portfolioLimit) {
      alert(`Limite de ${portfolioLimit} itens de portfólio atingido.`);
      return;
    }
    setPortfolio(prev => [...prev, { id: Date.now().toString(), imageUrl: 'https://picsum.photos/seed/new-item/400/300', caption: '', description: '' }]);
  };

  const handleRemovePortfolioItem = (id: string) => setPortfolio(prev => prev.filter(p => p.id !== id));
  const handlePortfolioItemChange = (id: string, field: 'caption' | 'description', value: string) => setPortfolio(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPortfolio(prev => prev.map(item => item.id === itemId ? { ...item, imageUrl: reader.result as string } : item));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><ServicesIcon />Gerenciar Serviços/Produtos</CardTitle><CardDescription>Adicione ou edite os serviços que você oferece.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {(services || []).map((service, index) => (
            <div key={service.id} className="p-3 border rounded-md bg-muted/50 space-y-2">
              <div className="flex justify-between items-center"><Label className="font-semibold">Serviço #{index + 1}</Label>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveItem(services, setServices, index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveItem(services, setServices, index, 'down')} disabled={index === services.length - 1}><ArrowDown className="w-4 h-4" /></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <Input value={service.name} onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)} placeholder="Nome do Serviço" />
              <Textarea value={service.description} onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} placeholder="Descrição do Serviço" />
            </div>
          ))}
          <Button variant="outline" onClick={handleAddService} disabled={services.length >= serviceLimit}><PlusCircle className="mr-2 h-4 w-4" />Adicionar Serviço</Button>
          {userPlan !== 'premium' && <p className="text-xs text-muted-foreground">Limite de {serviceLimit} serviços para o plano {userPlan}.</p>}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><PortfolioIcon />Gerenciar Portfólio</CardTitle><CardDescription>Mostre seus melhores trabalhos.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {/* ... (UI para Portfólio similar ao de Serviços) ... */}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={onSaveContent}>Salvar Conteúdo</Button>
      </div>
    </div>
  );
}
