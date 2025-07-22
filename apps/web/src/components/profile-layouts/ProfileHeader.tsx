import React from 'react';

interface ProfileHeaderProps {
  sections: { key: string; label: string; icon?: React.ReactNode }[];
  sectionRefs: Record<string, React.RefObject<HTMLElement>>;
  onSectionClick: (section: string) => void;
  variant: 'free' | 'standard' | 'premium';
}

export function ProfileHeader({ sections, sectionRefs, onSectionClick, variant }: ProfileHeaderProps) {
  return (
    <nav className="flex flex-wrap gap-2 justify-center items-center py-4">
      {sections.map((section) => (
        <button
          key={section.key}
          onClick={() => onSectionClick(section.key)}
          className="px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-primary/10 focus:bg-primary/20 font-medium transition"
        >
          {section.icon && <span className="mr-2 align-middle">{section.icon}</span>}
          {section.label}
        </button>
      ))}
      {/* Exemplo: adicionar seções extras para premium */}
      {variant === 'premium' && (
        <button className="px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold ml-2">Destaque Premium</button>
      )}
    </nav>
  );
}
