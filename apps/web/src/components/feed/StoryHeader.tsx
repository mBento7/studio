import React, { useState, useEffect, useRef } from 'react';
import StoryOptionsMenu from './StoryOptionsMenu';
import { Button } from '@/components/ui/button';

interface StoryHeaderProps {
  story: {
    user: {
      name: string;
      avatarUrl: string;
      username: string;
    };
    timeLeft: number;
  };
  onClose: () => void;
  onUserAction?: () => void;
  progress?: number; // 0-100, para animar a barra
}

const StoryHeader: React.FC<StoryHeaderProps> = ({ story, onClose, onUserAction, progress }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleAction = () => { if (onUserAction) onUserAction(); };

  // Barra animada: se progress não for passado, usa timeLeft como fallback
  const barProgress = typeof progress === 'number' ? progress : story.timeLeft;
  const prevProgress = useRef(barProgress);

  // Só anima se progress aumentar
  const transition = barProgress > prevProgress.current ? 'width 5s linear' : 'none';
  useEffect(() => { prevProgress.current = barProgress; }, [barProgress]);

  return (
    <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-border bg-card">
      <div className="flex items-center gap-2">
        <img src={story.user.avatarUrl} alt={story.user.name} className="w-8 h-8 rounded-full border border-border" />
        <div>
          <a href={`/${story.user.username}`} className="font-semibold text-foreground hover:underline focus:underline outline-none" onClick={handleAction}>{story.user.name}</a>
          <span className="text-xs text-muted-foreground ml-2">@{story.user.username}</span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Barra de tempo animada */}
        <div className="w-28 h-2 bg-primary/30 rounded-full overflow-hidden mr-2">
          <div
            className="h-2 bg-primary"
            style={{
              width: `${barProgress}%`,
              transition
            }}
          />
        </div>
        {/* Menu três pontos */}
        <Button variant="ghost" size="icon" onClick={() => { setMenuOpen(!menuOpen); handleAction(); }} aria-label="Opções">
          <span className="text-xl">⋮</span>
        </Button>
        {menuOpen && <StoryOptionsMenu onClose={() => { setMenuOpen(false); handleAction(); }} />}
        {/* Botão fechar */}
        <Button variant="ghost" size="icon" onClick={() => { onClose(); handleAction(); }} aria-label="Fechar">
          ✕
        </Button>
      </div>
    </div>
  );
};

export default StoryHeader;
