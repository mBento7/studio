import React from "react";
import ProfileEditV2Page from "./profile-edit-v2/page";
import { LayoutDecider } from '@/components/layout/layout-decider';
import Link from 'next/link';

// Substitui o fluxo antigo pelo novo fluxo de edição de perfil V2
export default function DashboardPage() {
  return (
    <LayoutDecider hideSidebar={true} hideRightSidebar={true}>
      <ProfileEditV2Page />
      <Link href="/dashboard/messages">
        <button className="mt-4 px-4 py-2 bg-primary text-white rounded">Ir para mensagens</button>
      </Link>
    </LayoutDecider>
  );
}
