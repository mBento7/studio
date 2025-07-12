"use client";

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Flame,
  Sparkles,
  Handshake,
  Clock,
  Percent,
  Megaphone,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  ConciergeBell,
  Box,
  Siren,
  ShoppingCart,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FeedCard } from '@/components/feed/FeedCard';
import { LeftProfileSidebar } from '@/components/layout/left-profile-sidebar';
import './feed-scrollbar.css';
import { FeedPostEditor } from '@/components/feed/FeedPostEditor';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Button as UIButton } from '@/components/ui/button';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/lib/supabase/client';
import { SponsoredAdCard } from '@/components/feed/SponsoredAdCard';
import BannerCard from '@/components/feed/BannerCard';
import CouponCard from '@/components/feed/CouponCard';
import TestimonialCard from '@/components/feed/TestimonialCard';
import InviteCard from '@/components/feed/InviteCard';
import EventCard from '@/components/feed/EventCard';
import { LayoutDecider } from '@/components/layout/layout-decider';
import StoryModal from '@/components/feed/StoryModal';
import type { FeedCardProps } from '@/components/feed/FeedCard';
import { getAllUserProfiles } from '@/services/profile.service';
import UpdateCard from '@/components/feed/UpdateCard';
import CuponFeedCard from '@/components/feed/CuponFeedCard';

// Mock data
const stories = [
  { id: 1, user: "João", avatar: "https://picsum.photos/seed/user1/80/80", timeLeft: 85 },
  { id: 2, user: "Maria", avatar: "https://picsum.photos/seed/user2/80/80", timeLeft: 60 },
  { id: 3, user: "Pedro", avatar: "https://picsum.photos/seed/user3/80/80", timeLeft: 92 },
  { id: 4, user: "Ana", avatar: "https://picsum.photos/seed/user4/80/80", timeLeft: 45 },
  { id: 5, user: "Carlos", avatar: "https://picsum.photos/seed/user5/80/80", timeLeft: 78 },
  { id: 6, user: "Lucia", avatar: "https://picsum.photos/seed/user6/80/80", timeLeft: 30 },
  { id: 7, user: "Rafael", avatar: "https://picsum.photos/seed/user7/80/80", timeLeft: 95 },
  { id: 8, user: "Sofia", avatar: "https://picsum.photos/seed/user8/80/80", timeLeft: 15 },
];

const feedItems = {
  trending: [
    { id: 1, title: "Serviço de Limpeza Premium", user: "CleanPro", category: "Limpeza" },
    { id: 2, title: "Consultoria em Marketing Digital", user: "DigitalMax", category: "Marketing" },
    { id: 3, title: "Aulas de Yoga Personalizadas", user: "YogaLife", category: "Saúde" },
    { id: 4, title: "Desenvolvimento de Apps", user: "TechSolutions", category: "Tecnologia" },
    { id: 5, title: "Consultoria Financeira", user: "FinanceExpert", category: "Finanças" },
    { id: 6, title: "Design de Interiores", user: "InteriorDesign", category: "Design" },
  ],
  new: [
    { id: 5, title: "Fotografia de Eventos", user: "PhotoStudio", category: "Fotografia" },
    { id: 6, title: "Jardinagem Residencial", user: "GreenThumb", category: "Jardinagem" },
    { id: 7, title: "Personal Trainer", user: "FitCoach", category: "Fitness" },
    { id: 8, title: "Culinária Gourmet", user: "ChefMaster", category: "Gastronomia" },
  ],
  recommended: [
    { id: 9, title: "Consultoria Jurídica", user: "LawFirm", category: "Jurídico" },
    { id: 10, title: "Design Gráfico", user: "CreativeDesign", category: "Design" },
    { id: 11, title: "Manutenção Residencial", user: "FixIt", category: "Manutenção" },
    { id: 12, title: "Tradução Profissional", user: "TranslatePro", category: "Idiomas" },
  ],
};

