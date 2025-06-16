"use client";

import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PublicProfileCard } from '@/features/public/public-profile-card';
import { mockUserProfiles } from "@/lib/mock-data";
import type { UserProfile } from "@/lib/types";
import { SearchIcon, Filter, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const categories = Array.from(new Set(mockUserProfiles.map(p => p.category).filter(c => c && c.trim() !== ""))).sort();
const cities = Array.from(new Set(mockUserProfiles.map(p => p.location.city).filter(c => c && c.trim() !== ""))).sort();

const ALL_VALUE = "all"; 

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
  }

  const hasActiveFilters = searchTerm || selectedCategory !== ALL_VALUE || selectedCity !== ALL_VALUE;

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Encontre Profissionais e Criativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 items-end">
            <div className="md:col-span-3">
              <label htmlFor="search-term" className="block text-sm font-medium mb-1">Buscar por Nome, Habilidade, etc.</label>
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="search-term"
                  type="text"
                  placeholder="Ex: Desenvolvedor Web, João Silva, Branding..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
          
          <div className="md:hidden mb-4">
            <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="w-full">
              <Filter className="mr-2 h-4 w-4" /> {showFilters ? 'Ocultar Filtros' : 'Mostrar Filtros'}
            </Button>
          </div>

          <div className={`${showFilters ? 'block' : 'hidden'} md:grid md:grid-cols-2 md:gap-4 mb-6`}>
             <div>
              <label htmlFor="city-filter" className="block text-sm font-medium mb-1">Filtrar por Cidade</label>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger id="city-filter">
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
            <div>
              <label htmlFor="category-filter" className="block text-sm font-medium mb-1">Filtrar por Categoria</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger id="category-filter">
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
           {hasActiveFilters && (
             <div className="mb-6 flex justify-end">
              <Button variant="ghost" onClick={clearFilters} className="text-sm">
                <X className="mr-2 h-4 w-4" /> Limpar Filtros
              </Button>
            </div>
           )}
        </CardContent>
      </Card>

      {filteredProfiles.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProfiles.map(profile => (
            <PublicProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <SearchIcon className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">Nenhum Perfil Encontrado</h3>
          <p className="text-muted-foreground">
            Tente ajustar seus termos de busca ou filtros.
          </p>
        </div>
      )}
    </div>
  );
}

