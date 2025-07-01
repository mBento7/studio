import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface BasicSearchResultCardProps {
  user: UserProfile;
}

const BasicSearchResultCard: React.FC<BasicSearchResultCardProps> = ({ user }) => {
  return (
    <Link href={`/profile/${user.username}`} className="block h-full group focus:outline-none focus:ring-2 focus:ring-primary rounded-xl">
      <Card className="flex flex-col items-center justify-center h-full w-full p-5 rounded-xl bg-white dark:bg-slate-900 shadow border border-slate-200 dark:border-slate-800 transition-all duration-200 hover:shadow-lg hover:border-primary/60 cursor-pointer">
        <Avatar className="w-16 h-16 mb-2 shadow border-2 border-white dark:border-slate-900 bg-white">
          <AvatarImage src={user.profile_picture_url && user.profile_picture_url.trim() !== '' ? user.profile_picture_url : '/avatar-default.png'} alt={user.name || 'Foto de perfil'} />
          <AvatarFallback className="text-xl font-bold">
            {(user.name || 'Usuário').split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <h3 className="text-base font-semibold text-foreground text-center mt-1">{user.name || 'Usuário'}</h3>
        <p className="text-xs text-primary font-medium text-center mb-1">{user.category}</p>
        {user.bio && (
          <p className="text-xs text-muted-foreground text-center mb-2 line-clamp-2">{user.bio}</p>
        )}
        <div className="flex flex-wrap gap-1 justify-center mt-1">
          {(user.skills || []).slice(0, 2).map(skill => (
            <span key={skill} className="border border-primary/20 text-primary/80 px-2 py-0.5 rounded text-xs bg-primary/5">{skill}</span>
          ))}
        </div>
      </Card>
    </Link>
  );
};

export default BasicSearchResultCard; 