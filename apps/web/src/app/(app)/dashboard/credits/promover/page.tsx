"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  ArrowUp,
  Image as ImageIcon,
  Star,
  PlusCircle,
  Gem,
  QrCode,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  PromotionModal,
  PromotionOption,
} from "@/features/credits/promotion-modal";

// Dados baseados em docs/pagamentos-e-creditos/creditos-planejamento.md
const creditPackages = [
  {
    name: "Pacote Básico",
    price: 19.9,
    credits: 100,
    bonus: 0,
    bestValue: false,
  },
  {
    name: "Pacote Pro",
    price: 49.9,
    credits: 250,
    bonus: 10,
    bestValue: true,
  },
  {
    name: "Pacote Business",
    price: 89.9,
    credits: 500,
    bonus: 20,
    bestValue: false,
  },
];

const promotionOptions: PromotionOption[] = [
  {
    title: "Banner na Busca (24h)",
    description:
      "Seu anúncio em destaque no carrossel da página de busca por 24h.",
    cost: 50,
    icon: <ImageIcon className="w-6 h-6 text-blue-500" />,
  },
  {
    title: "Destacar Anúncio (7 dias)",
    description: "Seu anúncio ou perfil aparecerá com destaque na plataforma.",
    cost: 20,
    icon: <Star className="w-6 h-6 text-yellow-500" />,
  },
  {
    title: "Topo da Busca (24h)",
    description: "Garanta que seu perfil seja o primeiro a ser visto nas buscas.",
    cost: 10,
    icon: <ArrowUp className="w-6 h-6 text-green-500" />,
  },
  {
    title: "Cartão Digital com QR Code",
    description: "Crie um cartão de visitas digital exclusivo com QR Code.",
    cost: 30,
    icon: <Zap className="w-6 h-6 text-purple-500" />,
  },
];

