'use client';
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, X, Star, ExternalLink, Share2, Bookmark, Flame, Heart, MessageCircle, MoreHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockUserProfiles } from '@/lib/mock-data';
import type { UserProfile } from '@/lib/types';
import Link from "next/link";
import { ShowroomHighlights } from './SearchShowcase';

const categories = Array.from(new Set(mockUserProfiles.map(p => p.category).filter(c => c && c.trim() !== ""))).sort();
const cities = Array.from(new Set(mockUserProfiles.map(p => p.location?.city).filter((c): c is string => c !== undefined && c.trim() !== ""))).sort();
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
        {/* Capa com overlay e categoria */}
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
        {/* Foto de perfil centralizada */}
        <div className="flex flex-col items-center -mt-12 relative z-10">
          <img
            src={profile.profilePictureUrl}
            alt={profile.name}
            className="w-14 h-14 rounded-full border-2 border-white shadow bg-white object-cover"
          />
        </div>
        {/* Nome e bio */}
        <div className="px-3 pt-2 pb-1 text-center flex-1">
          <h3 className="font-semibold text-base text-foreground truncate">{profile.name}</h3>
          <p className="text-xs text-muted-foreground line-clamp-2 leading-tight min-h-[32px]">{profile.bio}</p>
        </div>
        {/* Rodapé com ações rápidas */}
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
      <div className="absolute bottom-4 right-8 flex gap-2">
        {banners.map((_: Banner, i: number) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-3 h-3 rounded-full ${i === index ? 'bg-white' : 'bg-white/40'}`}></button>
        ))}
      </div>
    </div>
  );
}

function HighlightsCarousel({ profiles, gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6", cardSize = "default" }: { profiles: UserProfile[], gridClass?: string, cardSize?: 'default' | 'small' }) {
  // Perfis premium primeiro
  const premiumProfiles = profiles.filter(p => p.plan === 'premium').slice(0, 4);
  // Exemplo de cards de oferta
  const offerCards = [
    {
      id: 'oferta-1',
      title: 'TechSolutions',
      description: 'Desenvolvimento de Apps',
      image: 'https://placehold.co/400x200/2563eb/fff?text=TechSolutions',
      badge: 'PATROCINADO',
      rating: 4.9,
      price: '20% OFF',
      until: '31/12',
      cta: 'Ver Oferta Completa',
      link: '/profile/techsolutions',
    },
    // Adicione mais ofertas se quiser
  ];
  // Intercalar premiumProfiles e offerCards
  const cards: any[] = [];
  let i = 0, j = 0;
  while (i < premiumProfiles.length || j < offerCards.length) {
    if (i < premiumProfiles.length) {
      cards.push({ type: 'premium', data: premiumProfiles[i++] });
    }
    if (j < offerCards.length) {
      cards.push({ type: 'offer', data: offerCards[j++] });
    }
  }
  return (
    <section className="px-2 md:px-6 mb-8">
      <div className="w-full p-3 space-y-3 bg-card/80 rounded-xl border border-border/10 shadow-sm mx-auto flex flex-col justify-center">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><Flame className="w-5 h-5 text-orange-500" />Destaques do Showroom</h2>
          <Button className="rounded-full px-4 py-2 text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow hover:from-blue-700 hover:to-purple-700 transition-all border-0" onClick={() => window.location.href='/creditos'}>Quero me destacar</Button>
        </div>
        {/* Grid responsivo de 3 colunas */}
        <div className={gridClass}>
          {cards.length === 0 && <span className="text-muted-foreground">Nenhum destaque no momento.</span>}
          {cards.map((card, idx) =>
            card.type === 'premium' ? (
              <div key={card.data.id} className="w-full">
                <PublicProfileCard profile={card.data} />
              </div>
            ) : (
              <div key={card.data.id} className="w-full">
                <div className="rounded-xl overflow-hidden shadow-md bg-gradient-to-br from-blue-900/60 to-blue-400/30 border border-blue-400 flex flex-col min-h-[220px] p-0">
                  <div className="relative h-32">
                    <img src={card.data.image} alt={card.data.title} className="absolute inset-0 w-full h-full object-cover object-center" />
                    <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-semibold shadow">{card.data.badge}</span>
                  </div>
                  <div className="flex flex-col items-center -mt-8 z-10">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt={card.data.title} className="w-14 h-14 rounded-full border-2 border-white shadow bg-white object-cover" />
                  </div>
                  <div className="px-3 pt-2 pb-1 text-center flex-1">
                    <h3 className="font-semibold text-base text-foreground truncate">{card.data.title}</h3>
                    <p className="text-xs text-muted-foreground mb-1">{card.data.description}</p>
                    <div className="flex items-center justify-center gap-1 text-yellow-400 text-sm mb-1">
                      {'★'.repeat(Math.floor(card.data.rating))}<span className="text-muted-foreground text-xs">({card.data.rating})</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-tight min-h-[32px]">Transforme sua ideia em realidade! Apps iOS e Android com qualidade profissional e suporte completo.</p>
                  </div>
                  <div className="flex items-center justify-between px-3 pb-2 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <span className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-bold">{card.data.price}</span>
                      <span className="ml-2">até {card.data.until}</span>
                    </span>
                  </div>
                  <div className="px-3 pb-3">
                    <a href={card.data.link} className="block w-full rounded-lg bg-blue-600 text-white text-center py-2 font-semibold hover:bg-blue-700 transition">{card.data.cta}</a>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </section>
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
            <p className="text-xs text-muted-foreground truncate">por {item.user}</p>
          </div>
        </div>
      </div>
      <CardContent className="p-3 flex-1 flex flex-col justify-end">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={cn(
                "flex items-center gap-1 text-xs transition-colors",
                isLiked
                  ? "text-rose-600"
                  : "text-muted-foreground hover:text-rose-600"
              )}
            >
              <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
              <span>{likes}</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-blue-500 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span>{Math.floor(Math.random() * 20) + 5}</span>
            </button>
            <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-green-500 transition-colors">
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

const feedMockCards = [
  { id: 1, title: "Serviço de Limpeza Premium", user: "CleanPro", category: "Limpeza" },
  { id: 2, title: "Consultoria em Marketing Digital", user: "DigitalMax", category: "Marketing" },
  { id: 3, title: "Aulas de Yoga Personalizadas", user: "YogaLife", category: "Saúde" },
  { id: 4, title: "Desenvolvimento de Apps", user: "TechSolutions", category: "Tecnologia" },
  { id: 5, title: "Consultoria Financeira", user: "FinanceExpert", category: "Finanças" },
  { id: 6, title: "Design de Interiores", user: "InteriorDesign", category: "Design" },
];

function SearchHeader({ searchTerm, setSearchTerm }: { searchTerm: string, setSearchTerm: (v: string) => void }) {
  // ... copiar conteúdo da função ...
}

export { BannerCarousel as SearchBannerCarousel };

export { HighlightsCarousel as ShowroomHighlights };

export default function SearchShowcase() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(ALL_VALUE);
  const [selectedCity, setSelectedCity] = useState(ALL_VALUE);
  const [filteredProfiles, setFilteredProfiles] = useState<UserProfile[]>(mockUserProfiles);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let results = mockUserProfiles;
    if (searchTerm) {
      results = results.filter(profile =>
        profile.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
        profile.services.some(service => service.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedCategory && selectedCategory !== ALL_VALUE) {
      results = results.filter(profile => profile.category === selectedCategory);
    }
    if (selectedCity && selectedCity !== ALL_VALUE) {
      results = results.filter(profile => profile.location?.city === selectedCity);
    }
    setFilteredProfiles(results);
  }, [searchTerm, selectedCategory, selectedCity]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(ALL_VALUE);
    setSelectedCity(ALL_VALUE);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== ALL_VALUE || selectedCity !== ALL_VALUE;

  // Lógica para filtrar destaques relacionados (exemplo: perfis premium)
  const relatedShowroom = filteredProfiles.filter(p => p.plan === 'premium').slice(0, 8);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-4 px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="mb-8 shadow-xl border border-border/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />
            <CardHeader className="relative z-10 text-center pb-6">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <CardTitle className="text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                  Encontre Profissionais Incríveis
                </CardTitle>
                <p className="text-muted-foreground text-lg">
                  Conecte-se com talentos criativos e especializados
                </p>
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              {/* Showroom entre as caixas de pesquisa e o texto de resultados encontrados */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                <form
                  className="flex flex-col md:flex-row md:items-center gap-4 mb-4"
                  onSubmit={e => { e.preventDefault(); }}
                >
                  <div className="flex-1 relative">
                    <Input
                      type="text"
                      placeholder="Busque por nome, habilidade, serviço ou palavra-chave..."
                      value={searchTerm}
                      onChange={e => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 text-base border-border/30 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all pr-24"
                    />
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                    <Button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 h-9 px-4 rounded-full bg-blue-600 text-white shadow hover:bg-blue-700 transition-all">Buscar</Button>
                  </div>
                  <div className="flex gap-2 flex-1 min-w-[220px]">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="rounded-full px-4 h-12 bg-white/60 dark:bg-gray-800/60 border border-border/30">
                        <SelectValue placeholder="Categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={ALL_VALUE}>Todas categorias</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="rounded-full px-4 h-12 bg-white/60 dark:bg-gray-800/60 border border-border/30">
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
                </form>
                {relatedShowroom.length > 0 && (
                  <div className="mb-8">
                    <ShowroomHighlights profiles={relatedShowroom} gridClass="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6" cardSize="small" />
                  </div>
                )}
                <div className="text-sm text-muted-foreground text-right pr-2">
                  {filteredProfiles.length} resultado{filteredProfiles.length === 1 ? '' : 's'} encontrado{filteredProfiles.length === 1 ? '' : 's'}
                </div>
                {hasActiveFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-8 auto-rows-fr">
                    <AnimatePresence>
                      {(() => {
                        const result: React.ReactNode[] = [];
                        let feedIdx = 0;
                        filteredProfiles.forEach((profile, idx) => {
                          result.push(<PublicProfileCard key={profile.id} profile={profile} />);
                          if ((idx + 1) % 2 === 0 && feedIdx < feedMockCards.length) {
                            result.push(<SocialCard key={`feed-${feedMockCards[feedIdx].id}`} item={feedMockCards[feedIdx]} />);
                            feedIdx++;
                          }
                        });
                        return result;
                      })()}
                    </AnimatePresence>
                  </div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 