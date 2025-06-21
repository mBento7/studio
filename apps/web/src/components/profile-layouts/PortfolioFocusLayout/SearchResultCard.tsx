import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface PortfolioFocusSearchResultCardProps {
  user: UserProfile;
}

const PortfolioFocusSearchResultCard: React.FC<PortfolioFocusSearchResultCardProps> = ({ user }) => {
  const firstPortfolioItem = user.portfolio?.[0]?.imageUrl || user.coverPhotoUrl;

  return (
    <Card className="w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 rounded-2xl group">
      <div className="relative aspect-[4/3]">
        <img
          src={firstPortfolioItem || 'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=400&q=80'}
          alt="Portfolio"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <h3 className="text-xl font-bold drop-shadow-md">{user.name}</h3>
          <p className="text-sm text-white/90 drop-shadow-md">{user.category}</p>
        </div>
        <Link href={`/profile/${user.username}`} className="absolute top-2 right-2">
            <Button size="xs">
                Ver Perfil <ArrowRight className="w-3 h-3 ml-1" />
            </Button>
        </Link>
      </div>
    </Card>
  );
};

export default PortfolioFocusSearchResultCard; 