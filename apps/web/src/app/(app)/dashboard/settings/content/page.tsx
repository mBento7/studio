'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { Briefcase as ServicesIcon, Image as PortfolioIcon, PlusCircle, Trash2, Upload, ArrowUp, ArrowDown, Loader2, Youtube as YoutubeIcon, Megaphone, Star, Wrench as SkillsIcon, Building as ExperienceIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { mockCurrentUser, updateMockCurrentUser, type MockUser } from '@/lib/mock-data';
import type { UserProfile, Service, PortfolioItem, PremiumBanner, ExperienceItem } from '@/lib/types';
import { useAuth } from '@/hooks/use-auth';

// Adaptador para converter MockUser em UserProfile
const adaptMockUserToUserProfile = (mockUser: MockUser): UserProfile => ({
  id: mockUser.id,
  username: mockUser.username,
  name: mockUser.full_name,
  email: mockUser.email,
  bio: mockUser.bio || '',
  profile_picture_url: mockUser.profile_picture_url || '',
  cover_photo_url: mockUser.cover_photo_url || '',
  sociallinks: [],
  services: [],
  portfolio: [],
  skills: mockUser.skills || [],
  experience: [],
  category: mockUser.category || '',
  plan: 'free' as const,
  layoutTemplateId: mockUser.layout || 'minimalist-card',
  location: mockUser.location ? {
    city: mockUser.location,
    country: 'Brasil'
  } : undefined,
  youtubeVideoUrl: '',
  youtubeVideoTitle: '',
  youtubeVideoDescription: '',
  premiumBanner: undefined
});

const SERVICE_LIMIT_FREE = 2;
const SERVICE_LIMIT_STANDARD = 5;
const SERVICE_LIMIT_PREMIUM = 20;
const PORTFOLIO_LIMIT_FREE = 2;
const PORTFOLIO_LIMIT_STANDARD = 4;
const PORTFOLIO_LIMIT_PREMIUM = 20;
const SKILLS_LIMIT_FREE = 5;
const SKILLS_LIMIT_STANDARD = 15;
const SKILLS_LIMIT_PREMIUM = 50;
const EXPERIENCE_LIMIT_PREMIUM = 10;

