// Função utilitária pura para uso em server e client
import type { UserProfile } from "@/lib/types";

export function isPremiumLayout(userProfile: UserProfile) {
  return userProfile.plan === 'premium' &&
    (
      userProfile.layoutTemplateId === 'pro' ||
      userProfile.layoutTemplateId === 'advanced' ||
      userProfile.layoutTemplateId === 'super-premium' ||
      userProfile.layoutTemplateId === 'premium-plus'
    );
}

export function getLayoutTier(userProfile: UserProfile): "free" | "standard" | "premium" {
  if (!userProfile) return "free";
  const layoutId = userProfile.layoutTemplateId || "";
  if (userProfile.plan === "premium" && [
    "pro", "advanced", "super-premium", "premium-plus"
  ].includes(layoutId)) {
    return "premium";
  }
  if (userProfile.plan === "standard" || ["modern", "portfolio-focus"].includes(layoutId)) {
    return "standard";
  }
  return "free";
} 