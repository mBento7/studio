// Esta é a nova estrutura da página: um Server Component que busca os dados
// e passa para um Client Component que lida com a interatividade.

import { notFound } from "next/navigation";
import { getUserProfileByUsername } from "@/services/profile.service";
import { ProfileClientPage } from "./ProfileClientPage";
import { isPremiumLayout, getLayoutTier } from "@/lib/isPremiumLayout";
import { ProfileLayoutProvider } from '@/contexts/ProfileLayoutContext';
import { LayoutDecider } from '@/components/layout/layout-decider';
import Link from 'next/link';
import { logger } from '@/lib/logger';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

// A página agora é um Server Component assíncrono
export default async function ProfileServerPage({ params }: ProfilePageProps) {
  // Aguarde params se necessário (caso seja uma Promise)
  const resolvedParams = await params;
  const username = typeof resolvedParams.username === 'string'
    ? resolvedParams.username
    : Array.isArray(resolvedParams.username)
      ? resolvedParams.username[0]
      : '';
  const userProfile = await getUserProfileByUsername(username);

  if (!userProfile) {
    notFound();
  }

  logger.profile('Profile page loaded', {
    username: userProfile.username,
    plan: userProfile.plan,
    layoutTemplateId: userProfile.layoutTemplateId,
    isPremium: isPremiumLayout(userProfile)
  });

  return (
    <ProfileLayoutProvider hideRightSidebar={isPremiumLayout(userProfile)} layoutTier={getLayoutTier(userProfile)}>
      <LayoutDecider>
        <ProfileClientPage userProfile={userProfile} />
        {username === 'lucas.showcase' && (
          <div style={{ margin: '24px 0' }}>
            <Link
              href="/showcase-lucas"
              style={{
                background: 'linear-gradient(90deg, #14b8a6 0%, #0e9094 100%)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '999px',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 2px 8px #14b8a633',
                border: 'none',
                cursor: 'pointer',
                transition: 'filter 0.2s',
                display: 'inline-block',
                textDecoration: 'none'
              }}
            >
              Ver Showcase de Anúncios
            </Link>
          </div>
        )}
      </LayoutDecider>
    </ProfileLayoutProvider>
  );
}
