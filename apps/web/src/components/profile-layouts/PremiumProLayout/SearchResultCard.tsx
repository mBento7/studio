import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface PremiumProSearchResultCardProps {
  user: UserProfile;
}

const PremiumProSearchResultCard: React.FC<PremiumProSearchResultCardProps> = ({ user }) => {
  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl border-primary/20">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="w-16 h-16 border-2 border-white shadow-md">
              <AvatarImage src={user.profilePictureUrl} alt={user.name} />
              <AvatarFallback className="text-lg font-bold">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <CheckCircle className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 text-white rounded-full" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-foreground truncate">{user.name}</h3>
            <p className="text-sm text-primary font-medium truncate">{user.category}</p>
          </div>
          <Button asChild size="sm" variant="ghost">
            <Link href={`/profile/${user.username}`}>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-1 mt-3">
            {(user.skills || []).slice(0, 3).map(skill => (
                <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PremiumProSearchResultCard; 