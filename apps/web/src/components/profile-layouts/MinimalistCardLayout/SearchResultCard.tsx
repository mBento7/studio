import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface MinimalistSearchResultCardProps {
  user: UserProfile;
}

const MinimalistSearchResultCard: React.FC<MinimalistSearchResultCardProps> = ({ user }) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <div className="relative">
        <div className="h-24 bg-gray-200 dark:bg-gray-700">
          {user.coverPhotoUrl && (
            <img src={user.coverPhotoUrl} alt="Capa" className="w-full h-full object-cover" />
          )}
        </div>
        <div className="absolute top-16 left-1/2 -translate-x-1/2">
          <Avatar className="w-20 h-20 border-4 border-white dark:border-slate-800 shadow-md">
            <AvatarImage src={user.profilePictureUrl} alt={user.name} />
            <AvatarFallback className="text-xl font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="pt-12 pb-4 text-center">
        <h3 className="text-xl font-bold text-foreground">{user.name}</h3>
        <p className="text-sm text-primary font-medium">{user.category}</p>
        <p className="text-xs text-muted-foreground mt-2 h-8 overflow-hidden">
          {user.bio}
        </p>
        <Button asChild size="sm" className="mt-4">
          <Link href={`/profile/${user.username}`}>
            Ver Perfil <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default MinimalistSearchResultCard; 