const ads = [
  { id: 1, title: "Promoção Especial - 50% OFF", img: "https://picsum.photos/seed/ad1/300/100" },
  { id: 2, title: "Novo Serviço Disponível", img: "https://picsum.photos/seed/ad2/300/100" },
  { id: 3, title: "Cadastre-se e Ganhe Desconto", img: "https://picsum.photos/seed/ad3/300/100" },
];

const coupons = [
  { id: 1, code: "SAVE20", desc: "20% de desconto em limpeza" },
  { id: 2, code: "FIRST10", desc: "10% para novos clientes" },
  { id: 3, code: "PREMIUM15", desc: "15% em serviços premium" },
];

interface CreateCouponModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

function CreateCouponModal({ isOpen, onOpenChange }: CreateCouponModalProps) {
  const [couponData, setCouponData] = useState({
    code: '',
    description: '',
    discount: '',
    validUntil: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating coupon:', couponData);
    onOpenChange(false);
    setCouponData({ code: '', description: '', discount: '', validUntil: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-card rounded-xl shadow-lg border border-black/5 dark:border-white/10">
        <DialogHeader>
          <DialogTitle>Criar Novo Cupom</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="code">Código do Cupom</Label>
            <Input
              id="code"
              value={couponData.code}
              onChange={(e) => setCouponData(prev => ({ ...prev, code: e.target.value }))}
              placeholder="Ex: SAVE20"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              value={couponData.description}
              onChange={(e) => setCouponData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva o cupom..."
              required
              className="rounded-lg"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="discount">Desconto (%)</Label>
              <Input
                id="discount"
                type="number"
                value={couponData.discount}
                onChange={(e) => setCouponData(prev => ({ ...prev, discount: e.target.value }))}
                placeholder="20"
                min="1"
                max="100"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Válido até</Label>
              <Input
                id="validUntil"
                type="date"
                value={couponData.validUntil}
                onChange={(e) => setCouponData(prev => ({ ...prev, validUntil: e.target.value }))}
                required
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-full">
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md rounded-full">
              Criar Cupom
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function StoriesCarousel({ userStories, userProfile }: { userStories?: any[]; userProfile?: any }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const storiesPerView = 7;
  const storiesData = (userStories && userStories.length > 0)
    ? userStories.map((s) => ({
        id: String(s.id),
        user: {
          name: userProfile?.name || userProfile?.full_name || 'Você',
          avatarUrl: userProfile?.profile_picture_url || '',
          username: userProfile?.username || '',
        },
        mediaUrl: s.imageUrl,
        type: 'image' as 'image',
        timeLeft: 24,
        liked: false,
      }))
    : stories.map((s, idx) => ({
        id: s.id.toString(),
        user: {
          name: s.user,
          avatarUrl: s.avatar,
          username: s.user.toLowerCase(),
        },
        mediaUrl: s.avatar,
        type: 'image' as 'image',
        timeLeft: 24,
        liked: false,
      }));
  const maxIndex = Math.max(0, storiesData.length - storiesPerView);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStoryIdx, setSelectedStoryIdx] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (modalOpen && selectedStoryIdx !== null && !isPaused) {
      setProgress(0);
      let start = Date.now();
      interval = setInterval(() => {
        const elapsed = Date.now() - start;
        const percent = Math.min(100, (elapsed / 5000) * 100);
        setProgress(percent);
        if (percent >= 100) {
          if (selectedStoryIdx < storiesData.length - 1) {
            setSelectedStoryIdx(selectedStoryIdx + 1);
            setProgress(0);
          } else {
            closeModal();
          }
        }
      }, 50);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [modalOpen, selectedStoryIdx, isPaused, storiesData.length]);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const openStory = (idx: number) => {
    setSelectedStoryIdx(idx);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedStoryIdx(null);
  };

  const pauseCarousel = () => setIsPaused(true);

  const handlePrev = () => {
    if (selectedStoryIdx !== null && selectedStoryIdx > 0) {
      setSelectedStoryIdx(selectedStoryIdx - 1);
      setIsPaused(false);
    }
  };
  const handleNext = () => {
    if (selectedStoryIdx !== null && selectedStoryIdx < storiesData.length - 1) {
      setSelectedStoryIdx(selectedStoryIdx + 1);
      setIsPaused(false);
    }
  };

  return (
    <section className="w-full mb-4">
      <h2 className="text-lg font-bold text-foreground mb-3">Destaques 24h</h2>
      <div className="relative z-0">
        <div className="relative w-full">
          {currentIndex > 0 && (
            <button onClick={scrollLeft} className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow hover:bg-primary/20 transition">
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
          {currentIndex < maxIndex && (
            <button onClick={scrollRight} className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow hover:bg-primary/20 transition">
              <ChevronRight className="w-6 h-6" />
            </button>
          )}
          <div className="overflow-x-hidden overflow-y-hidden w-full py-4 scrollbar-none">
            <div
              className="flex space-x-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 6.5}rem)` }}
            >
              {storiesData.slice(currentIndex, currentIndex + storiesPerView).map((s, idx) => (
                <div key={s.id} className="flex-shrink-0 text-center group cursor-pointer w-20 sm:w-24" onClick={() => openStory(currentIndex + idx)}>
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:z-30 group-hover:relative">
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-card/90 ring-2 ring-background group-hover:ring-primary/50 transition-all duration-300">
                      <img src={s.user.avatarUrl} alt={s.user.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-green-600 transition-colors duration-300">
                      {s.timeLeft}h
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground group-hover:text-foreground group-hover:font-medium transition-all duration-300">{s.user.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {selectedStoryIdx !== null && (
        <StoryModal
          open={modalOpen}
          onClose={closeModal}
          story={storiesData[selectedStoryIdx]}
          onPrev={handlePrev}
          onNext={handleNext}
          onUserAction={pauseCarousel}
          progress={progress}
        />
      )}
    </section>
  );
}

function TabButton({ icon: Icon, label, active, onClick }: { icon: React.ElementType, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center justify-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-dark focus:ring-accent",
        "border",
        active
          ? "bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md border-transparent"
          : "border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094] bg-transparent"
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

function SocialCard({ item }: { item: any }) {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleLike = () => setLiked(!liked);
  const handleBookmark = () => setBookmarked(!bookmarked);

  return (
    <div className="bg-card border border-black/5 dark:border-white/10 rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden">
      <div className="p-4">
        <div className="flex items-center gap-3">
          <img src={`https://picsum.photos/seed/${item.user}/40/40`} alt={item.user} className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-semibold">{item.user}</p>
            <p className="text-xs text-muted-foreground">{item.category}</p>
          </div>
        </div>
        <p className="mt-3 text-base text-foreground">{item.title}</p>
      </div>
      <div className="px-4 pb-3 pt-2 border-t border-border/50 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <button onClick={handleLike} className={cn("flex items-center gap-1.5 text-sm transition-colors", liked ? "text-red-500" : "text-muted-foreground hover:text-red-500")}>
            <Heart className={cn("w-4 h-4", liked && "fill-current")} />
            <span className="text-xs">Gostar</span>
          </button>
          <button className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-sky-500 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs">Comentar</span>
          </button>
        </div>
        <button onClick={handleBookmark} className={cn("text-muted-foreground transition-colors", bookmarked ? "text-orange-500" : "hover:text-orange-500")}>
          <Bookmark className={cn("w-5 h-5", bookmarked && "fill-current")} />
        </button>
      </div>
    </div>
  );
}

function FeedContent({ activeTab, setActiveTab, posts, userProfile, hideFilter }: { activeTab: string, setActiveTab: (tab: string) => void, posts: any[], userProfile: any, hideFilter?: boolean }) {
  const { toast } = useToast();
  const { user } = useAuth();

  // Exemplo de CouponCard usando usuário do supabase
  const couponUser = user && user.user_metadata ? {
    name: user.user_metadata.full_name || user.user_metadata.name || 'Usuário',
    username: user.user_metadata.username || user.email?.split('@')[0] || 'usuario',
    avatarUrl: user.user_metadata.avatar_url || '/avatar-default.png',
  } : undefined;

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'servicos') return post.tipo.endsWith('_servico');
    if (activeTab === 'produtos') return post.tipo.endsWith('_produto');
    if (activeTab === 'solicitacoes') return post.tipo.includes('solicitacao');
    return false;
  });

  // Filtro para remover cards duplicados (mesmo conteúdo)
  const uniquePosts = [] as any[];
  const seen = new Set<string>();
  for (const post of filteredPosts) {
    const key = JSON.stringify(post);
    if (!seen.has(key)) {
      uniquePosts.push(post);
      seen.add(key);
    }
  }

  return (
    <div className="space-y-4">
      {/* Exemplo de CouponCard do usuário autenticado */}
      {couponUser && (
        <CouponCard
          user={couponUser}
          publishedAt={new Date().toISOString()}
          discount="10% OFF"
          code="PROMO10"
          description="Desconto especial para novos usuários em todos os serviços de design."
          validUntil="2025-08-05"
          brand={couponUser.name}
        />
      )}
      <div className="space-y-4">
        {/* Exemplo fixo de EventCard */}
        <EventCard
          id="design-conference-2024"
          name="Design Conference 2024"
          date={new Date().toISOString()}
          location="São Paulo, SP"
          image="https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop"
          attendees={120}
          price="R$ 150,00"
        />
        {uniquePosts.map((item, idx) => {
          switch (item.tipo) {
            case 'oferta_servico':
            case 'oferta_produto':
            case 'solicitacao_servico':
            case 'solicitacao_produto': {
              // Remover usuarioId das props
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const { usuarioId, ...feedCardProps } = item;
              // Corrigir usuario: garantir sempre objeto { nome, avatar }
              let usuario = item.usuario;
              if (typeof usuario === 'string') {
                usuario = {
                  nome: usuario,
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder',
                };
              }
              return <FeedCard key={idx} {...feedCardProps} usuario={usuario} />;
            }
            case 'anuncio_patrocinado':
              return <SponsoredAdCard key={idx} {...item} />;
            case 'banner':
              return <BannerCard key={idx} {...item} />;
            case 'cupom':
              return <CouponCard key={idx} {...item} />;
            case 'atualizacao':
              return <UpdateCard key={idx} {...item} />;
            case 'depoimento': {
              const { usuarioId, ...testimonialProps } = item;
              let usuario = item.usuario;
              if (typeof usuario === 'string') {
                usuario = {
                  nome: usuario,
                  avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=placeholder',
                };
              }
              // Adaptar para o formato esperado pelo TestimonialCard moderno
              const user = {
                name: usuario.nome,
                avatar: usuario.avatar,
              };
              const rating = item.nota || item.rating || 5;
              const comment = item.comentario || item.comment || '';
              const service = item.servico || item.service || '';
              const date = item.data || item.date || '';
              // Ajuste: garantir que todos os campos obrigatórios estejam presentes
              return (
                <TestimonialCard
                  key={idx}
                  post={{
                    id: item.id || String(idx),
                    type: 'testimonial',
                    user,
                    rating,
                    comment,
                    service,
                    serviceProvider: user, // ajuste conforme necessário
                    engagement: { likes: 0, comments: 0, shares: 0 }, // ajuste conforme necessário
                    timeAgo: date,
                  }}
                />
              );
            }
            case 'indicacao':
              return <InviteCard key={idx} {...item} />;
            case 'evento':
              return <EventCard key={idx} {...item} />;
            default:
              return null;
          }
        })}
      </div>
    </div>
  );
}

function UserAdExample() {
  return (
    <div className="relative bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-md rounded-2xl shadow-lg border border-blue-500/20 overflow-hidden">
      <div className="absolute top-3 right-3 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
        PATROCINADO
      </div>
      
      {/* Large header image */}
      <div className="relative h-32 bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
        <img 
          src="https://picsum.photos/seed/useradexample/400/150" 
          alt="TechSolutions Banner" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-start gap-3">
          <img 
            src="https://picsum.photos/seed/useradlogo/50/50" 
            alt="TechSolutions" 
            className="w-12 h-12 rounded-full object-cover border-2 border-background shadow-md"
          />
          <div className="flex-1">
            <h4 className="font-bold text-base">TechSolutions</h4>
            <p className="text-sm text-muted-foreground">Desenvolvimento de Apps</p>
            <div className="flex items-center gap-1 mt-1">
              <div className="flex text-yellow-400">
                {"★".repeat(5)}
              </div>
              <span className="text-xs text-muted-foreground">(4.9)</span>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground">
          Transforme sua ideia em realidade! Apps iOS e Android com qualidade profissional e suporte completo.
        </p>
        
        <div className="flex items-center gap-2">
          <span className="text-sm bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-3 py-1 rounded-full font-medium">
            20% OFF
          </span>
          <span className="text-sm text-muted-foreground">até 31/12</span>
        </div>
        
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md">
          Ver Oferta Completa
        </Button>
      </div>
    </div>
  );
}

function PremiumAdCard() {
  return (
    <div className="relative p-6 bg-gradient-to-br from-yellow-500/20 via-orange-500/20 to-red-500/20 backdrop-blur-md rounded-2xl shadow-xl border border-yellow-500/30 overflow-hidden">
      <div className="absolute top-2 right-2 bg-yellow-500 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
        PREMIUM
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-bold text-foreground">Destaque seu Negócio</h3>
        <p className="text-sm text-muted-foreground">
          Alcance mais clientes com anúncios premium e apareça no topo dos resultados.
        </p>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-green-600 font-semibold">+300%</span>
          <span className="text-muted-foreground">mais visualizações</span>
        </div>
        <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg">
          Começar Agora
        </Button>
      </div>
    </div>
  );
}

function QuickActions({ onCouponClick }: { onCouponClick: () => void }) {
  return (
    <div className="space-y-4 p-5 bg-card/90 backdrop-blur-md rounded-2xl shadow-xl border border-border">
      <h3 className="text-lg font-semibold text-center">Criar Novo</h3>

      <TooltipProvider>
        <div className="space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105">
                <Clock className="w-4 h-4" />
                Status (24h)
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Publique um conteúdo que dura 24 horas.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105"
                onClick={onCouponClick}
              >
                <Percent className="w-4 h-4" />
                Cupom / Oferta
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Ofereça um desconto ou promoção especial.</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2 shadow-md transition-transform hover:scale-105">
                <Megaphone className="w-4 h-4" />
                Anúncio Patrocinado
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Impulsione seu conteúdo com mais visibilidade.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
}

function TrendingAds() {
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Anúncios em Alta</h3>
      {ads.map((ad) => (
        <div key={ad.id} className="relative h-24 rounded-lg overflow-hidden group cursor-pointer">
          <img src={ad.img} alt={ad.title} className="w-full h-full object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
            <p className="text-sm text-white">{ad.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function TrendingHashtags() {
  const hashtags = [
    { tag: "#limpeza", posts: 1234 },
    { tag: "#marketing", posts: 987 },
    { tag: "#design", posts: 756 },
    { tag: "#consultoria", posts: 543 },
    { tag: "#fitness", posts: 432 },
  ];

  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Trending</h3>
      <div className="space-y-2">
        {hashtags.map((item, index) => (
          <div key={item.tag} className="flex items-center justify-between p-2 hover:bg-muted/50 rounded-md cursor-pointer transition-colors">
            <div>
              <p className="font-medium text-primary">{item.tag}</p>
              <p className="text-xs text-muted-foreground">{item.posts} posts</p>
            </div>
            <span className="text-xs text-muted-foreground">#{index + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function UserSuggestions() {
  const suggestions = [
    { id: 1, name: "TechSolutions", category: "Tecnologia", followers: "2.3k", avatar: "https://picsum.photos/seed/suggest1/40/40" },
    { id: 2, name: "CleanPro", category: "Limpeza", followers: "1.8k", avatar: "https://picsum.photos/seed/suggest2/40/40" },
    { id: 3, name: "DesignStudio", category: "Design", followers: "3.1k", avatar: "https://picsum.photos/seed/suggest3/40/40" },
  ];

  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Sugestões para Você</h3>
      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center gap-3">
            <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.category} • {user.followers} seguidores</p>
            </div>
            <Button size="sm" variant="outline" className="text-xs">Seguir</Button>
          </div>
        ))}
      </div>
    </div>
  );
}

function ActivityStats() {
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Sua Atividade</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Visualizações hoje</span>
          <span className="font-semibold text-primary">127</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Novos seguidores</span>
          <span className="font-semibold text-green-600">+12</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">Engajamento</span>
          <span className="font-semibold text-blue-600">8.4%</span>
        </div>
        <Button variant="outline" size="sm" className="w-full mt-2">
          Ver Relatório Completo
        </Button>
      </div>
    </div>
  );
}

function CouponsWidget() {
  return (
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-none shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Cupons Ativos</h3>
      {coupons.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-none">
          <div>
            <p className="font-semibold text-primary">{c.code}</p>
            <p className="text-xs text-muted-foreground">{c.desc}</p>
          </div>
          <Button size="sm" variant="outline" className="shadow-sm">Copiar</Button>
        </div>
      ))}
    </div>
  );
}

function StoriesCarouselWithOverflow() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current) {
        setIsOverflowing(containerRef.current.scrollWidth > containerRef.current.clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);

    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  const scrollBy = (amount: number) => {
    containerRef.current?.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative w-full mb-8">
      <div
        ref={containerRef}
        className="flex items-center gap-6 p-4 overflow-x-auto stories-scrollbar bg-card/50 backdrop-blur-sm border"
      >
        {stories.map((story) => (
          <div key={story.id} className="flex-shrink-0 w-24 text-center">
            <div className="relative w-24 h-24 p-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
              <div className="bg-background p-0.5 w-full h-full">
                <img src={story.avatar} alt={story.user} className="w-full h-full object-cover" />
              </div>
              <div
                className="absolute bottom-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 border-2 border-background"
              >
                {`${story.timeLeft}m`}
              </div>
            </div>
            <span className="block text-xs font-medium text-muted-foreground mt-2 truncate">{story.user}</span>
          </div>
        ))}
      </div>
      {isOverflowing && (
        <>
          <Button
            onClick={() => scrollBy(-200)}
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-background/50 hover:bg-background/80 w-8 h-8 z-10"
            variant="outline"
            size="icon"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          <Button
            onClick={() => scrollBy(200)}
            className="absolute top-1/2 right-0 -translate-y-1/2 bg-background/50 hover:bg-background/80 w-8 h-8 z-10"
            variant="outline"
            size="icon"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </>
      )}
    </div>
  );
}

export default function FeedPage() {
  const { user, loading, currentUserProfile } = useAuth();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('todos');
  const [isCouponModalOpen, setCouponModalOpen] = useState(false);
  const [posts, setPosts] = useState<any[]>([]);
  const [activities, setActivities] = useState<any[]>([]);
  const [stories, setStories] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/home');
    }
  }, [user, loading, router]);

  // Gerar stories reais ao carregar
  useEffect(() => {
    async function fetchStories() {
      const users = await getAllUserProfiles(15);
      const storiesData = users.map((u, idx) => ({
        id: u.id,
        user: u.name || u.username,
        avatar: u.profile_picture_url || '/avatar-default.png',
        username: u.username,
        timeLeft: Math.floor(Math.random() * 96) + 1 // tempo fictício
      }));
      setStories(storiesData);
    }
    fetchStories();
  }, []);

  // Gerar cards automáticos ao carregar
  useEffect(() => {
    async function generateFeedFromUsers() {
      const users = await getAllUserProfiles(12);
      if (!users || users.length === 0) return;
      // Mistura de cards para cada usuário
      const cards: any[] = users.flatMap((u, idx) => [
        // FeedCard
        {
          tipo: 'oferta_servico',
          titulo: `Serviço de ${u.category || 'Consultoria'}`,
          descricao: u.bio || 'Serviço profissional de alta qualidade.',
          imagem: u.profile_picture_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
          preco: u.services?.[0]?.price || 'R$ 99,90',
          localizacao: u.location?.city || 'São Paulo, SP',
          patrocinado: idx % 4 === 0,
          usuario: { nome: u.name, avatar: u.profile_picture_url },
          curtidas: Math.floor(Math.random() * 100),
          comentarios: Math.floor(Math.random() * 20),
          tags: u.skills?.slice(0, 3) || ['qualidade', 'promoção'],
          whatsappUrl: u.whatsappNumber ? `https://wa.me/${u.whatsappNumber}` : undefined,
          urgente: idx % 5 === 0,
        },
        // CouponCard
        {
          tipo: 'cupom',
          codigo: `USER${idx + 1}OFF`,
          desconto: `${10 + idx % 20}%`,
          validade: '31/12/2024',
          descricao: `Cupom especial do(a) ${u.name}`,
        },
        // BannerCard
        {
          tipo: 'banner',
          imagem: u.cover_photo_url || 'https://picsum.photos/seed/banner/400/200',
          texto: `Conheça o perfil de ${u.name}`,
          link: `/profile/${u.username}`,
        },
        // EventCard
        {
          tipo: 'evento',
          nome: `Evento com ${u.name}`,
          data: '15/08/2024',
          local: u.location?.city || 'Online',
          imagem: u.profile_picture_url || 'https://picsum.photos/seed/event/400/200',
          link: `/profile/${u.username}`,
        },
        // InviteCard
        {
          tipo: 'convite',
          texto: `Convide amigos para conhecer ${u.name}!`,
          bonus: `${5 + idx} créditos`,
          link: `/profile/${u.username}`,
        },
        // SponsoredAdCard
        {
          tipo: 'patrocinado',
          titulo: `Destaque: ${u.name}`,
          descricao: u.bio || 'Profissional em destaque na plataforma.',
          imagem: u.profile_picture_url || 'https://picsum.photos/seed/ad/400/200',
          link: `/profile/${u.username}`,
          usuarioId: u.id,
        },
        // TestimonialCard
        {
          tipo: 'depoimento',
          usuario: { nome: u.name, avatar: u.profile_picture_url },
          nota: Math.floor(Math.random() * 2) + 4,
          comentario: 'Ótimo profissional, recomendo muito!',
          servico: u.services?.[0]?.name || 'Serviço',
          imagem: u.profile_picture_url || 'https://picsum.photos/seed/testimonial/80/80',
        },
        // UpdateCard
        {
          tipo: 'atualizacao',
          titulo: `Atualização de ${u.name}`,
          descricao: 'Perfil atualizado recentemente!',
          data: 'Hoje',
        },
      ]);
      // Embaralhar cards
      for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [cards[i], cards[j]] = [cards[j], cards[i]];
      }
      setPosts(cards);
    }
    generateFeedFromUsers();
  }, []);

  const handlePost = (newPostData: {
    texto: string;
    imagem?: string | null;
    preco?: string;
    localizacao?: string;
    tipo: 'oferta_servico' | 'oferta_produto' | 'solicitacao_servico' | 'solicitacao_produto';
    urgente?: boolean;
    whatsappUrl?: string;
    tags?: string[];
  }) => {
    const newPost = {
      tipo: newPostData.tipo,
      titulo: 'Novo Post', // Placeholder
      descricao: newPostData.texto,
      imagem: newPostData.imagem || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      preco: newPostData.preco,
      localizacao: newPostData.localizacao,
      patrocinado: false,
      urgente: newPostData.urgente,
      usuario: { 
        nome: user?.user_metadata.full_name || 'Usuário', 
        avatar: user?.user_metadata.avatar_url || 'https://randomuser.me/api/portraits/men/1.jpg' 
      },
      curtidas: 0,
      comentarios: 0,
      tags: newPostData.tags || [],
      whatsappUrl: newPostData.whatsappUrl,
    };
    setPosts((prevPosts: any[]) => [newPost, ...prevPosts]);
  };

  const filteredPosts = posts.filter(post => {
    if (activeTab === 'todos') return true;
    if (activeTab === 'servicos') return post.tipo.endsWith('_servico');
    if (activeTab === 'produtos') return post.tipo.endsWith('_produto');
    if (activeTab === 'solicitacoes') return post.tipo.includes('solicitacao');
    return false;
  });

  // Filtro para remover cards duplicados (mesmo conteúdo)
  const uniquePosts = [] as any[];
  const seen = new Set<string>();
  for (const post of filteredPosts) {
    const key = JSON.stringify(post);
    if (!seen.has(key)) {
      uniquePosts.push(post);
      seen.add(key);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div>Carregando...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-12 px-4 sm:px-6">
      <div className="w-full space-y-6">
        {/* Mobile: Stories e Feed de cards mobile */}
        <div className="block md:hidden">
          {/* <StoriesMobile stories={stories.map(s => ({ avatar: s.avatar, name: s.user }))} /> */}
          {/* CardFeedMobile removido */}
          {/* {feedItems.trending.map((item, idx) => (
            <CardFeedMobile key={item.id} post={{
              image: `https://picsum.photos/seed/feed${item.id}/400/300`,
              title: item.title,
              user: item.user,
              time: 'há 2h',
              description: item.title + ' - ' + item.category
            }} />
          ))} */}
        </div>
        <StoriesCarousel userStories={currentUserProfile?.stories} userProfile={currentUserProfile} />
        <FeedPostEditor onPost={handlePost} />
        {/* Atividades de atualização de perfil */}
        {activities.length > 0 && (
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.id} className="bg-blue-50 border border-blue-200 rounded p-4 flex items-center gap-3">
                <img src={activity.user?.profile_picture_url || 'https://randomuser.me/api/portraits/men/1.jpg'} alt={activity.user?.username} className="w-10 h-10 rounded-full" />
                <div>
                  <span className="font-semibold">{activity.user?.full_name || activity.user?.username}</span> atualizou o perfil!
                  <div className="text-xs text-muted-foreground">{new Date(activity.created_at).toLocaleString('pt-BR')}</div>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Exemplo de CuponFeedCard */}
        <CuponFeedCard
          user={{ name: 'Maria Souza', username: 'mariasouza', avatarUrl: undefined }}
          benefit="20% OFF"
          description="Ganhe 20% de desconto em qualquer serviço de consultoria até o final do mês! Aproveite já."
          publishedAt={new Date().toISOString()}
        />
        <FeedContent activeTab={activeTab} setActiveTab={setActiveTab} posts={uniquePosts} userProfile={currentUserProfile} hideFilter />
      </div>
      <CreateCouponModal isOpen={isCouponModalOpen} onOpenChange={setCouponModalOpen} />
    </div>
  );
}
