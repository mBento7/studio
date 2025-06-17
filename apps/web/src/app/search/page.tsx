"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SearchIcon, Filter, X, MapPin, Star, Calendar, ExternalLink, Share2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { mockUserProfiles } from '@/lib/mock-data';
import type { UserProfile } from '@/lib/types';
import Link from "next/link";

const categories = Array.from(new Set(mockUserProfiles.map(p => p.category).filter(c => c && c.trim() !== ""))).sort();
const cities = Array.from(new Set(mockUserProfiles.map(p => p.location?.city).filter(c => c && c.trim() !== ""))).sort();

const ALL_VALUE = "all";

interface PublicProfileCardProps {
  profile: UserProfile;
}

const PublicProfileCard: React.FC<PublicProfileCardProps> = ({ profile }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group"
    >
      <Card className="h-full overflow-hidden border border-border/20 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
        <div className="relative h-32 w-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500">
          {profile.coverPhotoUrl && (
            <img
              src={profile.coverPhotoUrl}
              alt="Capa do perfil"
              className="absolute inset-0 w-full h-full object-cover object-center"
              style={{ zIndex: 1 }}
            />
          )}
          <div className="absolute left-4 -bottom-10 z-10">
            <img
              src={profile.profilePictureUrl}
              alt={profile.name}
              className="w-20 h-20 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg bg-white"
              style={{ zIndex: 2 }}
            />
          </div>
        </div>
        <CardContent className="pt-14 pb-4">
          <div className="space-y-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
              <h3 className="font-semibold text-lg text-foreground group-hover:text-blue-600 transition-colors">
                {profile.name}
              </h3>
              <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-md text-xs font-medium">
                {profile.category}
              </span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="w-3 h-3" />
              {profile.location?.city || 'Cidade não informada'}{profile.location?.state ? `, ${profile.location.state}` : ''}
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {profile.bio}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-gray-100 dark:bg-gray-900/30 text-gray-700 dark:text-gray-400 rounded-md text-xs font-medium">
                Plano: {profile.plan || 'N/A'}
              </span>
              <span className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-md text-xs font-medium">
                Template: {profile.layoutTemplateId || 'N/A'}
              </span>
            </div>
            <div className="space-y-2">
              {profile.services && profile.services.length > 0 && profile.services.slice(0, 2).map((service, index) => (
                <div key={index} className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{service.name}</span>
                </div>
              ))}
            </div>
            <motion.div 
              className="flex gap-2 pt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isHovered ? 1 : 0.7, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Link href={`/profile/${profile.username}`}>
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 py-2 px-4 rounded-lg text-base"
                  style={{ boxShadow: '0 4px 24px 0 rgba(59,130,246,0.15)' }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Ver Perfil
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="rounded-lg">
                <Share2 className="w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function SearchPage() {
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
      results = results.filter(profile => profile.location.city === selectedCity);
    }
    
    setFilteredProfiles(results);
  }, [searchTerm, selectedCategory, selectedCity]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory(ALL_VALUE);
    setSelectedCity(ALL_VALUE);
  };

  const hasActiveFilters = searchTerm || selectedCategory !== ALL_VALUE || selectedCity !== ALL_VALUE;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto py-8 px-4 relative">
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
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="space-y-6"
              >
                <div className="relative">
                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                  <Input
                    type="text"
                    placeholder="Busque por nome, habilidade ou serviço..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-12 text-base border-border/30 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:bg-white dark:focus:bg-gray-800 transition-all"
                  />
                </div>

                <div className="md:hidden">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowFilters(!showFilters)} 
                    className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
                  </Button>
                </div>

                <AnimatePresence>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: showFilters || window.innerWidth >= 768 ? "auto" : 0, 
                      opacity: showFilters || window.innerWidth >= 768 ? 1 : 0 
                    }}
                    exit={{ height: 0, opacity: 0 }} 
                    transition={{ duration: 0.3 }}
                    className={`overflow-hidden ${showFilters ? 'block' : 'hidden'} md:block`}
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Cidade</label>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                          <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-border/30">
                            <SelectValue placeholder="Todas as Cidades" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ALL_VALUE}>Todas as Cidades</SelectItem>
                            {cities.map(city => (
                              <SelectItem key={city} value={city}>{city}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Categoria</label>
                        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                          <SelectTrigger className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-border/30">
                            <SelectValue placeholder="Todas as Categorias" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ALL_VALUE}>Todas as Categorias</SelectItem>
                            {categories.map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {hasActiveFilters && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex justify-end"
                  >
                    <Button 
                      variant="ghost" 
                      onClick={clearFilters} 
                      className="text-sm hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Limpar Filtros
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        <AnimatePresence mode="wait">
          {filteredProfiles.length > 0 ? (
            <motion.div
              key="profiles"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            >
              {filteredProfiles.map((profile, index) => (
                <motion.div
                  key={profile.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <PublicProfileCard profile={profile} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full flex items-center justify-center">
                  <SearchIcon className="w-12 h-12 text-blue-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-foreground">
                  Nenhum Perfil Encontrado
                </h3>
                <p className="text-muted-foreground text-lg mb-6">
                  Tente ajustar seus termos de busca ou filtros para encontrar o profissional ideal.
                </p>
                <Button onClick={clearFilters} variant="outline" className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
                  <X className="mr-2 h-4 w-4" />
                  Limpar Filtros
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}