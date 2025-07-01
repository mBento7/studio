import React from "react";
import { ContentBlock } from "./components/ContentBlock";
import { PlanGate } from "./components/PlanGate";
import { ServicesBlockV2 } from "./blocks/ServicesBlockV2";
import { PortfolioBlockV2 } from "./blocks/PortfolioBlockV2";
import { SkillsBlockV2 } from "./blocks/SkillsBlockV2";
import { ExperienceBlockV2 } from "./blocks/ExperienceBlockV2";
import { FAQBlockV2 } from "./blocks/FAQBlockV2";
// Os blocos abaixo devem ser criados a partir do content/page.tsx, mas aqui já deixo o esqueleto:
// import { SkillsBlockV2 } from "./blocks/SkillsBlockV2";
// import { ExperienceBlockV2 } from "./blocks/ExperienceBlockV2";
// import { BannerBlockV2 } from "./blocks/BannerBlockV2";
// import { YoutubeBlockV2 } from "./blocks/YoutubeBlockV2";

interface ProfileContentTabV2Props {
  data: any;
  plan: string;
  layout: string;
  onChange: (data: any) => void;
}

export function ProfileContentTabV2({ data, plan, layout, onChange }: ProfileContentTabV2Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Habilidades */}
      <PlanGate required="free" plan={plan}>
        <ContentBlock
          title="Habilidades"
          description="Liste suas habilidades profissionais."
          isLocked={plan !== "premium" && plan !== "standard"}
          badgeText={plan === "free" ? "Standard/Premium" : undefined}
        >
          <SkillsBlockV2 skills={data.skills || []} onChange={skills => onChange({ ...data, skills })} />
        </ContentBlock>
      </PlanGate>
      {/* Experiência */}
      <PlanGate required="standard" plan={plan}>
        <ContentBlock
          title="Experiência"
          description="Adicione sua experiência profissional."
          isLocked={plan === "free"}
          badgeText={plan === "free" ? "Standard/Premium" : undefined}
        >
          <ExperienceBlockV2 experience={data.experience || []} onChange={experience => onChange({ ...data, experience })} />
        </ContentBlock>
      </PlanGate>
      {/* Serviços */}
      <PlanGate required="standard" plan={plan}>
        <ContentBlock
          title="Serviços"
          description="Adicione ou edite os serviços que você oferece."
          isLocked={plan === "free"}
          badgeText={plan === "free" ? "Standard/Premium" : undefined}
        >
          <ServicesBlockV2 services={data.services || []} onChange={services => onChange({ ...data, services })} />
        </ContentBlock>
      </PlanGate>
      {/* Portfólio */}
      <PlanGate required="standard" plan={plan}>
        <ContentBlock
          title="Portfólio"
          description="Mostre seus melhores trabalhos."
          isLocked={plan === "free"}
          badgeText={plan === "free" ? "Standard/Premium" : undefined}
        >
          <PortfolioBlockV2 portfolio={data.portfolio || []} onChange={portfolio => onChange({ ...data, portfolio })} />
        </ContentBlock>
      </PlanGate>
      {/* FAQ */}
      <PlanGate required="standard" plan={plan}>
        <ContentBlock
          title="Perguntas Frequentes (FAQ)"
          description="Adicione perguntas e respostas frequentes para ajudar seus visitantes."
          isLocked={plan === "free"}
          badgeText={plan === "free" ? "Standard/Premium" : undefined}
        >
          <FAQBlockV2 faqs={data.faqs || []} onChange={faqs => onChange({ ...data, faqs })} />
        </ContentBlock>
      </PlanGate>
      {/* Banner Promocional */}
      <PlanGate required="premium" plan={plan}>
        <ContentBlock
          title="Banner Promocional"
          description="Destaque uma mensagem ou promoção especial."
          isLocked={plan !== "premium"}
          badgeText={plan !== "premium" ? "Premium" : undefined}
        >
          <div>Bloco de Banner aqui</div>
        </ContentBlock>
      </PlanGate>
      {/* Vídeo do YouTube */}
      <PlanGate required="premium" plan={plan}>
        <ContentBlock
          title="Vídeo do YouTube"
          description="Incorpore um vídeo do YouTube em seu perfil."
          isLocked={plan !== "premium"}
          badgeText={plan !== "premium" ? "Premium" : undefined}
        >
          <div>Bloco de YouTube aqui</div>
        </ContentBlock>
      </PlanGate>
    </div>
  );
} 