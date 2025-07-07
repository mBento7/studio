"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Star, Menu, X, Zap, Shield, Users, Globe, ChevronDown, Flame, Heart, MessageCircle, Share2, Bookmark, Crown, Rocket, Sparkles, Brain, AlertCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import OnlyClient from '@/components/OnlyClient';

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Site config
const siteConfig = {
  name: "WhosDo",
  description: "Crie um perfil profissional que se destaca"
};

// Data
const plans: Plan[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    interval: "mês",
    description: "Para novos usuários e perfis em fase de criação/teste",
    icon: <Zap className="h-6 w-6 text-primary" />,
    features: [
      "Perfil com link público",
      "Upload de foto e capa",
      "Bio, contatos, redes sociais (limitado a 3 links)",
      "Acesso ao Feed (limitado a 'Novos')",
      "Stories efêmeros (até 5 simultâneos)",
      "Painel de Créditos",
      "Ganho de bônus por ações",
      "Recursos pagos via créditos"
    ],
    credits: 0,
    highlight: false,
    cta: "Começar Gratuitamente"
  },
  {
    id: "standard",
    name: "Standard",
    price: 29.90,
    interval: "mês",
    description: "Profissionais que buscam visibilidade moderada e recursos de conversão",
    icon: <Crown className="h-6 w-6 text-primary" />,
    features: [
      "Tudo do plano Free",
      "Serviços e portfólio ativados",
      "Stories ilimitados",
      "Feed 'Recomendados'",
      "Acesso ao StoriesCarousel",
      "Cupons promocionais",
      "Compra de pacotes de créditos",
      "Recursos pagos via créditos"
    ],
    credits: 30,
    highlight: true,
    cta: "Escolher Standard"
  },
  {
    id: "premium",
    name: "Premium",
    price: 59.90,
    interval: "mês",
    description: "Máxima personalização, alcance e conversão",
    icon: <Rocket className="h-6 w-6 text-primary" />,
    features: [
      "Tudo do plano Standard",
      "Boost no TrendingAds",
      "Cupons em CouponsWidget (ilimitados)",
      "Banner Promocional no Perfil",
      "Estatísticas avançadas",
      "Integração com YouTube e Calendly",
      "Suporte prioritário",
      "Descontos em ações premium (10-20% menos créditos)"
    ],
    credits: 100,
    highlight: false,
    cta: "Escolher Premium"
  }
];

const creditActions: CreditAction[] = [
  { name: "Destaque por 7 dias", cost: 20 },
  { name: "Cupom Premium", cost: 10 },
  { name: "Story Patrocinado", cost: 5 },
  { name: "QR Code estilizado", cost: 30 },
  { name: "Subir para topo por 24h", cost: 15 },
  { name: "Tags adicionais no perfil", cost: 8 }
];

const comparisonFeatures: ComparisonFeature[] = [
  { name: "Stories (24h)", free: "5", standard: "Ilimitado", premium: "Ilimitado" },
  { name: "Feed", free: "Novos", standard: "Recomendados", premium: "Trending" },
  { name: "Portfólio e Serviços", free: false, standard: "✅ (limitado)", premium: "✅ (ilimitado)" },
  { name: "CouponsWidget", free: false, standard: true, premium: "✅ (destaque)" },
  { name: "Créditos Mensais", free: "❌", standard: "+30", premium: "+100" },
  { name: "Banner no Perfil", free: false, standard: false, premium: true },
  { name: "YouTube / Calendly / Estatísticas", free: false, standard: false, premium: true },
  { name: "Suporte Prioritário", free: false, standard: false, premium: true },
  { name: "Acesso a ações pagas com créditos", free: true, standard: true, premium: "✅ (com desconto)" }
];

// Types
interface PricingTier {
  name: string;
  subtitle: string;
  price: { monthly: number; yearly: number };
  description: string;
  icon: typeof Zap;
  gradient: string;
  borderGradient: string;
  features: string[];
  highlight: boolean;
  badge: string | null;
  ariaLabel?: string;
}

interface AdditionalFeature {
  icon: typeof Brain;
  title: string;
  description: string;
}

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
  credits: number;
  highlight: boolean;
  cta: string;
}

