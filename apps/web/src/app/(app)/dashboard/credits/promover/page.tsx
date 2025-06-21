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
  Rocket,
  Info,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  PromotionModal,
  PromotionOption,
} from "@/features/credits/promotion-modal";
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

const userCredits = 1000000; // mock
const promotionOptions: PromotionOption[] = [
  {
    title: "Banner na Busca (24h)",
    description: "Seu anúncio em destaque no carrossel da página de busca por 24h.",
    cost: 50,
    icon: <ImageIcon className="w-6 h-6 text-blue-500" />,
    type: "banner-busca",
    highlight: true,
    badge: <Badge className="bg-gradient-to-r from-blue-500 to-blue-300 text-white animate-pulse">Popular</Badge>,
    iconButton: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Destacar Anúncio (7 dias)",
    description: "Seu anúncio ou perfil aparecerá com destaque na plataforma.",
    cost: 20,
    icon: <Star className="w-6 h-6 text-yellow-500" />,
    type: "destaque",
    highlight: false,
    badge: null,
    iconButton: <Star className="w-5 h-5" />,
  },
  {
    title: "Topo da Busca (24h)",
    description: "Garanta que seu perfil seja o primeiro a ser visto nas buscas.",
    cost: 10,
    icon: <ArrowUp className="w-6 h-6 text-green-500" />,
    type: "topo-busca",
    highlight: false,
    badge: null,
    iconButton: <ArrowUp className="w-5 h-5" />,
  },
  {
    title: "Cartão Digital com QR Code",
    description: "Crie um cartão de visitas digital exclusivo com QR Code.",
    cost: 30,
    icon: <Zap className="w-6 h-6 text-purple-500" />,
    type: "cartao-digital"
  },
  {
    title: "Story Patrocinado",
    description: "Seu anúncio em formato de story no topo do feed.",
    cost: 40,
    icon: <Sparkles className="w-6 h-6 text-pink-500" />,
    type: "story",
    highlight: true,
    badge: <Badge className="bg-gradient-to-r from-pink-500 to-pink-300 text-white animate-pulse">Novo</Badge>,
    iconButton: <Sparkles className="w-5 h-5" />,
  },
  {
    title: "Carrossel de Anúncios",
    description: "Vários anúncios em sequência, deslizando horizontalmente no feed.",
    cost: 60,
    icon: <Rocket className="w-6 h-6 text-indigo-500" />,
    type: "carrossel",
    highlight: false,
    badge: null,
    iconButton: <Rocket className="w-5 h-5" />,
  },
  {
    title: "Anúncio em Vídeo",
    description: "Anúncio em vídeo curto, com autoplay e destaque visual.",
    cost: 70,
    icon: <ImageIcon className="w-6 h-6 text-red-500" />,
    type: "video",
    highlight: false,
    badge: null,
    iconButton: <ImageIcon className="w-5 h-5" />,
  },
  {
    title: "Notificação Patrocinada",
    description: "Notificação enviada ao usuário, destacando promoções ou perfis.",
    cost: 25,
    icon: <Star className="w-6 h-6 text-orange-500" />,
    type: "notificacao",
    highlight: false,
    badge: null,
    iconButton: <Star className="w-5 h-5" />,
  },
];

export default function PromotePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [selectedPromotion, setSelectedPromotion] = useState<PromotionOption | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [credits, setCredits] = useState(userCredits);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Carregando...</div>;
  }

  const handleOpenModal = (promotion: PromotionOption) => {
    setSelectedPromotion(promotion);
  };

  const handleCloseModal = () => {
    setSelectedPromotion(null);
  };

  const handleConfirmPromotion = () => {
    if (selectedPromotion && credits >= selectedPromotion.cost) {
      setCredits((c) => c - selectedPromotion.cost);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
      setSelectedPromotion(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-2 text-center">Promova sua Presença</h1>
      <p className="mb-6 text-lg text-muted-foreground text-center">Use seus créditos para destacar seu perfil, anúncios ou serviços e alcançar mais pessoas.</p>
      {/* Saldo de créditos com gradiente e ícone */}
      <div className="bg-gradient-to-br from-green-100 to-green-50 border border-green-200 rounded-lg p-6 text-center mb-6 flex flex-col items-center shadow">
        <Gem className="w-10 h-10 text-green-500 mb-2" />
        <h2 className="text-xl font-bold mb-2">Saldo de Créditos</h2>
        <p className="text-4xl font-bold text-green-600">{credits} créditos</p>
      </div>
      {/* Grid dinâmico de opções de promoção */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-10">
        {promotionOptions.map((opt) => (
          <Card key={opt.title} className={`relative flex flex-col items-center shadow-lg border-2 ${opt.highlight ? 'border-blue-400' : 'border-gray-200'} bg-gradient-to-br from-white to-gray-50 transition-transform duration-200 hover:scale-105 hover:shadow-2xl`}>
            <div className="mb-4 mt-4">{opt.icon}</div>
            {opt.badge && <div className="absolute top-4 right-4">{opt.badge}</div>}
            <CardTitle className="text-lg font-bold mb-2 text-center">{opt.title}</CardTitle>
            <CardContent className="flex-1 flex flex-col justify-center">
              <p className="mb-4 text-gray-500 text-center">{opt.description}</p>
            </CardContent>
            <CardFooter className="flex-col gap-2 items-center mt-auto w-full">
              <Badge variant="secondary" className="text-lg mb-2">
                <Gem className="w-4 h-4 mr-2" />
                {opt.cost} créditos
              </Badge>
              <Button
                variant="default"
                className="w-full mt-2 flex items-center gap-2 text-lg py-3 rounded-xl shadow"
                onClick={() => handleOpenModal(opt)}
                disabled={credits < opt.cost}
              >
                {opt.iconButton} Promover Agora
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      {/* Banner de dica */}
      <div className="flex items-center gap-3 bg-teal-50 border-l-4 border-teal-400 p-4 rounded my-6">
        <Info className="w-6 h-6 text-teal-600" />
        <span className="text-teal-800 font-medium">Dica: quanto mais créditos investir, maior o alcance do seu anúncio!</span>
      </div>
      {/* Feedback visual de sucesso animado */}
      {showSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-800 px-4 py-3 rounded mb-6 text-center animate-bounce">
          Promoção realizada com sucesso!
        </div>
      )}
      {/* Modal de promoção dinâmico */}
      <PromotionModal
        isOpen={!!selectedPromotion}
        onClose={handleCloseModal}
        promotion={selectedPromotion}
        onConfirm={handleConfirmPromotion}
      />
    </div>
  );
} 