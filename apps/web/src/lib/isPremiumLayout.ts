// Função utilitária pura para uso em server e client
import type { UserProfile } from '@/lib/types';

export function isPremiumLayout(userProfile: UserProfile) {
  return userProfile.plan === 'premium' &&
    userProfile.layoutTemplateId === 'premium';
}

export function getLayoutTier(userProfile: UserProfile): 'free' | 'standard' | 'premium' {
  if (!userProfile) return 'free';
  const layoutId = userProfile.layoutTemplateId || '';
  if (userProfile.plan === 'premium' && [
    'premium'
  ].includes(layoutId)) {
    return 'premium';
  }
  if (userProfile.plan === 'standard' || ['modern'].includes(layoutId)) {
    return 'standard';
  }
  return 'free';
}
