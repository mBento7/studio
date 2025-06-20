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

const BANNERS = [
    { id: 1, image: 'https://picsum.photos/seed/banner-institucional/1200/400', link: '/#beneficios', type: 'Institucional', title: 'Conheça os Benefícios da Whosdo' },
    { id: 2, image: 'https://picsum.photos/seed/banner-oferta/1200/400', link: '/planos', type: 'Oferta', title: 'Planos com até 50% de Desconto' },
    { id: 3, image: 'https://picsum.photos/seed/banner-patrocinado/1200/400', link: '/dashboard/credits/promover', type: 'Patrocinado', title: 'Promova seu Perfil e Ganhe Destaque' },
];

const categories = Array.from(new Set(mockUserProfiles.map(p => p.category).filter(c => c && c.trim() !== ""))).sort();
const cities = Array.from(new Set(mockUserProfiles.map(p => p.location?.city).filter((c): c is string => c !== undefined && c.trim() !== ""))).sort();
const states = Array.from(new Set(mockUserProfiles.map(p => p.location?.state).filter((s): s is string => s !== undefined && s.trim() !== ""))).sort();
const ALL_VALUE = "all";

interface PublicProfileCardProps {
  profile: UserProfile;
}

const PublicProfileCard: React.FC<PublicProfileCardProps> = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const isPremium = profile.plan === 'premium';
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <div className={cn(
        "relative rounded-xl overflow-hidden shadow-md bg-card group hover:shadow-xl transition border border-border/20 flex flex-col min-h-[300px]",
        isPremium && "ring-2 ring-yellow-400 bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/40 dark:to-yellow-800/40"
      )}>
        <div className="relative h-40 flex-shrink-0 z-0">
          {profile.coverPhotoUrl && (
            <img
              src={profile.coverPhotoUrl}
              alt="Capa do perfil"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
          )}
          <div className="absolute inset-0 bg-black/40" />
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold shadow">
            {profile.category}
          </span>
          {isPremium && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded font-bold shadow animate-pulse">PREMIUM</span>
          )}
        </div>
        <div className="flex flex-col items-center -mt-12 relative z-10">
          <img
            src={profile.profilePictureUrl}
            alt={profile.name}
            className="w-14 h-14 rounded-full border-2 border-white shadow bg-white object-cover"
          />
        </div>
        <div className="px-3 pt-2 pb-1 text-center flex-1">
          <h3 className="font-semibold text-base text-foreground truncate">{profile.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-tight min-h-[32px]">{profile.bio}</p>
        </div>
        <div className="flex justify-between items-center px-3 pb-2 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400" />
            {profile.plan?.toUpperCase()}
          </span>
          <div className="flex gap-2">
            <button onClick={() => setIsBookmarked(b => !b)} className={cn("rounded-full p-1 transition", isBookmarked ? "bg-blue-100 text-blue-600" : "hover:bg-gray-100 dark:hover:bg-gray-800")}> <Bookmark className={cn("w-4 h-4", isBookmarked ? "fill-blue-600" : "")}/></button>
            <button className="rounded-full p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition"><Share2 className="w-4 h-4" /></button>
            <Link href={`/profile/${profile.username}`} className="rounded-full p-1 hover:bg-blue-100 transition"><ExternalLink className="w-4 h-4 text-blue-600" /></Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
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
    <Card className="hover:shadow-2xl transition-all duration-300 border bg-card/90 rounded-2xl overflow-hidden group flex flex-col">
      <div className={cn(
        "relative h-48 bg-gradient-to-br from-primary/20 to-secondary/20 flex-shrink-0",
        isBookmarked 
          ? "bg-yellow-500/10" 
          : "bg-background/80"
      )}>
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
      className="sticky top-0 z-30 py-4 bg-background/80 backdrop-blur-md -mx-4 px-4 mb-4"
    >
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1 relative">
          <Input
            type="text"
            placeholder="Busque por nome, habilidade, serviço..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="pl-12 h-12 text-base border-border/30 bg-card focus:bg-background transition-all pr-24"
          />
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
          <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-primary text-primary-foreground shadow hover:bg-primary/90 transition-all">Buscar</Button>
        </div>
        <div className="flex gap-2">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="rounded-full px-4 h-12 bg-card border border-border/30">
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
            <SelectTrigger className="rounded-full px-4 h-12 bg-card border border-border/30">
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
            <SelectTrigger className="rounded-full px-4 h-12 bg-card border border-border/30">
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
            <Button variant="outline" onClick={clearFilters} className="rounded-full h-12 px-4" type="button">
              <X className="w-4 h-4 mr-1" /> Limpar
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function SearchShowcase() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(ALL_VALUE);
  const [selectedCity, setSelectedCity] = useState(ALL_VALUE);
  const [selectedState, setSelectedState] = useState(ALL_VALUE);
  const [isPremium, setIsPremium] = useState(false);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>(mockUserProfiles);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const hasActiveFilters = selectedCategory !== ALL_VALUE || selectedCity !== ALL_VALUE || selectedState !== ALL_VALUE || isPremium;

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
    if (isPremium) {
      results = results.filter(p => p.plan === 'premium');
    }
    setFilteredProfiles(results);
  }, [searchTerm, selectedCategory, selectedCity, selectedState, isPremium]);

  const clearFilters = () => {
    setSelectedCategory(ALL_VALUE);
    setSelectedCity(ALL_VALUE);
    setSelectedState(ALL_VALUE);
    setIsPremium(false);
    setSearchTerm("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <BannerCarousel banners={BANNERS} />
      <main className="flex-grow">
        <div className="container mx-auto px-2 sm:px-4">
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
          
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              {filteredProfiles.length} resultado{filteredProfiles.length === 1 ? '' : 's'} encontrado{filteredProfiles.length === 1 ? '' : 's'}
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => setLayout('grid')} className={cn(layout === 'grid' && 'bg-muted')}>
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => setLayout('list')} className={cn(layout === 'list' && 'bg-muted')}>
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className={cn(
            "grid gap-6",
            layout === 'grid' 
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4" 
              : "grid-cols-1"
          )}>
            <AnimatePresence>
              {(() => {
                const result: React.ReactNode[] = [];
                let feedIdx = 0;
                filteredProfiles.forEach((profile, idx) => {
                  result.push(<PublicProfileCard key={profile.id} profile={profile} />);
                  if ((idx + 1) % 4 === 0 && feedIdx < feedMockCards.length) {
                    result.push(<SocialCard key={`feed-${feedMockCards[feedIdx].id}`} item={feedMockCards[feedIdx]} />);
                    feedIdx++;
                  }
                });
                return result;
              })()}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}

export { BannerCarousel as SearchBannerCarousel }; 