import React from 'react';
import { MessageSquare, Calendar, User } from 'lucide-react';

interface PostItem {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  date: string;
  comments: number;
  tag: string;
  type: 'highlight' | 'standard';
}

interface HeroMagazineGridProps {
  posts: PostItem[];
}

const tagColors: Record<string, string> = {
  RECENTE: 'bg-pink-600',
  EVENTO: 'bg-orange-500',
  VÍDEO: 'bg-blue-600',
  DICA: 'bg-green-600',
};

export default function HeroMagazineGrid({ posts = [] }: HeroMagazineGridProps) {
  const mainPost = posts[0];
  const secondaryPosts = posts.slice(1, 3);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <div
          key={post.id}
          className={`relative overflow-hidden rounded-lg shadow-lg group transition-all duration-300 ease-in-out cursor-pointer hover:scale-[1.03] hover:shadow-2xl ${
            index === 0 ? 'md:col-span-2 h-[400px]' : 'h-[250px]'
          }`}
          style={{
            backgroundImage: `url(${post.imageUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Hover overlay effect */}
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
          
          {/* Background image with zoom effect */}
          <div 
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage: `url(${post.imageUrl})`,
            }}
          ></div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 p-4 flex flex-col justify-end">
            {/* Tag */}
            <div className="absolute top-4 left-4">
              <span
                className={`text-xs px-2 py-1 text-white rounded-full shadow font-medium ${tagColors[post.tag] || 'bg-gray-500'}`}
              >
                {post.tag}
              </span>
            </div>

            {/* Content */}
            <div className="transform translate-y-0 group-hover:-translate-y-1 transition-transform duration-300">
              <h2 className="text-white text-xl font-bold leading-tight mb-2 drop-shadow-lg group-hover:text-gray-100 transition-colors duration-300">
                {post.title}
              </h2>
              <p className="text-white text-sm opacity-80 line-clamp-2 mb-3 group-hover:opacity-90 transition-opacity duration-300">
                {post.excerpt}
              </p>
              
              {/* Meta information */}
              <div className="flex items-center text-white/70 text-xs gap-4 group-hover:text-white/80 transition-colors duration-300">
                <div className="flex items-center gap-1">
                  <User size={14} />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare size={14} />
                  <span>{post.comments}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 