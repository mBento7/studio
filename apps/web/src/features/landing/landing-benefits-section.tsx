
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Zap, Link as LinkIcon, QrCode, Palette, Users, Share2 } from 'lucide-react';

const benefits = [
  {
    icon: Zap,
    title: "Perfil Centralizado",
    description: "Una suas informações de contato, redes sociais, portfólio e serviços em um único link profissional e fácil de compartilhar.",
  },
  {
    icon: LinkIcon,
    title: "Templates Personalizáveis",
    description: "Escolha entre diversos templates e personalize o design para que seu perfil tenha a cara da sua marca pessoal ou empresarial.",
  },
  {
    icon: QrCode,
    title: "Cartão de Visita Digital e QR Code",
    description: "Gere um QR Code e um cartão de visita digital para compartilhar seu perfil de forma rápida em qualquer situação, online ou offline.",
  },
  {
    icon: Palette,
    title: "Mostre Seu Trabalho",
    description: "Destaque seus melhores projetos, produtos ou serviços com seções de portfólio, vídeos e descrições detalhadas.",
  },
  {
    icon: Users,
    title: "Facilite o Contato",
    description: "Permita que clientes, recrutadores e parceiros entrem em contato com você facilmente através de formulários e links diretos.",
  },
  {
    icon: Share2,
    title: "Otimizado para Descoberta",
    description: "Aumente sua visibilidade online com um perfil otimizado para ser encontrado em mecanismos de busca.",
  },
];

export function LandingBenefitsSection() {
  return (
    <section id="features" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tudo o que Você Precisa para Brilhar Online
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            WhosDo.com oferece recursos poderosos para construir e compartilhar sua identidade digital de forma eficaz.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 bg-card">
              <CardHeader>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 text-primary rounded-lg mb-4">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-semibold">{benefit.title}</CardTitle>
                <CardDescription className="text-foreground/80">{benefit.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
