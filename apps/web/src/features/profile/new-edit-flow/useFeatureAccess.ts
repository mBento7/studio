import { layoutFeatures, LayoutKey, FeatureKey } from "@/components/profile-layouts/layoutFeatures";
// Hook/helper para lógica de permissão por plano/layout
export function useFeatureAccess(plan: string, layout: string) {
  // Exemplo de lógica de permissão
  function canAccess(feature: FeatureKey): boolean {
    // Exemplo de regras por plano
    if (feature === "servicos" && plan === "free") return false;
    if (feature === "portfolio" && plan !== "premium") return false;
    if (feature === "experiencia" && plan === "free") return false;
    if (feature === "habilidades" && plan === "free") return false;
    // Exemplo de regras por layout/tema
    const layoutKey: LayoutKey = (layout as LayoutKey) || "MinimalistCardLayout";
    if (layoutFeatures[layoutKey] && layoutFeatures[layoutKey][feature] === false) {
      return false;
    }
    return true;
  }
  return { canAccess };
} 