export default function ContentSettingsPage() {
  const { toast } = useToast();
  const { currentUserProfile, updateUserProfile } = useAuth();

  const [isLoading, setIsLoading] = useState(true);
  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'standard' | 'premium'>('free');
  const [currentServices, setCurrentServices] = useState<Service[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioItem[]>([]);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [currentExperience, setCurrentExperience] = useState<ExperienceItem[]>([]);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeDescription, setYoutubeDescription] = useState('');
  const [premiumBanner, setPremiumBanner] = useState<PremiumBanner | null>(null);

  useEffect(() => {
    const profileToLoad = currentUserProfile || adaptMockUserToUserProfile(mockCurrentUser);
    if (profileToLoad) {
      setActiveProfile(profileToLoad);
      setUserPlan(profileToLoad.plan || 'free');
      setCurrentServices(Array.isArray(profileToLoad.services) ? profileToLoad.services : []);
      setCurrentPortfolio(Array.isArray(profileToLoad.portfolio) ? profileToLoad.portfolio : []);
      setCurrentSkills(Array.isArray(profileToLoad.skills) ? profileToLoad.skills : []);
      setCurrentExperience(Array.isArray(profileToLoad.experience) ? profileToLoad.experience.map(e => ({
        ...e,
        id: e.id || Date.now().toString(),
        startDate: e.startDate || '',
        endDate: e.endDate || null
      })) : []);
      setYoutubeUrl(profileToLoad.youtubeVideoUrl || '');
      setYoutubeTitle(profileToLoad.youtubeVideoTitle || '');
      setYoutubeDescription(profileToLoad.youtubeVideoDescription || '');
      setPremiumBanner(profileToLoad.premiumBanner || null);
      setIsLoading(false);
    }
  }, [currentUserProfile]);

  const handleMoveSimpleItem = (items: string[], setItems: React.Dispatch<React.SetStateAction<string[]>>, index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
    const newItems = [...items];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setItems(newItems);
  };

  const handleMoveComplexItem = <T extends { id: string }>(items: T[], setItems: React.Dispatch<React.SetStateAction<T[]>>, index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === items.length - 1)) return;
    const newItems = [...items];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setItems(newItems);
  };

  const handleAddSkill = () => {
    const limits = { free: SKILLS_LIMIT_FREE, standard: SKILLS_LIMIT_STANDARD, premium: SKILLS_LIMIT_PREMIUM };
    if (currentSkills.length >= limits[userPlan]) {
      toast({ title: 'Limite Atingido', description: `Seu plano permite até ${limits[userPlan]} habilidades.`, variant: 'destructive' });
      return;
    }
    setCurrentSkills(prev => [...prev, '']);
  };
  const handleRemoveSkill = (index: number) => setCurrentSkills(prev => prev.filter((_, i) => i !== index));
  const handleSkillChange = (index: number, value: string) => setCurrentSkills(prev => prev.map((skill, i) => i === index ? value : skill));

  const handleAddExperience = () => {
    if (currentExperience.length >= EXPERIENCE_LIMIT_PREMIUM) {
      toast({ title: 'Limite Atingido', description: `Seu plano permite até ${EXPERIENCE_LIMIT_PREMIUM} experiências.`, variant: 'destructive' });
      return;
    }
    setCurrentExperience(prev => [...prev, {
      id: Date.now().toString(),
      title: '',
      company: '',
      startDate: '',
      endDate: null
    }]);
  };
  const handleRemoveExperience = (id: string) => setCurrentExperience(prev => prev.filter(exp => exp.id !== id));
  const handleExperienceChange = (id: string, field: 'title' | 'company' | 'startDate' | 'endDate', value: string) => setCurrentExperience(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: field === 'endDate' ? (value || null) : value } : exp));

  const handleAddService = () => {
    const limits = { free: SERVICE_LIMIT_FREE, standard: SERVICE_LIMIT_STANDARD, premium: SERVICE_LIMIT_PREMIUM };
    if (currentServices.length >= limits[userPlan]) {
      toast({ title: 'Limite Atingido', description: `Seu plano permite até ${limits[userPlan]} serviços.`, variant: 'destructive' });
      return;
    }
    setCurrentServices(prev => [...prev, { id: Date.now().toString(), name: '', description: '' }]);
  };
  const handleRemoveService = (id: string) => setCurrentServices(prev => prev.filter(s => s.id !== id));
  const handleServiceChange = (id: string, field: 'name' | 'description', value: string) => setCurrentServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));

  const handleAddPortfolioItem = () => {
    const limits = { free: PORTFOLIO_LIMIT_FREE, standard: PORTFOLIO_LIMIT_STANDARD, premium: PORTFOLIO_LIMIT_PREMIUM };
    if (currentPortfolio.length >= limits[userPlan]) {
      toast({ title: 'Limite Atingido', description: `Seu plano permite até ${limits[userPlan]} itens no portfólio.`, variant: 'destructive' });
      return;
    }
    setCurrentPortfolio(prev => [...prev, { id: Date.now().toString(), imageUrl: `https://picsum.photos/seed/new-item/400/300`, caption: '', description: '' }]);
  };
  const handleRemovePortfolioItem = (id: string) => setCurrentPortfolio(prev => prev.filter(p => p.id !== id));
  const handlePortfolioItemChange = (id: string, field: 'caption' | 'description', value: string) => setCurrentPortfolio(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPortfolio(prev => prev.map(item => item.id === itemId ? { ...item, imageUrl: reader.result as string } : item));
        toast({ title: 'Imagem Pronta', description: 'Nova imagem carregada. Salve para aplicar.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const getYouTubeVideoId = (url:string) => {
    if (!url) return null;
    let videoId = null;
    const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?([\w-]{11})/;
    const match = url.match(youtubeRegex);
    if (match) videoId = match[1];
    return videoId;
  };

  const handleAddBanner = () => {
    if (userPlan === 'premium') {
      setPremiumBanner({ imageUrl: 'https://picsum.photos/seed/default-banner/600/400', title: 'Título do Banner', description: 'Descrição padrão para o seu novo banner promocional.', ctaText: 'Clique Aqui', ctaLink: '#' });
      toast({ title: 'Banner Adicionado', description: 'Um novo banner foi adicionado. Edite e salve as alterações.' });
    }
  };
  const handleRemoveBanner = () => {
    setPremiumBanner(null);
    toast({ title: 'Banner Removido', description: 'O banner promocional foi removido. Salve para aplicar a alteração.' });
  };
  const handleBannerChange = (field: keyof PremiumBanner, value: string) => setPremiumBanner(prev => prev ? { ...prev, [field]: value } : null);
  const handleBannerImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && premiumBanner) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPremiumBanner(prev => prev ? { ...prev, imageUrl: reader.result as string } : null);
        toast({ title: 'Imagem Pronta', description: 'Nova imagem do banner carregada. Salve para aplicar.' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddYoutubeVideo = () => {
    if (userPlan === 'premium') {
      setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
      setYoutubeTitle('Título do Vídeo');
      setYoutubeDescription('Descrição do seu vídeo em destaque.');
      toast({ title: 'Seção de Vídeo Adicionada', description: 'Cole a URL do seu vídeo e edite os detalhes.' });
    }
  };
  const handleRemoveYoutubeVideo = () => {
    setYoutubeUrl('');
    setYoutubeTitle('');
    setYoutubeDescription('');
    toast({ title: 'Vídeo Removido', description: 'O vídeo em destaque foi removido. Salve para aplicar a alteração.' });
  };

  const handleSaveContent = () => {
    if (!activeProfile) return;
    const updatedProfile: UserProfile = {
      ...activeProfile,
      services: currentServices,
      portfolio: currentPortfolio,
      skills: userPlan === 'premium' ? currentSkills.filter(skill => skill.trim() !== '') : [],
      experience: userPlan === 'premium' ? currentExperience : [],
      youtubeVideoUrl: youtubeUrl,
      youtubeVideoTitle: youtubeTitle,
      youtubeVideoDescription: youtubeDescription,
      premiumBanner: premiumBanner
    };
    updateUserProfile(updatedProfile);
    updateMockCurrentUser(updatedProfile);
    toast({ title: 'Conteúdo Salvo', description: 'Suas seções de conteúdo foram atualizadas com sucesso!' });
  };

  if (isLoading) return <div className="flex h-full items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><SkillsIcon />Gerenciar Habilidades</CardTitle>
          <CardDescription>
            Liste suas habilidades. Este é um recurso premium, com melhor visualização no template "Premium Pro".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userPlan === 'premium' ? (
            <>
              {currentSkills.map((skill, index) => (
                <div key={index} className="p-4 border rounded-md bg-muted/50 space-y-2">
                  <div className="flex justify-between items-center"><Label className="font-semibold">Habilidade #{index + 1}</Label>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveSimpleItem(currentSkills, setCurrentSkills, index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveSimpleItem(currentSkills, setCurrentSkills, index, 'down')} disabled={index === currentSkills.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveSkill(index)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <Input value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} placeholder="Ex: JavaScript, Design Gráfico, etc." />
                </div>
              ))}
              <Button variant="outline" onClick={handleAddSkill}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Habilidade</Button>
            </>
          ) : (
            <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-center">
              <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
              <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
              <p className="text-sm text-amber-700">Faça upgrade para gerenciar e exibir suas habilidades.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ExperienceIcon />Gerenciar Experiência</CardTitle>
          <CardDescription>
            Adicione sua experiência profissional. Este é um recurso premium, com melhor visualização no template "Premium Pro".
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userPlan === 'premium' ? (
            <>
              {currentExperience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-md bg-muted/50 space-y-2">
                  <div className="flex justify-between items-center"><Label className="font-semibold">Experiência #{index + 1}</Label>
                    <div className="flex items-center gap-1">
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveComplexItem(currentExperience, setCurrentExperience, index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveComplexItem(currentExperience, setCurrentExperience, index, 'down')} disabled={index === currentExperience.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                      <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveExperience(exp.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </div>
                  <Input value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} placeholder="Cargo / Título" />
                  <Input value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Empresa / Organização" />
                  <Input value={exp.years} onChange={(e) => handleExperienceChange(exp.id, 'years', e.target.value)} placeholder="Período (Ex: 2020 - 2023)" />
                </div>
              ))}
              <Button variant="outline" onClick={handleAddExperience}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Experiência</Button>
            </>
          ) : (
            <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-center">
              <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
              <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
              <p className="text-sm text-amber-700">Faça upgrade para gerenciar e exibir sua experiência.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><ServicesIcon />Gerenciar Serviços/Produtos</CardTitle>
          <CardDescription>Adicione ou edite os serviços que você oferece. Eles serão exibidos em seu perfil público.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {currentServices.map((service, index) => (
            <div key={service.id} className="p-4 border rounded-md bg-muted/50 space-y-2">
              <div className="flex justify-between items-center"><Label className="font-semibold">Serviço #{index + 1}</Label>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveComplexItem(currentServices, setCurrentServices, index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveComplexItem(currentServices, setCurrentServices, index, 'down')} disabled={index === currentServices.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveService(service.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
              <Input value={service.name} onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)} placeholder="Nome do Serviço" />
              <Textarea value={service.description} onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} placeholder="Descrição do Serviço" />
            </div>
          ))}
          <Button variant="outline" onClick={handleAddService}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Serviço</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><PortfolioIcon />Gerenciar Portfólio</CardTitle><CardDescription>Mostre seus melhores trabalhos.</CardDescription></CardHeader>
        <CardContent className="space-y-4">
          {currentPortfolio.map((item, index) => (
            <div key={item.id} className="p-4 border rounded-md bg-muted/50 space-y-3">
              <div className="flex justify-between items-center"><Label className="font-semibold">Item #{index+1}</Label>
                <div className="flex items-center gap-1">
                  <Button type="button" variant="ghost" size="icon" onClick={()=>handleMoveComplexItem(currentPortfolio,setCurrentPortfolio,index,'up')} disabled={index===0}><ArrowUp className="w-4 h-4"/></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={()=>handleMoveComplexItem(currentPortfolio,setCurrentPortfolio,index,'down')} disabled={index===currentPortfolio.length-1}><ArrowDown className="w-4 h-4"/></Button>
                  <Button type="button" variant="ghost" size="icon" onClick={()=>handleRemovePortfolioItem(item.id)} className="text-destructive"><Trash2 className="w-4 h-4"/></Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-1 space-y-2">
                  <div className="aspect-video relative bg-background rounded-md border"><Image src={item.imageUrl} alt={item.caption||'Item do portfolio'} fill sizes="(max-width: 768px) 100vw, 400px" style={{objectFit:'cover'}} className="rounded-md"/></div>
                  <Button type="button" variant="outline" size="sm" className="w-full" onClick={()=>document.getElementById(`portfolio-upload-${item.id}`)?.click()}><Upload className="mr-2 h-3 w-3"/>Mudar Imagem</Button>
                  <input type="file" id={`portfolio-upload-${item.id}`} className="hidden" accept="image/*" onChange={(e)=>handlePortfolioImageUpload(e,item.id)}/>
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Input value={item.caption||''} onChange={(e)=>handlePortfolioItemChange(item.id,'caption',e.target.value)} placeholder="Legenda"/>
                  <Textarea value={item.description||''} onChange={(e)=>handlePortfolioItemChange(item.id,'description',e.target.value)} placeholder="Descrição (opcional)"/>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outline" onClick={handleAddPortfolioItem}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Item ao Portfólio</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Megaphone />Banner Promocional</CardTitle>
          <CardDescription>Crie um banner para destacar uma mensagem ou promoção especial em seu perfil.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userPlan === 'premium' ? (
            premiumBanner ? (
              <>
                <Label>Pré-visualização do Banner</Label>
                <Card className="flex overflow-hidden bg-muted/40 rounded-lg border shadow-md">
                  <div className="relative w-1/3 h-auto min-h-[150px]"><Image src={premiumBanner.imageUrl} alt="Banner" fill sizes="(max-width: 768px) 100vw, 400px" className="object-cover" /></div>
                  <CardContent className="p-4 flex flex-col justify-center gap-2 w-2/3">
                    <h3 className="text-lg font-semibold">{premiumBanner.title}</h3>
                    <p className="text-sm text-muted-foreground">{premiumBanner.description}</p>
                    <Button size="sm"><a href={premiumBanner.ctaLink} target="_blank" rel="noopener noreferrer">{premiumBanner.ctaText}</a></Button>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2"><Label htmlFor="banner-title">Título</Label><Input id="banner-title" value={premiumBanner.title} onChange={(e) => handleBannerChange('title', e.target.value)} /></div>
                  <div className="space-y-2"><Label htmlFor="banner-cta-text">Texto do Botão (CTA)</Label><Input id="banner-cta-text" value={premiumBanner.ctaText} onChange={(e) => handleBannerChange('ctaText', e.target.value)} /></div>
                </div>
                <div className="space-y-2"><Label htmlFor="banner-description">Descrição</Label><Textarea id="banner-description" value={premiumBanner.description} onChange={(e) => handleBannerChange('description', e.target.value)} /></div>
                <div className="space-y-2"><Label htmlFor="banner-cta-link">Link do Botão (URL)</Label><Input id="banner-cta-link" value={premiumBanner.ctaLink} onChange={(e) => handleBannerChange('ctaLink', e.target.value)} /></div>
                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="outline" size="sm" className="flex-1" onClick={() => document.getElementById('banner-upload')?.click()}><Upload className="mr-2 h-3 w-3" />Trocar Imagem</Button>
                  <input type="file" id="banner-upload" className="hidden" accept="image/*" onChange={handleBannerImageUpload} />
                  <Button type="button" variant="destructive" size="sm" className="flex-1" onClick={handleRemoveBanner}><Trash2 className="mr-2 h-3 w-3" />Remover Banner</Button>
                </div>
              </>
            ) : ( <Button onClick={handleAddBanner}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Banner</Button> )
          ) : (
            <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-center">
              <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
              <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
              <p className="text-sm text-amber-700">Faça upgrade do seu plano para adicionar um banner promocional.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><YoutubeIcon />Vídeo do YouTube em Destaque</CardTitle>
          <CardDescription>Incorpore um vídeo do YouTube para se destacar no seu perfil.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {userPlan === 'premium' ? (
            youtubeUrl ? (
              <>
                <div>
                  <Label htmlFor="youtube-url">URL do Vídeo do YouTube</Label>
                  <div className="flex items-center gap-2">
                    <YoutubeIcon className="text-red-500"/>
                    <Input id="youtube-url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                  </div>
                </div>
                <div><Label htmlFor="youtube-title">Título do Vídeo</Label><Input id="youtube-title" value={youtubeTitle} onChange={(e) => setYoutubeTitle(e.target.value)} placeholder="Título do seu vídeo" /></div>
                <div><Label htmlFor="youtube-description">Descrição do Vídeo</Label><Textarea id="youtube-description" value={youtubeDescription} onChange={(e) => setYoutubeDescription(e.target.value)} placeholder="Uma breve descrição sobre o seu vídeo..." /></div>

                {getYouTubeVideoId(youtubeUrl) && (
                  <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                    <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${getYouTubeVideoId(youtubeUrl)}`} title="Pré-visualização do vídeo do YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                  </div>
                )}
                <Button type="button" variant="destructive" size="sm" onClick={handleRemoveYoutubeVideo}><Trash2 className="mr-2 h-3 w-3" />Remover Vídeo</Button>
              </>
            ) : ( <Button onClick={handleAddYoutubeVideo}><PlusCircle className="mr-2 h-4 w-4"/>Adicionar Vídeo do YouTube</Button> )
          ) : (
            <div className="p-4 rounded-md bg-amber-50 border border-amber-200 text-center">
              <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
              <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
              <p className="text-sm text-amber-700">Faça upgrade do seu plano para adicionar um vídeo do YouTube.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button onClick={handleSaveContent}>Salvar Alterações de Conteúdo</Button>
      </div>
    </div>
  );
}
