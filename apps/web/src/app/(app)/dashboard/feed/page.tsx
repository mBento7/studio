"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Search, Flame, Sparkles, Handshake, Clock, Percent, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { CreateCouponModal } from '@/features/dashboard/create-coupon-modal';

// Mock data (omitido por brevidade)
import { stories, feedItems, ads, coupons } from './mock-data';

function PublicHeader() {
  return (
    <header className="sticky top-0 z-20 backdrop-blur-sm bg-background/70 px-6 py-3 flex items-center justify-between">
      <h1 className="text-2xl font-bold">WhosDo</h1>
      <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Buscar serviços..."
          className="w-full pl-10 pr-4 py-2 rounded-full bg-white/20 text-white placeholder-white/70 focus:bg-white/30 transition"
        />
      </div>
    </header>
  );
}

function StoriesCarousel() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-cover bg-center blur-sm opacity-20" style={{ backgroundImage: `url("https://picsum.photos/seed/story-bg/800/200")` }} />
      <div className="relative p-4 space-y-4">
        <h2 className="text-xl font-bold text-foreground">Destaques 24h</h2>
        <div className="flex space-x-3 overflow-x-auto pb-2">
          {stories.map((s) => (
            <div key={s.id} className="flex-shrink-0 text-center group">
              <div className="relative w-20 h-20 rounded-full ring-2 ring-primary p-1 transition-transform group-hover:scale-110">
                <Image src={s.avatar} alt={s.user} width={80} height={80} className="rounded-full object-cover" />
                {/* indicador de progresso (dummy) */}
                <div className="absolute inset-0 rounded-full border-2 border-primary" />
              </div>
              <p className="mt-1 text-xs text-muted-foreground group-hover:text-foreground">{s.user}</p>
            </div>
          ))}
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
        "flex items-center gap-2 px-4 py-2 rounded-full transition",
        active
          ? "bg-primary text-white shadow-lg"
          : "bg-background/50 text-muted-foreground hover:bg-background/70"
      )}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );
}

function FeedContent() {
  const tabs = [
    { key: 'trending', label: 'Em Alta', icon: Flame },
    { key: 'new', label: 'Novidades', icon: Sparkles },
    { key: 'recommended', label: 'Recomendados', icon: Handshake },
  ];
  const [activeTab, setActiveTab] = useState<'trending'|'new'|'recommended'>('trending');

  return (
    <section className="space-y-6">
      {/* Tabs */}
      <div className="flex space-x-3">
        {tabs.map((t) => (
          <TabButton
            key={t.key}
            icon={t.icon}
            label={t.label}
            active={activeTab === t.key}
            onClick={() => setActiveTab(t.key as 'trending'|'new'|'recommended')}
          />
        ))}
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {feedItems[activeTab].map((item) => (
          <Card
            key={item.id}
            className="hover:shadow-xl transition-shadow border bg-card"
          >
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-xs text-muted-foreground">por {item.user}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

function QuickActions({ onCouponClick }: { onCouponClick: () => void }) {
  return (
    <div className="space-y-4 p-5 bg-card/80 backdrop-blur-md rounded-xl shadow-xl border border-border">
      <h3 className="text-lg font-semibold text-center">Criar Novo</h3>

      <TooltipProvider>
        <div className="space-y-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
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
                className="w-full bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
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
              <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2">
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
    <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Anúncios em Alta</h3>
      {ads.map((ad) => (
        <div key={ad.id} className="relative h-24 rounded-lg overflow-hidden">
          <Image src={ad.img} alt={ad.title} fill className="object-cover opacity-75 group-hover:opacity-100 transition-opacity" />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-2">
            <p className="text-sm text-white">{ad.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CouponsWidget() {
  return (
    <div className="p-4 bg-card/80 backdrop-blur-sm rounded-lg shadow-lg space-y-3">
      <h3 className="text-lg font-semibold">Cupons Ativos</h3>
      {coupons.map((c) => (
        <div key={c.id} className="flex justify-between items-center p-3 bg-muted/50 rounded-md">
          <div>
            <p className="font-semibold text-primary">{c.code}</p>
            <p className="text-xs text-muted-foreground">{c.desc}</p>
          </div>
          <Button size="sm" variant="outline">Copiar</Button>
        </div>
      ))}
    </div>
  );
}

export default function FeedPage() {
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col h-screen">
        {/* Header fixo com blur */}
        <PublicHeader />

        <div className="flex flex-1 overflow-hidden">
          {/* Main feed */}
          <main className="flex-1 overflow-y-auto p-6 space-y-8">
            <StoriesCarousel />
            <FeedContent />
          </main>

          {/* Sidebar (desktop) */}
          <aside className="w-80 p-6 bg-background/70 backdrop-blur-sm border-l hidden lg:block space-y-6">
            <QuickActions onCouponClick={() => setIsCouponModalOpen(true)} />
            <TrendingAds />
            <CouponsWidget />
          </aside>
        </div>
      </div>
      <CreateCouponModal isOpen={isCouponModalOpen} onOpenChange={setIsCouponModalOpen} />
    </>
  );
}
