import React from "react";

interface VideoAnuncioCardProps {
  videoUrl: string;
  titulo: string;
  link: string;
  descricao?: string;
}

export const VideoAnuncioCard: React.FC<VideoAnuncioCardProps> = ({ videoUrl, titulo, link, descricao }) => (
  <div className="video-anuncio-card border rounded p-4 bg-white shadow mb-4">
    <video src={videoUrl} controls autoPlay muted loop className="w-full h-40 object-cover rounded mb-2" />
    <h3 className="font-bold text-lg mb-1">{titulo}</h3>
    {descricao && <p className="text-sm text-gray-600 mb-2">{descricao}</p>}
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Saiba mais</a>
  </div>
); 