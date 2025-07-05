import React, { useState } from "react";
import { Button } from "@/components/ui/button";

interface StoryActionsProps {
  story: {
    user: {
      username: string;
    };
    liked: boolean;
  };
  onUserAction?: () => void;
}

const StoryActions: React.FC<StoryActionsProps> = ({ story, onUserAction }) => {
  const [liked, setLiked] = useState(story.liked);
  const [message, setMessage] = useState("");
  const handleAction = () => { if (onUserAction) onUserAction(); };
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-t border-border bg-card">
      <Button variant="ghost" size="icon" aria-label="Curtir" onClick={() => { setLiked(!liked); handleAction(); }} className={liked ? "text-red-500 animate-pulse" : "text-muted-foreground hover:text-red-500"}>
        <span style={{ fontSize: 28 }}>{liked ? "❤️" : "🤍"}</span>
      </Button>
      {/* Campo de resposta rápida */}
      <input
        type="text"
        placeholder="Responder..."
        value={message}
        onChange={e => { setMessage(e.target.value); handleAction(); }}
        className="flex-1 min-w-0 bg-background border border-border rounded px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none transition"
      />
      <Button
        className={
          message.trim()
            ? "bg-primary text-primary-foreground px-4 py-2 text-sm"
            : "bg-muted text-muted-foreground px-4 py-2 text-sm cursor-not-allowed"
        }
        size="sm"
        disabled={!message.trim()}
        onClick={handleAction}
      >
        Enviar
      </Button>
    </div>
  );
};

export default StoryActions; 