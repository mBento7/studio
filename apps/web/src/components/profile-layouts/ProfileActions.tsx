import { Button } from "@/components/ui/button";
import { Share2, Edit } from "lucide-react";
import Link from "next/link";

interface ProfileActionsProps {
  user: any;
  isCurrentUserProfile: boolean;
}

export function ProfileActions({ user, isCurrentUserProfile }: ProfileActionsProps) {
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: user.name,
        text: user.bio,
        url: typeof window !== 'undefined' ? window.location.href : ''
      });
    } else {
      navigator.clipboard.writeText(typeof window !== 'undefined' ? window.location.href : '');
      alert('Link do perfil copiado!');
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