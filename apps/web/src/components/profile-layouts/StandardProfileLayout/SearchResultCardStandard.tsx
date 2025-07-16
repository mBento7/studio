"use client";

import React from "react";
import Link from "next/link";
import type { UserProfile } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Medal, MapPin } from "lucide-react";

interface SearchResultCardStandardProps {
  user: UserProfile;
}

const SearchResultCardStandard: React.FC<SearchResultCardStandardProps> = ({ user }) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Link href={`/${user.username}`} className="block group h-full w-full">
      <Card className="relative flex flex-col items-center justify-start overflow-hidden rounded-2xl border border-blue-500 dark:border-blue-900/60 bg-white dark:bg-[#23272f] shadow-lg shadow-black/30 hover:shadow-xl hover:scale-[1.015] transition-all duration-300 min-h-[300px] text-slate-900 dark:text-slate-200">

        {/* Capa com overlay suave */}
        <div className="w-full h-24 relative">
          <div className="absolute inset-0 bg-blue-500/20 z-10" />
          {user.cover_photo_url ? (
            <img
              src={user.cover_photo_url}
              alt="Capa do usuário"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600" />
          )}
        </div>

        {/* Medalha Standard */}
        <div className="absolute top-3 right-3 z-20">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md border border-blue-300">
            <Medal className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Avatar centralizado */}
        <div className="relative -mt-12 z-20">
          <Avatar className="w-24 h-24 border-4 border-white shadow-md transition-transform group-hover:scale-105">
            <AvatarImage src={user.profile_picture_url || "/avatar-default.png"} alt={user.name} />
            <AvatarFallback className="text-xl font-bold">{initials}</AvatarFallback>
          </Avatar>
        </div>

        {/* Informações do usuário */}
        <div className="w-full px-4 pt-4 pb-6 flex flex-col items-center text-center">
          <h3 className="text-lg font-bold text-slate-900 truncate w-full">
            {user.name}
          </h3>
          <p className="text-sm font-medium text-blue-700 mt-1 truncate w-full">
            {user.category}
          </p>

          {user.location?.city && (
            <p className="flex items-center gap-1 text-xs text-blue-900 mt-2">
              <MapPin className="w-4 h-4" />
              {user.location.city}
              {user.location.state ? `, ${user.location.state}` : ""}
            </p>
          )}

          {user.services?.[0] && (
            <div className="mt-3 px-3 py-1 text-xs bg-blue-100 text-blue-800 rounded-full font-semibold shadow-sm">
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

export default SearchResultCardStandard;
