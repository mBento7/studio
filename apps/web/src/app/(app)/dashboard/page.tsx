"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, User, Phone, Image as ImageIcon, Globe, MapPin, PlusCircle, Upload, Briefcase, BookOpen, Star, Palette, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { ProfileForm } from "@/features/profile/profile-form";
import { ProfileBg } from "@/components/ui/profile-bg";
import AppearanceSettingsPage from "./settings/appearance/page";
import ContentSettingsPage from "./settings/content/page";
import { useAuth } from "@/hooks/use-auth";
import { createClient } from "@/lib/supabase/client";
import type { UserProfile } from "@/lib/types";
import { toast } from "@/hooks/use-toast";
import { ZodError } from "zod";
import { MainGridLayout } from '@/components/layout/app-container';
import { LeftProfileSidebar } from '@/components/layout/left-profile-sidebar';
import { RightWidgetsColumn } from '@/components/layout/right-widgets-column';
import { DashboardCard } from "@/components/ui/dashboard-card";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { PlusCircle as PlusCircleIcon, Trash2, Upload as UploadIcon, ArrowUp, ArrowDown, Loader2, Youtube as YoutubeIcon, Megaphone, Wrench as SkillsIcon, Building as ExperienceIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { profileLayouts } from '@/components/profile-layouts';

// Tipos explícitos para os estados de conteúdo
interface Service { id: string; name: string; description: string; }
interface PortfolioItem { id: string; imageUrl: string; caption?: string; description?: string; }
interface ExperienceItem { id: string; title: string; company: string; years: string; }

// Tipos para funcionalidades premium
interface Testimonial { id: string; name: string; comment: string; photoUrl?: string; rating?: number; }
interface FAQItem { id: string; question: string; answer: string; }

// Novo tipo para cores de destaque
interface AccentColorOption {
  name: string;
  value: string;
  foreground?: string;
  accent?: string;
  isGradient?: boolean;
  premium?: boolean;
}

// Novo componente para painel modular de conteúdo
function ContentDashboardCards() {
  // Aqui você pode importar e usar componentes específicos para cada seção
  // Exemplo visual:
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Serviços</h3>
          {/* Aqui entraria o formulário/lista de serviços */}
          <p className="text-sm text-muted-foreground">Gerencie seus serviços oferecidos.</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Portfólio</h3>
          {/* Aqui entraria o formulário/lista de portfólio */}
          <p className="text-sm text-muted-foreground">Adicione e organize seus projetos.</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Experiência</h3>
          {/* Aqui entraria o formulário/lista de experiência */}
          <p className="text-sm text-muted-foreground">Descreva sua trajetória profissional.</p>
        </div>
        <div className="rounded-xl border bg-white p-4 shadow">
          <h3 className="font-bold mb-2">Habilidades</h3>
          {/* Aqui entraria o formulário/lista de habilidades */}
          <p className="text-sm text-muted-foreground">Liste suas principais habilidades.</p>
        </div>
      </div>
    </div>
  );
}

// Estado para premiumBanner e YouTube
interface PremiumBanner { imageUrl: string; title: string; description: string; ctaText: string; ctaLink: string; }

