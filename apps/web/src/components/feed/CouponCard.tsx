import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Clock, Check, Copy, Tag, Heart, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/logo';

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
  const [showModal, setShowModal] = useState(false);
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

  const formattedDate = new Date(validUntil).toLocaleDateString('pt-BR');
  const profileUrl = `https://seusite.com/profile/${username}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl border border-black/5 dark:border-white/10 bg-card
        ${expired ? 'opacity-60 grayscale pointer-events-none' : ''}`}
    >
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
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(profileUrl)}`}
            alt="QR Code do perfil do usuário"
            className="w-20 h-20 md:w-32 md:h-32 bg-white rounded-md p-1 shadow"
          />
        </div>
        {/* Botão Copiar alinhado à altura do input de código */}
        <Button
          onClick={handleCopy}
          variant="secondary"
          size="sm"
          className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm rounded-lg flex items-center justify-center w-10 h-10 p-0 font-semibold"
          aria-label="Copiar código do cupom"
        >
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
        </Button>
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
            Cupom de Desconto
          </span>
        </div>
      </div>

      {/* Layout da coluna esquerda (conteúdo principal) */}
      <div className="relative w-full px-6 pb-4">
        {/* Conteúdo da coluna esquerda */}
        <div className="flex flex-col justify-center pr-[120px] gap-3">
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
          className="flex items-center gap-1 text-pink-600 hover:text-pink-700 font-semibold text-base focus:outline-none"
          aria-label="Gostei"
          type="button"
        >
          <Heart className="w-5 h-5 fill-pink-600" />
          <span>12</span>
        </button>
        <button
          className="text-sm text-gray-700 hover:underline"
          onClick={() => setShowModal(true)}
          aria-label="Ver detalhes do cupom"
          type="button"
        >
          Ver detalhes
        </button>
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
              {/* Adicione mais regras ou restrições aqui */}
            </ul>
            <div className="text-xs text-gray-500">
              * Sujeito a regras e condições. Consulte o regulamento da promoção.
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default CouponCard; 