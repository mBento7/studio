import React from 'react';
import ProfileEditV2Page from './profile-edit-v2/page';
import { LayoutDecider } from '@/components/layout/layout-decider';
import Link from 'next/link';

// Substitui o fluxo antigo pelo novo fluxo de edição de perfil V2
export default function DashboardPage() {
  return (
    <LayoutDecider hideSidebar={true} hideRightSidebar={true}>
      <ProfileEditV2Page />
    </LayoutDecider>
  );
}
