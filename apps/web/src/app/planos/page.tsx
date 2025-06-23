'use client';
import React from 'react';
import Link from 'next/link';
import { Check, Zap, Crown, Rocket, Info } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    description: 'Para novos usuários e perfis em fase de criação/teste',
    icon: <Zap className="h-8 w-8 text-primary" />,
    features: [
      'Perfil com link público',
      'Upload de foto e capa',
      'Bio, contatos, redes sociais (limitado a 3 links)',
      'Acesso ao Feed (limitado a Novos)',
      'Stories efêmeros (até 5 simultâneos)',
      'Painel de Créditos',
      'Ganho de bônus por ações',
      'Recursos pagos via créditos'
    ],
    highlight: false,
    cta: 'Começar Gratuitamente',
    color: 'from-gray-100 to-gray-50',
    border: 'border-gray-200',
    iconButton: <Zap className="w-5 h-5" />,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 29.90,
    description: 'Profissionais que buscam visibilidade moderada e recursos de conversão',
    icon: <Crown className="h-8 w-8 text-primary" />,
    features: [
      'Tudo do plano Free',
      'Serviços e portfólio ativados',
      'Stories ilimitados',
      'Feed Recomendados',
      'Acesso ao StoriesCarousel',
      'Cupons promocionais',
      'Compra de pacotes de créditos',
      'Recursos pagos via créditos'
    ],
    highlight: true,
    cta: 'Escolher Standard',
    color: 'from-blue-100 to-blue-50',
    border: 'border-blue-400',
    iconButton: <Crown className="w-5 h-5" />,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59.90,
    description: 'Máxima personalização, alcance e conversão',
    icon: <Rocket className="h-8 w-8 text-primary" />,
    features: [
      'Tudo do plano Standard',
      'Boost no TrendingAds',
      'Cupons em CouponsWidget (ilimitados)',
      'Banner Promocional no Perfil',
      'Estatísticas avançadas',
      'Integração com YouTube e Calendly',
      'Suporte prioritário',
      'Descontos em ações premium (10-20% menos créditos)'
    ],
    highlight: false,
    cta: 'Escolher Premium',
    color: 'from-yellow-100 to-yellow-50',
    border: 'border-yellow-400',
    iconButton: <Rocket className="w-5 h-5" />,
  }
];

const comparisonFeatures = [
  { name: 'Stories (24h)', free: '5', standard: 'Ilimitado', premium: 'Ilimitado' },
  { name: 'Feed', free: 'Novos', standard: 'Recomendados', premium: 'Trending' },
  { name: 'Portfólio e Serviços', free: false, standard: '✅ (limitado)', premium: '✅ (ilimitado)' },
  { name: 'CouponsWidget', free: false, standard: true, premium: '✅ (destaque)' },
  { name: 'Créditos Mensais', free: '❌', standard: '+30', premium: '+100' },
  { name: 'Banner no Perfil', free: false, standard: false, premium: true },
  { name: 'YouTube / Calendly / Estatísticas', free: false, standard: false, premium: true },
  { name: 'Suporte Prioritário', free: false, standard: false, premium: true },
  { name: 'Acesso a ações pagas com créditos', free: true, standard: true, premium: '✅ (com desconto)' },
];

