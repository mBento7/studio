'use client';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, X, Star, ExternalLink, Share2, Bookmark, Flame, Heart, MessageCircle, MoreHorizontal, SlidersHorizontal, LayoutGrid, List } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockUserProfiles, feedMockCards } from '@/lib/mock-data';
import type { UserProfile } from '@/lib/types';
import Link from "next/link";
import { profileLayouts, ProfileLayout } from '@/components/profile-layouts';

const BANNERS = [
    { id: 1, image: 'https://picsum.photos/seed/banner-institucional/1200/400', link: '/#beneficios', type: 'Institucional', title: 'Conheça os Benefícios da Whosdo' },
    { id: 2, image: 'https://picsum.photos/seed/banner-oferta/1200/400', link: '/planos', type: 'Oferta', title: 'Planos com até 50% de Desconto' },
    { id: 3, image: 'https://picsum.photos/seed/banner-patrocinado/1200/400', link: '/dashboard/credits/promover', type: 'Patrocinado', title: 'Promova seu Perfil e Ganhe Destaque' },
];

const categories = Array.from(new Set(mockUserProfiles.map(p => p.category).filter(c => c && c.trim() !== ""))).sort();
const cities = Array.from(new Set(mockUserProfiles.map(p => p.location?.city).filter((c): c is string => c !== undefined && c.trim() !== ""))).sort();
const states = Array.from(new Set(mockUserProfiles.map(p => p.location?.state).filter((s): s is string => s !== undefined && s.trim() !== ""))).sort();
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
      <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 z-20"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M15 19l-7-7 7-7"/></svg></button>
      <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white rounded-full p-3 z-20"><svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeWidth="2" d="M9 5l7 7-7 7"/></svg></button>
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
    <Card className="w-full p-2 shadow-lg shadow-black/5 dark:shadow-black/20 rounded-xl bg-card/90 border-0">
      <div className="w-full bg-card rounded-md shadow-xl shadow-black/10 dark:shadow-teal-500/10 overflow-hidden border border-black/5 dark:border-white/10">
        <div className="relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0">
          <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url('https://picsum.photos/seed/${item.id}/400/200')` }} />
          <div className="relative p-3 h-full flex flex-col justify-between">
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
          <button 
            onClick={handleLike} 
            className={cn(
              "flex items-center gap-1.5 text-xs hover:text-red-500 transition-colors",
              isLiked && "text-red-500"
            )}
          >
            <Heart className={cn("w-4 h-4", isLiked && "fill-current")} /> {likes}
          </button>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 text-xs hover:text-primary"><MessageCircle className="w-4 h-4" /> Comentar</button>
            <button className="flex items-center gap-1.5 text-xs hover:text-primary"><MoreHorizontal className="w-4 h-4" /></button>
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
  clearFilters 
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
  clearFilters: () => void 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="py-4 px-2 md:px-6 bg-transparent"
    >
      <form className="flex flex-col items-center justify-center gap-4 w-full" onSubmit={e => { e.preventDefault(); }}>
        <div className="flex items-center w-full max-w-xl rounded-full bg-card border border-border/30 shadow-sm p-1 pr-1.5">
          <label htmlFor="search-input" className="sr-only">Buscar</label>
          <SearchIcon className="h-5 w-5 text-muted-foreground ml-4 mr-2 flex-shrink-0" />
          <Input
            id="search-input"
            type="text"
            placeholder="Busque por nome, habilidade, serviço..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="flex-grow bg-transparent border-none focus:ring-0 h-10 text-base"
          />
          <Button
            type="submit"
            className="h-10 px-6 rounded-full bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md flex-shrink-0"
            style={{ minWidth: 110 }}
          >
            Buscar
          </Button>
        </div>
        
        {/* Botões de filtro com quebra de linha e centralizados */}
        <div className="flex items-center justify-center gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className={cn(
              "rounded-full px-4 h-10 text-base transition-colors border",
              "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
              selectedCategory !== ALL_VALUE ? "border-slate-400 dark:border-slate-500" : "border-transparent"
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
              "rounded-full px-4 h-10 text-base transition-colors border",
              "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
              selectedState !== ALL_VALUE ? "border-slate-400 dark:border-slate-500" : "border-transparent"
            )}>
              <SelectValue placeholder="Estado" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todos estados</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedCity} onValueChange={setSelectedCity}>
            <SelectTrigger className={cn(
              "rounded-full px-4 h-10 text-base transition-colors border",
              "bg-muted/50 hover:bg-muted dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700",
              selectedCity !== ALL_VALUE ? "border-slate-400 dark:border-slate-500" : "border-transparent"
            )}>
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ALL_VALUE}>Todas cidades</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              onClick={clearFilters}
              className="rounded-full h-10 px-4 bg-muted/50 hover:bg-muted font-semibold dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
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
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'social'>('grid');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  useEffect(() => {
    let results = mockUserProfiles;
    if (searchTerm) {
      results = results.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.bio?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedCategory !== ALL_VALUE) {
      results = results.filter(p => p.category === selectedCategory);
    }
    if (selectedState !== ALL_VALUE) {
      results = results.filter(p => p.location?.state === selectedState);
    }
    if (selectedCity !== ALL_VALUE) {
      results = results.filter(p => p.location?.city === selectedCity);
    }
    setFilteredProfiles(results);
    setHasActiveFilters(
      searchTerm !== '' ||
      selectedCategory !== ALL_VALUE ||
      selectedCity !== ALL_VALUE ||
      selectedState !== ALL_VALUE
    );
  }, [searchTerm, selectedCategory, selectedCity, selectedState]);

  const clearFilters = () => {
    setSelectedCategory(ALL_VALUE);
    setSelectedCity(ALL_VALUE);
    setSelectedState(ALL_VALUE);
    setSearchTerm("");
  };

  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <BannerCarousel banners={BANNERS} />

      <div className="container mx-auto px-2 sm:px-4 lg:px-6 -mt-16 relative z-20">
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
            "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          )}>
            <AnimatePresence>
              {filteredProfiles.map(profile => {
                  const Layout = getLayoutComponent(profile.layoutTemplateId);
                  const SearchResultComponent = Layout?.SearchResultComponent;
                  
                  if (SearchResultComponent) {
                    return (
                        <motion.div
                          key={profile.id}
                          layout
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.3 }}
                        >
                            <SearchResultComponent user={profile} />
                        </motion.div>
                    );
                  }

                  // Fallback para um card genérico caso o layout não seja encontrado
                  return (
                    <motion.div
                      key={profile.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Card>
                          <CardContent className="p-4">
                              <Link href={`/profile/${profile.username}`}>
                                  <h3 className="font-bold">{profile.name}</h3>
                                  <p className="text-sm text-muted-foreground">{profile.category}</p>
                              </Link>
                          </CardContent>
                      </Card>
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
    </div>
  );
}

export { BannerCarousel as SearchBannerCarousel }; 