interface CreditAction {
  name: string;
  cost: number;
}

interface ComparisonFeature {
  name: string;
  free: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}

// Glow Component
const Glow = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { variant?: "top" | "above" | "bottom" | "below" | "center" }
>(({ className, variant = "top", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute w-full",
      variant === "top" && "top-0",
      variant === "above" && "-top-[128px]",
      variant === "bottom" && "bottom-0",
      variant === "below" && "-bottom-[128px]",
      variant === "center" && "top-[50%]",
      className
    )}
    {...props}
  >
    <div
      className={cn(
        "absolute left-1/2 h-[256px] w-[60%] -translate-x-1/2 scale-[2.5] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.5)_10%,_hsl(var(--primary)/0)_60%)] sm:h-[512px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
    <div
      className={cn(
        "absolute left-1/2 h-[128px] w-[40%] -translate-x-1/2 scale-[2] rounded-[50%] bg-[radial-gradient(ellipse_at_center,_hsl(var(--primary)/.3)_10%,_hsl(var(--primary)/0)_60%)] sm:h-[256px]",
        variant === "center" && "-translate-y-1/2",
      )}
    />
  </div>
));
Glow.displayName = "Glow";

// Mockup Components
const Mockup = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { type?: "mobile" | "responsive" }
>(({ className, type = "responsive", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex relative z-10 overflow-hidden shadow-2xl border border-border/5 border-t-border/15",
      type === "mobile" ? "rounded-[48px] max-w-[350px]" : "rounded-md",
      className
    )}
    {...props}
  />
));
Mockup.displayName = "Mockup";

const MockupFrame = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { size?: "small" | "large" }
>(({ className, size = "small", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-accent/5 flex relative z-10 overflow-hidden rounded-2xl",
      size === "small" ? "p-2" : "p-4",
      className
    )}
    {...props}
  />
));
MockupFrame.displayName = "MockupFrame";

