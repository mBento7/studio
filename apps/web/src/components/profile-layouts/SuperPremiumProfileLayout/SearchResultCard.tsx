import React from "react";
import type { UserProfile } from "@/lib/types";
import { Sparkles } from "lucide-react";

interface SearchResultCardProps {
  user: UserProfile;
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({ user }) => {
  const avatarUrl = user.profile_picture_url || (user as any).profilePictureUrl || '/avatar-default.png';
  return (
    <a
      href={`/profile/${user.username}`}
      className="block group focus:outline-none focus:ring-2 focus:ring-pink-400 rounded-lg transition"
      tabIndex={0}
    >
      <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-700 via-fuchsia-700 to-slate-800 rounded-lg shadow-xl hover:shadow-2xl transition border-2 border-pink-400 relative overflow-hidden group-hover:scale-[1.03] group-active:scale-95 cursor-pointer">
        {/* Selo premium */}
        <span className="absolute top-2 right-2 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-xs font-bold shadow-md z-10 flex items-center gap-1">
          <Sparkles className="w-4 h-4" /> Super Premium
        </span>
        <img
          src={avatarUrl}
          alt={user.name}
          className="w-16 h-16 rounded-full object-cover border-2 border-pink-400 shadow-md"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold text-white drop-shadow">{user.name}</h3>
          <p className="text-sm text-pink-200">@{user.username}</p>
          <p className="text-xs text-fuchsia-100 mt-1 line-clamp-2">{user.bio}</p>
        </div>
      </div>
    </a>
  );
};

export default SearchResultCard; 