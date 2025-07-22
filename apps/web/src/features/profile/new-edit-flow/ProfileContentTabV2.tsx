import React from 'react';
import { ContentBlock } from './components/ContentBlock';
import { PlanGate } from './components/PlanGate';
import { ServicesBlockV2 } from './blocks/ServicesBlockV2';
import { PortfolioBlockV2 } from './blocks/PortfolioBlockV2';
import { SkillsBlockV2 } from './blocks/SkillsBlockV2';
import { ExperienceBlockV2 } from './blocks/ExperienceBlockV2';
import { FAQBlockV2 } from './blocks/FAQBlockV2';
import { Info } from 'lucide-react';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@/components/ui/tooltip';
import { PlanType } from './layoutFeatures';

// Os blocos abaixo devem ser criados a partir do content/page.tsx, mas aqui já deixo o esqueleto:
// import { SkillsBlockV2 } from "./blocks/SkillsBlockV2";
// import { ExperienceBlockV2 } = "./blocks/ExperienceBlockV2";
// import { BannerBlockV2 } = "./blocks/BannerBlockV2";
// import { YoutubeBlockV2 = "./blocks/YoutubeBlockV2";

interface ProfileContentTabV2Props {
  data: any;
  plan: PlanType; // Alterado de string para PlanType
  layout: string;
  onChange: (data: any) => void;
}

export function ProfileContentTabV2({ data, plan, layout, onChange }: ProfileContentTabV2Props) {
  return (
    <div className="grid grid-cols-1 gap-6">
      {/* Tags */}
      <ContentBlock
        title={<div className="flex items-center gap-2">Tags
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="w-4 h-4 text-muted-foreground cursor-pointer" />
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs text-sm">
                Tags são palavras-chave que ajudam as pessoas a encontrar seu perfil. Exemplos: design gráfico, consultoria, bolos personalizados, aulas online.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>}
        description="Adicione palavras-chave (tags) que descrevem suas habilidades, serviços ou produtos."
        isLocked={false}
        badgeText={plan === PlanType.FREE ? 'Standard/Premium' : undefined}
      >
        <SkillsBlockV2 skills={data.skills || []} onChange={skills => onChange({ ...data, skills })} plan={plan} />
        {plan === PlanType.FREE && (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-sm text-muted-foreground mb-2">Disponível apenas para Standard/Premium.</span>
            <a href="/planos"><button className="btn btn-primary">Fazer upgrade</button></a>
          </div>
        )}
      </ContentBlock>
      {/* Serviços */}
      <ContentBlock
        title="Serviços"
        description="Adicione os serviços que você oferece."
        isLocked={false}
        badgeText={plan === PlanType.FREE ? 'Standard/Premium' : undefined}
      >
        <ServicesBlockV2 services={data.services || []} onChange={services => onChange({ ...data, services })} plan={plan} />
        {plan === PlanType.FREE && (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-sm text-muted-foreground mb-2">Disponível apenas para Standard/Premium.</span>
            <a href="/planos"><button className="btn btn-primary">Fazer upgrade</button></a>
          </div>
        )}
      </ContentBlock>
      {/* Vídeo do YouTube */}
      <ContentBlock
        title="Vídeo do YouTube"
        description="Incorpore um vídeo do YouTube em seu perfil. Cole a URL do vídeo abaixo."
        isLocked={plan === PlanType.FREE}
        badgeText={plan === PlanType.FREE ? 'Standard/Premium' : undefined}
      >
        <div className="flex flex-col gap-2">
          <input
            type="text"
            className="input input-bordered"
            placeholder="Título do vídeo"
            value={data.youtubeTitle || ''}
            onChange={e => onChange({ ...data, youtubeTitle: e.target.value })}
            disabled={plan === PlanType.FREE}
          />
          <textarea
            className="input input-bordered"
            placeholder="Descrição do vídeo"
            value={data.youtubeDescription || ''}
            onChange={e => onChange({ ...data, youtubeDescription: e.target.value })}
            disabled={plan === PlanType.FREE}
            rows={2}
          />
          <input
            type="url"
            className="input input-bordered"
            placeholder="Cole a URL do vídeo do YouTube"
            value={data.youtubeUrl || ''}
            onChange={e => onChange({ ...data, youtubeUrl: e.target.value })}
            disabled={plan === PlanType.FREE}
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
        {plan === PlanType.FREE && (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-sm text-muted-foreground mb-2">Disponível apenas para Standard/Premium.</span>
            <a href="/planos"><button className="btn btn-primary">Fazer upgrade</button></a>
          </div>
        )}
      </ContentBlock>
      {/* Experiência */}
      <ContentBlock
        title="Experiência"
        description="Adicione sua experiência profissional."
        isLocked={false}
        badgeText={plan === PlanType.FREE ? 'Standard/Premium' : undefined}
      >
        <ExperienceBlockV2 experience={data.experience || []} onChange={experience => onChange({ ...data, experience })} plan={plan} />
        {plan === PlanType.FREE && (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-sm text-muted-foreground mb-2">Disponível apenas para Standard/Premium.</span>
            <a href="/planos"><button className="btn btn-primary\">Fazer upgrade</button></a>
          </div>
        )}
      </ContentBlock>
      {/* FAQ */}
      <ContentBlock
        title="Perguntas Frequentes (FAQ)"
        description="Adicione perguntas e respostas frequentes para ajudar seus visitantes."
        isLocked={plan === PlanType.FREE}
        badgeText={plan === PlanType.FREE ? 'Standard/Premium' : undefined}
      >
        <FAQBlockV2 faqs={data.faqs || []} onChange={faqs => onChange({ ...data, faqs })} plan={plan} />
        {plan === PlanType.FREE && (
          <div className="flex flex-col items-center justify-center py-2">
            <span className="text-sm text-muted-foreground mb-2">Disponível apenas para Standard/Premium.</span>
            <a href="/planos"><button className="btn btn-primary\">Fazer upgrade</button></a>
          </div>
        )}
      </ContentBlock>
    </div>
  );
}

// Função utilitária para extrair o ID do vídeo do YouTube
function getYouTubeId(url: string): string | undefined {
  if (!url) return undefined;
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : undefined;
}
