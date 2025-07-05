import { User, Briefcase, Award, Camera, Layout, FolderOpen, Sparkles } from "lucide-react";
import { ProfileBasicTabV2 } from "./ProfileBasicTabV2";
import { MinimalistBlockV2 } from "./blocks/MinimalistBlockV2";
import { LayoutSelectBlockV2 } from "./LayoutSelectBlockV2";
import { ServicesBlockV2 } from "./blocks/ServicesBlockV2";
import { PortfolioBlockV2 } from "./blocks/PortfolioBlockV2";
import { SkillsBlockV2 } from "./blocks/SkillsBlockV2";
import * as React from "react";
import type { UserProfileV2 } from "./types";
import type { Dispatch } from "react";
import { ProfileContentTabV2 } from "./ProfileContentTabV2";
import { ContentBlock } from "./components/ContentBlock";
import { ImageUploadField } from "@/components/ui/image-upload-field";
import StoryModal from "@/components/feed/StoryModal";

interface PremiumTabV2Props {
  data: any;
  plan: string;
  layout: string;
  onChange: (data: any) => void;
}

function PremiumTabV2({ data, plan, layout, onChange }: PremiumTabV2Props): JSX.Element {
  const [storyDraft, setStoryDraft] = React.useState({ title: '', image: '', text: '' });
  const [modalOpen, setModalOpen] = React.useState(false);
  const [selectedStoryIdx, setSelectedStoryIdx] = React.useState<number | null>(null);
  const stories = data.stories || [];

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

  function handleOpenModal(idx: number) {
    setSelectedStoryIdx(idx);
    setModalOpen(true);
  }
  function handleCloseModal() {
    setModalOpen(false);
    setSelectedStoryIdx(null);
  }
  function handlePrev() {
    if (selectedStoryIdx !== null && selectedStoryIdx > 0) setSelectedStoryIdx(selectedStoryIdx - 1);
  }
  function handleNext() {
    if (selectedStoryIdx !== null && selectedStoryIdx < stories.length - 1) setSelectedStoryIdx(selectedStoryIdx + 1);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Banner Promocional */}
      <ContentBlock
        title="Banner Promocional"
        description="Destaque uma mensagem ou promoção especial. Preencha os campos abaixo."
        isLocked={plan !== "premium"}
        badgeText={plan !== "premium" ? "Premium" : undefined}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Título do banner"
            value={data.banner?.title || ""}
            onChange={e => onChange({ ...data, banner: { ...data.banner, title: e.target.value } })}
            disabled={plan !== "premium"}
          />
          <textarea
            className="input input-bordered"
            placeholder="Descrição do banner"
            value={data.banner?.description || ""}
            onChange={e => onChange({ ...data, banner: { ...data.banner, description: e.target.value } })}
            disabled={plan !== "premium"}
            rows={2}
          />
          <input
            type="text"
            className="input input-bordered"
            placeholder="Texto do botão (CTA)"
            value={data.banner?.ctaText || ""}
            onChange={e => onChange({ ...data, banner: { ...data.banner, ctaText: e.target.value } })}
            disabled={plan !== "premium"}
          />
          <input
            type="url"
            className="input input-bordered"
            placeholder="Link do botão (URL)"
            value={data.banner?.ctaLink || ""}
            onChange={e => onChange({ ...data, banner: { ...data.banner, ctaLink: e.target.value } })}
            disabled={plan !== "premium"}
          />
          <input
            type="url"
            className="input input-bordered"
            placeholder="URL da imagem do banner"
            value={data.banner?.image || ""}
            onChange={e => onChange({ ...data, banner: { ...data.banner, image: e.target.value } })}
            disabled={plan !== "premium"}
          />
          {data.banner?.image && (
            <img src={data.banner.image} alt="Banner" className="mt-2 rounded max-h-32 border" />
          )}
        </div>
      </ContentBlock>
      {/* Vídeo do YouTube */}
      <ContentBlock
        title="Vídeo do YouTube"
        description="Incorpore um vídeo do YouTube em seu perfil. Cole a URL do vídeo abaixo."
        isLocked={plan !== "premium"}
        badgeText={plan !== "premium" ? "Premium" : undefined}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Título do vídeo"
            value={data.youtubeTitle || ""}
            onChange={e => onChange({ ...data, youtubeTitle: e.target.value })}
            disabled={plan !== "premium"}
          />
          <textarea
            className="input input-bordered"
            placeholder="Descrição do vídeo"
            value={data.youtubeDescription || ""}
            onChange={e => onChange({ ...data, youtubeDescription: e.target.value })}
            disabled={plan !== "premium"}
            rows={2}
          />
          <input
            type="url"
            className="input input-bordered"
            placeholder="Cole a URL do vídeo do YouTube"
            value={data.youtubeUrl || ""}
            onChange={e => onChange({ ...data, youtubeUrl: e.target.value })}
            disabled={plan !== "premium"}
          />
          {data.youtubeUrl && (
            <div className="aspect-video w-full mt-2 rounded overflow-hidden border">
              <iframe
                width="100%"
                height="315"
                src={`https://www.youtube.com/embed/${getYouTubeId(data.youtubeUrl)}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          )}
        </div>
      </ContentBlock>
      {/* Stories 24h */}
      <ContentBlock
        title="Stories 24h"
        description="Crie stories que ficarão disponíveis por 24 horas no seu perfil."
        isLocked={plan !== "premium"}
        badgeText={plan !== "premium" ? "Premium" : undefined}
      >
        <div className="flex flex-col gap-2 mb-4">
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
            className="input input-bordered"
            placeholder="Título do story"
            value={storyDraft.title}
            onChange={e => setStoryDraft(d => ({ ...d, title: e.target.value }))}
            disabled={plan !== "premium"}
          />
          <textarea
            className="input input-bordered"
            placeholder="Descrição do story (opcional)"
            value={storyDraft.text}
            onChange={e => setStoryDraft(d => ({ ...d, text: e.target.value }))}
            disabled={plan !== "premium"}
            rows={2}
          />
          <button
            className="btn btn-primary mt-2"
            type="button"
            disabled={plan !== "premium" || !storyDraft.image || !storyDraft.title}
            onClick={handleAddStory}
          >
            Adicionar Story
          </button>
        </div>
        {/* Lista de stories criados */}
        <div className="flex flex-wrap gap-4">
          {stories.length === 0 && <span className="text-muted-foreground">Nenhum story criado ainda.</span>}
          {stories.map((story: any, idx: number) => (
            <div key={story.id} className="flex flex-col items-center cursor-pointer" onClick={() => handleOpenModal(idx)}>
              <img src={story.imageUrl} alt={story.title} className="w-24 h-24 object-cover rounded-lg border mb-1" />
              <span className="text-xs text-center max-w-[96px] truncate">{story.title}</span>
            </div>
          ))}
        </div>
        {/* Modal de visualização de story */}
        {modalOpen && selectedStoryIdx !== null && (
          <StoryModal
            open={modalOpen}
            onClose={handleCloseModal}
            story={{
              id: stories[selectedStoryIdx].id,
              user: { name: data.full_name, avatarUrl: data.profile_picture_url || '', username: data.username },
              mediaUrl: stories[selectedStoryIdx].imageUrl,
              type: 'image',
              timeLeft: 24 * 60 * 60, // placeholder
              liked: false,
            }}
            onPrev={handlePrev}
            onNext={handleNext}
          />
        )}
      </ContentBlock>
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
  { key: 'services', label: 'Serviços', icon: Briefcase, component: ServicesBlockV2, requiredPlan: 'standard' },
  { key: 'conteudo', label: 'Conteúdo', icon: FolderOpen, component: ProfileContentTabV2, requiredPlan: 'standard' },
  { key: 'portfolio', label: 'Portfólio', icon: Camera, component: PortfolioBlockV2, requiredPlan: 'standard' },
  { key: 'premium', label: 'Premium', icon: Sparkles, component: PremiumTabV2, requiredPlan: 'premium' },
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
      case 'services':
        componentProps = {
          services: profile.services || [],
          onChange: (services: any[]) => dispatch({ type: 'update', payload: { services } })
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'portfolio':
        componentProps = {
          portfolio: profile.portfolio || [],
          onChange: (portfolio: any[]) => dispatch({ type: 'update', payload: { portfolio } })
        };
        component = React.createElement(s.component, componentProps);
        break;
      case 'skills':
        componentProps = {
          skills: profile.skills || [],
          onChange: (skills: string[]) => dispatch({ type: 'update', payload: { skills } })
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

export const stepIcons = RAW_STEPS.reduce((acc, s) => ({ ...acc, [s.key]: s.icon }), {});
export const stepLabels = RAW_STEPS.reduce((acc, s) => ({ ...acc, [s.key]: s.label }), {}); 