// Upgrade Banner Component
function UpgradeBanner({ onClose }: { onClose?: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-lg p-4 mb-8"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Star className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-medium text-foreground">
              🎁 Trial Premium Grátis por 7 dias
            </p>
            <p className="text-sm text-muted-foreground">
              Experimente todos os recursos premium sem compromisso
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button size="default" className="bg-primary hover:bg-primary/90">
            Ativar Trial
          </Button>
          {onClose && (
            <Button size="default" variant="outline" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Plan Card Component
function PlanCard({ plan, isPopular }: { plan: Plan; isPopular?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative"
    >
      <Card className={cn(
        "h-full transition-all duration-300",
        plan.highlight && "border-primary shadow-lg scale-105",
        "hover:shadow-xl"
      )}>
        {plan.highlight && (
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <Badge className="bg-primary text-primary-foreground">
              Mais Popular
            </Badge>
          </div>
        )}
        
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className={cn(
              "p-3 rounded-full",
              plan.highlight ? "bg-primary/10" : "bg-muted"
            )}>
              {plan.icon}
            </div>
          </div>
          <CardTitle className="text-2xl">{plan.name}</CardTitle>
          <div className="flex items-baseline justify-center gap-1">
            <span className="text-3xl font-bold text-primary">
              R${plan.price.toFixed(2).replace('.', ',')}
            </span>
            <span className="text-muted-foreground">/{plan.interval}</span>
          </div>
          <CardDescription className="mt-2">{plan.description}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {plan.credits > 0 && (
            <div className="bg-muted/50 rounded-lg p-3 text-center">
              <p className="text-sm font-medium">
                +{plan.credits} créditos mensais inclusos
              </p>
            </div>
          )}

          <ul className="space-y-3">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>

          <Button 
            className={cn(
              "w-full mt-6",
              plan.highlight 
                ? "bg-primary hover:bg-primary/90" 
                : "variant-outline"
            )}
            variant={plan.highlight ? "default" : "outline"}
          >
            {plan.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

// Credits Section Component
function CreditsSection() {
  return (
    <div className="bg-muted/30 rounded-xl p-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold mb-2">Sistema de Créditos (WhoCoins)</h3>
        <p className="text-muted-foreground">
          Todos os planos têm acesso ao sistema de créditos para liberar recursos extras sob demanda
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {creditActions.map((action, index) => (
          <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg border">
            <span className="text-sm font-medium">{action.name}</span>
            <Badge variant="secondary">{action.cost} créditos</Badge>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2 mb-2">
          <Star className="h-4 w-4 text-primary" />
          <span className="font-medium text-sm">Estratégia de Gamificação</span>
        </div>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• 🎁 Bônus inicial: 20 créditos ao completar o perfil</li>
          <li>• 🔁 Login diário, convites e missões com recompensas</li>
          <li>• 🚀 Trial automático: 7 dias Premium ao criar primeiro Story</li>
        </ul>
      </div>
    </div>
  );
}

// Comparison Table Component
function ComparisonTable() {
  return (
    <div className="bg-background rounded-xl border overflow-hidden">
      <div className="p-6 bg-muted/30 border-b">
        <h3 className="text-xl font-semibold text-center">Comparação Detalhada de Recursos</h3>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-1/4">Recurso</TableHead>
              <TableHead className="text-center">Free</TableHead>
              <TableHead className="text-center">Standard</TableHead>
              <TableHead className="text-center">Premium</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {comparisonFeatures.map((feature, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{feature.name}</TableCell>
                <TableCell className="text-center">
                  {typeof feature.free === 'boolean' ? (
                    feature.free ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm">{feature.free}</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {typeof feature.standard === 'boolean' ? (
                    feature.standard ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm">{feature.standard}</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  {typeof feature.premium === 'boolean' ? (
                    feature.premium ? (
                      <Check className="h-4 w-4 text-green-500 mx-auto" />
                    ) : (
                      <X className="h-4 w-4 text-red-500 mx-auto" />
                    )
                  ) : (
                    <span className="text-sm">{feature.premium}</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

// Hero Section
function LandingHeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <Badge className="mb-6" variant="secondary">
            ✨ Novo: Sistema de Créditos WhoCoins
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Crie Seu Perfil
            <span className="text-primary block">Profissional</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Destaque-se no mercado com um perfil profissional único e impactante. 
            Planos flexíveis com sistema de créditos para máxima personalização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="default">
              <a href="#pricing">
                Ver Planos <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="default" variant="outline">
              <a href="#benefits">Saiba Mais</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Benefits Section
function LandingBenefitsSection() {
  const benefits = [
    {
      icon: Zap,
      title: "Sistema de Créditos",
      description: "Use WhoCoins para liberar recursos premium sob demanda"
    },
    {
      icon: Shield,
      title: "Perfil Verificado",
      description: "Ganhe credibilidade com perfil profissional verificado"
    },
    {
      icon: Users,
      title: "Networking Eficaz",
      description: "Conecte-se com profissionais da sua área"
    },
    {
      icon: Globe,
      title: "Visibilidade Global",
      description: "Seja encontrado por clientes do mundo todo"
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Por Que Escolher o {siteConfig.name}?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Oferecemos as melhores ferramentas para criar um perfil profissional de destaque
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="text-center h-full">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Premium Pricing Component
function PremiumPricing() {
  const [isYearly, setIsYearly] = useState(false);
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  const pricingPlans: PricingTier[] = [
    {
      name: "Free",
      subtitle: "Para novos usuários",
      price: { monthly: 0, yearly: 0 },
      description: "Perfeito para começar e testar a plataforma",
      icon: Zap,
      gradient: "from-blue-500/20 to-cyan-500/20",
      borderGradient: "from-blue-400 to-cyan-400",
      features: [
        "Perfil com link público",
        "Upload de foto e capa",
        "Bio, contatos, redes sociais",
        "Acesso ao Feed (limitado)",
        "Stories efêmeros (até 5)",
        "Painel de Créditos",
        "Ganho de bônus por ações"
      ],
      highlight: false,
      badge: null
    },
    {
      name: "Standard",
      subtitle: "Mais popular",
      price: { monthly: 29.90, yearly: 299 },
      description: "Para profissionais que buscam visibilidade moderada",
      icon: Crown,
      gradient: "from-indigo-500/20 to-purple-500/20",
      borderGradient: "from-indigo-400 to-purple-400",
      features: [
        "Tudo do plano Free",
        "Serviços e portfólio ativados",
        "Stories ilimitados",
        "Feed 'Recomendados'",
        "Acesso ao StoriesCarousel",
        "Cupons promocionais",
        "+30 créditos mensais",
        "Compra de pacotes de créditos"
      ],
      highlight: true,
      badge: "Mais Popular"
    },
    {
      name: "Premium",
      subtitle: "Para profissionais sérios",
      price: { monthly: 59.90, yearly: 599 },
      description: "Máxima personalização, alcance e conversão",
      icon: Rocket,
      gradient: "from-rose-500/20 to-pink-500/20",
      borderGradient: "from-rose-400 to-pink-400",
      features: [
        "Tudo do plano Standard",
        "Boost no TrendingAds",
        "Cupons ilimitados",
        "Banner Promocional no Perfil",
        "Estatísticas avançadas",
        "Integração YouTube/Calendly",
        "Suporte prioritário",
        "+100 créditos mensais",
        "Desconto em ações premium"
      ],
      highlight: false,
      badge: "Premium"
    }
  ];

  const additionalFeatures: AdditionalFeature[] = [
    {
      icon: Brain,
      title: "Sistema de Créditos WhoCoins",
      description: "Use créditos para liberar recursos premium sob demanda"
    },
    {
      icon: Shield,
      title: "Segurança Avançada",
      description: "Seus dados protegidos com criptografia de ponta"
    },
    {
      icon: Globe,
      title: "Alcance Global",
      description: "Seja encontrado por clientes do mundo todo"
    },
    {
      icon: Users,
      title: "Networking Profissional",
      description: "Conecte-se com outros profissionais da sua área"
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    }
  };

  const cardHover = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -10,
    }
  };

  const calculateYearlySavings = (monthlyPrice: number, yearlyPrice: number) => {
    return Math.max(0, (monthlyPrice * 12) - yearlyPrice);
  };

  return (
    <OnlyClient>
      <section id="pricing" className="relative py-32 bg-gradient-to-br from-black via-indigo-950/20 to-black text-white overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08]"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            }}
            transition={{
              duration: 40,
              repeat: Infinity,
            }}
            style={{
              backgroundSize: '400% 400%'
            }}
          />
          
          <motion.div
            className="absolute top-1/4 left-1/6 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, 150, 0],
              y: [0, 80, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/6 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl"
            animate={{
              x: [0, -120, 0],
              y: [0, -60, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
            }}
          />

          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.2, 1, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <motion.div 
          className="relative z-10 max-w-7xl mx-auto px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div 
            className="text-center mb-20"
            variants={fadeInUp}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm mb-6"
              whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Sparkles className="h-4 w-4 text-indigo-300" />
              </motion.div>
              <span className="text-sm font-medium text-white/80">
                ✨ Planos WhosDo
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </motion.div>

            <motion.h2 
              className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
              variants={fadeInUp}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
                Escolha Seu
              </span>
              <br />
              <motion.span 
                className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-rose-300"
                animate={{
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '200% 200%'
                }}
              >
                Plano Ideal
              </motion.span>
            </motion.h2>
            
            <motion.p 
              className="text-xl sm:text-2xl text-white/60 max-w-4xl mx-auto leading-relaxed mb-12"
              variants={fadeInUp}
            >
              Planos flexíveis com sistema de créditos para liberar recursos premium sob demanda.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div 
              className="flex items-center justify-center gap-4"
              variants={fadeInUp}
            >
              <span className={`text-sm font-medium ${!isYearly ? 'text-white' : 'text-white/60'}`}>
                Mensal
              </span>
              <motion.button
                onClick={() => setIsYearly(!isYearly)}
                className={`relative w-16 h-8 rounded-full border-2 transition-all ${
                  isYearly ? 'bg-indigo-500 border-indigo-400' : 'bg-white/[0.08] border-white/[0.15]'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  className="absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
                  animate={{
                    x: isYearly ? 32 : 2
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }}
                />
              </motion.button>
              <span className={`text-sm font-medium ${isYearly ? 'text-white' : 'text-white/60'}`}>
                Anual
              </span>
              {isYearly && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="px-2 py-1 bg-green-500/20 border border-green-400/30 rounded-full text-xs text-green-300"
                >
                  Economize 20%
                </motion.div>
              )}
            </motion.div>
          </motion.div>

          {/* Pricing Cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
            variants={staggerContainer}
          >
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className="relative"
                variants={fadeInUp}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
              >
                <motion.div
                  className={`relative h-full p-8 rounded-3xl border backdrop-blur-xl overflow-hidden ${
                    plan.highlight
                      ? 'bg-gradient-to-br from-white/[0.12] to-white/[0.04] border-indigo-400/50'
                      : 'bg-gradient-to-br from-white/[0.08] to-white/[0.02] border-white/[0.15]'
                  }`}
                  variants={cardHover}
                  initial="rest"
                  whileHover="hover"
                  style={{
                    boxShadow: plan.highlight 
                      ? "0 25px 50px -12px rgba(99, 102, 241, 0.4), 0 0 30px rgba(99, 102, 241, 0.2)"
                      : "0 25px 50px -12px rgba(0, 0, 0, 0.5)"
                  }}
                >
                  {/* Badge */}
                  {plan.badge && (
                    <motion.div
                      className={`absolute -top-0.1 left-1/2 transform -translate-x-1/2 px-4 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${plan.borderGradient} text-white`}
                      initial={{ y: -200, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {plan.badge}
                    </motion.div>
                  )}

                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} rounded-3xl opacity-60`}
                    animate={{
                      backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                      duration: 15,
                      repeat: Infinity,
                    }}
                    style={{
                      backgroundSize: '300% 300%'
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.gradient} border border-white/20 flex items-center justify-center mb-6`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <plan.icon className="w-8 h-8 text-white" />
                    </motion.div>

                    <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                    <p className="text-white/60 text-sm mb-4">{plan.subtitle}</p>
                    <p className="text-white/80 mb-6">{plan.description}</p>

                    <div className="mb-8">
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-bold text-white">
                          R${isYearly ? plan.price.yearly : plan.price.monthly}
                        </span>
                        <span className="text-white/60">
                          /{isYearly ? 'ano' : 'mês'}
                        </span>
                      </div>
                      {isYearly && plan.price.monthly > 0 && (
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-green-400 text-sm mt-1"
                        >
                          Economize R${calculateYearlySavings(plan.price.monthly, plan.price.yearly)} por ano
                        </motion.p>
                      )}
                    </div>

                    <div className="mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <motion.div
                          key={featureIndex}
                          className="flex items-center gap-3 py-1.5"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: featureIndex * 0.1 }}
                        >
                          <div className="w-5 h-5 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-400" />
                          </div>
                          <span className="text-white/80 text-sm">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <motion.button
                      className={`w-full py-4 px-6 rounded-xl font-medium transition-all ${
                        plan.highlight
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
                          : 'bg-white/[0.08] border border-white/[0.15] text-white hover:bg-white/[0.12] hover:border-white/[0.25]'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="flex items-center justify-center gap-2">
                        {plan.price.monthly === 0 ? 'Começar Grátis' : 'Escolher Plano'}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </motion.button>
                  </div>

                  <AnimatePresence>
                    {hoveredPlan === index && (
                      <motion.div
                        className="absolute inset-0 rounded-3xl"
                        style={{
                          background: `linear-gradient(135deg, ${plan.borderGradient.replace('from-', 'rgba(').replace(' to-', ', 0.2) 0%, rgba(').replace('-', ', ')}, 0.1) 100%)`,
                          filter: 'blur(20px)',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional Features */}
          <motion.div 
            className="mb-20"
            variants={fadeInUp}
          >
            <h3 className="text-3xl font-bold text-center text-white mb-12">
              O Que Torna Nossa Plataforma Especial
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  className="p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15] text-center group hover:bg-white/[0.08] transition-all"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <motion.div
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center mx-auto mb-4"
                    whileHover={{ rotateY: 180 }}
                    transition={{ duration: 0.6 }}
                  >
                    <feature.icon className="w-6 h-6 text-indigo-300" />
                  </motion.div>
                  <h4 className="text-lg font-semibold text-white mb-2">{feature.title}</h4>
                  <p className="text-white/60 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center"
            variants={fadeInUp}
          >
            <div className="relative bg-gradient-to-br from-white/[0.08] to-white/[0.02] backdrop-blur-xl rounded-3xl border border-white/[0.15] p-8 md:p-12 overflow-hidden group max-w-4xl mx-auto">
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08] rounded-3xl"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                }}
                style={{
                  backgroundSize: '300% 300%'
                }}
              />
              
              <div className="relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-white via-indigo-200 to-rose-200 bg-clip-text text-transparent">
                    Pronto para Transformar Sua Presença Digital?
                  </span>
                </h3>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  Junte-se a milhares de profissionais que já usam o WhosDo para destacar seus serviços. 
                  Comece gratuitamente hoje mesmo.
                </p>
                
                <Button size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href="#pricing">
                    Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </OnlyClient>
  );
}

// FAQ Section
function LandingFaqSection() {
  const faqs = [
    {
      question: "Como funciona o sistema de créditos WhoCoins?",
      answer: "Os WhoCoins são créditos virtuais que você pode usar para liberar recursos premium sob demanda. Você ganha créditos através de ações na plataforma e pode comprar pacotes adicionais."
    },
    {
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento. Seus créditos acumulados permanecerão disponíveis."
    },
    {
      question: "Qual a diferença entre os planos?",
      answer: "O plano Free é ideal para começar, o Standard oferece recursos profissionais com 30 créditos mensais, e o Premium inclui todos os recursos avançados com 100 créditos mensais."
    },
    {
      question: "Como posso ganhar créditos gratuitamente?",
      answer: "Você pode ganhar créditos através de login diário, completar seu perfil, convidar amigos, criar stories e outras ações na plataforma."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Perguntas Frequentes
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tire suas dúvidas sobre os planos e o sistema de créditos
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible>
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function PublicFooter() {
  return (
    <footer className="bg-muted py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">W</span>
              </div>
              <span className="font-bold text-xl text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-muted-foreground">
              Transformando carreiras através de perfis profissionais únicos com sistema de créditos flexível.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Planos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Créditos</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Recursos</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Carreiras</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Ajuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contato</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 {siteConfig.name}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

// Main Component for Pricing Plans
function WhosDoPricingPlans() {
  const [showBanner, setShowBanner] = useState(true);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4" variant="secondary">
            📋 Planos de Assinatura
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Escolha o Plano Ideal para
            <span className="text-primary block">Seu Perfil Profissional</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Destaque-se no mercado com recursos exclusivos, sistema de créditos flexível 
            e ferramentas profissionais para impulsionar sua presença digital no WhosDo.com
          </p>
        </motion.div>

        {/* Upgrade Banner */}
        <AnimatePresence>
          {showBanner && (
            <UpgradeBanner onClose={() => setShowBanner(false)} />
          )}
        </AnimatePresence>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>

        {/* Credits Section */}
        <div className="mb-16">
          <CreditsSection />
        </div>

        {/* Comparison Table */}
        <div className="mb-16">
          <ComparisonTable />
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl p-8"
        >
          <h2 className="text-3xl font-bold mb-4">
            Pronto para Impulsionar Seu Perfil?
          </h2>
          <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
            Comece gratuitamente e evolua conforme suas necessidades. 
            Cancele a qualquer momento, sem compromisso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="default" className="bg-primary hover:bg-primary/90">
              Começar Gratuitamente
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="default" variant="outline">
              Falar com Vendas
            </Button>
          </div>
        </motion.div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            ✅ Sem taxas de setup • ✅ Cancele quando quiser • ✅ Suporte em português
          </p>
        </div>
      </div>
    </div>
  );
}

// Main Component
function WhosDoPricingPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-grow">
        <LandingHeroSection />
        <LandingBenefitsSection />
        <PremiumPricing />
        <WhosDoPricingPlans />
        <LandingFaqSection />
        
        {/* Final CTA Section */}
        <section className="py-16 bg-muted">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground">
              Pronto para Elevar Sua Presença Digital?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              Junte-se ao {siteConfig.name} hoje e crie um perfil profissional que se destaca com nosso sistema flexível de créditos.
            </p>
            <Button size="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="#pricing">
                Comece Agora <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}

export default WhosDoPricingPage;
