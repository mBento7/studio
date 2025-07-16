'use client';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox"; // Importe o componente Checkbox
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, X, Star, ExternalLink, Share2, Bookmark, Flame, Heart, MessageCircle, MoreHorizontal, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { UserProfile } from '@/lib/types';
import Link from "next/link";
import { profileLayouts, ProfileLayout } from '@/components/profile-layouts';
import { supabase } from '@/lib/supabase/client';
import { logger } from '@/lib/logger';
import SearchResultCardFree from '@/components/profile-layouts/FreeProfileLayout/SearchResultCardFree';
import SearchResultCardPremium from '@/components/profile-layouts/PremiumProfileLayout/SearchResultCardPremium';
import SearchResultCardStandard from '@/components/profile-layouts/StandardProfileLayout/SearchResultCardStandard';

const BANNERS = [
    { id: 1, image: 'https://picsum.photos/seed/banner-institucional/1200/400', link: '/#beneficios', type: 'Institucional', title: 'Conheça os Benefícios da Whosdo' },
    { id: 2, image: 'https://picsum.photos/seed/banner-oferta/1200/400', link: '/planos', type: 'Oferta', title: 'Planos com até 50% de Desconto' },
    { id: 3, image: 'https://picsum.photos/seed/banner-patrocinado/1200/400', link: '/dashboard/credits/promover', type: 'Patrocinado', title: 'Promova seu Perfil e Ganhe Destaque' },
];

const categories: string[] = ["Serviços", "Produtos", "Lojas e Estabelecimentos"];
// Removidas as constantes globais cities e states, pois serão gerenciadas por estado local.
const ALL_VALUE = "all";

// A função getLayoutComponent agora pode ser mais genérica
const getLayoutComponent = (layoutId?: string): ProfileLayout | undefined => {
  if (!layoutId) {
    // Retorna o layout 'basic' como padrão se nenhum for especificado
    return profileLayouts.find(layout => layout.id === 'basic');
  }
  return profileLayouts.find(layout => layout.id === layoutId);
};

interface Banner {
  id: number;
  image: string;
  link: string;
  type: string;
  title: string;
}

