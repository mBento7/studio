import React from "react";

interface YoutubeSectionProps {
  youtubeVideoUrl: string;
  youtubeVideoTitle?: string;
  youtubeVideoDescription?: string;
}

export function YoutubeSection({ youtubeVideoUrl, youtubeVideoTitle, youtubeVideoDescription }: YoutubeSectionProps) {
  if (!youtubeVideoUrl) return null;
  return (
    <section className="w-full flex flex-col items-center justify-center py-12">
      <div className="w-full max-w-4xl min-h-[220px] md:min-h-[280px] bg-white/90 dark:bg-slate-800/80 rounded-2xl shadow-xl p-6 flex flex-col md:flex-row items-center md:items-stretch gap-8">
        {/* Texto à esquerda */}
        <div className="flex-1 flex flex-col justify-center items-center md:items-start text-center md:text-left">
          {youtubeVideoTitle && (
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">{youtubeVideoTitle}</h3>
          )}
          {youtubeVideoDescription && (
            <p className="text-base md:text-lg text-slate-700 dark:text-slate-300">{youtubeVideoDescription}</p>
          )}
        </div>
        {/* Vídeo à direita */}
        <div className="flex-1 w-full max-w-md aspect-video rounded-xl overflow-hidden bg-black self-center min-h-[180px] md:min-h-[220px]">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeVideoUrl.split('v=')[1]}`}
            title={youtubeVideoTitle || 'Vídeo do YouTube'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          />
        </div>
      </div>
    </section>
  );
} 