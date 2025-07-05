import React from "react";

interface StoryOptionsMenuProps {
  onClose: () => void;
}

const StoryOptionsMenu: React.FC<StoryOptionsMenuProps> = ({ onClose }) => {
  return (
    <div className="absolute right-0 mt-8 w-48 bg-card border border-border rounded shadow-lg z-50">
      <button className="block w-full text-left px-4 py-2 hover:bg-muted text-foreground" onClick={onClose}>Enviar mensagem</button>
      <button className="block w-full text-left px-4 py-2 hover:bg-muted text-destructive" onClick={onClose}>Denunciar</button>
      <button className="block w-full text-left px-4 py-2 hover:bg-muted text-foreground" onClick={onClose}>Copiar link do Story</button>
      <button className="block w-full text-left px-4 py-2 hover:bg-muted text-muted-foreground" onClick={onClose}>Bloquear usuário</button>
    </div>
  );
};

export default StoryOptionsMenu; 