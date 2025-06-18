"use client";

import React, { useState, useEffect } from 'react';
import { Search, Flame, Sparkles, Handshake, Clock, Percent, Megaphone, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import SearchShowcase, { SearchBannerCarousel } from '../../../search/SearchShowcase';
import { FeedCard } from '@/components/feed/FeedCard';
import { LeftProfileSidebar } from '@/components/layout/left-profile-sidebar';
import { RightWidgetsColumn } from '@/components/layout/right-widgets-column';
import './feed-scrollbar.css';

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

const postsMock = [
  {
    tipo: 'oferta_servico' as const,
    titulo: 'João Cortes Premium',
    descricao: 'Cortes masculinos R$ 35 – Atendimento em domicílio até 20h',
    imagem: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop',
    preco: '35',
    localizacao: 'Vila Mariana',
    patrocinado: true,
    usuario: { nome: 'João Cortes', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    curtidas: 23,
    comentarios: 4,
    tags: ['Barbearia', 'Domicílio'],
    whatsappUrl: 'https://wa.me/5511999999999',
  },
  {
    tipo: 'oferta_produto' as const,
    titulo: 'Bolos da Lú – Bolo no pote',
    descricao: 'R$ 8 cada | Sabores: Chocolate, Morango, Maracujá',
    imagem: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    preco: '8',
    localizacao: 'Centro',
    usuario: { nome: 'Bolos da Lú', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    curtidas: 12,
    comentarios: 2,
    tags: ['Confeitaria', 'Delivery'],
    whatsappUrl: 'https://wa.me/5511988888888',
  },
  {
    tipo: 'solicitacao_servico' as const,
    titulo: 'Preciso de eletricista urgente',
    descricao: 'Alguém faz instalação de chuveiro hoje na região do Tatuapé? Pago na hora!',
    imagem: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
    localizacao: 'Tatuapé',
    usuario: { nome: 'Carlos Silva', avatar: 'https://randomuser.me/api/portraits/men/65.jpg' },
    curtidas: 5,
    comentarios: 3,
    tags: ['Eletricista', 'Urgente'],
    whatsappUrl: 'https://wa.me/5511977777777',
    urgente: true,
  },
  {
    tipo: 'solicitacao_produto' as const,
    titulo: 'Busco notebook usado até R$ 1500',
    descricao: 'Preciso de um notebook para estudos, pode ser usado, aceito sugestões e ofertas!',
    imagem: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    localizacao: 'Ipiranga',
    usuario: { nome: 'Ana Paula', avatar: 'https://randomuser.me/api/portraits/women/68.jpg' },
    curtidas: 7,
    comentarios: 1,
    tags: ['Notebook', 'Usado', 'Estudo'],
    whatsappUrl: 'https://wa.me/5511966666666',
  },
  {
    tipo: 'patrocinado' as const,
    titulo: 'Curso de Marketing Digital',
    descricao: 'Aprenda as melhores estratégias de marketing digital com profissionais do mercado. Certificado incluso e suporte vitalício.',
    imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop',
    preco: '297',
    localizacao: 'Online',
    patrocinado: true,
    usuario: { nome: 'EduTech Academy', avatar: 'https://randomuser.me/api/portraits/men/12.jpg' },
    curtidas: 156,
    comentarios: 45,
    tags: ['marketing', 'digital', 'curso', 'online'],
    whatsappUrl: 'https://wa.me/5511999999999',
  },
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
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar Novo Cupom</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            />
          </div>
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
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Cupom</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function StoriesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const storiesPerView = 7;
  const maxIndex = Math.max(0, stories.length - storiesPerView);

  // Auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : 0));
    }, 3500);
    return () => clearInterval(interval);
  }, [maxIndex]);

  const scrollLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const scrollRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  return (
    <section className="px-4">
      <div className="p-4 space-y-4 bg-card/50 backdrop-blur-sm rounded-2xl border relative z-0">
        <h2 className="text-lg font-bold text-foreground mb-2 relative z-0">Destaques 24h</h2>
        <div className="relative w-full">
          {/* Botões de seta */}
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
          <div className="overflow-x-hidden overflow-y-hidden w-full px-8 py-4 scrollbar-none">
            <div
              className="flex space-x-4 transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 6.5}rem)` }}
            >
              {stories.map((s) => (
                <div key={s.id} className="flex-shrink-0 text-center group cursor-pointer w-20 sm:w-24">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:z-30 group-hover:relative">
                    <div className="absolute inset-0 rounded-full overflow-hidden bg-card/90 ring-2 ring-background group-hover:ring-primary/50 transition-all duration-300">
                      <img src={s.avatar} alt={s.user} className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-green-600 transition-colors duration-300">
                      {Math.floor(s.timeLeft / 100 * 24)}h
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground group-hover:font-medium transition-all duration-300">{s.user}</p>
                </div>
              )).slice(currentIndex, currentIndex + storiesPerView)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({ icon: Icon, label, active, onClick }: { icon: React.ElementType, label: string, active: boolean, onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-full transition font-semibold shadow-sm",
        active
          ? "bg-primary text-primary-foreground shadow-lg scale-105"
          : "bg-background/70 text-muted-foreground hover:bg-background/90 hover:scale-105"
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function SocialCard({ item }: { item: any }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 100) + 10);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <Card className="hover:shadow-2xl transition-all duration-300 border bg-card/90 rounded-2xl overflow-hidden group max-w-[350px] w-full mx-auto">
      <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.id}/400/200')` }} />
        <div className="relative p-4 h-full flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="px-2 py-1 bg-background/80 rounded-full text-xs font-medium">
              {item.category}
            </span>
            <button
              onClick={handleBookmark}
              className={cn(
                "p-2 rounded-full transition-all",
                isBookmarked 
                  ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10" 
                  : "text-muted-foreground hover:bg-background/50"
              )}
            >
              <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")} />
            </button>
          </div>
          <div>
            <h3 className="font-semibold text-lg text-foreground mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground">por {item.user}</p>
          </div>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 text-sm transition-colors",
                isLiked
                  ? "text-rose-600"
                  : "text-muted-foreground hover:text-rose-600"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 20) + 5}</span>
            </button>
            <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-green-500 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 10) + 2}</span>
            </button>
          </div>
          <button className="p-2 hover:bg-muted rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

