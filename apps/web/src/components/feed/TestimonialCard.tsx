'use client';

import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Award, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

// Types necessários para o componente
interface User {
  name: string;
  username?: string;
  avatar: string;
  verified?: boolean;
}

interface Engagement {
  likes: number;
  comments: number;
  shares: number;
  views?: number;
  saves?: number;
}

interface TestimonialPost {
  id: string;
  type: 'testimonial';
  user: User;
  rating: number;
  comment: string;
  service: string;
  serviceProvider: User;
  engagement: Engagement;
  timeAgo: string;
}

const TestimonialCard = ({ post }: { post: TestimonialPost }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="overflow-hidden border-0 shadow-lg
      bg-gradient-to-br from-blue-50 to-indigo-50
      dark:from-slate-800/40 dark:to-indigo-900/20
      dark:border dark:border-slate-700/50
      dark:shadow-2xl dark:shadow-black/25">
      <PostHeader
        user={post.user}
        timeAgo={post.timeAgo}
        type={post.type}
        onMore={() => console.log('More options')}
      />

      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 mb-3">
          <Award className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-muted-foreground">Avaliação do serviço</span>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={cn(
                'w-4 h-4',
                i < post.rating ? 'text-yellow-500 fill-current' : 'text-gray-300'
              )}
            />
          ))}
          <span className="ml-2 text-sm font-medium">{post.rating}/5</span>
        </div>

        <blockquote className="text-foreground mb-4 italic">
          "{post.comment}"
        </blockquote>

        <div className="flex items-center gap-3 p-3 bg-white/50 dark:bg-gray-800/50 rounded-lg">
          <Avatar className="w-8 h-8">
            <AvatarImage src={post.serviceProvider.avatar} alt={post.serviceProvider.name} />
            <AvatarFallback>{post.serviceProvider.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">{post.service}</p>
            <p className="text-xs text-muted-foreground">por {post.serviceProvider.name}</p>
          </div>
        </div>
      </div>
    </Card>
  </motion.div>
);

// Componente PostHeader local
const PostHeader = ({ user, timeAgo, type, onMore }: {
  user: User;
  timeAgo: string;
  type: string;
  onMore: () => void;
}) => (
  <div className="flex items-center justify-between p-4 pb-2">
    <div className="flex items-center gap-3">
      <div className="relative">
        <Avatar className="w-12 h-12 ring-2 ring-white shadow-lg">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-semibold">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        {user.verified && (
          <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-foreground text-sm">{user.name}</h3>
          {type === 'sponsored' && (
            <span className="bg-gray-200 text-xs px-2 py-0.5 rounded">Patrocinado</span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>@{user.username || user.name.toLowerCase().replace(' ', '')}</span>
          <span>•</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </div>
    <button type="button" onClick={onMore} className="h-8 w-8 flex items-center justify-center text-muted-foreground hover:text-foreground">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
    </button>
  </div>
);

export default TestimonialCard;
