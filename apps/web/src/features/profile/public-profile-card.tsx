import type { UserProfile } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PublicProfileCardProps {
  profile: UserProfile;
}

export function PublicProfileCard({ profile }: PublicProfileCardProps) {

  const planBadge = (plan: UserProfile['plan']) => {
    switch (plan) {
      case 'premium':
        return (
          <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-white absolute top-2 right-2 flex items-center gap-1">
            <Star className="w-3 h-3"/> Premium
          </Badge>
        );
      case 'standard':
        return <Badge variant="secondary" className="absolute top-2 right-2">Padrão</Badge>;
      default:
        return null;
    }
  };

  return (
    <Link href={`/${profile.username}`} className="w-full h-full group">
      <Card className="overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col h-full bg-card group-hover:border-primary">
        <CardHeader className="p-0 relative h-24 xxs:h-20 sm:h-28">
          <Image
            src={profile.cover_photo_url || `https://picsum.photos/seed/${profile.id}-cover/400/150`}
            alt={profile.name ? `${profile.name}'s cover photo` : 'Capa do perfil'}
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-70 group-hover:opacity-100 transition-opacity"
            data-ai-hint={profile.coverPhotoDataAiHint || 'abstract background'}
          />
          {planBadge(profile.plan)}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 xxs:w-16 xxs:h-16 sm:w-24 sm:h-24 rounded-lg border-4 border-background group-hover:border-primary/50 transition-colors shadow-lg bg-background overflow-hidden flex items-center justify-center">
            <Image
              src={profile.profile_picture_url || 'https://ui-avatars.com/api/?name=User&background=random'}
              alt={profile.name || 'Avatar do usuário'}
              width={96}
              height={96}
              className="object-cover h-full w-full rounded-md"
              data-ai-hint={profile.profilePictureDataAiHint || 'person icon'}
            />
          </div>
        </CardHeader>
        <CardContent className="pt-14 xxs:pt-10 sm:pt-16 text-center flex-grow flex flex-col px-5 xxs:px-2 pb-5">
          <h3 className="text-lg font-bold text-foreground group-hover:text-primary transition-colors truncate">{profile.name}</h3>

          <div className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1.5">
            <Briefcase size={14} className="flex-shrink-0"/>
            <span className="truncate">{profile.category}</span>
          </div>

          <p className="mt-3 text-xs text-muted-foreground flex-grow line-clamp-2">
            {profile.bio}
          </p>

          <p className="mt-3 text-xs text-muted-foreground/80">
            {profile.location?.city}{profile.location?.country && profile.location?.city ? ', ' : ''}{profile.location?.country}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
