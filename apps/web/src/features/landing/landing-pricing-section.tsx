import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

const pricingPlans = [
  {
    name: 'Grátis',
    price: 'R$0',
    frequency: '/ para sempre',
    description: 'Para quem está começando e precisa de um cartão de visitas digital.',
    features: [
      { text: '1 Template de Perfil (Minimalista)', included: true },
      { text: 'URL personalizada (whosdo.com/seu-nome)', included: true },
      { text: 'Até 5 Links Sociais', included: true },
      { text: 'Cartão de Visita com QR Code', included: true },
      { text: 'Seção de Portfólio (até 2 itens)', included: false },
      { text: 'Múltiplos Templates', included: false },
      { text: 'Remoção da marca WhosDo.com', included: false }
    ],
    cta: 'Comece Grátis',
    href: '/login',
    isFeatured: false
  },
  {
    name: 'Padrão',
    price: 'R$19',
    frequency: '/ mês',
    description: 'Ideal para profissionais que querem mostrar seu trabalho e se destacar.',
    features: [
      { text: 'Todos os recursos do Grátis', included: true },
      { text: '3 Templates de Perfil (Padrão, Foco em Portfólio, etc.)', included: true },
      { text: 'Links Sociais Ilimitados', included: true },
      { text: 'Seção de Serviços/Produtos', included: true },
      { text: 'Seção de Portfólio (até 10 itens)', included: true },
      { text: 'Incorporar vídeo do YouTube', included: true },
      { text: 'Remoção da marca WhosDo.com', included: false }
    ],
    cta: 'Escolha o Padrão',
    href: '/login?plan=standard',
    isFeatured: true
  },
  {
    name: 'Premium',
    price: 'R$39',
    frequency: '/ mês',
    description: 'O kit completo para máxima personalização e impacto profissional.',
    features: [
      { text: 'Todos os recursos do Padrão', included: true },
      { text: 'Acesso a TODOS os templates (atuais e futuros)', included: true },
      { text: 'Portfólio com itens Ilimitados', included: true },
      { text: 'Seções de Experiência e Educação', included: true },
      { text: 'Seção de Habilidades (Skills)', included: true },
      { text: 'Remoção da marca WhosDo.com', included: true },
      { text: 'Suporte Prioritário', included: true }
    ],
    cta: 'Seja Premium',
    href: '/login?plan=premium',
    isFeatured: false
  }
];

export function LandingPricingSection() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Preços Simples e Transparentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Escolha o plano ideal para você. Sem taxas ocultas, cancele quando quiser.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <Card
              key={plan.name}
              className={`flex flex-col shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out ${plan.isFeatured ? 'border-2 border-primary relative ring-2 ring-primary/30' : 'bg-card'}`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 text-sm font-semibold rounded-full shadow-md">
                  Mais Popular
                </div>
              )}
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl font-bold text-center">{plan.name}</CardTitle>
                <div className="text-center my-4">
                  <span className="text-4xl font-extrabold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.frequency}</span>
                </div>
                <CardDescription className="text-center h-12">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <ul className="space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      {feature.included ? (
                        <CheckCircle className="w-5 h-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-muted-foreground mr-2 mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`${feature.included ? 'text-foreground/80' : 'text-muted-foreground/70'}`}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button
                  asChild
                  className={`w-full ${plan.isFeatured ? 'bg-primary hover:bg-primary/90 text-primary-foreground' : 'bg-secondary hover:bg-secondary/80 text-secondary-foreground'}`}
                  size="lg"
                >
                  <Link href={plan.href}>{plan.cta}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <p className="text-center text-muted-foreground mt-8 text-sm">
            Todos os planos incluem hospedagem segura, design responsivo e certificado SSL.
        </p>
      </div>
    </section>
  );
}
