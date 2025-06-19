"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Star, Menu, X, Zap, Shield, Users, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { redirect } from 'next/navigation';

// Utility function for class names
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// Site config
const siteConfig = {
  name: "ProfilePro",
  description: "Crie um perfil profissional que se destaca"
};

// Header Component
function PublicHeader({ isTransparent = false }: { isTransparent?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      isTransparent ? "bg-transparent" : "bg-background/95 backdrop-blur-sm border-b border-border"
    )}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">P</span>
            </div>
            <span className="font-bold text-xl text-foreground">{siteConfig.name}</span>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-muted-foreground hover:text-foreground transition-colors">Benefícios</a>
            <a href="#templates" className="text-muted-foreground hover:text-foreground transition-colors">Templates</a>
            <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Preços</a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">
              <a href="/login">Entrar</a>
            </Button>
            <Button>
              <a href="/register">Começar</a>
            </Button>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border"
            >
              <div className="py-4 space-y-4">
                <a href="#benefits" className="block text-muted-foreground hover:text-foreground transition-colors">Benefícios</a>
                <a href="#templates" className="block text-muted-foreground hover:text-foreground transition-colors">Templates</a>
                <a href="#pricing" className="block text-muted-foreground hover:text-foreground transition-colors">Preços</a>
                <a href="#faq" className="block text-muted-foreground hover:text-foreground transition-colors">FAQ</a>
                <div className="flex flex-col space-y-2 pt-4">
                  <Button variant="ghost">
                    <a href="/login">Entrar</a>
                  </Button>
                  <Button>
                    <a href="/register">Começar</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
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
            ✨ Novo: Templates AI-powered
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground">
            Crie Seu Perfil
            <span className="text-primary block">Profissional</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Destaque-se no mercado com um perfil profissional único e impactante. 
            Templates modernos, fácil personalização.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg">
              <a href="/register">
                Começar Gratuitamente <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline">
              <a href="#templates">Ver Templates</a>
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
      title: "Criação Rápida",
      description: "Monte seu perfil em minutos com nossos templates inteligentes"
    },
    {
      icon: Shield,
      title: "Seguro e Confiável",
      description: "Seus dados protegidos com criptografia de ponta"
    },
    {
      icon: Users,
      title: "Networking Eficaz",
      description: "Conecte-se com profissionais da sua área"
    },
    {
      icon: Globe,
      title: "Visibilidade Global",
      description: "Seja encontrado por recrutadores do mundo todo"
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

// Templates Section
function LandingTemplatesSection() {
  const templates = [
    { name: "Executivo", category: "Liderança", preview: "bg-gradient-to-br from-blue-500 to-purple-600" },
    { name: "Criativo", category: "Design", preview: "bg-gradient-to-br from-pink-500 to-orange-500" },
    { name: "Tech", category: "Tecnologia", preview: "bg-gradient-to-br from-green-500 to-teal-600" },
    { name: "Vendas", category: "Comercial", preview: "bg-gradient-to-br from-red-500 to-pink-600" }
  ];

  return (
    <section id="templates" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Templates Profissionais
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha entre dezenas de templates criados por designers profissionais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden">
                <div className={`h-48 ${template.preview}`}></div>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>{template.category}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
function LandingTestimonialsSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Gerente de Marketing",
      content: "O ProfilePro transformou minha presença online. Consegui 3x mais visualizações no meu perfil!",
      rating: 5
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      content: "Interface intuitiva e templates incríveis. Recomendo para todos os profissionais.",
      rating: 5
    },
    {
      name: "Ana Costa",
      role: "Designer",
      content: "Finalmente um serviço que entende as necessidades dos criativos. Perfeito!",
      rating: 5
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            O Que Nossos Usuários Dizem
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Milhares de profissionais já transformaram suas carreiras
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center space-x-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription>"{testimonial.content}"</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Pricing Section
function LandingPricingSection() {
  const plans = [
    {
      name: "Básico",
      price: "Grátis",
      description: "Perfeito para começar",
      features: ["1 perfil", "Templates básicos", "Suporte por email"],
      popular: false
    },
    {
      name: "Pro",
      price: "R$ 29/mês",
      description: "Para profissionais sérios",
      features: ["Perfis ilimitados", "Todos os templates", "Analytics avançado", "Suporte prioritário"],
      popular: true
    },
    {
      name: "Enterprise",
      price: "R$ 99/mês",
      description: "Para equipes e empresas",
      features: ["Tudo do Pro", "Gestão de equipe", "API personalizada", "Suporte dedicado"],
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-muted">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Planos Para Todos
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Escolha o plano ideal para suas necessidades profissionais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className={cn("h-full", plan.popular && "border-primary shadow-lg")}>
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    Mais Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="text-3xl font-bold text-primary">{plan.price}</div>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={plan.popular ? "default" : "outline"}>
                    {plan.price === "Grátis" ? "Começar Grátis" : "Escolher Plano"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function LandingFaqSection() {
  const faqs = [
    {
      question: "Como funciona o período gratuito?",
      answer: "Você pode usar o plano básico gratuitamente por tempo ilimitado, com acesso a templates básicos e 1 perfil."
    },
    {
      question: "Posso cancelar a qualquer momento?",
      answer: "Sim, você pode cancelar sua assinatura a qualquer momento sem taxas de cancelamento."
    },
    {
      question: "Os templates são personalizáveis?",
      answer: "Todos os nossos templates são totalmente personalizáveis. Você pode alterar cores, fontes, layout e conteúdo."
    },
    {
      question: "Há suporte técnico disponível?",
      answer: "Oferecemos suporte por email para todos os usuários e suporte prioritário para assinantes Pro e Enterprise."
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
            Tire suas dúvidas sobre o {siteConfig.name}
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
                <span className="text-primary-foreground font-bold text-sm">P</span>
              </div>
              <span className="font-bold text-xl text-foreground">{siteConfig.name}</span>
            </div>
            <p className="text-muted-foreground">
              Transformando carreiras através de perfis profissionais únicos.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Produto</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Templates</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Preços</a></li>
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

// Main HomePage Component
function HomePage() {
  redirect('/dashboard/feed');
  return null;
}

export default HomePage;
