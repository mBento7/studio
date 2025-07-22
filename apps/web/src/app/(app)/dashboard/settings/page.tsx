import { redirect } from 'next/navigation';

/**
 * Esta página serve apenas para redirecionar o usuário para a primeira aba
 * da seção de configurações, que é a de 'Aparência'.
 */
export default function SettingsPage() {
  redirect('/dashboard/settings/appearance');
}
