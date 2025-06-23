import React from 'react';
import type { UserProfile } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Star, Crown } from 'lucide-react';
import Link from 'next/link';

interface AdvancedSearchResultCardProps {
  user: UserProfile;
}

const AdvancedSearchResultCard: React.FC<AdvancedSearchResultCardProps> = ({ user }) => {
  const backgroundStyle = user.coverPhotoUrl
    ? { backgroundImage: `linear-gradient(rgba(20,20,40,0.55),rgba(20,20,40,0.7)), url('${user.coverPhotoUrl}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { background: 'linear-gradient(135deg, #2563eb 60%, #7c3aed 100%)' };

  return (
    <Link href={`/profile/${user.username}`} className="block h-full group">
      <Card className="flex flex-col items-center justify-center h-full w-full p-6 rounded-2xl border-2 border-yellow-400 shadow-md transition-all duration-200 hover:shadow-2xl cursor-pointer relative overflow-hidden hover:scale-105 transition-transform" style={backgroundStyle}>
        <div className="absolute top-4 right-4 z-10">
          <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 shadow-lg border border-yellow-300">
            <Crown className="w-5 h-5 text-white" />
          </span>
        </div>
        <div className="z-10 w-full flex flex-col items-center">
          <Avatar className="w-16 h-16 border-4 border-white shadow-lg -mt-8">
            <AvatarImage src={user.profilePictureUrl || '/avatar-default.png'} alt={user.name} />
            <AvatarFallback className="text-xl font-bold">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="mt-2 font-bold text-lg text-center text-white drop-shadow">{user.name}</h3>
          <p className="text-sm text-indigo-100 text-center drop-shadow">{user.category}</p>
          {user.location?.city && (
            <p className="text-xs text-indigo-100 flex items-center gap-1 mt-1 drop-shadow">
              <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.104 0 2-.896 2-2s-.896-2-2-2-2 .896-2 2 .896 2 2 2zm0 0c-4 0-7 2.239-7 5v2h14v-2c0-2.761-3-5-7-5z" /></svg>
              {user.location.city}{user.location.state ? `, ${user.location.state}` : ''}
            </p>
          )}
          {user.services && user.services.length > 0 && (
            <div className="mt-2 text-xs text-center text-white font-semibold bg-indigo-600/80 px-2 py-1 rounded-full drop-shadow">
              {user.services[0].name}
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default AdvancedSearchResultCard; 