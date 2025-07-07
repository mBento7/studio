import React from "react";
import { Button } from "@/components/ui/button";
import { Heart, Share2, Bookmark, X, MoreVertical } from "lucide-react";

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
  story: {
    id: string;
    user: {
      name: string;
      avatarUrl: string;
      username: string;
    };
    mediaUrl: string;
    type: "image" | "video";
    timeLeft: number;
    liked: boolean;
    description?: string;
    time?: string;
  };
  onPrev: () => void;
  onNext: () => void;
  onUserAction?: () => void;
  progress?: number;
}

const StoryModal: React.FC<StoryModalProps> = ({ open, onClose, story, onPrev, onNext, onUserAction }) => {
  if (!open) return null;
  const [liked, setLiked] = React.useState(story.liked);
  const [message, setMessage] = React.useState("");
  // Handler para pausar ao interagir
  const handleUserAction = () => {
    if (onUserAction) onUserAction();
  };
  const handleSend = () => {
    if (message.trim()) {
      // Aqui você pode integrar com o chat do usuário
      setMessage("");
    }
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={handleUserAction}
      onKeyDown={handleUserAction}
      onClick={handleUserAction}
    >
      <div className="relative w-full max-w-md mx-auto bg-card rounded-xl shadow p-2 flex flex-col min-h-[500px] sm:min-h-[600px]">
        {/* Botão fechar e menu de opções no topo direito */}
        <div className="absolute top-2 right-2 flex gap-2 z-10">
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Fechar"><X className="w-5 h-5" /></Button>
          <Button variant="ghost" size="icon" aria-label="Opções"><MoreVertical className="w-5 h-5" /></Button>
        </div>
        {/* Imagem ou vídeo */}
        <div className="w-full relative">
          {story.type === "image" ? (
            <img src={story.mediaUrl} alt="story" className="rounded-xl w-full max-h-72 object-cover" />
          ) : (
            <video src={story.mediaUrl} controls className="rounded-xl w-full max-h-72 object-cover" />
          )}
          {/* Navegação entre stories */}
          <button
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-card/80 border border-border rounded-full p-2 shadow-md hover:bg-primary/10 transition focus:ring-2 focus:ring-primary z-10"
            onClick={e => { e.stopPropagation(); onPrev(); handleUserAction(); }}
            aria-label="Anterior"
          >
            &lt;
          </button>
          <button
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-card/80 border border-border rounded-full p-2 shadow-md hover:bg-primary/10 transition focus:ring-2 focus:ring-primary z-10"
            onClick={e => { e.stopPropagation(); onNext(); handleUserAction(); }}
            aria-label="Próximo"
          >
            &gt;
          </button>
        </div>
        {/* Linha com avatar, nome e horário */}
        <div className="flex items-center justify-between mt-3 px-2">
          <div className="flex items-center gap-2">
            <img src={story.user.avatarUrl} alt={story.user.name} className="w-8 h-8 rounded-full border border-border" />
            <span className="font-semibold text-base">{story.user.name}</span>
          </div>
          <span className="text-xs text-muted-foreground">{story.time || "agora"}</span>
        </div>
        {/* Descrição, se houver */}
        {story.description && (
          <p className="mt-1 text-sm text-foreground line-clamp-3 px-2">{story.description}</p>
        )}
        {/* Linha de botões de ação, centralizada e espaçada */}
        <div className="flex justify-center gap-6 mt-4 mb-2 px-2">
          <Button variant="ghost" size="icon" aria-label="Curtir" onClick={() => setLiked(!liked)}>
            <Heart className={`w-7 h-7 transition ${liked ? "text-red-500 fill-red-500 scale-110" : "hover:text-red-500"}`} />
          </Button>
          <Button variant="ghost" size="icon" aria-label="Compartilhar"><Share2 className="w-7 h-7" /></Button>
          <Button variant="ghost" size="icon" aria-label="Salvar"><Bookmark className="w-7 h-7" /></Button>
        </div>
        {/* Input de mensagem direta */}
        <div className="flex items-center gap-2 px-2 pb-2">
          <input
            type="text"
            placeholder={`Enviar mensagem para @${story.user.username}`}
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="flex-1 min-w-0 bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none transition"
            onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          />
          <Button
            className={message.trim() ? "bg-primary text-primary-foreground px-4 py-2 text-sm" : "bg-muted text-muted-foreground px-4 py-2 text-sm cursor-not-allowed"}
            size="sm"
            disabled={!message.trim()}
            onClick={handleSend}
            aria-label="Enviar mensagem"
          >
            Enviar
          </Button>
        </div>
      </div>
      {/* Fechar ao clicar fora */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </div>
  );
};

export default StoryModal; 