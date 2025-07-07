import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function LandingHeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
          Crie seu Cartão de Visita Digital em Minutos
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Centralize seus links, portfólio e informações de contato em um perfil profissional que impressiona.
        </p>
        <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg">
          <Link href="/login">Comece Agora</Link>
        </Button>
        <div className="mt-12 md:mt-16 max-w-4xl mx-auto aspect-[16/9] rounded-xl overflow-hidden shadow-2xl border-2 border-border/50">
          <Image
            src="/placeholder-hero.png"
            alt={`Plataforma ${siteConfig.name} mostrando perfis digitais e conexões`}
            width={1200}
            height={675}
            className="object-cover w-full h-full"
            data-ai-hint="digital connection showcase"
            priority
          />
        </div>
      </div>
    </section>
  );
}
