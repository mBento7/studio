import React, { useRef, useState } from 'react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Megaphone, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VideoAnuncioCardProps {
  videoUrl: string;
  titulo: string;
  descricao: string;
  link: string;
}

const VideoAnuncioCard = ({ videoUrl, titulo, descricao, link }: VideoAnuncioCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <Card className="max-w-lg">
      <div className="relative">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover rounded-t-2xl"
          src={videoUrl}
          muted={isMuted}
          loop
          onClick={togglePlay}
        />
        <div className="absolute top-4 left-4">
          <Badge variant="outline" className="bg-black/50 text-white border-white/30">
            <Megaphone className="w-3 h-3 mr-1" />
            Patrocinado
          </Badge>
        </div>
        <div className="absolute bottom-4 left-4 flex gap-2">
          <Button variant="ghost" size="icon" onClick={togglePlay} className="text-white hover:bg-white/20">
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMute} className="text-white hover:bg-white/20">
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground mb-2">{titulo}</h3>
        <p className="text-sm text-muted-foreground mb-4">{descricao}</p>
        <Button asChild className="w-full">
          <a href={link}>Saiba mais</a>
        </Button>
      </div>
    </Card>
  );
};

export default VideoAnuncioCard;
