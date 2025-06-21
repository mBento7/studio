import React from "react";

interface NotificacaoPatrocinadaProps {
  mensagem: string;
  link: string;
}

export const NotificacaoPatrocinada: React.FC<NotificacaoPatrocinadaProps> = ({ mensagem, link }) => (
  <div className="notificacao-patrocinada flex items-center bg-yellow-50 border-l-4 border-yellow-400 p-3 mb-2 rounded">
    <span className="font-semibold text-yellow-800 mr-2">Patrocinado:</span>
    <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline flex-1">{mensagem}</a>
  </div>
); 