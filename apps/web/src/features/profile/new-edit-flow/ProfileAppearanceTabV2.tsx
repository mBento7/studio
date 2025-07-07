import React from "react";
import { Button } from "@/components/ui/button";

interface ProfileAppearanceTabV2Props {
  data: any;
  plan: string;
  layout: string;
  onChange: (data: any) => void;
  premiumLayouts?: string[];
}

export function ProfileAppearanceTabV2({ data, plan, layout, onChange, premiumLayouts }: ProfileAppearanceTabV2Props) {
  // Lista de layouts disponíveis
  const allLayouts = [
    { value: 'minimalist', label: 'Minimalista', tier: 'free' },
    { value: 'free', label: 'Grátis', tier: 'free' },
    { value: 'portfolio', label: 'Portfólio', tier: 'standard' },
    { value: 'pro', label: 'Pro', tier: 'premium' },
    { value: 'standard', label: 'Avançado', tier: 'standard' },
    { value: 'premiumplus', label: 'Premium Plus', tier: 'premium' },
    { value: 'super-premium', label: 'Super Premium', tier: 'premium' },
  ];
  // Lista de layouts premium (hardcoded para garantir funcionamento)
  const allPremiumLayouts = ['pro', 'standard', 'premiumplus', 'super-premium'];
  const layoutsToShow = allLayouts.filter(l => allPremiumLayouts.includes(l.value));
  const isPremiumLayout = allPremiumLayouts.includes(layout);

  // Função para resetar aparência para o padrão do layout
  function resetAppearance() {
    onChange({
      ...data,
      primaryColor: '',
      secondaryColor: '',
      font: 'default',
    });
  }

  return (
    <div className="space-y-6">
      {/* Só exibe opções de aparência se for layout premium */}
      {isPremiumLayout && plan === "premium" ? (
        <div className="p-4 rounded-lg border bg-muted/30 space-y-4">
          <div>
            <label className="block font-semibold mb-1">Cor Primária</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.primaryColor || "#000000"}
                onChange={e => onChange({ ...data, primaryColor: e.target.value })}
                className="w-8 h-8 rounded"
              />
              <span className="font-mono text-xs">{data.primaryColor || "#000000"}</span>
              <span className="ml-2 text-xs text-muted-foreground">Destaques e botões</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Cor Secundária</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={data.secondaryColor || "#ffffff"}
                onChange={e => onChange({ ...data, secondaryColor: e.target.value })}
                className="w-8 h-8 rounded"
              />
              <span className="font-mono text-xs">{data.secondaryColor || "#ffffff"}</span>
              <span className="ml-2 text-xs text-muted-foreground">Fundo do perfil</span>
            </div>
          </div>
          <div>
            <label className="block font-semibold mb-1">Fonte Premium (nome)</label>
            <select
              value={data.font || "default"}
              onChange={e => onChange({ ...data, font: e.target.value })}
              className="w-full p-2 rounded border"
            >
              <option value="default" style={{ fontFamily: "inherit" }}>Padrão</option>
              <option value="montserrat" style={{ fontFamily: "Montserrat, sans-serif" }}>Montserrat – Exemplo</option>
              <option value="roboto" style={{ fontFamily: "Roboto, sans-serif" }}>Roboto – Exemplo</option>
            </select>
          </div>
          <Button type="button" variant="link" className="mt-2 text-xs underline" onClick={resetAppearance}>
            Restaurar padrões do layout
          </Button>
        </div>
      ) : (
        <div className="text-muted-foreground text-center p-8">
          Personalize as cores e fonte do seu layout premium após selecionar um layout premium na aba <b>Layout</b>.
        </div>
      )}
    </div>
  );
} 