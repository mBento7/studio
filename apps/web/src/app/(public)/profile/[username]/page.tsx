// Esta é a nova estrutura da página: um Server Component que busca os dados
// e passa para um Client Component que lida com a interatividade.

import { notFound } from "next/navigation";
import { getUserProfileByUsername } from "@/services/profile.service";
import { ProfileClientPage } from "./ProfileClientPage"; // Criaremos este componente a seguir

interface ProfilePageProps {
  params: { username: string };
}

// A página agora é um Server Component assíncrono
export default async function ProfileServerPage({ params }: ProfilePageProps) {
  const { username } = params;
  
  // 1. Busca os dados no servidor ANTES de renderizar a página
  const userProfile = await getUserProfileByUsername(username);

  // 2. Se o perfil não for encontrado, exibe a página 404
  if (!userProfile) {
    notFound();
  }

  console.log('userProfile:', userProfile);

  // 3. Renderiza o componente de cliente, passando os dados do perfil como prop
  return <ProfileClientPage userProfile={userProfile} />;
}
