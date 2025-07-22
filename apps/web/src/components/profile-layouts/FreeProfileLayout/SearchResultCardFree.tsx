'use client';

import React from 'react';
import Link from 'next/link';
import type { UserProfile } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { MapPin } from 'lucide-react';
import { Logo } from '@/components/common/logo';
import { useState } from 'react';

interface SearchResultCardFreeProps {
  user: UserProfile;
}

const SearchResultCardFree: React.FC<SearchResultCardFreeProps> = ({ user }) => {
  const [coverError, setCoverError] = useState(false);
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const hasCover = !!user.cover_photo_url && !coverError;

  return (
    <Link href={`/${user.username}`} className="block group h-full w-full">
      <Card className="relative flex flex-col items-center justify-start overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300 min-h-[300px]">

        {/* Capa ou padrão visual */}
        <div className="w-full h-24 relative">
          {hasCover ? (
            <img
              src={user.cover_photo_url}
              alt=""
              className="w-full h-full object-cover"
              onError={() => setCoverError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-orange-400 via-blue-200 to-blue-600 flex items-center justify-center relative">
              {/* Logo maior, laranja, no canto superior direito */}
              <Logo className="absolute top-2 right-2 w-16 h-16 text-orange-500" />
              {/* Overlay translúcido para suavizar */}
              <div className="absolute inset-0 bg-white/20" />
            </div>
          )}
        </div>

        {/* Avatar flutuante */}
        <div className="relative -mt-12 z-10">
          <Avatar className="w-24 h-24 border-4 border-white shadow-sm transition-transform group-hover:scale-105">
            <AvatarImage src={user.profile_picture_url || '/avatar-default.png'} alt={user.name} />
            <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Informações do usuário */}
        <div className="w-full px-4 pt-4 pb-6 flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold text-slate-900 truncate w-full">
            {user.name}
          </h3>
          <p className="text-sm text-indigo-600 font-medium mt-1 truncate w-full">
            {user.category}
          </p>

          {user.location?.city && (
            <p className="flex items-center gap-1 text-xs text-slate-600 mt-2">
              <MapPin className="w-4 h-4" />
              {user.location.city}
              {user.location.state ? `, ${user.location.state}` : ''}
            </p>
          )}

          {user.services?.[0] && (
            <div className="mt-3 px-3 py-1 text-xs bg-slate-100 text-slate-800 rounded-full font-medium">
              {user.services[0].name}
            </div>
          )}

          {user.bio && (
            <p className="mt-3 text-xs text-gray-500 line-clamp-2 px-2">
              {user.bio}
            </p>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default SearchResultCardFree;
