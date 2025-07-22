import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const cardVariants = cva(
  'rounded-lg border text-card-foreground transition-all duration-200',
  {
    variants: {
      variant: {
        default: 'bg-card shadow-sm dark:shadow-lg dark:shadow-black/10',
        glass: 'bg-card/80 backdrop-blur-sm shadow-lg dark:shadow-xl dark:shadow-black/20',
        elevated: 'bg-card shadow-xl dark:shadow-2xl dark:shadow-black/25 ring-1 ring-border/20',
        gradient: 'bg-gradient-to-br from-card to-muted/30 shadow-lg dark:shadow-xl dark:shadow-black/20'
      },
      hover: {
        none: '',
        lift: 'hover:shadow-md dark:hover:shadow-xl hover:-translate-y-1',
        glow: 'hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10'
      }
    },
    defaultVariants: {
      variant: 'default',
      hover: 'none'
    }
  }
);

export interface EnhancedCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const EnhancedCard = React.forwardRef<HTMLDivElement, EnhancedCardProps>(
  ({ className, variant, hover, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ variant, hover }), className)}
      {...props}
    />
  )
);
EnhancedCard.displayName = 'EnhancedCard';

export { EnhancedCard, cardVariants };
