import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Clock, Check, Copy, Tag, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import { supabase } from '@/lib/supabase/client';
import { useAuth } from '@/hooks/use-auth';

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
  regulation?: string; // Novo campo opcional
  onCopy?: () => void;
  isExpired?: boolean;
  likesCount?: number; // Novo campo opcional
  onLike?: (liked: boolean) => void; // Callback opcional para integração backend
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
  regulation, // Novo campo
  onCopy,
  isExpired = false,
  likesCount = 0,
  onLike,
}) => {
  const [copied, setCopied] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const expired = isExpired || new Date(validUntil) < new Date();
  const { user: currentUser } = useAuth();
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [likeAnimation, setLikeAnimation] = useState(false);
  const [loadingLike, setLoadingLike] = useState(false);

  // Fallbacks para user
  const avatarUrl = user?.avatarUrl || '/avatar-default.png';
  const name = user?.name || 'Usuário';
  const username = user?.username || 'usuario';

  // Se user não existir, renderiza null
  if (!user) return null;

  // Buscar likes e status do usuário ao montar
  useEffect(() => {
    async function fetchLikeData() {
      // Total de likes
      const { count } = await supabase
        .from('coupon_likes')
        .select('*', { count: 'exact', head: true })
        .eq('coupon_code', code);
      setLikes(count || 0);
      // Se usuário logado, buscar se já curtiu
      if (currentUser?.id) {
        const { data } = await supabase
          .from('coupon_likes')
          .select('id')
          .eq('coupon_code', code)
          .eq('user_id', currentUser.id)
          .single();
        setLiked(!!data);
      } else {
        setLiked(false);
      }
    }
    fetchLikeData();
  }, [code, currentUser?.id]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    if (onCopy) onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = async () => {
    if (!currentUser?.id || loadingLike) return;
    setLoadingLike(true);
    setLikeAnimation(true);
    if (!liked) {
      // Adiciona like
      const { error } = await supabase
        .from('coupon_likes')
        .insert({ coupon_code: code, user_id: currentUser.id });
      if (!error) {
        setLikes(likes + 1);
        setLiked(true);
      }
    } else {
      // Remove like
      const { error } = await supabase
        .from('coupon_likes')
        .delete()
        .eq('coupon_code', code)
        .eq('user_id', currentUser.id);
      if (!error) {
        setLikes(likes - 1);
        setLiked(false);
      }
    }
    setTimeout(() => setLikeAnimation(false), 400);
    setLoadingLike(false);
  };

  const formattedDate = new Date(validUntil).toLocaleDateString('pt-BR');
  const profileUrl = `/profile/${username}`;
  const validadeFormatada = validUntil ? new Date(validUntil).toLocaleDateString('pt-BR') : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl border border-black/5 dark:border-white/10 bg-card
        ${expired ? 'opacity-60 grayscale pointer-events-none' : ''}`}
    >
      {/* Efeito visual de destaque animado no fundo */}
      <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-pulse opacity-100"></div>
      {/* Recortes laterais (ticket) - círculos realmente vazados usando SVG */}
      <svg
        className="pointer-events-none absolute inset-0 w-full h-full z-40 text-card"
        style={{ mixBlendMode: 'destination-out' } as any}
        width="100%"
        height="100%"
      >
        <circle cx="0" cy="50%" r="20" fill="currentColor" />
        <circle cx="100%" cy="50%" r="20" fill="currentColor" />
      </svg>

      {/* Fundo amarelo sólido */}
      <div className="absolute inset-0 bg-yellow-400" />

      {/* Marca d'água do logo WhosDo acima do fundo amarelo */}
      <div
        className="absolute inset-0 flex items-start justify-center opacity-20 pointer-events-none z-10"
        style={{ marginTop: '-14px', marginLeft: '80px' }}
        aria-hidden="true"
      >
        <Logo className="w-60 h-60 text-accent" />
      </div>

      {/* QR + Copiar dentro da "fatia" entre a linha pontilhada e a borda */}
      <div className="absolute top-6 bottom-20 right-6 z-30 w-24 flex flex-col justify-between items-center">
        {/* QR code no topo da fatia */}
        <div className="mb-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=64x64&data=${encodeURIComponent(profileUrl)}`}
            alt="QR Code do perfil do usuário"
            className="w-16 h-16 bg-white rounded-md p-1 shadow"
          />
        </div>
        {/* Botão Copiar alinhado à altura do input de código */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={handleCopy}
              variant="secondary"
              size="sm"
              className="bg-accent text-blue-600 hover:text-blue-700 hover:bg-accent/90 shadow-sm rounded-lg flex items-center justify-center w-10 h-10 p-0 font-semibold"
              aria-label="Copiar código do cupom"
            >
              {copied ? <Check className="w-5 h-5 text-blue-600" /> : <Copy className="w-5 h-5 text-blue-600" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left" align="center">
            Copiar código
          </TooltipContent>
        </Tooltip>
        {copied && (
          <span className="mt-1 text-xs text-accent-foreground font-semibold animate-fade-in">Copiado!</span>
        )}
      </div>

      {/* Linha pontilhada vertical estilo ticket - ocupa toda a altura do cupom, à esquerda dos elementos da direita */}
      <div className="absolute top-0 bottom-0 right-[130px] z-30 flex flex-col items-center justify-center h-full pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <span key={i} className="w-2 h-2 rounded-full my-1 bg-card" />
        ))}
      </div>

      {/* Header com perfil e cabeçalho do cupom */}
      <div className="relative px-6 pt-6 pb-2 flex flex-col gap-2">
        <div className="flex items-center gap-3 cursor-pointer" tabIndex={0} onClick={() => window.open(`/profile/${username}`, '_blank')}>
          <img 
            src={avatarUrl} 
            alt={`Foto de perfil de ${name}`} 
            className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
          />
          <div>
            <div className="font-bold text-black text-lg">{name}</div>
            <div className="text-xs text-gray-600 flex items-center gap-1">
              <span>@{username}</span>
              <span>•</span>
              <Clock className="w-3 h-3" />
              <span>{timeAgo(publishedAt)}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Tag className="w-4 h-4 text-gray-700" />
          <span className="text-xs font-medium text-gray-700 uppercase">
            Cupom Whosfy{validadeFormatada ? ` - Válido até ${validadeFormatada}` : ''}
          </span>
        </div>
      </div>

      {/* Layout da coluna esquerda (conteúdo principal) */}
      <div className="relative w-full px-6 pb-4">
        {/* Conteúdo da coluna esquerda */}
        <div className="flex flex-col justify-center pr-[120px] pl-8 gap-3">
          <div className="text-2xl font-bold text-black tracking-tight leading-none">
            {discount}
          </div>
          <div className="text-black text-base leading-relaxed">
            {description}
          </div>
          {/* Campo do código do cupom */}
          <div className="w-full mt-2">
            <span className="bg-white/90 px-4 py-2 rounded-lg font-mono text-lg font-bold tracking-wide text-center truncate block w-full text-black">
              {code}
            </span>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="relative bg-white/90 px-6 py-3 flex items-center justify-between gap-2">
        <button
          className={
            'flex items-center gap-1 font-semibold text-base focus:outline-none select-none text-red-600 hover:text-red-700'
          }
          aria-label={liked ? 'Descurtir' : 'Gostei'}
          type="button"
          onClick={handleLike}
          disabled={loadingLike || !currentUser?.id}
        >
          <motion.span
            animate={likeAnimation ? { scale: [1, 1.4, 1] } : { scale: 1 }}
            transition={{ duration: 0.4 }}
            className="flex"
          >
            {liked ? (
              <Heart className="w-5 h-5 fill-red-600 text-red-600" />
            ) : (
              <Heart className="w-5 h-5 text-red-600" />
            )}
          </motion.span>
          <motion.span
            key={likes}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="ml-1 text-red-600"
          >
            {likes}
          </motion.span>
        </button>
        <button
          className="text-sm text-gray-700 hover:underline"
          onClick={() => setShowModal(true)}
          aria-label="Ver detalhes do cupom"
          type="button"
        >
          Ver detalhes
        </button>
        {/* Removido aviso legal do rodapé do card */}
      </div>

      {/* Modal de detalhes */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
              onClick={() => setShowModal(false)}
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-2">Detalhes do Cupom</h2>
            <ul className="text-gray-700 text-sm space-y-2 mb-4">
              <li><b>Código:</b> {code}</li>
              <li><b>Desconto:</b> {discount}</li>
              <li><b>Descrição:</b> {description}</li>
              <li><b>Marca:</b> {brand}</li>
              <li><b>Validade:</b> {formattedDate}</li>
              {regulation && (
                <li>
                  <b>Regulamento:</b>{' '}
                  {regulation.startsWith('http') ? (
                    <a
                      href={regulation}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline font-medium"
                    >
                      Consulte o regulamento
                    </a>
                  ) : (
                    regulation
                  )}
                </li>
              )}
            </ul>
            <div className="text-xs text-gray-500 mt-2">
              * Sujeito a regras e condições. Consulte o regulamento.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CouponCard; 