function FeedContent({ activeTab, setActiveTab }: { activeTab: 'trending'|'new'|'recommended', setActiveTab: (tab: 'trending'|'new'|'recommended') => void }) {
  const tabs = [
    { key: 'trending', label: 'Em Alta', icon: Flame },
    { key: 'new', label: 'Novidades', icon: Sparkles },
    { key: 'recommended', label: 'Recomendados', icon: Handshake },
  ];
  // Os tabs agora são controlados externamente
  return (
    <section className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        {feedItems[activeTab].map((item) => (
          <SocialCard key={item.id} item={item} />
        ))}
      </div>
    </section>
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
    <div className="p-4 bg-card/90 backdrop-blur-sm rounded-2xl shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Cupons Ativos</h3>
      {coupons.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
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

// Novo componente para carrossel de stories com detecção de overflow
function StoriesCarouselWithOverflow() {
  const [showLeft, setShowLeft] = React.useState(false);
  const [showRight, setShowRight] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const checkOverflow = () => {
      setShowLeft(el.scrollLeft > 0);
      setShowRight(el.scrollWidth > el.clientWidth + el.scrollLeft + 1);
    };
    checkOverflow();
    el.addEventListener('scroll', checkOverflow);
    window.addEventListener('resize', checkOverflow);
    return () => {
      el.removeEventListener('scroll', checkOverflow);
      window.removeEventListener('resize', checkOverflow);
    };
  }, []);

  const scrollBy = (amount: number) => {
    const el = scrollRef.current;
    if (el) el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <div className="relative flex items-center justify-center">
      {showLeft && (
        <button
          onClick={() => scrollBy(-120)}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow hover:bg-primary/20 transition hidden sm:block"
          style={{ left: 4 }}
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      <div
        ref={scrollRef}
        className="flex space-x-5 overflow-x-auto px-2 py-1 hide-scrollbar"
        style={{ scrollBehavior: 'smooth', WebkitOverflowScrolling: 'touch' }}
      >
        {stories.map((s) => (
          <div key={s.id} className="flex-shrink-0 text-center group cursor-pointer w-20 sm:w-24">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full transition-all duration-300 group-hover:scale-125 group-hover:shadow-2xl group-hover:shadow-primary/50 group-hover:z-30 group-hover:relative">
              <div className="absolute inset-0 rounded-full overflow-hidden bg-card/90 ring-2 ring-background group-hover:ring-primary/50 transition-all duration-300">
                <img src={s.avatar} alt={s.user} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 bg-green-500 text-white rounded-full flex items-center justify-center text-xs font-bold group-hover:bg-green-600 transition-colors duration-300">
                {Math.floor(s.timeLeft / 100 * 24)}h
              </div>
            </div>
            <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground group-hover:font-medium transition-all duration-300">{s.user}</p>
          </div>
        ))}
      </div>
      {showRight && (
        <button
          onClick={() => scrollBy(120)}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-background/80 rounded-full p-1 shadow hover:bg-primary/20 transition hidden sm:block"
          style={{ right: 4 }}
          aria-label="Scroll right"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}
    </div>
  );
}

export default function FeedPage() {
  const [tab, setTab] = useState<'feed' | 'search'>('feed');
  const [activeFeedTab, setActiveFeedTab] = useState<'trending'|'new'|'recommended'>('trending');
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  // Definição dos botões principais
  const mainTabs = [
    { key: 'feed', label: 'Em Alta', icon: Flame },
    { key: 'search', label: 'Buscar Profissionais', icon: Search },
  ];

  // Definição dos tabs internos do feed (remover 'Em Alta')
  const feedTabs = [
    { key: 'new', label: 'Novidades', icon: Sparkles },
    { key: 'recommended', label: 'Recomendados', icon: Handshake },
  ];

  // Array de banners mockados para o carrossel
  const searchBanners = [
    { id: 1, image: 'https://placehold.co/600x200/2563eb/fff?text=Oferta+Especial+20%25+OFF', link: '/promo', type: 'promo', title: 'Oferta Especial: 20% OFF!' },
    { id: 2, image: 'https://placehold.co/600x200/facc15/222?text=TechSolutions+Apps+sob+medida', link: '/profile/techsolutions', type: 'patrocinado', title: 'TechSolutions - Apps sob medida' },
    { id: 3, image: 'https://placehold.co/600x200/22d3ee/222?text=Ganhe+créditos+indicando+amigos!', link: '/creditos', type: 'institucional', title: 'Ganhe créditos indicando amigos!' },
    { id: 4, image: 'https://placehold.co/600x200/6366f1/fff?text=WhosDo.com+Conecte-se+e+conquiste+clientes', link: 'https://whosdo.com', type: 'institucional', title: 'WhosDo.com: Conecte-se, destaque-se e conquiste mais clientes! Descubra todos os benefícios.' },
  ];

  // ...mockProfile ou dados reais...
  const mockProfile = {
    name: 'João Silva',
    email: 'joao@exemplo.com',
    profilePictureUrl: '',
    username: 'joaosilva',
    progress: 85,
    stats: { views: 1234, connections: 89, projects: 12 },
  };

  return (
    <>
      {/* Conteúdo principal do feed (tabs, stories, cards, etc.) */}
      {/* TODO: Certifique-se de que não há grid/flex duplicado aqui */}
      {/* Exemplo: */}
      <div className="w-full">
        {/* Tabs principais */}
        <div className="flex flex-nowrap gap-1 mb-4 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-transparent hide-scrollbar">
          {mainTabs.map((t) => (
            <Button
              key={t.key}
              variant="tab"
              active={tab === t.key}
              onClick={() => setTab(t.key as 'feed'|'search')}
              className="whitespace-nowrap"
            >
              <t.icon className="w-4 h-4" />
              {t.label}
            </Button>
          ))}
          <div className="flex gap-1 ml-2">
            {feedTabs.map((t) => (
              <Button
                key={t.key}
                variant="tab"
                active={activeFeedTab === t.key}
                onClick={() => setActiveFeedTab(t.key as 'new'|'recommended')}
                className="whitespace-nowrap"
              >
                <t.icon className="w-4 h-4" />
                {t.label}
              </Button>
            ))}
          </div>
        </div>
        {/* Banner de busca */}
        {tab === 'search' && (
          <div className="px-2 mb-3">
            <SearchBannerCarousel banners={searchBanners} />
          </div>
        )}
        {/* Stories */}
        {tab === 'feed' && (
          <section className="flex flex-col items-center w-full">
            <div className="w-full max-w-3xl mx-auto p-0 sm:p-0">
              <div className="space-y-2 bg-card/60 backdrop-blur-sm rounded-2xl border min-h-0 px-2 py-2">
                <h2 className="text-base font-bold text-foreground mb-1 tracking-tight">Destaques 24h</h2>
                <StoriesCarouselWithOverflow />
              </div>
              {/* Feed de Descobertas */}
              <div className="max-w-3xl mx-auto py-6 px-2 sm:px-0">
                <h1 className="text-2xl font-bold mb-4">Feed de Descobertas</h1>
                {postsMock.map((post, idx) => (
                  <FeedCard key={idx} {...post} />
                ))}
              </div>
            </div>
          </section>
        )}
        {tab === 'search' && (
          <div className="bg-white dark:bg-neutral-900 rounded-b shadow p-2 sm:p-3 mt-4 transition-colors duration-200">
            <SearchShowcase />
          </div>
        )}
        <CreateCouponModal isOpen={isCouponModalOpen} onOpenChange={setIsCouponModalOpen} />
      </div>
    </>
  );
}
