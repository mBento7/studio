"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, User, Phone, Image as ImageIcon, Globe, MapPin, PlusCircle, Upload, Briefcase, BookOpen, Star, Palette } from "lucide-react";
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

export default function EditProfilePage() {
  const { user } = useAuth();
  const [currentUserProfile, setCurrentUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const supabase = createClient();
  const [activeSection, setActiveSection] = useState("Básico");

  const cards = [
    { label: "Básico", icon: User },
    { label: "Serviços", icon: PlusCircle, isContent: true },
    { label: "Portfólio", icon: Upload, isContent: true },
    { label: "Experiência", icon: Briefcase, isContent: true },
    { label: "Conteúdo", icon: Star },
    { label: "Aparência", icon: Palette },
  ];

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
            // Mapear campos do Supabase para o formato do formulário, se necessário
            // Por exemplo, 'full_name' do Supabase para 'fullName' do formulário
            name: data.full_name, // Mapeia full_name do Supabase para name do formulário
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
            skills: data.skills ?? [], // Garante que skills é sempre um array
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

  const [profileProgress] = useState(85);

  if (!currentUserProfile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Carregando perfil ou faça login...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1 flex flex-col items-center gap-6">
        <Card className="w-full flex flex-col items-center p-6 shadow-lg rounded-2xl bg-card/90 border-0">
          <ProfileBg />
          <Avatar className="h-20 w-20 -mt-10 border-4 border-background bg-muted shadow-sm">
            <AvatarImage src={currentUserProfile?.profilePictureUrl || undefined} alt={currentUserProfile?.name || 'User'} />
            <AvatarFallback>
              {currentUserProfile?.name?.substring(0, 2) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="text-center mt-4 w-full">
            <h2 className="text-xl font-bold text-primary">{currentUserProfile?.name || 'Seu Nome'}</h2>
            <p className="text-muted-foreground text-sm">{currentUserProfile?.email}</p>
            {/* Profile Progress */}
            <div className="w-full mt-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Progresso do Perfil</span>
                <span className="text-primary font-medium">{profileProgress}%</span>
              </div>
              <Progress value={profileProgress} className="h-2" />
              <p className="text-xs text-muted-foreground">
                {profileProgress < 100 ? "Quase lá! Complete seu perfil." : "Perfil completo!"}
              </p>
            </div>
            <Button className="w-full mt-6" variant="secondary" asChild>
              <Link href={`/profile/${currentUserProfile?.username}`}>
                <Eye className="w-4 h-4 mr-2" />
                Ver Perfil Público
              </Link>
            </Button>
          </div>
        </Card>
        {/* Quick Stats */}
        <Card className="w-full p-4 rounded-2xl bg-card/90 border-0">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Visualizações</span>
              <span className="text-sm font-medium">1,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Conexões</span>
              <span className="text-sm font-medium">89</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Projetos</span>
              <span className="text-sm font-medium">12</span>
            </div>
          </div>
        </Card>
      </aside>
      {/* Main Content */}
      <section className="md:col-span-2">
        <div className="mb-8 text-center">
          <motion.h1
            className="text-4xl font-extrabold tracking-tight text-primary mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Edite Seu Perfil
          </motion.h1>
          <motion.p
            className="text-muted-foreground text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Personalize seu perfil para refletir sua marca pessoal e experiência.
          </motion.p>
        </div>
        {/* Grade de cards de navegação como botões */}
        <div className="mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.filter(card => !card.isContent || card.label === "Conteúdo").map(card => (
              <button
                key={card.label}
                onClick={() => setActiveSection(card.label)}
                className={`flex flex-col items-center justify-center p-6 rounded-xl border transition shadow-md cursor-pointer
                  ${activeSection === card.label ? "bg-primary text-white" : "bg-white hover:bg-primary/10"}`}
              >
                <card.icon className="w-8 h-8 mb-2" />
                <span className="font-semibold">{card.label}</span>
              </button>
            ))}
          </div>
        </div>
        {/* Renderização condicional do conteúdo de edição */}
        {activeSection === "Básico" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-2xl shadow-xl border-0 bg-card/80 p-6 backdrop-blur-sm">
              <ProfileForm
                initialData={currentUserProfile}
                onSubmit={handleProfileSubmit}
                isLoading={isLoading}
              />
            </Card>
          </motion.div>
        )}
        {activeSection === "Aparência" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AppearanceSettingsPage />
          </motion.div>
        )}
        {activeSection === "Conteúdo" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContentSettingsPage />
          </motion.div>
        )}
        {/* Outras seções podem ser integradas aqui */}
      </section>
    </div>
  );
}
