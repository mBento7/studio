import React, { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { X, ChevronLeft, ChevronRight, Heart, Volume2, MessageCircle, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { StoryProgressBar } from "./StoryProgressBar";
import { motion } from "framer-motion";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';

interface StoryModalProps {
  open: boolean;
  onClose: () => void;
  story: {
    user: { name: string; username: string; avatarUrl: string };
    mediaUrl: string;
    description?: string;
    type: "image" | "video";
    time: string;
    liked: boolean;
  };
  onPrev?: () => void;
  onNext?: () => void;
}

const StoryModal: React.FC<StoryModalProps> = ({ open, onClose, story, onPrev, onNext }) => {
  const [liked, setLiked] = useState(story.liked);
  const [message, setMessage] = useState("");
  const [showHeart, setShowHeart] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastTap = useRef(0);

  useEffect(() => {
    const video = document.getElementById("story-video") as HTMLVideoElement | null;
    if (video && open && story.type === "video") video.play().catch(() => {});
    return () => video?.pause();
  }, [open, story.type]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setMessage("");
      if (inputRef.current) inputRef.current.blur();
    }
  };

  // Double tap/click para like
  const handleDoubleTap = () => {
    setLiked((prev) => !prev);
    setShowHeart(true);
    setTimeout(() => setShowHeart(false), 700);
  };
  const handleTouchEnd = () => {
    const now = Date.now();
    if (now - lastTap.current < 300) {
      setLiked((prev) => !prev);
      setShowHeart(true);
      setTimeout(() => setShowHeart(false), 700);
    }
    lastTap.current = now;
  };

  if (!open) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="bg-black p-0 rounded-xl overflow-hidden w-full max-w-2xl">
        <VisuallyHidden>
          <DialogTitle>Visualização de Story de {story.user.name}</DialogTitle>
        </VisuallyHidden>
        <div className="relative w-full aspect-[9/16] bg-black">
          {/* Barra de progresso */}
          <StoryProgressBar key={story.mediaUrl} duration={6} onComplete={onNext} />

          {/* Mídia */}
          <div
            className="w-full h-full absolute inset-0 z-5"
            onDoubleClick={handleDoubleTap}
            onTouchEnd={handleTouchEnd}
            style={{ cursor: 'pointer' }}
          >
            {story.type === "image" ? (
              <img src={story.mediaUrl} alt="Story" className="object-cover w-full h-full" />
            ) : (
              <video id="story-video" src={story.mediaUrl} controls className="w-full h-full object-cover" />
            )}
            {/* Coração animado */}
            {showHeart && (
              <motion.div
                initial={{ scale: 0.7, opacity: 0 }}
                animate={{ scale: [1.2, 1], opacity: [1, 0.8, 0] }}
                transition={{ duration: 0.7, times: [0, 0.5, 1], ease: "easeOut" }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none"
              >
                <Heart className="w-32 h-32 text-white drop-shadow-lg" style={{ filter: 'drop-shadow(0 0 16px #e11d48)' }} fill="#e11d48" />
              </motion.div>
            )}
          </div>

          {/* Header */}
          <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent z-10">
            <div className="flex items-center gap-3">
              <Avatar className="w-9 h-9">
                <AvatarImage src={story.user.avatarUrl} />
                <AvatarFallback>{story.user.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-white text-sm font-semibold">{story.user.name}</p>
                <p className="text-white/70 text-xs">@{story.user.username} • {story.time}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Navegação */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 z-20">
            <Button onClick={onPrev} variant="ghost" size="icon" className="text-white">
              <ChevronLeft className="w-6 h-6" />
            </Button>
          </div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 z-20">
            <Button onClick={onNext} variant="ghost" size="icon" className="text-white">
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          {/* Ações rápidas */}
          <div className="absolute left-0 right-0 bottom-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-30">
            <form className="flex gap-2 items-center" onSubmit={handleSend}>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`text-white hover:text-red-500 ${liked ? 'text-red-500' : ''}`}
                onClick={() => setLiked(!liked)}
                aria-label="Curtir"
              >
                <Heart className="w-5 h-5" fill={liked ? '#e11d48' : 'none'} />
              </Button>
              <input
                ref={inputRef}
                type="text"
                placeholder={`Enviar mensagem para @${story.user.username}`}
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="flex-1 rounded-full border px-4 py-2 text-sm bg-white/80 focus:outline-none"
              />
              <Button type="submit" className="bg-primary text-white px-4 py-2 text-sm rounded-full" disabled={!message.trim()}>
                Enviar
              </Button>
            </form>
          </div>

          {/* Descrição (opcional) */}
          {story.description && (
            <div className="absolute left-0 right-0 bottom-32 px-4 z-20">
              <p className="text-white text-sm max-w-[80%] truncate">{story.description}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default StoryModal; 