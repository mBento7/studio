import React from 'react';
import { Card } from '../ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import { Button } from '../ui/button';
import { Gift, Clock, ExternalLink, Tag } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from '../common/logo';

interface CuponFeedCardProps {
  user: {
    name: string;
    username: string;
    avatarUrl?: string;
  };
  benefit: string; // Ex: "10% OFF"
  description: string;
  publishedAt: string; // ISO string
}

// Substituir a função timeAgo por:
import { timeAgo } from "@/lib/date-utils";

// Remover a função timeAgo definida localmente

const CuponFeedCard: React.FC<CuponFeedCardProps> = ({ user, benefit, description, publishedAt }) => {
  const router = useRouter();
  const avatarUrl = user.avatarUrl || '/avatar-default.png';

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 16px rgba(0,0,0,0.1)' }}
      className="w-full max-w-2xl mx-auto mb-4"
    >
      <Card className="w-full p-4 bg-gradient-to-br from-yellow-50 via-yellow-100 to-white border-yellow-200 rounded-2xl shadow-md overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-200/30 rounded-full -translate-y-16 translate-x-16 pointer-events-none" />
        {/* Logo no canto inferior direito */}
        <Logo className="absolute right-4 bottom-4 w-32 h-32 opacity-20 pointer-events-none select-none" />
        <div className="relative flex flex-col md:flex-row items-start gap-4">
          {/* Avatar + Header Section */}
          <div className="flex-shrink-0 flex flex-col items-start">
            <div className="flex items-center gap-2 mb-1">
              <Avatar className="w-9 h-9 border-2 border-white shadow">
                <AvatarImage src={avatarUrl} alt={user.name} />
                <AvatarFallback className="bg-yellow-100 text-yellow-700">{user.name[0]}</AvatarFallback>
              </Avatar>
              <span className="font-bold text-black text-base leading-tight">{user.name}</span>
              <span className="text-gray-700 text-sm">@{user.username}</span>
              <span className="flex items-center text-xs text-gray-500 gap-1"><Clock className="w-3 h-3" />{timeAgo(publishedAt)}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-800 font-semibold uppercase tracking-wide mt-1">
              <Tag className="w-4 h-4 text-gray-700" />
              CUPOM DE DESCONTO
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 space-y-2 mt-2 md:mt-0">
            <div className="flex items-center gap-2 mb-1">
              <div className="p-1.5 bg-yellow-100 rounded-full">
                <Gift className="w-5 h-5 text-yellow-600" />
              </div>
              <span className="font-bold text-yellow-800 text-lg">Cupom Exclusivo!</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-gray-900">{benefit}</span>
                <span className="text-sm text-gray-500 line-through">R$ 100</span>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-3">
              <Button
                size="sm"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full px-4 py-1.5 shadow-sm flex items-center gap-1"
                onClick={() => router.push(`/profile/${user.username}`)}
              >
                <span>Ver código</span>
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default CuponFeedCard;