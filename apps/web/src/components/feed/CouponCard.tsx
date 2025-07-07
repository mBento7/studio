import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Calendar, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CouponCardProps {
  user?: {
    name?: string;
    username?: string;
    avatarUrl?: string;
  };
  publishedAt: string; // ISO string
  discount: string;
  code: string;
  description: string;
  validUntil: string; // ISO string
  brand: string;
  onCopy?: () => void;
  isExpired?: boolean;
}

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h`;
  return `${Math.floor(diff / 86400)}d`;
}

const CouponCard: React.FC<CouponCardProps> = ({
  user,
  publishedAt,
  discount,
  code,
  description,
  validUntil,
  brand,
  onCopy,
  isExpired = false,
}) => {
  const [copied, setCopied] = useState(false);
  const expired = isExpired || new Date(validUntil) < new Date();

  // Fallbacks para user
  const avatarUrl = user?.avatarUrl || '/avatar-default.png';
  const name = user?.name || 'Usuário';
  const username = user?.username || 'usuario';

  // Se user não existir, renderiza null
  if (!user) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'w-full max-w-xl mx-auto rounded-2xl p-4',
        'bg-[#19171d] border border-[#2a2730] shadow-lg', // dark default
        'bg-white border-gray-200 shadow-lg dark:bg-[#19171d] dark:border-[#2a2730]', // light/dark
        expired && 'opacity-60 grayscale pointer-events-none',
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <img
          src={avatarUrl}
          alt={name}
          className="w-9 h-9 rounded-full object-cover border border-[#2a2730] dark:border-[#2a2730] border-gray-200"
        />
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900 dark:text-white leading-tight">{name}</span>
          <span className="text-xs text-gray-500 dark:text-[#b0aeb8] leading-tight">@{username}</span>
        </div>
        <span className="text-xs text-gray-400 dark:text-[#b0aeb8] ml-2">• {timeAgo(publishedAt)}</span>
        <div className="ml-auto">
          <button className="p-1 rounded hover:bg-gray-100 dark:hover:bg-[#23212a]">
            <MoreHorizontal size={18} className="text-gray-400 dark:text-[#b0aeb8]" />
          </button>
        </div>
      </div>

      {/* Badge */}
      <div className="flex items-center gap-2 mb-2">
        <Gift className="w-4 h-4 text-orange-500" />
        <Badge className="bg-orange-600 text-white px-2 py-1 text-xs rounded dark:bg-orange-600 dark:text-white">Cupom de Desconto</Badge>
      </div>

      {/* Cupom Card Central */}
      <div className="bg-gray-100 dark:bg-[#23212a] border-2 border-dashed border-orange-500 dark:border-orange-500 rounded-xl px-6 py-6 text-center mb-3">
        <div className="text-3xl font-bold text-orange-600 mb-2">{discount}</div>
        <div className="flex justify-center items-center gap-2 mb-2">
          <span className="bg-gray-200 dark:bg-[#35323c] text-gray-900 dark:text-white px-3 py-1 rounded font-mono tracking-wider text-base select-all">
            {code}
          </span>
          <Button
            onClick={handleCopy}
            variant="ghost"
            size="sm"
            className="text-orange-500 border border-orange-500 hover:bg-orange-500/10 px-2 py-1 bg-white dark:bg-[#23212a] dark:border-orange-500"
            disabled={expired}
          >
            {copied ? 'Copiado!' : 'Copiar'}
          </Button>
        </div>
        <div className="text-gray-600 dark:text-[#b0aeb8] text-sm mb-1">{description}</div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-[#b0aeb8]">
          <Calendar size={14} className="mr-1" />
          Válido até: {new Date(validUntil).toLocaleDateString('pt-BR')}
        </div>
        <span className="text-xs text-gray-900 dark:text-white font-semibold">{brand}</span>
      </div>

      {/* Status Expirado */}
      {expired && (
        <div className="mt-2 text-center text-xs text-red-500 font-bold">Cupom expirado</div>
      )}
    </motion.div>
  );
};

export default CouponCard; 