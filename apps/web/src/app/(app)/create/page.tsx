'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Briefcase,
  Newspaper,
  Clock,
  Megaphone,
  ImageIcon,
  Ticket,
  PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LayoutDecider } from '@/components/layout/layout-decider';

const creationOptions = [
  {
    title: 'Postagem no Feed',
    description: 'Compartilhe uma nova atualização, ideia ou projeto com sua rede.',
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    href: '/dashboard/feed',
    cta: 'Criar Postagem',
    category: 'services'
  },
  {
    title: 'Storie 24h',
    description: 'Compartilhe um momento que dura 24 horas com seus seguidores.',
    icon: <Clock className="h-8 w-8 text-primary" />,
    href: '#',
    cta: 'Criar Storie',
    badge: 'Novo',
    category: 'stories'
  },
  {
    title: 'Item de Portfólio',
    description: 'Adicione um novo trabalho, projeto ou case de sucesso ao seu perfil.',
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    href: '/dashboard/my-profile',
    cta: 'Adicionar Item',
    category: 'services'
  },
  {
    title: 'Anúncio Patrocinado',
    description: 'Promova seu perfil, serviço ou produto para alcançar mais pessoas.',
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    href: '/dashboard/credits/promover',
    cta: 'Criar Anúncio',
    badge: 'Premium',
    category: 'promotions'
  },
  {
    title: 'Banner de Perfil',
    description: 'Crie um banner customizado para o topo do seu perfil público.',
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    href: '/dashboard/settings/appearance',
    cta: 'Criar Banner',
    category: 'promotions'
  },
  {
    title: 'Cupom de Desconto',
    description: 'Gere cupons para seus serviços ou produtos (contas de negócio).',
    icon: <Ticket className="h-8 w-8 text-primary" />,
    href: '#',
    cta: 'Gerar Cupom',
    badge: 'Business',
    category: 'promotions'
  },
  {
    title: 'Showcase de Anúncios',
    description: 'Veja exemplos de todos os tipos de anúncios da plataforma.',
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    href: '/showcase-anuncios',
    cta: 'Ver Exemplos',
    badge: 'Exemplo',
    category: 'examples'
  },
  {
    title: 'Showcase do Feed',
    description: 'Veja exemplos de componentes do feed (cards, eventos, cupons, etc).',
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    href: '/showcase-feed',
    cta: 'Ver Feed Demo',
    badge: 'Exemplo',
    category: 'examples'
  },
  {
    title: 'Showcase Extras',
    description: 'Veja exemplos de componentes e funcionalidades extras da plataforma.',
    icon: <PlusCircle className="h-8 w-8 text-primary" />,
    href: '/showcase-extras',
    cta: 'Ver Extras',
    badge: 'Exemplo',
    category: 'examples'
  }
];

const tabs = [
  { label: 'Todos', value: 'all' },
  { label: 'Serviços', value: 'services' },
  { label: 'Promoções', value: 'promotions' },
  { label: 'Stories', value: 'stories' },
  { label: 'Exemplos', value: 'examples' }
];

export default function CreatePage() {
  const [activeTab, setActiveTab] = useState('all');

  const filteredOptions =
    activeTab === 'all'
      ? creationOptions
      : creationOptions.filter((item) => item.category === activeTab);

  return (
    <LayoutDecider>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
            O que você gostaria de criar hoje?
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Selecione uma categoria ou explore todas as opções abaixo.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          {tabs.map((tab) => (
            <Button
              key={tab.value}
              variant={activeTab === tab.value ? 'default' : 'outline'}
              onClick={() => setActiveTab(tab.value)}
              className="text-sm"
            >
              {tab.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredOptions.map((option, idx) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.06, duration: 0.4, type: 'spring' }}
            >
              <Card className="flex flex-col rounded-lg shadow-xl border border-border bg-card p-5 transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary/40">
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <span className="p-3 bg-muted rounded-lg flex items-center justify-center">
                    {option.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-foreground">
                        {option.title}
                      </CardTitle>
                      {option.badge && (
                        <Badge
                          variant="secondary"
                          className={cn(
                            'px-2 py-0.5 rounded-full text-xs font-bold',
                            option.badge === 'Premium' &&
                              'bg-yellow-100 text-yellow-600 border border-yellow-400'
                          )}
                        >
                          {option.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="mt-1 text-muted-foreground">
                      {option.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardFooter className="mt-auto">
                  <Button
                    asChild
                    variant={option.badge === 'Premium' ? 'premium' : 'default'}
                    className="w-full flex items-center gap-2"
                  >
                    <Link href={option.href} className="w-full">
                      <PlusCircle className="w-5 h-5" />
                      {option.cta}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </LayoutDecider>
  );
}
