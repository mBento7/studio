import { User, Award, Camera, Layout, FolderOpen, Sparkles, Eye, Megaphone, TicketPercent } from "lucide-react";
import { ProfileBasicTabV2 } from "./ProfileBasicTabV2";
import { MinimalistBlockV2 } from "./blocks/MinimalistBlockV2";
import { LayoutSelectBlockV2 } from "./LayoutSelectBlockV2";
import { PortfolioBlockV2 } from "./blocks/PortfolioBlockV2";
import * as React from "react";
import type { UserProfileV2 } from "./types";
import type { Dispatch } from "react";
import { ProfileContentTabV2 } from "./ProfileContentTabV2";
import { ContentBlock } from "./components/ContentBlock";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import StoryModal from "@/components/feed/StoryModal";
import CouponCard from '@/components/feed/CouponCard';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface PremiumTabV2Props {
  data: any;
  plan: string;
  layout: string;
  onChange: (data: any) => void;
}

// NOVA VERSÃO MODERNIZADA DO PremiumTabV2
export function PremiumTabV2({ data, plan, layout, onChange }: { data: any, plan: string, layout: string, onChange: (data: any) => void }) {
  const [storyDraft, setStoryDraft] = useState({ title: '', image: '', text: '' });
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStoryIdx, setSelectedStoryIdx] = useState<number | null>(null);
  const stories = data.stories || [];

  const [couponDraft, setCouponDraft] = useState({ code: '', discount: '', description: '', validUntil: '', brand: '' });
  const coupons = data.coupons || [];

  const premiumBenefits = [
    'Stories 24h para engajar seu público',
    'Banner promocional para destacar ofertas',
    'Cupons de desconto exclusivos',
    'Suporte prioritário',
    'Mais visibilidade no sistema',
    'E muito mais!'
  ];

  const [showExampleBanner, setShowExampleBanner] = useState(false);
  const [showExampleStories, setShowExampleStories] = useState(false);
  const [showExampleCupons, setShowExampleCupons] = useState(false);

  function handleAddStory() {
    if (!storyDraft.image || !storyDraft.title) return;
    const newStory = {
      id: Date.now().toString(),
      title: storyDraft.title,
      imageUrl: storyDraft.image,
      text: storyDraft.text,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 24*60*60*1000).toISOString(),
    };
    onChange({ ...data, stories: [newStory, ...stories] });
    setStoryDraft({ title: '', image: '', text: '' });
  }

  return (
    <div className="w-full px-4 md:px-8 py-8 bg-muted/50">
      <motion.div
        className="bg-gradient-to-br from-yellow-300 to-orange-500 rounded-2xl shadow-lg px-6 py-8 text-center text-white mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-3xl font-bold mb-2">Desbloqueie o Premium!</h2>
        <p className="max-w-md mx-auto mb-4">Tenha acesso a stories, cupons, banner promocional, suporte prioritário e muito mais.</p>
        <a href="/planos">
          <button className="bg-white text-yellow-700 font-bold px-6 py-2 rounded-full shadow hover:scale-105 transition">
            Quero ser Premium ⭐
          </button>
        </a>
      </motion.div>

      <div className="mb-8 text-center">
        <h3 className="text-lg font-semibold mb-2 text-yellow-700">Benefícios do Premium:</h3>
        <ul className="list-disc text-yellow-900 pl-6 space-y-1 text-base inline-block text-left">
          {premiumBenefits.map((b, i) => <li key={i}>{b}</li>)}
        </ul>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {/* Banner */}
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <ContentBlock
            title={<span className="flex items-center gap-2 text-xl font-semibold text-yellow-800"><Megaphone className="w-5 h-5 text-yellow-500" />Banner Promocional</span>}
            description="Destaque uma mensagem ou promoção especial."
            isLocked={plan !== "premium"}
            badgeText="Premium"
          >
            <input type="text" placeholder="Título" className="input input-bordered" disabled />
          </ContentBlock>
        </motion.div>

        {/* Stories */}
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <ContentBlock
            title={<span className="flex items-center gap-2 text-xl font-semibold text-purple-800"><Camera className="w-5 h-5 text-purple-500" />Stories 24h</span>}
            description="Crie stories que ficarão disponíveis por 24 horas."
            isLocked={plan !== "premium"}
            badgeText="Premium"
          >
            <ImageUploadField
              label="Imagem do Story"
              name="storyImage"
              setValue={(_name, value) => setStoryDraft(d => ({ ...d, image: value }))}
              currentImageUrl={storyDraft.image}
              aspectRatio="16/9"
              buttonText="Enviar Story"
            />
            <input
              type="text"
              placeholder="Título"
              className="input input-bordered"
              value={storyDraft.title}
              onChange={e => setStoryDraft(d => ({ ...d, title: e.target.value }))}
              disabled={plan !== "premium"}
            />
            <button className="btn btn-primary mt-2" type="button" onClick={handleAddStory}>Adicionar Story</button>
          </ContentBlock>
        </motion.div>

        {/* Cupons */}
        <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <ContentBlock
            title={<span className="flex items-center gap-2 text-xl font-semibold text-green-800"><TicketPercent className="w-5 h-5 text-green-500" />Cupons de Desconto</span>}
            description="Adicione cupons de desconto para seus seguidores."
            isLocked={plan !== "premium"}
            badgeText="Premium"
          >
            <input type="text" placeholder="Código do cupom" className="input input-bordered" disabled />
          </ContentBlock>
        </motion.div>
      </div>

      {/* Stories visualização */}
      {stories.length > 0 && (
        <div className="flex gap-4 overflow-x-auto py-4 scrollbar-hide">
          {stories.map((story: any, idx: number) => (
            <div key={story.id} className="flex flex-col items-center cursor-pointer" onClick={() => { setSelectedStoryIdx(idx); setModalOpen(true); }}>
              <img src={story.imageUrl} alt={story.title} className="w-24 h-24 object-cover rounded-lg border mb-1" />
              <span className="text-xs text-center max-w-[96px] truncate">{story.title}</span>
            </div>
          ))}
        </div>
      )}

      {modalOpen && selectedStoryIdx !== null && (
        <StoryModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          story={{
            user: { name: data.full_name, avatarUrl: data.profile_picture_url || '', username: data.username },
            mediaUrl: stories[selectedStoryIdx].imageUrl,
            type: 'image',
            time: stories[selectedStoryIdx].createdAt || '',
            liked: false,
          }}
          onPrev={() => {
            if (selectedStoryIdx !== null && selectedStoryIdx > 0) setSelectedStoryIdx(selectedStoryIdx - 1);
          }}
          onNext={() => {
            if (selectedStoryIdx !== null && selectedStoryIdx < stories.length - 1) setSelectedStoryIdx(selectedStoryIdx + 1);
          }}
        />
      )}
    </div>
  );
}

