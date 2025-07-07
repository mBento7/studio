import React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

// Definição de variantes de botão:
// - default: Botão principal do sistema (azul, destaque)
// - destructive: Botão de ação perigosa (vermelho)
// - outline: Botão com borda, fundo transparente
// - secondary: Botão secundário (cinza ou cor secundária)
// - ghost: Botão "fantasma", sem fundo, só texto
// - link: Botão com aparência de link
// - premium: Botão para ações premium (gradiente laranja)
// - action: Botão de ação especial (gradiente laranja, arredondado)
// - ad: Botão para anúncios (igual ao action)
// - premiumProfilePrimary: Botão principal de perfil premium (gradiente azul, grande)
// - premiumProfileSecondary: Botão secundário de perfil premium (borda branca, fundo transparente)
//
// Adicione novas variantes abaixo conforme necessário para o projeto.
const buttonVariants = cva(
  'inline-flex items-center justify-center font-semibold transition-colors rounded-md text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90', // Botão principal
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', // Botão de ação perigosa
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground', // Borda
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80', // Secundário
        ghost: 'hover:bg-accent hover:text-accent-foreground', // Fantasma
        link: 'text-primary underline-offset-4 hover:underline', // Link
        premium: 'bg-gradient-to-r from-[#FFA500] via-[#FF8800] to-[#FF6600] text-white shadow-lg hover:brightness-110', // Premium
        action: 'bg-gradient-to-r from-[#FFA500] via-[#FF8800] to-[#FF6600] text-white rounded-full px-6 py-2 hover:brightness-110 shadow-md', // Ação especial
        ad: 'bg-gradient-to-r from-[#FFA500] via-[#FF8800] to-[#FF6600] text-white rounded-full px-6 py-2 hover:brightness-110 shadow-md', // Anúncio
        premiumProfilePrimary: 'bg-gradient-to-r from-blue-600 to-blue-400 text-white hover:from-blue-700 hover:to-blue-500 font-semibold rounded-full text-lg py-3 flex items-center justify-center shadow-lg transition-all duration-300', // Perfil premium principal
        premiumProfileSecondary: 'border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm font-semibold rounded-full flex items-center justify-center', // Perfil premium secundário
        // Adicione aqui novas variantes se necessário
      },
      size: {
        default: 'h-10 px-4', // Tamanho padrão
        sm: 'h-8 rounded-md px-3', // Pequeno
        lg: 'h-12 rounded-md px-6 text-base', // Grande
        icon: 'h-10 w-10', // Ícone
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = 'Button';

export { Button, buttonVariants };
