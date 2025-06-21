import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

interface AdvancedSearchResultCardProps {
  user: UserProfile;
}

const AdvancedSearchResultCard: React.FC<AdvancedSearchResultCardProps> = ({ user }) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-t-4 border-primary">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="w-16 h-16 border-2 border-white shadow-md">
            <AvatarImage src={user.profilePictureUrl} alt={user.name} />
            <AvatarFallback className="text-lg font-bold">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground truncate">{user.name}</h3>
            <p className="text-sm text-primary font-medium truncate">{user.category}</p>
            <div className="flex flex-wrap gap-1 mt-2">
                {(user.skills || []).slice(0, 3).map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                ))}
            </div>
          </div>
        </div>
        <Button asChild size="sm" className="w-full mt-4">
          <Link href={`/profile/${user.username}`}>
            Ver Perfil Detalhado <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default AdvancedSearchResultCard; 