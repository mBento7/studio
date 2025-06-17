
import Link from 'next/link';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card text-card-foreground py-12 md:py-16 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Logo e descrição */}
          <div className="md:col-span-4">
            <Logo className="mb-4 text-card-foreground" />
            <p className="text-sm mb-4 text-muted-foreground">
              {siteConfig.description}
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="md:col-span-2">
            <h5 className="font-semibold text-card-foreground mb-4">Plataforma</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Funcionalidades</Link></li>
              <li><Link href="/#pricing" className="text-muted-foreground hover:text-primary">Planos</Link></li>
              <li><Link href="/search" className="text-muted-foreground hover:text-primary">Explorar</Link></li>
              <li><Link href="/login" className="text-muted-foreground hover:text-primary">Entrar</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="md:col-span-2">
            <h5 className="font-semibold text-card-foreground mb-4">Legal</h5>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="md:col-span-4">
            <h5 className="font-semibold text-card-foreground mb-4">Receba Novidades</h5>
            <p className="text-sm mb-3 text-muted-foreground">
              Inscreva-se para receber as últimas notícias, dicas e ofertas especiais do {siteConfig.name}.
            </p>
            <form className="flex space-x-2">
              <Input type="email" placeholder="seu@email.com" className="bg-background border-border focus:ring-primary text-foreground" />
              <Button type="submit" variant="default" size="icon" aria-label="Inscrever-se na newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
