import { ProfileForm } from '@/features/dashboard/profile-form';

export default function EditProfilePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Edite Seu Perfil</h1>
        <p className="text-muted-foreground">
          Personalize seu perfil no WhosDo.com para refletir sua marca pessoal e ofertas.
        </p>
      </div>
      <ProfileForm />
    </div>
  );
}
