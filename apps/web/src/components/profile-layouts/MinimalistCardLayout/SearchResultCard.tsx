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
    <Link href={`/profile/${user.username}`} className="block h-full group">
      <Card className="flex flex-col items-center justify-center h-full w-full p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-xl hover:border-primary/60 cursor-pointer">
        <div className="relative mb-3">
          <Avatar className="w-20 h-20 shadow-lg border-4 border-white dark:border-slate-900 transition-transform duration-200 group-hover:scale-105 bg-white">
            <AvatarImage src={user.profilePictureUrl && user.profilePictureUrl.trim() !== '' ? user.profilePictureUrl : "/avatar-default.png"} alt={user.name || "Foto de perfil"} />
            <AvatarFallback className="text-2xl font-bold">
              {(user.name || "Usuário").split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
        </div>
        <h3 className="text-xl font-bold text-foreground text-center">{user.name || "Usuário"}</h3>
        <p className="text-sm text-primary font-medium text-center mb-2">{user.category}</p>
        {user.bio && (
          <p className="text-xs text-muted-foreground text-center mb-2 line-clamp-2">{user.bio}</p>
        )}
        <div className="flex flex-wrap gap-1 justify-center mt-1">
          {(user.skills || []).slice(0, 3).map(skill => (
            <span key={skill} className="border border-primary/30 text-primary/80 px-2 py-0.5 rounded text-xs bg-primary/5">{skill}</span>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default MinimalistSearchResultCard; 