export default function EditProfilePage() {
  // 1. Defina todas as constantes e arrays de configuração no topo
  const accentColors: AccentColorOption[] = [
    { name: "Verde Padrão", value: "149 94% 36%", foreground: "0 0% 98%", accent: "149 90% 40%", isGradient: false, premium: false },
    { name: "Azul", value: "210 100% 50%", foreground: "0 0% 98%", accent: "210 100% 55%", isGradient: false, premium: false },
    { name: "Roxo", value: "270 70% 55%", foreground: "0 0% 98%", accent: "270 70% 60%", isGradient: false, premium: false },
    { name: "Laranja", value: "25 95% 53%", foreground: "0 0% 15%", accent: "25 95% 58%", isGradient: false, premium: false },
  ];
  const premiumAccentColors: AccentColorOption[] = [
    { name: "Gradiente Aurora", value: "linear-gradient(90deg, #ff9966 0%, #ff5e62 100%)", isGradient: true, premium: true },
    { name: "Verde Neon", value: "120 100% 40%", isGradient: false, premium: true },
    { name: "Rosa Premium", value: "330 100% 60%", isGradient: false, premium: true },
  ];
  const allAccentColors: AccentColorOption[] = [...accentColors, ...premiumAccentColors];
  const fontOptions = [
    { name: "Padrão", value: "inherit", premium: false },
    { name: "Montserrat", value: "'Montserrat', sans-serif", premium: true },
    { name: "Roboto Slab", value: "'Roboto Slab', serif", premium: true },
    { name: "Pacifico", value: "'Pacifico', cursive", premium: true },
  ];
  // Adicionar navigationCards no topo
  const navigationCards = [
    { label: "Básico", icon: User, colorClass: "bg-primary text-primary-foreground" },
    { label: "Aparência", icon: Palette, colorClass: "bg-purple-600 text-white" },
    { label: "Conteúdo", icon: Briefcase, colorClass: "bg-green-600 text-white" },
  ];
  // 2. Todos os hooks agrupados no topo, SEMPRE na mesma ordem
  const { user } = useAuth();
  const { toast } = useToast();
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState("Básico");
  const [currentServices, setCurrentServices] = useState<Service[]>([]);
  const [currentPortfolio, setCurrentPortfolio] = useState<PortfolioItem[]>([]);
  const [currentSkills, setCurrentSkills] = useState<string[]>([]);
  const [currentExperience, setCurrentExperience] = useState<ExperienceItem[]>([]);
  const [userPlan, setUserPlan] = useState<'free' | 'standard' | 'premium'>('free');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [youtubeTitle, setYoutubeTitle] = useState('');
  const [youtubeDescription, setYoutubeDescription] = useState('');
  const [premiumBanner, setPremiumBanner] = useState<PremiumBanner | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [selectedAccentColor, setSelectedAccentColor] = useState<AccentColorOption>(accentColors[0]);
  const [selectedFont, setSelectedFont] = useState(fontOptions[0].value);
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [backgroundPreview, setBackgroundPreview] = useState<string | null>(null);
  const [selectedLayoutTemplate, setSelectedLayoutTemplate] = useState('default');
  const [featuredServices, setFeaturedServices] = useState<string[]>([]);
  const [featuredPortfolio, setFeaturedPortfolio] = useState<string[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [faq, setFaq] = useState<FAQItem[]>([]);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyRequest, setVerifyRequest] = useState<'none' | 'pending' | 'approved'>('none');
  const [profileProgress] = useState(85);

  // 3. useEffect(s) depois dos hooks
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('*, social_links(*), services(*), portfolio_items(*), experience(*), education(*), reviews(*)')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Erro ao buscar perfil:', error);
          toast({
            title: "Erro ao carregar perfil",
            description: "Não foi possível carregar os dados do seu perfil.",
            variant: "destructive",
          });
          setCurrentUserProfile(null);
        } else if (data) {
          setCurrentUserProfile({
            ...data,
            name: data.full_name,
            isAvailable: data.is_available,
            profilePictureUrl: data.profile_picture_url,
            coverPhotoUrl: data.cover_photo_url,
            whatsappNumber: data.whatsapp_number,
            socialLinks: data.social_links?.map((link: any) => ({ ...link, id: String(link.id) })) || [],
            services: data.services?.map((service: any) => ({ ...service, id: String(service.id) })) || [],
            portfolio: data.portfolio_items?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
            experience: data.experience?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
            education: data.education?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
            reviews: data.reviews?.map((item: any) => ({ ...item, id: String(item.id) })) || [],
            skills: data.skills ?? [],
          } as UserProfile);
        }
      } else {
        setCurrentUserProfile(null);
      }
    };
    fetchProfile();
  }, [user, supabase]);

  const handleProfileSubmit = async (data: any) => {
    setIsLoading(true);
    try {
      // Mapear de volta para o formato do Supabase, se necessário
      const { name, isAvailable, profilePictureUrl, coverPhotoUrl, whatsappNumber, socialLinks, services, portfolio, experience, education, reviews, ...rest } = data;
      const updateData = {
        ...rest,
        full_name: name, // Mapeia name do formulário para full_name do Supabase
        is_available: isAvailable,
        profile_picture_url: profilePictureUrl,
        cover_photo_url: coverPhotoUrl,
        whatsapp_number: whatsappNumber,
      };

      // Atualizar o perfil principal
      const { error: profileError } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user?.id);

      if (profileError) {
        throw profileError;
      }

      // Exemplo de atualização de tabelas relacionadas (simplificado)
      // Para social_links, services, portfolio, experience, education, reviews
      // Você precisaria de lógica mais robusta para inserção/atualização/remoção
      // baseada nos IDs. Por simplicidade, este exemplo apenas demonstra o conceito.

      // Para social_links
      for (const link of socialLinks) {
        if (link.id) {
          await supabase.from('social_links').update(link).eq('id', link.id);
        } else {
          await supabase.from('social_links').insert({ ...link, profile_id: user?.id });
        }
      }
      // E assim por diante para services, portfolio, experience, education, reviews

      toast({
        title: "Perfil atualizado!",
        description: "Suas informações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar perfil:", JSON.stringify(error, null, 2));
      let errorMessage = "Ocorreu um erro ao salvar seu perfil.";
      if (error instanceof ZodError) {
        errorMessage = "Verifique os campos do formulário: " + error.errors.map(e => e.message).join(", ");
      } else if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null) {
        errorMessage = JSON.stringify(error);
      }
      toast({
        title: "Erro ao salvar perfil",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!currentUserProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando perfil ou faça login...</p>
      </div>
    );
  }

  // Corrigir mockProfile para ser compatível com ProfileFormValues
  const mockProfile = {
    username: 'joaosilva',
    name: 'João Silva',
    email: 'joao@exemplo.com',
    phone: '(11) 99999-9999',
    whatsappNumber: '',
    bio: 'Desenvolvedor Full Stack apaixonado por criar soluções inovadoras.',
    profilePictureUrl: '',
    coverPhotoUrl: '',
    category: '',
    isAvailable: true,
    location: { city: 'São Paulo', country: 'Brasil' },
    skills: ['React', 'Node.js', 'TypeScript', 'Python'],
    portfolio: [],
    services: [],
    socialLinks: [],
    experience: [],
    education: [],
    reviews: [],
  };

  // Array de stats para exibição
  const stats = [
    { label: 'Visualizações', value: '1.234', icon: Eye },
    { label: 'Conexões', value: '89', icon: User },
    { label: 'Projetos', value: '12', icon: Briefcase },
  ];

  // Handlers para Serviços
  const handleAddService = () => {
    setCurrentServices(prev => [...prev, { id: Date.now().toString(), name: '', description: '' }]);
  };
  const handleRemoveService = (id: string) => setCurrentServices(prev => prev.filter(s => s.id !== id));
  const handleServiceChange = (id: string, field: 'name' | 'description', value: string) => setCurrentServices(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  const handleMoveService = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentServices.length - 1)) return;
    const newItems = [...currentServices];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setCurrentServices(newItems);
  };

  // Handlers para Portfólio
  const handleAddPortfolioItem = () => {
    setCurrentPortfolio(prev => [...prev, { id: Date.now().toString(), imageUrl: 'https://picsum.photos/seed/new-item/400/300', caption: '', description: '' }]);
  };
  const handleRemovePortfolioItem = (id: string) => setCurrentPortfolio(prev => prev.filter(p => p.id !== id));
  const handlePortfolioItemChange = (id: string, field: 'caption' | 'description', value: string) => setCurrentPortfolio(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  const handleMovePortfolioItem = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentPortfolio.length - 1)) return;
    const newItems = [...currentPortfolio];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setCurrentPortfolio(newItems);
  };
  const handlePortfolioImageUpload = (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCurrentPortfolio(prev => prev.map(item => item.id === itemId ? { ...item, imageUrl: reader.result as string } : item));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handlers para Experiência
  const handleAddExperience = () => {
    setCurrentExperience(prev => [...prev, { id: Date.now().toString(), title: '', company: '', years: '' }]);
  };
  const handleRemoveExperience = (id: string) => setCurrentExperience(prev => prev.filter(exp => exp.id !== id));
  const handleExperienceChange = (id: string, field: 'title' | 'company' | 'years', value: string) => setCurrentExperience(prev => prev.map(exp => exp.id === id ? { ...exp, [field]: value } : exp));
  const handleMoveExperience = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentExperience.length - 1)) return;
    const newItems = [...currentExperience];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setCurrentExperience(newItems);
  };

  // Handlers para Habilidades
  const handleAddSkill = () => {
    setCurrentSkills(prev => [...prev, '']);
  };
  const handleRemoveSkill = (index: number) => setCurrentSkills(prev => prev.filter((_, i) => i !== index));
  const handleSkillChange = (index: number, value: string) => setCurrentSkills(prev => prev.map((skill, i) => i === index ? value : skill));
  const handleMoveSkill = (index: number, direction: 'up' | 'down') => {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === currentSkills.length - 1)) return;
    const newItems = [...currentSkills];
    const itemToMove = newItems.splice(index, 1)[0];
    newItems.splice(index + (direction === 'down' ? 1 : -1), 0, itemToMove);
    setCurrentSkills(newItems);
  };
  const handleSaveSkills = () => {
    toast({ title: 'Habilidades salvas!', description: 'Suas habilidades foram atualizadas com sucesso.' });
  };

  // Handler para salvar aparência
  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSaveAppearance = () => {
    toast({ title: 'Aparência salva!', description: 'Suas configurações de aparência foram atualizadas.' });
    if (backgroundPreview) setBackgroundImage(backgroundPreview);
  };

  // Handlers Destaque
  const handleToggleFeaturedService = (id: string) => {
    setFeaturedServices(prev => prev.includes(id)
      ? prev.filter(sid => sid !== id)
      : prev.length < 3 ? [...prev, id] : prev);
  };
  const handleToggleFeaturedPortfolio = (id: string) => {
    setFeaturedPortfolio(prev => prev.includes(id)
      ? prev.filter(pid => pid !== id)
      : prev.length < 3 ? [...prev, id] : prev);
  };

  // Handlers Depoimentos
  const handleAddTestimonial = (t: Omit<Testimonial, 'id'>) => {
    setTestimonials(prev => [...prev, { ...t, id: Date.now().toString() }]);
  };
  const handleRemoveTestimonial = (id: string) => setTestimonials(prev => prev.filter(t => t.id !== id));

  // Handlers FAQ
  const handleAddFaq = (q: string, a: string) => {
    setFaq(prev => [...prev, { id: Date.now().toString(), question: q, answer: a }]);
  };
  const handleRemoveFaq = (id: string) => setFaq(prev => prev.filter(f => f.id !== id));

  // Handler Verificação
  const handleRequestVerification = () => {
    setVerifyRequest('pending');
    setTimeout(() => {
      setIsVerified(true);
      setVerifyRequest('approved');
      toast({ title: 'Perfil verificado!', description: 'Seu perfil agora possui o selo de verificação.' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto w-full px-4 py-8">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-2">
            Edite Seu Perfil
          </h1>
          <p className="text-muted-foreground text-lg">
            Personalize seu perfil para refletir sua marca pessoal e experiência
          </p>
        </motion.div>

        {/* Progress and Stats */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h3 className="font-semibold">Progresso do Perfil</h3>
                  <Badge variant="secondary">{profileProgress}%</Badge>
                </div>
                <Progress value={profileProgress} className="w-full" />
              </div>
              <div className="flex gap-6">
                {stats.map((stat, index) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <stat.icon className="h-4 w-4 text-muted-foreground" />
                      <span className="font-bold text-lg">{stat.value}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Navigation Cards */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {navigationCards.map((card, index) => (
              <motion.div
                key={card.label}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <DashboardCard
                  icon={card.icon}
                  title={card.label}
                  colorClass={card.colorClass}
                  onClick={() => setActiveSection(card.label)}
                  className={
                    activeSection === card.label
                      ? "ring-2 ring-primary scale-105"
                      : "hover:bg-muted/50 hover:scale-102"
                  }
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === "Básico" && (
            <motion.div
              key="basic"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden">
                <ProfileForm
                  initialData={currentUserProfile ? {
                    ...currentUserProfile,
                    portfolio: (currentUserProfile.portfolio || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                    services: (currentUserProfile.services || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                    experience: (currentUserProfile.experience || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                    education: (currentUserProfile.education || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                    reviews: (currentUserProfile.reviews || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                    socialLinks: (currentUserProfile.socialLinks || []).map(item => ({ ...item, id: item.id ? String(item.id) : undefined })),
                  } : mockProfile}
                  onSubmit={handleProfileSubmit}
                  isLoading={isLoading}
                />
              </Card>
            </motion.div>
          )}

          {activeSection === "Conteúdo" && (
            <motion.div
              key="content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DashboardCard
                    icon={Briefcase}
                    title="Serviços"
                    description="Gerencie seus serviços oferecidos"
                    colorClass="bg-primary text-primary-foreground"
                  >
                    <div className="space-y-4">
                      {currentServices.map((service, index) => (
                        <div key={service.id} className="p-4 border rounded-md bg-muted/50 space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">Serviço #{index + 1}</Label>
                            <div className="flex items-center gap-1">
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveService(index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveService(index, 'down')} disabled={index === currentServices.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleRemoveService(service.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                          <Input value={service.name} onChange={(e) => handleServiceChange(service.id, 'name', e.target.value)} placeholder="Nome do Serviço" />
                          <Textarea value={service.description} onChange={(e) => handleServiceChange(service.id, 'description', e.target.value)} placeholder="Descrição do Serviço" />
                        </div>
                      ))}
                      <Button variant="outline" onClick={handleAddService}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Serviço</Button>
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={Upload}
                    title="Portfólio"
                    description="Adicione e organize seus projetos"
                    colorClass="bg-green-600 text-white"
                  >
                    <div className="space-y-4">
                      {currentPortfolio.map((item, index) => (
                        <div key={item.id} className="p-4 border rounded-md bg-muted/50 space-y-3">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">Item #{index+1}</Label>
                            <div className="flex items-center gap-1">
                              <Button type="button" variant="default" size="sm" onClick={()=>handleMovePortfolioItem(index,'up')} disabled={index===0}><ArrowUp className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={()=>handleMovePortfolioItem(index,'down')} disabled={index===currentPortfolio.length-1}><ArrowDown className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={()=>handleRemovePortfolioItem(item.id)} className="text-destructive"><Trash2 className="w-4 h-4"/></Button>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="md:col-span-1 space-y-2">
                              <div className="aspect-video relative bg-background rounded-md border"><Image src={item.imageUrl} alt={item.caption||'Item do portfolio'} fill style={{objectFit:'cover'}} className="rounded-md"/></div>
                              <input
                                type="file"
                                id={`portfolio-upload-${item.id}`}
                                onChange={(e) => handlePortfolioImageUpload(e, item.id)}
                                style={{ display: 'none' }}
                              />
                              <Button type="button" variant="outline" size="sm" className="w-full" onClick={(e) => document.getElementById(`portfolio-upload-${item.id}`)?.click()}><UploadIcon className="mr-2 h-3 w-3"/>Mudar Imagem</Button>
                            </div>
                            <div className="md:col-span-2 space-y-2">
                              <Input value={item.caption||''} onChange={(e)=>handlePortfolioItemChange(item.id,'caption',e.target.value)} placeholder="Legenda"/>
                              <Textarea value={item.description||''} onChange={(e)=>handlePortfolioItemChange(item.id,'description',e.target.value)} placeholder="Descrição (opcional)"/>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" onClick={handleAddPortfolioItem}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Item ao Portfólio</Button>
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={BookOpen}
                    title="Experiência"
                    description="Descreva sua trajetória profissional"
                    colorClass="bg-purple-600 text-white"
                  >
                    <div className="space-y-4">
                      {currentExperience.map((exp, index) => (
                        <div key={exp.id} className="p-4 border rounded-md bg-muted/50 space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">Experiência #{index + 1}</Label>
                            <div className="flex items-center gap-1">
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveExperience(index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveExperience(index, 'down')} disabled={index === currentExperience.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleRemoveExperience(exp.id)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                          <Input value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} placeholder="Cargo / Título" />
                          <Input value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} placeholder="Empresa / Organização" />
                          <Input value={exp.years} onChange={(e) => handleExperienceChange(exp.id, 'years', e.target.value)} placeholder="Período (Ex: 2020 - 2023)" />
                        </div>
                      ))}
                      <Button variant="outline" onClick={handleAddExperience}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Experiência</Button>
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={Star}
                    title="Habilidades"
                    description="Liste suas principais habilidades"
                    colorClass="bg-orange-500 text-white"
                  >
                    <div className="space-y-4">
                      {currentSkills.map((skill, index) => (
                        <div key={index} className="p-4 border rounded-md bg-muted/50 space-y-2">
                          <div className="flex justify-between items-center">
                            <Label className="font-semibold">Habilidade #{index + 1}</Label>
                            <div className="flex items-center gap-1">
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveSkill(index, 'up')} disabled={index === 0}><ArrowUp className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleMoveSkill(index, 'down')} disabled={index === currentSkills.length - 1}><ArrowDown className="w-4 h-4"/></Button>
                              <Button type="button" variant="default" size="sm" onClick={() => handleRemoveSkill(index)} className="text-destructive"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </div>
                          <Input value={skill} onChange={(e) => handleSkillChange(index, e.target.value)} placeholder="Ex: JavaScript, Design Gráfico, etc." />
                        </div>
                      ))}
                      <Button variant="outline" onClick={handleAddSkill}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Habilidade</Button>
                      <div className="flex justify-end pt-2">
                        <Button variant="default" onClick={handleSaveSkills}>Salvar Habilidades</Button>
                      </div>
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={Megaphone}
                    title="Banner Promocional"
                    description="Destaque uma mensagem ou promoção especial em seu perfil."
                    colorClass="bg-yellow-400 text-yellow-900 border-4 border-amber-500 relative"
                  >
                    {userPlan === 'premium' ? (
                      premiumBanner ? (
                        <div className="relative rounded-lg border-2 border-amber-500 bg-yellow-50 p-4 shadow-md">
                          <span className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                          <div className="flex flex-col md:flex-row gap-4 items-center">
                            <div className="relative w-40 h-24"><Image src={premiumBanner.imageUrl} alt="Banner" fill className="object-cover rounded-md"/></div>
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold">{premiumBanner.title}</h3>
                              <p className="text-sm text-muted-foreground">{premiumBanner.description}</p>
                              <Button size="sm" className="mt-2"><a href={premiumBanner.ctaLink} target="_blank" rel="noopener noreferrer">{premiumBanner.ctaText}</a></Button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <Button onClick={() => setPremiumBanner({ imageUrl: 'https://picsum.photos/seed/default-banner/600/400', title: 'Título do Banner', description: 'Descrição padrão para o seu novo banner promocional.', ctaText: 'Clique Aqui', ctaLink: '#' })}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Banner</Button>
                      )
                    ) : (
                      <div className="p-4 rounded-md bg-amber-50 border-2 border-amber-400 text-center relative">
                        <span className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                        <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                        <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
                        <p className="text-sm text-amber-700">Faça upgrade do seu plano para adicionar um banner promocional.</p>
                      </div>
                    )}
                  </DashboardCard>
                  <DashboardCard
                    icon={YoutubeIcon}
                    title="Vídeo do YouTube em Destaque"
                    description="Incorpore um vídeo do YouTube para se destacar no seu perfil."
                    colorClass="bg-red-500 text-white border-4 border-amber-500 relative"
                  >
                    {userPlan === 'premium' ? (
                      youtubeUrl ? (
                        <div className="relative rounded-lg border-2 border-amber-500 bg-yellow-50 p-4 shadow-md">
                          <span className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                          <div>
                            <Label htmlFor="youtube-url">URL do Vídeo do YouTube</Label>
                            <div className="flex items-center gap-2">
                              <YoutubeIcon className="text-red-500"/>
                              <Input id="youtube-url" value={youtubeUrl} onChange={(e) => setYoutubeUrl(e.target.value)} placeholder="https://www.youtube.com/watch?v=..." />
                            </div>
                          </div>
                          <div><Label htmlFor="youtube-title">Título do Vídeo</Label><Input id="youtube-title" value={youtubeTitle} onChange={(e) => setYoutubeTitle(e.target.value)} placeholder="Título do seu vídeo" /></div>
                          <div><Label htmlFor="youtube-description">Descrição do Vídeo</Label><Textarea id="youtube-description" value={youtubeDescription} onChange={(e) => setYoutubeDescription(e.target.value)} placeholder="Uma breve descrição sobre o seu vídeo..." /></div>
                          {youtubeUrl && (
                            <div className="mt-4 rounded-lg overflow-hidden aspect-video">
                              <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${youtubeUrl.split('v=')[1]}`} title="Pré-visualização do vídeo do YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                          )}
                        </div>
                      ) : (
                        <Button onClick={() => setYoutubeUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}><PlusCircleIcon className="mr-2 h-4 w-4"/>Adicionar Vídeo do YouTube</Button>
                      )
                    ) : (
                      <div className="p-4 rounded-md bg-amber-50 border-2 border-amber-400 text-center relative">
                        <span className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                        <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                        <p className="font-semibold text-amber-800">Este é um recurso Premium.</p>
                        <p className="text-sm text-amber-700">Faça upgrade do seu plano para adicionar um vídeo do YouTube.</p>
                      </div>
                    )}
                  </DashboardCard>
                  <DashboardCard
                    icon={Star}
                    title="Destaque de Serviços/Portfólio"
                    description="Marque serviços ou projetos como destaque para aparecerem no topo do perfil."
                    colorClass="bg-gradient-to-r from-yellow-300 to-yellow-500 text-yellow-900 border-4 border-amber-500 relative"
                  >
                    <div className="relative">
                      <span className="absolute top-2 right-2 bg-amber-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                      {userPlan === 'premium' ? (
                        <div className="space-y-2">
                          <p>Selecione até 3 serviços ou projetos para destacar. Eles aparecerão com selo especial no seu perfil.</p>
                          <div className="flex flex-col gap-2">
                            <Label className="font-semibold">Serviços:</Label>
                            {currentServices.map(s => (
                              <div key={s.id} className="flex items-center gap-2">
                                <input type="checkbox" checked={featuredServices.includes(s.id)} onChange={() => handleToggleFeaturedService(s.id)} disabled={!featuredServices.includes(s.id) && featuredServices.length >= 3} />
                                <span>{s.name || 'Sem nome'}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex flex-col gap-2 mt-2">
                            <Label className="font-semibold">Projetos:</Label>
                            {currentPortfolio.map(p => (
                              <div key={p.id} className="flex items-center gap-2">
                                <input type="checkbox" checked={featuredPortfolio.includes(p.id)} onChange={() => handleToggleFeaturedPortfolio(p.id)} disabled={!featuredPortfolio.includes(p.id) && featuredPortfolio.length >= 3} />
                                <span>{p.caption || 'Sem legenda'}</span>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-end pt-2">
                            <Button variant="default" onClick={() => toast({ title: 'Destaques salvos!' })}>Salvar Destaques</Button>
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-md bg-amber-50 border-2 border-amber-400 text-center">
                          <Star className="mx-auto h-8 w-8 text-amber-500 mb-2" />
                          <p className="font-semibold text-amber-800">Recurso Premium</p>
                          <p className="text-sm text-amber-700">Faça upgrade para destacar serviços e projetos.</p>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={User}
                    title="Depoimentos de Clientes"
                    description="Adicione depoimentos para aumentar sua credibilidade."
                    colorClass="bg-blue-100 text-blue-900 border-4 border-blue-400 relative"
                  >
                    <div className="relative">
                      <span className="absolute top-2 right-2 bg-blue-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                      {userPlan === 'premium' ? (
                        <div className="space-y-2">
                          <p>Adicione depoimentos de clientes, com foto, nome e comentário.</p>
                          <form className="flex flex-col gap-2" onSubmit={e => { e.preventDefault(); const form = e.target as HTMLFormElement; const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || ''; const comment = (form.elements.namedItem('comment') as HTMLTextAreaElement)?.value || ''; handleAddTestimonial({ name, comment }); form.reset(); }}>
                            <Input name="name" placeholder="Nome do cliente" required />
                            <Textarea name="comment" placeholder="Comentário" required />
                            <Button type="submit" variant="outline" size="sm">Adicionar Depoimento</Button>
                          </form>
                          <div className="mt-2 space-y-2">
                            {testimonials.map(t => (
                              <div key={t.id} className="border rounded p-2 flex justify-between items-center">
                                <div>
                                  <span className="font-semibold">{t.name}</span>
                                  <p className="text-sm text-muted-foreground">{t.comment}</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleRemoveTestimonial(t.id)}>Remover</Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-md bg-blue-50 border-2 border-blue-400 text-center">
                          <Star className="mx-auto h-8 w-8 text-blue-400 mb-2" />
                          <p className="font-semibold text-blue-900">Recurso Premium</p>
                          <p className="text-sm text-blue-700">Faça upgrade para exibir depoimentos de clientes.</p>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={Check}
                    title="Selo de Verificação"
                    description="Destaque seu perfil com um selo de verificação exclusivo."
                    colorClass="bg-gradient-to-r from-emerald-200 to-emerald-400 text-emerald-900 border-4 border-emerald-500 relative"
                  >
                    <div className="relative">
                      <span className="absolute top-2 right-2 bg-emerald-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                      {userPlan === 'premium' ? (
                        <div className="space-y-2 flex flex-col items-start gap-2">
                          {isVerified ? (
                            <div className="flex items-center gap-2"><Check className="h-6 w-6 text-emerald-600" /><span className="font-semibold">Seu perfil está verificado!</span></div>
                          ) : verifyRequest === 'pending' ? (
                            <span className="text-emerald-700">Solicitação em análise...</span>
                          ) : (
                            <Button variant="outline" size="sm" onClick={handleRequestVerification}>Solicitar Verificação</Button>
                          )}
                        </div>
                      ) : (
                        <div className="p-4 rounded-md bg-emerald-50 border-2 border-emerald-400 text-center">
                          <Check className="mx-auto h-8 w-8 text-emerald-400 mb-2" />
                          <p className="font-semibold text-emerald-900">Recurso Premium</p>
                          <p className="text-sm text-emerald-700">Faça upgrade para obter o selo de verificação.</p>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                  <DashboardCard
                    icon={BookOpen}
                    title="FAQ Personalizada"
                    description="Adicione perguntas frequentes para tirar dúvidas dos clientes."
                    colorClass="bg-gradient-to-r from-purple-200 to-purple-400 text-purple-900 border-4 border-purple-500 relative"
                  >
                    <div className="relative">
                      <span className="absolute top-2 right-2 bg-purple-400 text-xs font-bold px-2 py-1 rounded">Premium</span>
                      {userPlan === 'premium' ? (
                        <div className="space-y-2">
                          <p>Crie uma seção de perguntas frequentes personalizada para seu perfil.</p>
                          <form className="flex flex-col gap-2" onSubmit={e => { e.preventDefault(); const form = e.target as HTMLFormElement; handleAddFaq(form.question.value, form.answer.value); form.reset(); }}>
                            <Input name="question" placeholder="Pergunta" required />
                            <Textarea name="answer" placeholder="Resposta" required />
                            <Button type="submit" variant="outline" size="sm">Adicionar Pergunta</Button>
                          </form>
                          <div className="mt-2 space-y-2">
                            {faq.map(f => (
                              <div key={f.id} className="border rounded p-2 flex justify-between items-center">
                                <div>
                                  <span className="font-semibold">{f.question}</span>
                                  <p className="text-sm text-muted-foreground">{f.answer}</p>
                                </div>
                                <Button size="sm" variant="outline" onClick={() => handleRemoveFaq(f.id)}>Remover</Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <div className="p-4 rounded-md bg-purple-50 border-2 border-purple-400 text-center">
                          <Star className="mx-auto h-8 w-8 text-purple-400 mb-2" />
                          <p className="font-semibold text-purple-900">Recurso Premium</p>
                          <p className="text-sm text-purple-700">Faça upgrade para adicionar uma FAQ personalizada.</p>
                        </div>
                      )}
                    </div>
                  </DashboardCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === "Aparência" && (
            <motion.div
              key="appearance"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <DashboardCard
                icon={Palette}
                title="Aparência do Perfil"
                description="Personalize o tema, cores, fontes, layout e fundo do seu perfil público."
                colorClass="bg-purple-600 text-white"
              >
                <div className="space-y-8">
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Cor de Destaque</Label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {allAccentColors.map((color, idx) => (
                        <button
                          key={color.name}
                          onClick={() => setSelectedAccentColor(color)}
                          className={`w-full h-10 rounded-lg border-2 flex items-center justify-center transition-all ${selectedAccentColor?.name === color.name ? 'border-primary ring-2 ring-primary/50' : 'border-gray-200'} ${color.isGradient ? 'relative overflow-hidden' : ''} ${color.premium ? 'opacity-60' : ''}`}
                          style={color.isGradient ? { background: color.value } : { backgroundColor: color.isGradient ? undefined : `hsl(${color.value})` }}
                        >
                          {color.isGradient ? <span className="absolute inset-0" style={{ background: color.value, borderRadius: 8 }}></span> : null}
                          <span className="relative z-10 font-medium text-xs">{color.name}</span>
                          {color.premium && userPlan !== 'premium' && <span className="absolute top-1 right-1 bg-amber-400 text-xxs font-bold px-1 py-0.5 rounded">Premium</span>}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="fontSelect">Fonte do Perfil</Label>
                    <select
                      id="fontSelect"
                      value={selectedFont}
                      onChange={e => setSelectedFont(e.target.value)}
                      className="w-full md:w-1/2 border rounded p-2"
                      style={{ fontFamily: selectedFont }}
                    >
                      {fontOptions.map(font => (
                        <option key={font.value} value={font.value}>
                          {font.name} {font.premium ? '(Premium)' : ''}
                        </option>
                      ))}
                    </select>
                    {userPlan !== 'premium' && <p className="text-xs text-muted-foreground">Fontes personalizadas disponíveis apenas para premium.</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="backgroundUpload">Imagem de Fundo</Label>
                    <div className="flex items-center gap-2">
                      <input
                        id="backgroundUpload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleBackgroundUpload}
                      />
                      <Button variant="outline" size="sm" onClick={() => document.getElementById('backgroundUpload')?.click()}>
                        Upload de Fundo
                      </Button>
                      {backgroundPreview && <span className="text-xs text-muted-foreground">Pré-visualização pronta</span>}
                    </div>
                    {userPlan !== 'premium' && <p className="text-xs text-muted-foreground">Upload de fundo disponível apenas para premium.</p>}
                  </div>
                  <div className="space-y-4 pt-6 border-t">
                    <Label className="text-base font-medium">Template de Layout</Label>
                    <RadioGroup value={selectedLayoutTemplate} onValueChange={setSelectedLayoutTemplate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {profileLayouts.map((layout, idx) => {
                        const isPremium = layout.plan === 'premium';
                        const isDisabled = false; // Nunca desabilita seleção
                        return (
                          <Label key={layout.id} htmlFor={`layout-${layout.id}`} className={cn("border-2 rounded-lg p-4 flex flex-col cursor-pointer transition-all relative", selectedLayoutTemplate === layout.id && "border-primary ring-2 ring-primary/50", isPremium && userPlan !== 'premium' && 'opacity-60')}> 
                            <div className="flex items-center justify-between w-full mb-3">
                              <div className="flex items-center gap-3">
                                <RadioGroupItem value={layout.id} id={`layout-${layout.id}`} />
                                <span className="font-semibold">{layout.name}</span>
                              </div>
                              {isPremium && userPlan !== 'premium' && <span className="absolute top-2 right-2 bg-amber-400 text-xxs font-bold px-1 py-0.5 rounded">Premium</span>}
                            </div>
                            <div className="w-full h-32 relative bg-muted rounded-md border"><Image src={layout.imageUrl} alt={layout.name} fill style={{objectFit: "cover"}} className="rounded-md"/></div>
                            <p className="text-xs mt-2 text-muted-foreground">{layout.description}</p>
                          </Label>
                        );
                      })}
                    </RadioGroup>
                    <div className="mt-6">
                      <Label className="text-base font-medium mb-2 block">Pré-visualização ao Vivo</Label>
                      <div className="border rounded-lg p-4 bg-white">
                        {(() => {
                          const selected = profileLayouts.find(l => l.id === selectedLayoutTemplate);
                          if (!selected) return <p>Selecione um layout para visualizar.</p>;
                          const LayoutComponent = selected.Component;
                          // Usar dados mock ou do usuário
                          return <LayoutComponent user={currentUserProfile} isCurrentUserProfile={true} qrCodeUrl={''} onPortfolioItemClick={()=>{}} toast={toast} mounted={true} primaryColorHex={selectedAccentColor?.value || '#14994F'} />;
                        })()}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end pt-2">
                    <div className="flex flex-col items-end w-full">
                      <Button
                        variant="default"
                        onClick={handleSaveAppearance}
                        disabled={isLoading || (profileLayouts.find(l => l.id === selectedLayoutTemplate)?.plan === 'premium' && userPlan !== 'premium')}
                      >
                        Salvar Aparência
                      </Button>
                      {profileLayouts.find(l => l.id === selectedLayoutTemplate)?.plan === 'premium' && userPlan !== 'premium' && (
                        <span className="mt-2 text-xs text-amber-600">Faça upgrade para salvar este layout premium.</span>
                      )}
                    </div>
                  </div>
                </div>
              </DashboardCard>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
