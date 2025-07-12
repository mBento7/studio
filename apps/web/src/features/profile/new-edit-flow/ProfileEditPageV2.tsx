// Arquivo: ProfileEditPageV2.tsx
"use client";

import React, { useMemo, useCallback, useReducer, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ChevronLeft, ChevronRight, Save, Loader2 } from "lucide-react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { useAuth } from "@/hooks/use-auth";
import { useSaveProfile } from "./useSaveProfile";
import { useProfileWizard } from "./useProfileWizard";
import { PlanGate } from "./components/PlanGate";
import { RAW_STEPS, buildSteps, stepIcons, stepLabels } from "./stepsConfig";
import { useToast } from '@/hooks/use-toast';

import type { ProfileEditPageV2Props, UserProfileV2 } from "./types";

function profileReducer(state: UserProfileV2, action: { type: "update"; payload: Partial<UserProfileV2> } | { type: "reset"; payload: UserProfileV2 }): UserProfileV2 {
  switch (action.type) {
    case "update":
      return { ...state, ...action.payload };
    case "reset":
      return action.payload;
  }
}

export default function ProfileEditPageV2({ profile, onProfileChange, onSave, onClose, onAfterSave }: ProfileEditPageV2Props & { onClose?: () => void, onAfterSave?: () => void }) {
  const { user, currentUserProfile } = useAuth();
  const { toast } = useToast();
  const initialProfile: UserProfileV2 = {
    full_name: "",
    username: "",
    bio: "",
    profile_picture_url: "",
    email: "",
    phone: "",
    layout: "minimalist",
    services: [],
    portfolio: [],
    skills: [],
    // Padronizar: garantir que sociallinks sempre exista e venha do campo correto
    sociallinks: (profile?.sociallinks || profile?.social_links || []),
    // Garantir que o id esteja presente
    id: profile?.id || user?.id,
    ...(profile || {})
  };

  const [internalProfile, dispatch] = useReducer(profileReducer, initialProfile);
  const plan = internalProfile.plan || "free";

  const steps = useMemo(() => buildSteps(internalProfile, plan, user?.id, dispatch), [internalProfile, plan, user?.id]);
  const { step, setStep, isFirst, isLast, goNext, goPrev } = useProfileWizard(steps);
  const { save, saving, successMsg, errorMsg } = useSaveProfile(onSave, internalProfile);
  const [finished, setFinished] = useState(false);

  const handleSave = async () => {
    await save();
    if (successMsg) {
      toast({ title: 'Perfil salvo com sucesso!' });
      if (onClose) onClose();
      if (onAfterSave) onAfterSave();
    }
    if (errorMsg) {
      toast({ title: 'Erro ao salvar perfil', description: errorMsg, variant: 'destructive' });
    }
    setFinished(true);
  };

  if (finished && successMsg) {
    return (
      <div className="max-w-2xl mx-auto py-16 flex flex-col items-center">
        <div className="flex justify-center mb-4">
          <span className="bg-green-100 rounded-full p-4">
            <Sparkles className="text-green-600 text-4xl" />
          </span>
        </div>
        <h2 className="text-2xl font-bold text-green-700 mb-2">Perfil atualizado com sucesso!</h2>
        <p className="text-muted-foreground mb-6">Suas informações foram salvas. Você pode visualizar seu perfil ou continuar editando.</p>
        <div className="flex gap-4">
          <Button variant="outline" onClick={() => setFinished(false)}>
            Editar novamente
          </Button>
        </div>
        <div className="flex items-center justify-center gap-2 mt-8 overflow-x-auto scrollbar-hide">
          {steps.map((s, idx) => {
            const isActive = idx === step;
            const Icon = stepIcons[s.key as keyof typeof stepIcons] as React.ElementType;
            const badge = typeof s.badge === 'function' ? s.badge(internalProfile.plan || '') : s.badge;
            const label = typeof s.label === 'function' ? s.label(internalProfile.plan || '') : s.label;
            return (
              <button
                key={s.key}
                className={`flex flex-col items-center mx-1 min-w-[60px] focus:outline-none ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                onClick={() => setStep(idx)}
                disabled={isActive}
                style={{ background: 'none', border: 'none', padding: 0 }}
                aria-current={isActive ? 'step' : undefined}
                tabIndex={0}
              >
                <div className={`rounded-full border-2 flex items-center justify-center w-9 h-9 mb-1 transition-all duration-300 ${isActive ? "border-primary bg-primary/10" : "border-muted bg-muted"}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`text-xs flex items-center gap-1 ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>{String(label)}{badge && (<span className="ml-1 px-2 py-0.5 rounded bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase">{badge}</span>)}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-0">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-2">
          <span className="bg-primary/20 rounded-full p-3">
            <Sparkles className="text-primary text-3xl" />
          </span>
        </div>
        <h1 className="text-3xl font-bold text-primary">Editar Perfil</h1>
        <p className="text-muted-foreground">Personalize seu perfil profissional e destaque suas habilidades</p>
      </div>

      {/* Cabeçalho moderno com plano e botão visualizar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6 px-2">
        <div className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium shadow-md
          ${plan === 'premium' ? 'bg-yellow-100 text-yellow-800 border border-yellow-300' : plan === 'standard' ? 'bg-blue-100 text-blue-800 border border-blue-300' : 'bg-gray-100 text-gray-700 border border-gray-300'}`}
        >
          <Sparkles className={`w-5 h-5 mr-2 ${plan === 'premium' ? 'text-yellow-500' : plan === 'standard' ? 'text-blue-500' : 'text-gray-400'}`} />
          <span className="font-semibold">{plan === 'premium' ? 'Premium' : plan === 'standard' ? 'Standard' : 'Free'}</span>
        </div>
        <Button
          variant="outline"
          className="flex items-center gap-2 shadow-sm"
          asChild
          disabled={!currentUserProfile?.username}
        >
          <a href={currentUserProfile?.username ? `/profile/${currentUserProfile.username}` : '#'} target="_blank" rel="noopener noreferrer" aria-label="Visualizar perfil" title={currentUserProfile?.username ? undefined : 'Username não disponível'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            Visualizar Perfil
          </a>
        </Button>
      </div>
      {/* Carrossel de abas com SwiperJS centralizado */}
      <div className="flex justify-center w-full mb-4">
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView="auto"
          spaceBetween={8}
          navigation
          pagination={{ clickable: true }}
          style={{ padding: '8px 0', maxWidth: '100%' }}
        >
          {steps.map((s, idx) => {
            const isActive = idx === step;
            const Icon = stepIcons[s.key as keyof typeof stepIcons] as React.ElementType;
            const badge = typeof s.badge === 'function' ? s.badge(internalProfile.plan || '') : s.badge;
            const label = typeof s.label === 'function' ? s.label(internalProfile.plan || '') : s.label;
            return (
              <SwiperSlide key={s.key} style={{ width: 90, minWidth: 72 }}>
                <button
                  className={`flex flex-col items-center mx-1 min-w-[72px] focus:outline-none transition-all duration-300 ${isActive ? 'scale-110' : 'opacity-70 hover:opacity-100'} ${isActive ? 'cursor-default' : 'cursor-pointer'}`}
                  onClick={() => setStep(idx)}
                  disabled={isActive}
                  style={{ background: 'none', border: 'none', padding: 0 }}
                  aria-current={isActive ? 'step' : undefined}
                  tabIndex={0}
                >
                  <div className={`rounded-full border-2 flex items-center justify-center w-11 h-11 mb-1 shadow-md transition-all duration-300 ${isActive ? "border-primary bg-primary/10" : "border-muted bg-muted"}`}>
                    <Icon className={`w-6 h-6 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                  </div>
                  <span className={`text-xs flex items-center gap-1 text-center ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`}>{String(label)}{badge && (<span className="ml-1 px-2 py-0.5 rounded bg-yellow-400 text-yellow-900 text-[10px] font-bold uppercase">{badge}</span>)}</span>
                </button>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={steps[step].key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="px-2 py-8 mb-8 min-h-[240px] flex flex-col justify-center shadow-xl border border-muted-foreground/10 bg-white/90 dark:bg-card/80 backdrop-blur-md">
            {/* Remover o título da tab atual daqui */}
            <PlanGate required={steps[step].requiredPlan} plan={plan}>
              {steps[step].component}
            </PlanGate>
            <div className="flex flex-col xxs:gap-2 sm:flex-row justify-between gap-4 mt-8">
              <Button variant="outline" onClick={goPrev} disabled={isFirst || saving} className="flex items-center gap-2">
                <ChevronLeft className="w-4 h-4" /> Voltar
              </Button>
              <Button onClick={goNext} disabled={isLast || saving} className="flex items-center gap-2">
                <ChevronRight className="w-4 h-4" /> Avançar
              </Button>
            </div>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-end mt-4">
        <Button onClick={handleSave} disabled={saving} className="flex items-center gap-2" variant="default">
          {saving ? <Loader2 className="animate-spin w-4 h-4" /> : <Save className="w-4 h-4" />}
          Salvar alterações
        </Button>
      </div>

      {successMsg && !finished && <div className="text-green-600 mt-2">{successMsg}</div>}
      {errorMsg && <div className="text-red-600 mt-2">{errorMsg}</div>}
    </div>
  );
}
