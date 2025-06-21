import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ModernSearchResultCardProps {
  user: UserProfile;
}

const ModernSearchResultCard: React.FC<ModernSearchResultCardProps> = ({ user }) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl">
      <CardContent className="p-4 flex items-center gap-4">
        <Avatar className="w-16 h-16 border-2 border-white shadow-md">
          <AvatarImage src={user.profilePictureUrl} alt={user.name} />
          <AvatarFallback className="text-lg font-bold">
            {user.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-foreground truncate">{user.name}</h3>
          <p className="text-sm text-primary font-medium truncate">{user.category}</p>
          <Button asChild size="xs" className="mt-2">
            <Link href={`/profile/${user.username}`}>
              Ver Perfil <ArrowRight className="w-3 h-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ModernSearchResultCard; 