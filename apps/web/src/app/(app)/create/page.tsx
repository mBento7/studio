"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Briefcase,
  Newspaper,
  PlusCircle,
  Megaphone,
  Ticket,
  ImageIcon,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { LayoutDecider } from '@/components/layout/layout-decider';

const creationOptions = [
  {
    title: "Postagem no Feed",
    description: "Compartilhe uma nova atualização, ideia ou projeto com sua rede.",
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    href: "/dashboard/feed",
    cta: "Criar Postagem",
  },
  {
    title: "Storie 24h",
    description: "Compartilhe um momento que dura 24 horas com seus seguidores.",
    icon: <Clock className="h-8 w-8 text-primary" />,
    href: "#",
    cta: "Criar Storie",
    badge: "Novo",
  },
  {
    title: "Item de Portfólio",
    description: "Adicione um novo trabalho, projeto ou case de sucesso ao seu perfil.",
    icon: <Briefcase className="h-8 w-8 text-primary" />,
    href: "/dashboard/my-profile",
    cta: "Adicionar Item",
  },
  {
    title: "Anúncio Patrocinado",
    description: "Promova seu perfil, serviço ou produto para alcançar mais pessoas.",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    href: "/dashboard/credits/promover",
    cta: "Criar Anúncio",
    badge: "Premium",
  },
  {
    title: "Banner de Perfil",
    description: "Crie um banner customizado para o topo do seu perfil público.",
    icon: <ImageIcon className="h-8 w-8 text-primary" />,
    href: "/dashboard/settings/appearance",
    cta: "Criar Banner",
  },
  {
    title: "Cupom de Desconto",
    description:
      "Gere cupons para seus serviços ou produtos (disponível para contas de negócio).",
    icon: <Ticket className="h-8 w-8 text-primary" />,
    href: "#",
    cta: "Gerar Cupom",
    badge: "Business",
  },
  {
    title: "Showcase de Anúncios",
    description: "Veja exemplos de todos os tipos de anúncios disponíveis na plataforma.",
    icon: <Megaphone className="h-8 w-8 text-primary" />,
    href: "/showcase-lucas",
    cta: "Ver Exemplos",
    badge: "Exemplo",
  },
  {
    title: "Showcase do Feed",
    description: "Veja exemplos de todos os componentes do feed (cards, eventos, cupons, etc).",
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    href: "/showcase-feed",
    cta: "Ver Feed Demo",
    badge: "Exemplo",
  },
];

export default function CreatePage() {
  return (
    <LayoutDecider>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground dark:text-white sm:text-5xl">
            O que você gostaria de criar hoje?
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Selecione uma das opções abaixo para começar a construir sua presença.
          </p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {creationOptions.map((option, idx) => (
            <motion.div
              key={option.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.07, duration: 0.4, type: "spring" }}
            >
              <Card
                className="flex flex-col rounded-lg shadow-xl border border-black/5 bg-card p-5 transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus-within:ring-2 focus-within:ring-primary/40"
                tabIndex={0}
              >
                <CardHeader className="flex-row items-start gap-4 space-y-0">
                  <span className="p-3 bg-muted dark:bg-muted rounded-lg flex items-center justify-center">
                    {option.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg text-foreground dark:text-white">{option.title}</CardTitle>
                      {option.badge && (
                        <Badge variant="secondary" className={cn("bg-secondary text-secondary-foreground dark:bg-secondary dark:text-secondary-foreground px-2 py-0.5 rounded-full text-xs font-bold", option.badge === 'Premium' && 'bg-yellow-100 text-yellow-600 border border-yellow-400')}>{option.badge}</Badge>
                      )}
                    </div>
                    <CardDescription className="mt-1 text-muted-foreground dark:text-muted-foreground">
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
                    <Link href={option.href} passHref className="w-full">
                      <PlusCircle className={option.badge === 'Premium' ? 'text-white' : 'text-white'} />
                      {option.cta}
                      {option.badge === 'Premium' && (
                        <span className="ml-2 text-[10px] font-bold uppercase">Premium</span>
                      )}
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