"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Eye, User, Phone, Image as ImageIcon, Globe, MapPin, PlusCircle, Upload, Briefcase, BookOpen, Star, Palette } from "lucide-react";
import Link from "next/link";
import ProfileForm from "@/features/dashboard/profile-form";
import { ProfileBg } from "@/components/ui/profile-bg";
import AppearanceSettingsPage from "./settings/appearance/page";
import ContentSettingsPage from "./settings/content/page";

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
  // Simulação de dados do usuário
  const currentUserProfile = {
    name: "João Silva",
    email: "joao.silva@email.com",
    profilePictureUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
  };

  const [profileProgress] = useState(85);

  return (
    <div className="max-w-6xl mx-auto py-10 px-2 md:px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Sidebar */}
      <aside className="md:col-span-1 flex flex-col items-center gap-6">
        <Card className="w-full flex flex-col items-center p-6 shadow-lg rounded-2xl bg-card/90 border-0">
          <ProfileBg />
          <Avatar className="h-20 w-20 -mt-10 border-4 border-background bg-muted shadow-sm">
            <AvatarImage src={currentUserProfile?.profilePictureUrl} alt={currentUserProfile?.name || 'User'} />
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
            <Button className="w-full mt-6" variant="secondary">
              <Eye className="w-4 h-4 mr-2" />
              Ver Perfil Público
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
        {(() => {
          const cards = [
            { label: "Básico", icon: User },
            { label: "Serviços", icon: PlusCircle, isContent: true },
            { label: "Portfólio", icon: Upload, isContent: true },
            { label: "Experiência", icon: Briefcase, isContent: true },
            { label: "Conteúdo", icon: Star },
            { label: "Aparência", icon: Palette },
          ];
          const [activeSection, setActiveSection] = useState("Básico");
          return (
            <>
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
                    <ProfileForm />
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
            </>
          );
        })()}
      </section>
    </div>
  );
}
