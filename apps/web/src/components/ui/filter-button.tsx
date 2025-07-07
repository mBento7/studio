import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';

export interface FilterButtonProps {
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick: () => void;
  premium?: boolean;
  disabled?: boolean;
  className?: string;
}

/**
 * Botão de filtro global, com suporte a modo dark/light, premium, disabled e integração visual com o padrão do site.
 */
export function FilterButton({
  icon: Icon,
  label,
  isActive,
  onClick,
  premium = false,
  disabled = false,
  className = '',
}: FilterButtonProps) {
  if (premium) {
    return (
      <Button
        onClick={onClick}
        disabled={disabled}
        variant="premium"
        className={cn(
          'flex items-center gap-2 h-8 px-2 text-xs rounded-[var(--radius)] font-semibold transition-all duration-200 ease-in-out',
          isActive && 'ring-2 ring-yellow-400',
          disabled && 'opacity-60 cursor-not-allowed',
          className
        )}
        title={disabled ? 'Disponível apenas para plano Premium' : undefined}
      >
        <Icon className="w-4 h-4" />
        <span>{label}</span>
        <span className="ml-1 text-[10px] font-bold uppercase">Premium</span>
      </Button>
    );
  }
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-2 h-8 px-2 text-xs rounded-[var(--radius)] font-semibold transition-all duration-200 ease-in-out shadow-sm',
        isActive
          ? 'bg-primary text-primary-foreground shadow-md'
          : 'bg-card text-foreground border border-border hover:bg-primary/10',
        disabled && 'opacity-60 cursor-not-allowed',
        className
      )}
    >
      <Icon className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
} 