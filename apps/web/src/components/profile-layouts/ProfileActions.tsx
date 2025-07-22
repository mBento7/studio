import { Button } from '@/components/ui/button';
import { Share2, Edit } from 'lucide-react';
import Link from 'next/link';
import { getFullProfileUrl } from '@/lib/profile-url';
import { useToast } from '@/hooks/use-toast';

interface ProfileActionsProps {
  user: any;
  isCurrentUserProfile: boolean;
}

export function ProfileActions({ user, isCurrentUserProfile }: ProfileActionsProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    if (typeof navigator === 'undefined' || typeof window === 'undefined') return;

    const profileUrl = getFullProfileUrl(user.username);

    if (navigator.share) {
      try {
        await navigator.share({
          title: user.full_name || user.name,
          text: user.bio,
          url: profileUrl
        });
      } catch (error) {
        // Fallback para clipboard se o usuário cancelar o compartilhamento
        if (error instanceof Error && error.name !== 'AbortError') {
          await navigator.clipboard.writeText(profileUrl);
          toast({
            title: 'Link copiado!',
            description: 'O link do perfil foi copiado para a área de transferência.'
          });
        }
      }
    } else {
      await navigator.clipboard.writeText(profileUrl);
      toast({
        title: 'Link copiado!',
        description: 'O link do perfil foi copiado para a área de transferência.'
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4 w-full items-center">
      <Button
        variant="outline"
        size="sm"
        onClick={handleShare}
        className="rounded-full flex items-center gap-1 w-fit text-primary"
        aria-label="Compartilhar perfil"
      >
        <Share2 className="w-4 h-4 text-primary" /> Compartilhar
      </Button>
      {/* Botão de editar perfil removido */}
    </div>
  );
}
