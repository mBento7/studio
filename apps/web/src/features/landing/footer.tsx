import Link from 'next/link';
import { Logo } from '@/components/common/logo';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Send } from 'lucide-react';
import { siteConfig } from '@/config/site';

export function PublicFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border py-10 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-8">
          {/* Coluna 1: Logo e descrição */}
          <div className="flex-1 min-w-[200px]">
            <Logo className="mb-3" />
            <p className="text-sm text-muted-foreground max-w-xs">
              {siteConfig.description}
            </p>
          </div>
          {/* Coluna 2: Links rápidos */}
          <div>
            <h5 className="font-semibold mb-2">Plataforma</h5>
            <ul className="space-y-1 text-sm">
              <li><Link href="/#features" className="hover:text-primary">Funcionalidades</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary">Planos</Link></li>
              <li><Link href="/search" className="hover:text-primary">Explorar</Link></li>
              <li><Link href="/login" className="hover:text-primary">Entrar</Link></li>
            </ul>
          </div>
          {/* Coluna 3: Legal */}
          <div>
            <h5 className="font-semibold mb-2">Legal</h5>
            <ul className="space-y-1 text-sm">
              <li><Link href="/terms" className="hover:text-primary">Termos de Uso</Link></li>
              <li><Link href="/privacy" className="hover:text-primary">Política de Privacidade</Link></li>
            </ul>
          </div>
          {/* Coluna 4: Newsletter */}
          <div className="flex-1 min-w-[200px]">
            <h5 className="font-semibold mb-2">Receba Novidades</h5>
            <form className="flex space-x-2 mb-2">
              <Input type="email" placeholder="seu@email.com" />
              <Button type="submit" size="icon" aria-label="Inscrever-se na newsletter">
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="text-xs text-muted-foreground max-w-xs">
              Inscreva-se para receber as últimas notícias, dicas e ofertas especiais do {siteConfig.name}.
            </p>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-6 text-center text-xs text-muted-foreground">
          &copy; {currentYear} {siteConfig.name}. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
