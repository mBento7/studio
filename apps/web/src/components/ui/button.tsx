import React from 'react';
import clsx from 'clsx';

export type ButtonVariant = 'nav' | 'tab' | 'default' | 'gradient' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  active?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

const baseStyles =
  'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed';

const variantStyles: Record<ButtonVariant, string> = {
  nav: 'bg-primary text-white hover:bg-primary/90 focus:ring-2 focus:ring-primary/50 shadow-sm',
  tab: 'bg-muted text-foreground hover:bg-muted/70 focus:ring-2 focus:ring-ring',
  default: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-2 focus:ring-gray-400',
  gradient:
    'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white shadow-md hover:from-green-600 hover:to-teal-600 focus:ring-2 focus:ring-emerald-400',
  outline:
    'border border-border bg-transparent text-foreground hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-ring',
};

const activeStyles: Record<ButtonVariant, string> = {
  nav: 'bg-primary/80',
  tab: 'bg-muted/60',
  default: 'bg-gray-900',
  gradient: 'from-green-600 to-teal-600',
  outline: 'bg-muted/40',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-5 py-3',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  active = false,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        active && activeStyles[variant],
        className
      )}
      {...props}
    >
      {leftIcon && <span className="w-5 h-5">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="w-5 h-5">{rightIcon}</span>}
    </button>
  );
};