export default function PlanosPage() {
  return (
    <div className="mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold mb-2 text-center">Planos e Assinaturas</h1>
      <p className="mb-8 text-lg text-muted-foreground text-center">Escolha o plano ideal para você e desbloqueie mais recursos na plataforma.</p>
      
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch mb-12">
        {plans.map((plan) => (
          <Card key={plan.id} className="relative flex-1 flex flex-col p-5 shadow-xl shadow-black/20 rounded-lg bg-card border border-black/5 transition-transform duration-300 hover:scale-105">
            {plan.highlight && <Badge className="absolute top-4 right-4 bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white animate-pulse z-10 shadow-lg">Recomendado</Badge>}
            <div className="w-full h-full p-6 flex flex-col items-center bg-card rounded-lg shadow-xl shadow-black/10 overflow-hidden border border-black/5">
              <div className="mb-4">{plan.icon}</div>
              <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
              <p className="text-4xl font-bold mb-2">{plan.price === 0 ? 'Grátis' : `R$ ${plan.price}`}</p>
              <p className="mb-4 text-muted-foreground text-center">{plan.description}</p>
              <ul className="mb-6 text-left space-y-2">
                {plan.features.map((f, i) => <li key={i} className="flex items-start gap-2"><Check className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" /> <span>{f}</span></li>)}
              </ul>
              {plan.highlight ? (
                <Button className="w-full mt-auto flex items-center justify-center gap-2 text-lg py-3 rounded-lg bg-gradient-to-r from-[#14b8a6] to-[#0e9094] hover:brightness-110 text-white font-semibold shadow-md" size="lg">
                  {plan.iconButton} {plan.cta}
                </Button>
              ) : (
                <Button variant="outline" className="w-full mt-auto flex items-center justify-center gap-2 text-lg py-3 rounded-lg border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094]" size="lg">
                  {plan.iconButton} {plan.cta}
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Banner de dica */}
      <div className="flex items-center gap-3 bg-teal-900/10 border-l-4 border-teal-400 p-4 rounded-md my-10">
        <Info className="w-6 h-6 text-teal-400" />
        <span className="text-teal-300 font-medium">Dica: faça upgrade para desbloquear recursos premium e aumentar seu alcance!</span>
      </div>

      {/* Tabela de comparação visual */}
      <Card className="my-12 p-5 shadow-xl shadow-black/20 rounded-lg bg-card border border-black/5">
        <div className="w-full bg-card rounded-lg shadow-xl shadow-black/10 overflow-hidden border border-black/5">
          <div className="overflow-x-auto">
            <h2 className="text-2xl font-bold text-center p-6">Comparativo de Recursos</h2>
            <table className="w-full text-center">
              <thead className="border-b border-white/10">
                <tr className="bg-transparent text-muted-foreground">
                  <th className="p-4 text-left font-semibold">Recurso</th>
                  <th className="p-4 font-semibold">Free</th>
                  <th className="p-4 font-semibold">Standard</th>
                  <th className="p-4 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature) => (
                  <tr key={feature.name} className="border-t border-white/5">
                    <td className="p-4 text-left font-medium">{feature.name}</td>
                    <td className="p-4">{feature.free === true ? '✔️' : feature.free === false ? '—' : feature.free}</td>
                    <td className="p-4">{feature.standard === true ? '✔️' : feature.standard === false ? '—' : feature.standard}</td>
                    <td className="p-4">{feature.premium === true ? '✔️' : feature.premium === false ? '—' : feature.premium}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Card>

      {/* FAQ em accordion animado */}
      <Card className="my-12 max-w-4xl mx-auto p-5 shadow-xl shadow-black/20 rounded-lg bg-card border border-black/5">
        <div className="w-full bg-card rounded-lg shadow-xl shadow-black/10 overflow-hidden border border-black/5 p-4 md:p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Dúvidas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Como funciona a cobrança dos planos?</AccordionTrigger>
              <AccordionContent>Você pode pagar mensalmente ou anualmente, com renovação automática e possibilidade de cancelamento a qualquer momento.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Posso mudar de plano a qualquer momento?</AccordionTrigger>
              <AccordionContent>Sim, você pode fazer upgrade ou downgrade de plano quando quiser, sem burocracia.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>O que acontece se eu cancelar?</AccordionTrigger>
              <AccordionContent>Você mantém o acesso ao plano até o fim do ciclo já pago. Depois, volta ao plano Free automaticamente.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Como faço upgrade para o Premium?</AccordionTrigger>
              <AccordionContent>Basta clicar em "Escolher Premium" e seguir o fluxo de pagamento. O upgrade é instantâneo após a confirmação.</AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
      
      <div className="flex justify-center mt-12">
        <Button asChild size="lg" variant="outline" className="px-8 py-4 text-lg rounded-lg border-[#0e9094]/50 text-[#0e9094] hover:bg-[#0e9094]/10 hover:text-[#0e9094] shadow-md">
          <Link href="/dashboard/credits" className="flex items-center gap-2">
            <Zap className="w-5 h-5" /> Acessar Painel de Créditos
          </Link>
        </Button>
      </div>
    </div>
  );
} 