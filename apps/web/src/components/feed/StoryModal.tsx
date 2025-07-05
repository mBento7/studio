import React from "react";
import StoryHeader from "./StoryHeader";
import StoryActions from "./StoryActions";

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
  };
  onPrev: () => void;
  onNext: () => void;
  onUserAction?: () => void;
  progress?: number;
}

const StoryModal: React.FC<StoryModalProps> = ({ open, onClose, story, onPrev, onNext, onUserAction, progress }) => {
  if (!open) return null;
  // Handler para pausar ao interagir
  const handleUserAction = () => {
    if (onUserAction) onUserAction();
  };
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onMouseDown={handleUserAction}
      onKeyDown={handleUserAction}
      onClick={handleUserAction}
    >
      <div className="relative w-full max-w-md mx-auto bg-card rounded-xl border border-border shadow-2xl overflow-hidden p-0 flex flex-col min-h-[500px] sm:min-h-[600px]">
        <StoryHeader story={story} onClose={onClose} onUserAction={handleUserAction} progress={progress} />
        <div className="flex flex-col items-center justify-center p-0 min-h-[320px] bg-background">
          {story.type === "image" ? (
            <img src={story.mediaUrl} alt="story" className="max-h-96 w-full object-contain rounded-none" />
          ) : (
            <video src={story.mediaUrl} controls className="max-h-96 w-full object-contain rounded-none" />
          )}
        </div>
        <StoryActions story={story} onUserAction={handleUserAction} />
        {/* Navegação entre stories - botões maiores, mais contraste, rounded-full, sombra, hover, foco */}
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-card border border-border rounded-full p-3 shadow-md hover:bg-primary/10 transition focus:ring-2 focus:ring-primary"
          onClick={e => { onPrev(); handleUserAction(); }}
          aria-label="Anterior"
        >
          &lt;
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-card border border-border rounded-full p-3 shadow-md hover:bg-primary/10 transition focus:ring-2 focus:ring-primary"
          onClick={e => { onNext(); handleUserAction(); }}
          aria-label="Próximo"
        >
          &gt;
        </button>
      </div>
      {/* Fechar ao clicar fora */}
      <div className="fixed inset-0 z-40" onClick={onClose} />
    </div>
  );
};

export default StoryModal; 