function BannerCarousel({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setIndex(i => (i + 1) % banners.length), 7000);
    return () => clearInterval(timer);
  }, [banners.length]);
  const prev = () => setIndex(i => (i - 1 + banners.length) % banners.length);
  const next = () => setIndex(i => (i + 1) % banners.length);
  return (
    <div className="relative w-full h-56 md:h-72 overflow-hidden mb-0">
      {banners.map((banner: Banner, i: number) => (
        <a
          key={banner.id}
          href={banner.link}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
          tabIndex={i === index ? 0 : -1}
        >
          <img src={banner.image} alt={banner.title} className="w-full h-full object-cover object-center" />
          <span className="absolute bottom-4 left-4 bg-black/60 text-white text-lg px-4 py-2 rounded shadow-lg">{banner.title}</span>
        </a>
      ))}
      <Button onClick={prev} variant="ghost" className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 z-20">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg>
      </Button>
      <Button onClick={next} variant="ghost" className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 z-20">
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
      </Button>
      <div className="absolute bottom-4 right-8 flex gap-2 z-20">
        {banners.map((_: Banner, i: number) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}></button>
        ))}
      </div>
    </div>
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
    <Card className="w-full p-5 shadow-xl shadow-black/20 rounded-lg bg-white dark:bg-zinc-800 border border-black/5 dark:border-zinc-700">
      <div className="w-full bg-white dark:bg-zinc-800 rounded-lg shadow-xl shadow-black/10 overflow-hidden border border-black/5 dark:border-zinc-700">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.id}/400/200')` }} />
          <div className="relative p-3 h-full flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="px-2 py-1 bg-background/80 rounded-full text-xs font-medium">
                {item.category}
              </span>
              <Button onClick={handleBookmark} variant="ghost" className={cn(
                "p-2 rounded-lg transition-all",
                isBookmarked 
                  ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10" 
                  : "text-muted-foreground hover:bg-background/50"
              )}>
                <Bookmark className={cn("w-4 h-4", isBookmarked && "fill-current")}/>
              </Button>
            </div>
            <div>
              <h3 className="font-semibold text-base text-foreground mb-1 truncate">{item.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
            </div>
          </div>
        </div>
        <CardContent className="p-3 flex-grow">
          <div className="flex items-center gap-3">
            <img src={item.author.avatar} alt={item.author.name} className="w-8 h-8 rounded-full" />
            <div>
              <p className="font-semibold text-sm">{item.author.name}</p>
              <p className="text-xs text-muted-foreground">{item.author.role}</p>
            </div>
          </div>
        </CardContent>
        <div className="px-3 pb-3 border-t border-border/10 pt-2 flex items-center justify-between text-muted-foreground">
          <Button 
            onClick={handleLike} 
            variant="ghost"
            className={cn(
              "flex items-center gap-1.5 text-xs hover:text-red-500 transition-colors",
              isLiked && "text-red-500"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")}/> {likes}
          </Button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="flex items-center gap-1.5 text-xs hover:text-primary">
              <MessageCircle className="w-4 h-4" /> Comentar
            </Button>
            <Button variant="ghost" className="flex items-center gap-1.5 text-xs hover:text-primary">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SearchHeader({ 
  searchTerm, 
  setSearchTerm, 
  selectedCategory, 
  setSelectedCategory, 
  selectedCity, 
  setSelectedCity,
  selectedState,
  setSelectedState,
  hasActiveFilters, 
  clearFilters,
  isOnlineService, // Novo prop
  setIsOnlineService, // Novo prop
  availableCities, // Novo prop
  availableStates // Novo prop
}: { 
  searchTerm: string, 
  setSearchTerm: (v: string) => void, 
  selectedCategory: string, 
  setSelectedCategory: (v: string) => void, 
  selectedCity: string, 
  setSelectedCity: (v: string) => void, 
  selectedState: string,
  setSelectedState: (v: string) => void,
  hasActiveFilters: boolean, 
  clearFilters: () => void,
  isOnlineService: boolean; // Novo tipo
  setIsOnlineService: (v: boolean) => void; // Novo tipo
  availableCities: string[]; // Novo prop
  availableStates: string[]; // Novo prop
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-4 px-2 md:px-6 bg-transparent"
    >
      <form className="flex flex-col items-center justify-center gap-4 w-full" onSubmit={e => { e.preventDefault(); }}>
        <div className="flex items-center w-full max-w-xl rounded-lg bg-card border border-black/5 shadow-sm p-1 pr-1.5">
          <label htmlFor="search-input" className="sr-only">Buscar</label>
          <SearchIcon className="h-5 w-5 text-muted-foreground ml-4 mr-2 flex-shrink-0" />
          <Input
            id="search-input"
            type="text"
            placeholder="Busque por nome, habilidade, serviço..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 h-10 text-base rounded-lg"
          />
          <Button
            type="submit"
            className="h-10 px-6 rounded-lg bg-[#14b8a6] hover:bg-[#0e9094] text-white font-bold shadow-lg transition-all duration-200 flex-shrink-0 border-2 border-transparent focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]"
            style={{ minWidth: 110 }}
          >
            Buscar
          </Button>
        </div>
        
        {/* Botões de filtro com quebra de linha e centralizados */}
        <div className="flex items-center justify-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={cn(
  "rounded-lg px-2 h-8 text-xs transition-colors border border-slate-200 shadow-sm focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]",
  "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
  selectedCategory !== ALL_VALUE ? "border-[#14b8a6]" : "border-slate-200"
)}>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todas categorias</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className={cn(
              "rounded-lg px-2 h-8 text-xs transition-colors border border-slate-200 shadow-sm focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]",
              "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
              selectedState !== ALL_VALUE ? "border-[#14b8a6]" : "border-slate-200"
            )}>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todos estados</SelectItem>
              {availableStates.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className={cn(
              "rounded-lg px-2 h-8 text-xs transition-colors border border-slate-200 shadow-sm focus:border-[#14b8a6] focus:ring-2 focus:ring-[#14b8a6]",
              "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
              selectedCity !== ALL_VALUE ? "border-[#14b8a6]" : "border-slate-200"
            )}>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todas cidades</SelectItem>
              {availableCities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Novo filtro para serviços online */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="online-service"
              checked={isOnlineService}
              onCheckedChange={(checked) => setIsOnlineService(!!checked)}
            />
            <label
              htmlFor="online-service"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Atendimento Online
            </label>
          </div>

          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="rounded-lg h-8 px-2 text-xs bg-muted/50 hover:bg-muted font-semibold dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
              type="button"
            >
              <X className="w-4 h-4 mr-1" /> Limpar
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
}

export default function SearchShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_VALUE);
  const [selectedCity, setSelectedCity] = useState(ALL_VALUE);
  const [selectedState, setSelectedState] = useState(ALL_VALUE);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>([]);
  const [allProfiles, setAllProfiles] = useState<UserProfile[]>([]);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'social'>('grid');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);
  const [isOnlineService, setIsOnlineService] = useState(false); // Estado para o filtro de serviço online
  const [availableCities, setAvailableCities] = useState<string[]>([]); // Novo estado para cidades
  const [availableStates, setAvailableStates] = useState<string[]>([]); // Novo estado para estados

  useEffect(() => {
    const fetchProfiles = async () => {
      let query = supabase.from('profiles').select('*, location'); // Seleciona também a coluna location

      if (searchTerm) {
        query = query.or(
          `full_name.ilike.%${searchTerm}%,skills.cs.{${searchTerm}},category.ilike.%${searchTerm}%`
        );
      }
      if (selectedCategory !== ALL_VALUE) {
        query = query.eq('category', selectedCategory);
      }
      if (selectedState !== ALL_VALUE) {
        query = query.eq('location->>state', selectedState);
      }
      if (selectedCity !== ALL_VALUE) {
        query = query.eq('location->>city', selectedCity);
      }
      if (isOnlineService) {
        query = query.eq('is_online_service', true); // Assumindo uma coluna 'is_online_service' booleana
      }

      const { data, error } = await query;

      if (!error && data) {
        const mapped = data.map((user: any) => ({
          ...user,
          name: user.full_name || user.name || "Usuário",
          profile_picture_url: user.profile_picture_url || user.avatar_url || "/avatar-default.png",
          category: user.category || "Categoria Exemplo",
          bio: user.bio || "",
          cover_photo_url: user.cover_photo_url || "",
          isOnlineService: user.is_online_service || false, // Mapeia o campo online
          location: user.location || { city: '', state: '' }, // Mapeia a localização
          layoutTemplateId: user.layout_template_id || user.layoutTemplateId, // <-- Adicionado!
        }));
        setAllProfiles(mapped as UserProfile[]);

        // Popular cidades e estados únicos e atualizar os estados locais
        const uniqueCities = Array.from(new Set(data.map((p: any) => p.location?.city).filter(Boolean)));
        const uniqueStates = Array.from(new Set(data.map((p: any) => p.location?.state).filter(Boolean)));
        setAvailableCities(uniqueCities.sort()); // Opcional: ordenar alfabeticamente
        setAvailableStates(uniqueStates.sort()); // Opcional: ordenar alfabeticamente

        logger.debug('Location data loaded', { citiesCount: uniqueCities.length, statesCount: uniqueStates.length });
      }
    };
    fetchProfiles();
  }, [searchTerm, selectedCategory, selectedCity, selectedState, isOnlineService]); // Adiciona dependências dos filtros

  // Remove o useEffect anterior que aplicava os filtros no cliente, pois agora a filtragem é feita no servidor.
  // O useEffect abaixo será removido ou modificado para não duplicar a lógica de filtragem.
  /*
  useEffect(() => {
    let results = allProfiles;
    // ... lógica de filtragem anterior ...
    setFilteredProfiles(results);
    setHasActiveFilters(
      searchTerm !== '' ||
      selectedCategory !== ALL_VALUE ||
      selectedCity !== ALL_VALUE ||
      selectedState !== ALL_VALUE ||
      isOnlineService
    );
  }, [searchTerm, selectedCategory, selectedCity, selectedState, allProfiles, isOnlineService]);
  */

  useEffect(() => {
    // Atualiza filteredProfiles quando allProfiles muda (já filtrado pelo fetchProfiles)
    setFilteredProfiles(allProfiles);
    setHasActiveFilters(
      searchTerm !== '' ||
      selectedCategory !== ALL_VALUE ||
      selectedCity !== ALL_VALUE ||
      selectedState !== ALL_VALUE ||
      isOnlineService
    );
  }, [allProfiles, searchTerm, selectedCategory, selectedCity, selectedState, isOnlineService]);

  const clearFilters = () => {
    setSelectedCategory(ALL_VALUE);
    setSelectedCity(ALL_VALUE);
    setSelectedState(ALL_VALUE);
    setSearchTerm("");
    setIsOnlineService(false); // Limpar o filtro de serviço online
  };

  return (
    <div className="bg-gray-50 dark:bg-card min-h-screen">
      <BannerCarousel banners={BANNERS} />

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 pt-8 bg-white dark:bg-card rounded-xl shadow-lg">
        <SearchHeader
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          hasActiveFilters={hasActiveFilters}
          clearFilters={clearFilters}
          isOnlineService={isOnlineService}
          setIsOnlineService={setIsOnlineService}
          availableCities={availableCities} // Passa as cidades disponíveis como prop
          availableStates={availableStates} // Passa os estados disponíveis como prop
        />
        <div className="my-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              Resultados da Busca
            </h2>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setIsFiltersVisible(!isFiltersVisible)}>
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-4 md:gap-6",
            "grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 auto-rows-fr"
          )}>
            <AnimatePresence>
              {filteredProfiles.map(profile => {
                // DEBUG: Verificar qual card será renderizado
                logger.debug('Rendering search card', { username: profile.username, layoutTemplate: profile.layoutTemplateId });
                let SearchResultComponent;
                if (profile.layoutTemplateId === 'premium') {
                  SearchResultComponent = SearchResultCardPremium;
                } else if (profile.layoutTemplateId === 'standard') {
                  SearchResultComponent = SearchResultCardStandard;
                } else {
                  SearchResultComponent = SearchResultCardFree;
                }
                return (
                  <motion.div
                    key={profile.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <SearchResultComponent user={profile} />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
          {filteredProfiles.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Nenhum resultado encontrado.</p>
              <p className="mt-2 text-muted-foreground">Tente ajustar seus filtros ou buscar por outros termos.</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile: Stories e resultados mobile */}
      <div className="block md:hidden">
        {/* <CardFeedMobile ... /> removido */}
        {/* {filteredProfiles.map(profile => (
          <CardFeedMobile key={profile.id} post={{
            ...
          }} />
        ))} */}
      </div>
    </div>
  );
}

export { BannerCarousel as SearchBannerCarousel };