export default function PromotePage() {
  const [selectedPromotion, setSelectedPromotion] =
    useState<PromotionOption | null>(null);

  const handleOpenModal = (promotion: PromotionOption) => {
    setSelectedPromotion(promotion);
  };

  const handleCloseModal = () => {
    setSelectedPromotion(null);
  };

  const handleConfirmPromotion = () => {
    // Placeholder para a lógica real de débito de créditos
    if (selectedPromotion) {
      console.log(
        `Gastando ${selectedPromotion.cost} créditos para: ${selectedPromotion.title}`
      );
      // Ex: await creditService.spend(currentUser.id, selectedPromotion.cost);
    }
  };

  return (
    <>
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Promova sua Presença
          </h1>
          <p className="mt-3 text-lg text-muted-foreground sm:mt-4">
            Compre créditos para impulsionar seu perfil, destacar anúncios e
            alcançar mais pessoas.
          </p>
        </header>

        {/* Seção de Pacotes de Créditos */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Pacotes de Créditos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {creditPackages.map((pkg) => (
              <Card
                key={pkg.name}
                className={`flex flex-col ${
                  pkg.bestValue ? "border-primary border-2 shadow-lg" : ""
                }`}
              >
                {pkg.bestValue && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Melhor Custo-Benefício
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{pkg.name}</CardTitle>
                  <CardDescription>
                    <span className="text-4xl font-bold text-foreground">
                      {pkg.credits}
                    </span>{" "}
                    créditos
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow text-center">
                  {pkg.bonus > 0 && (
                    <p className="text-green-600 font-semibold mb-2">
                      + {pkg.bonus}% de bônus!
                    </p>
                  )}
                  <p className="text-lg text-muted-foreground">
                    Ideal para começar a impulsionar seu perfil.
                  </p>
                </CardContent>
                <CardFooter className="flex-col gap-4">
                  <p className="text-3xl font-bold">R$ {pkg.price.toFixed(2)}</p>
                  <Button className="w-full">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Comprar
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Seção de Opções de Promoção */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-8">
            O que você pode fazer com seus créditos?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {promotionOptions.map((opt) => (
              <Card key={opt.title} className="text-center flex flex-col">
                <CardHeader>
                  <div className="mx-auto bg-muted p-3 rounded-full w-fit">
                    {opt.icon}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardTitle className="text-lg mb-2">{opt.title}</CardTitle>
                  <CardDescription>{opt.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex-col gap-2 items-center mt-auto">
                  <Badge variant="secondary" className="text-lg">
                    <Gem className="w-4 h-4 mr-2" />
                    {opt.cost} créditos
                  </Badge>
                  <Button
                    variant="default"
                    className="w-full mt-2"
                    onClick={() => handleOpenModal(opt)}
                  >
                    Promover Agora
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Seção de Exemplos Práticos */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">
            Veja na Prática
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exemplo 1: Banner Lateral Patrocinado */}
            <Card>
              <CardHeader>
                <CardTitle>Banner Lateral Patrocinado</CardTitle>
                <CardDescription>
                  Exiba um banner fixo na coluna direita, visível em toda a
                  plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4 p-4 border rounded-lg bg-background">
                  <div className="flex-grow space-y-3 rounded bg-muted p-3">
                    <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                    <div className="w-5/6 h-4 bg-muted-foreground/20 rounded"></div>
                    <div className="w-full h-4 bg-muted-foreground/20 rounded"></div>
                  </div>
                  <div className="w-1/3 flex-shrink-0">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">
                      Patrocinado
                    </p>
                    <div className="relative aspect-[1/1] w-full bg-muted rounded-md overflow-hidden">
                      <Image
                        src="/banners/patrocinado1.png"
                        alt="Banner Patrocinado Exemplo"
                        layout="fill"
                        objectFit="cover"
                        className="rounded-md"
                      />
                    </div>
                    <h4 className="font-bold text-sm mt-2">TechSolutions</h4>
                    <p className="text-xs text-muted-foreground">
                      Soluções em nuvem.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exemplo 2: Resultados de Busca Promovidos */}
            <Card>
              <CardHeader>
                <CardTitle>Resultados de Busca Promovidos</CardTitle>
                <CardDescription>
                  Apareça no topo dos resultados, garantindo máxima
                  visibilidade.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg bg-background">
                  <p className="font-semibold mb-3 text-sm">
                    Resultados para "Desenvolvedor Full-Stack"
                  </p>
                  <div className="space-y-3">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/50 flex items-center gap-4 relative">
                      <Badge
                        variant="default"
                        className="absolute -top-3 left-3"
                      >
                        Promovido
                      </Badge>
                      <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
                      <div>
                        <h4 className="font-bold">Seu Nome Aqui</h4>
                        <p className="text-sm text-muted-foreground">
                          Disponível para projetos • São Paulo, SP
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold">Maria Silva</h4>
                        <p className="text-sm text-muted-foreground">
                          Backend com Node.js e Python • Remoto
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-lg bg-muted/50 flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-full flex-shrink-0"></div>
                      <div>
                        <h4 className="font-semibold">João Costa</h4>
                        <p className="text-sm text-muted-foreground">
                          Especialista em React e Next.js • POA, RS
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Exemplo 4: Cartão Digital */}
            <Card>
              <CardHeader>
                <CardTitle>Cartão de Visitas Digital</CardTitle>
                <CardDescription>
                  Compartilhe seu contato profissionalmente com um QR Code
                  exclusivo.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="aspect-[1.618] w-full max-w-sm mx-auto bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 flex flex-col justify-between text-white shadow-2xl">
                  <div>
                    <p className="text-2xl font-bold">Seu Nome</p>
                    <p className="text-lg opacity-80">Seu Cargo</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <div className="text-sm">
                      <p>email@exemplo.com</p>
                      <p>(11) 98765-4321</p>
                      <p>seusite.com</p>
                    </div>
                    <div className="w-20 h-20 bg-white rounded-md flex items-center justify-center">
                      <QrCode className="w-16 h-16 text-black" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <PromotionModal
        isOpen={!!selectedPromotion}
        onClose={handleCloseModal}
        promotion={selectedPromotion}
        onConfirm={handleConfirmPromotion}
      />
    </>
  );
} 