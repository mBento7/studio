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

const creationOptions = [
  {
    title: "Postagem no Feed",
    description: "Compartilhe uma nova atualização, ideia ou projeto com sua rede.",
    icon: <Newspaper className="h-8 w-8 text-primary" />,
    href: "/dashboard/feed", // Placeholder, idealmente abriria um modal de criação de post
    cta: "Criar Postagem",
  },
  {
    title: "Storie 24h",
    description: "Compartilhe um momento que dura 24 horas com seus seguidores.",
    icon: <Clock className="h-8 w-8 text-cyan-500" />,
    href: "#", // Placeholder
    cta: "Criar Storie",
    badge: "Novo",
  },
  {
    title: "Item de Portfólio",
    description: "Adicione um novo trabalho, projeto ou case de sucesso ao seu perfil.",
    icon: <Briefcase className="h-8 w-8 text-emerald-500" />,
    href: "/dashboard/my-profile", // Placeholder, idealmente abriria o modal de portfolio
    cta: "Adicionar Item",
  },
  {
    title: "Anúncio Patrocinado",
    description: "Promova seu perfil, serviço ou produto para alcançar mais pessoas.",
    icon: <Megaphone className="h-8 w-8 text-amber-500" />,
    href: "/dashboard/credits/promover", // Página para comprar créditos para anúncios
    cta: "Criar Anúncio",
    badge: "Premium",
  },
  {
    title: "Banner de Perfil",
    description: "Crie um banner customizado para o topo do seu perfil público.",
    icon: <ImageIcon className="h-8 w-8 text-rose-500" />,
    href: "/dashboard/settings/appearance",
    cta: "Criar Banner",
  },
  {
    title: "Cupom de Desconto",
    description:
      "Gere cupons para seus serviços ou produtos (disponível para contas de negócio).",
    icon: <Ticket className="h-8 w-8 text-indigo-500" />,
    href: "#", // Placeholder
    cta: "Gerar Cupom",
    badge: "Business",
  },
];

export default function CreatePage() {
  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          O que você gostaria de criar hoje?
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
          Selecione uma das opções abaixo para começar a construir sua presença.
        </p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {creationOptions.map((option) => (
          <Card
            key={option.title}
            className="flex flex-col transform transition-transform duration-300 hover:scale-105 hover:shadow-xl"
          >
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <span className="p-3 bg-muted rounded-full">{option.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CardTitle className="text-lg">{option.title}</CardTitle>
                  {option.badge && (
                    <Badge variant="secondary">{option.badge}</Badge>
                  )}
                </div>
                <CardDescription className="mt-1">
                  {option.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Link href={option.href} passHref className="w-full">
                <Button className="w-full">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  {option.cta}
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
} 