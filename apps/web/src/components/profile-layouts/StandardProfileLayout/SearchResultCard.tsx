import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

interface SearchResultCardStandardProps {
  user: UserProfile;
}

const SearchResultCardStandard: React.FC<SearchResultCardStandardProps> = ({ user }) => {
  return (
    <Card className="relative flex flex-col rounded-2xl shadow border bg-white min-h-[260px] overflow-hidden">
      {/* Imagem de capa */}
      {user.cover_photo_url && (
        <div className="w-full h-16 bg-gray-200">
          <img
            src={user.cover_photo_url}
            alt="Capa"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Avatar sobreposto */}
      <div className="absolute left-1/2 top-8 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <Avatar className="w-16 h-16 border-4 border-white shadow-lg">
          <AvatarImage src={user.profile_picture_url || '/avatar-default.png'} alt={user.name} />
          <AvatarFallback className="text-xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col items-center pt-10 pb-4 px-4">
        <h3 className="font-bold text-base text-center truncate w-full">{user.name}</h3>
        <p className="text-xs text-gray-500 text-center truncate w-full">{user.category}</p>
        {user.bio && (
          <p className="text-xs text-gray-400 text-center mt-1 line-clamp-2">{user.bio}</p>
        )}
        {user.followers && (
          <p className="text-xs text-gray-400 text-center mt-2">{user.followers} seguidores</p>
        )}
      </div>
    </Card>
  );
};

export default SearchResultCardStandard;
