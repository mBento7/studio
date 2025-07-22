'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProfileBgProps {
  className?: string;
  children?: React.ReactNode;
}

export const ProfileBg: React.FC<ProfileBgProps> = ({ className, children }) => {
  return (
    <div
      className={cn(
        'relative w-full h-32 rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg overflow-hidden flex items-center justify-center',
        className
      )}
    >
      {children}
    </div>
  );
};