function getYouTubeId(url: string): string | undefined {
  if (!url) return undefined;
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : undefined;
}

export const RAW_STEPS = [
  { key: 'basic', label: 'Básico', icon: User, component: ProfileBasicTabV2, requiredPlan: 'free' },
  { key: 'layout', label: 'Layout', icon: Layout, component: LayoutSelectBlockV2, requiredPlan: 'free' },
  { key: 'conteudo', label: 'Conteúdo', icon: FolderOpen, component: ProfileContentTabV2, requiredPlan: 'free' },
  { key: 'portfolio', label: 'Portfólio', icon: Camera, component: PortfolioBlockV2, requiredPlan: 'free' },
  { key: 'premium', label: 'Premium', icon: Sparkles, component: PremiumTabV2, requiredPlan: 'free' },
];

export function buildSteps(
  profile: UserProfileV2,
  plan: string,
  userId: string | undefined,
  dispatch: Dispatch<{ type: "update"; payload: Partial<UserProfileV2> }>
) {
  return RAW_STEPS.map(s => {
    let componentProps: Record<string, any> = {};
    let component: React.ReactNode;
    switch (s.key) {
      case 'basic':
        componentProps = {
          data: profile,
          onChange: (data: UserProfileV2) => dispatch({ type: 'update', payload: data })
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'layout':
        componentProps = {
          currentPlan: plan,
          selectedLayout: profile.layout || 'minimalist',
          onSelect: (layoutKey: string) => {
            console.log('[DEBUG] Layout selecionado:', layoutKey);
            dispatch({ type: 'update', payload: { layout: layoutKey } });
            setTimeout(() => {
              console.log('[DEBUG] Novo estado do perfil após seleção:', JSON.stringify(profile));
            }, 100);
          },
          onUpgrade: () => alert('Faça upgrade para acessar este layout!')
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'portfolio':
        componentProps = {
          portfolio: profile.portfolio || [],
          onChange: (portfolio: any[]) => dispatch({ type: 'update', payload: { portfolio } }),
          plan,
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'conteudo':
        componentProps = {
          data: profile,
          plan,
          layout: profile.layout,
          onChange: (data: any) => dispatch({ type: 'update', payload: data })
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'premium':
        componentProps = {
          data: profile,
          plan,
          layout: profile.layout,
          onChange: (data: any) => dispatch({ type: 'update', payload: data })
        };
        component = React.createElement(s.component, componentProps);
        break;
      default:
        component = null;
        break;
    }
    return {
      ...s,
      allowed: plan === 'premium' || s.requiredPlan === 'free' || (plan === 'standard' && s.requiredPlan !== 'premium'),
      component
    };
  });
}

export const stepIcons = {
  basic: User,
  layout: Layout,
  conteudo: FolderOpen,
  portfolio: Camera,
  premium: Sparkles,
};
export const stepLabels = {
  basic: 'Básico',
  layout: 'Layout',
  conteudo: 'Conteúdo',
  portfolio: 'Portfólio',
  premium: 'Premium',
}; 