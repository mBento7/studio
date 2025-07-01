"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Star,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Youtube,
  ExternalLink,
  Award,
  Briefcase,
  GraduationCap,
  Heart,
  Share2,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  Play,
  Sparkles,
  Zap,
  Users,
  Calendar,
  Clock,
  Globe,
  ArrowRight,
  ChevronRight,
  Palette,
  Code,
  LineChart,
  MessageSquare,
  Menu,
  ArrowUpRight,
} from "lucide-react";
import type { UserProfile, PortfolioItem } from "@/lib/types";
import { defaultAdvancedProfileLayoutConfig } from "./config";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

// Função utilitária para mesclar className
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Componente Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'premium';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', asChild = false, ...props }, ref) => {
    const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
    const variants = {
      default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md hover:shadow-lg",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost: "hover:bg-accent hover:text-accent-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      premium: "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl transition-all duration-300",
    };
    const sizes = {
      default: "h-12 px-6 py-3",
      sm: "h-9 rounded-lg px-4",
      lg: "h-14 rounded-xl px-8",
      icon: "h-12 w-12 rounded-full",
    };
    return (
      <button
        className={cn(
          baseClasses, 
          variants[variant], 
          sizes[size], 
          "hover:transform hover:scale-105 active:scale-95",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

// Componente Card
const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border bg-card/30 backdrop-blur-xl text-card-foreground shadow-lg hover:shadow-xl transition-shadow duration-300 border-white/10",
        className
      )}
      {...props}
    />
  )
);
Card.displayName = "Card";

// Componente Avatar
const Avatar = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex shrink-0 overflow-hidden",
        className
      )}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

// Componente Badge
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
}
const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    const variants = {
      default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
      secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
      outline: "text-foreground",
    };
    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Badge.displayName = "Badge";

// Componente Separator
const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "shrink-0 bg-gradient-to-r from-transparent via-white/20 to-transparent h-[1px] w-full",
        className
      )}
      {...props}
    />
  )
);
Separator.displayName = "Separator";

// Função para retornar o ícone da rede social
const getSocialIcon = (platform: string) => {
  switch (platform?.toLowerCase()) {
    case 'instagram': return <Instagram className="w-5 h-5" />;
    case 'twitter': return <Twitter className="w-5 h-5" />;
    case 'linkedin': return <Linkedin className="w-5 h-5" />;
    case 'facebook': return <Facebook className="w-5 h-5" />;
    case 'youtube': return <Youtube className="w-5 h-5" />;
    default: return <ExternalLink className="w-5 h-5" />;
  }
};

// Hero Section aprimorada com avatar destacado e UX melhorada
const HeroSection = ({ user }: { user: UserProfile }) => (
  <section className="relative flex flex-col md:flex-row items-center justify-center min-h-[40vh] py-12 px-4 text-center md:text-left overflow-hidden gap-10 w-full max-w-5xl mx-auto">
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-br from-[#312e81] via-[#6d28d9] to-[#1e293b] opacity-90" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-5 mix-blend-overlay" />
    </div>
    <div className="relative flex-shrink-0 flex items-center justify-center">
      <div className="absolute -inset-2 bg-gradient-to-br from-[#6d28d9] via-[#4f46e5] to-[#ffd700] blur-xl opacity-60 animate-pulse" />
      <Avatar className="w-80 h-80 shadow-2xl shadow-yellow-400/30 relative z-10 bg-white/10 rounded-none">
        <img
          src={user.profile_picture_url}
          alt={user.name}
          className="w-full h-full object-cover rounded-none"
          style={{ objectPosition: 'center' }}
        />
      </Avatar>
    </div>
    <div className="flex-1 flex flex-col items-center md:items-start justify-center gap-4">
      <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white mb-2 drop-shadow-lg">
        <span className="bg-gradient-to-r from-[#6d28d9] via-[#4f46e5] to-[#ffd700] bg-clip-text text-transparent">
          {user.name}
        </span>
      </h1>
      <p className="text-xl md:text-2xl text-white/80 mb-2 max-w-2xl leading-relaxed">
        {user.bio || 'Bio do usuário super premium.'}
      </p>
      <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
        {user.category && (
          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20">{user.category}</span>
        )}
        {user.location?.city && (
          <span className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/20 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#ffd700]" /> {user.location.city}{user.location.state ? `, ${user.location.state}` : ''}{user.location.country ? `, ${user.location.country}` : ''}
          </span>
        )}
      </div>
      {/* Seção de links sociais */}
      <div className="flex flex-wrap gap-3 mt-4">
        {(user.socialLinks && user.socialLinks.length > 0 ? user.socialLinks : [
          { id: 'ex1', platform: 'instagram', url: '#' },
          { id: 'ex2', platform: 'linkedin', url: '#' }
        ]).map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.platform}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 border border-white/20 text-white hover:bg-gradient-to-br hover:from-[#6d28d9] hover:to-[#ffd700] hover:text-white transition-colors shadow"
          >
            {getSocialIcon(link.platform)}
          </a>
        ))}
      </div>
    </div>
  </section>
);

// Portfolio Grid aprimorado
const PortfolioGrid = ({ items, onItemClick }: { items: PortfolioItem[]; onItemClick: (item: PortfolioItem) => void }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4">
    {items.map((item: PortfolioItem, index: number) => (
      <motion.div
        key={item.id || index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 * index }}
        whileHover={{ y: -5 }}
        className="group cursor-pointer"
        onClick={() => onItemClick(item)}
      >
        <Card className="overflow-hidden">
          <div className="relative aspect-video">
            <img
              src={item.imageUrl}
              alt={item.caption}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-white mb-1">{item.caption}</h3>
            <p className="text-white/60 text-sm">{item.description}</p>
          </div>
        </Card>
      </motion.div>
    ))}
  </div>
);

interface ProfileLayoutProps {
  user: UserProfile;
  primaryColorHex: string;
  isCurrentUserProfile: boolean;
  mounted: boolean;
  toast: any;
  qrCodeUrl: string;
  onPortfolioItemClick: (item: PortfolioItem) => void;
}

const SuperPremiumProfileLayout: React.FC<ProfileLayoutProps & {
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}> = ({
  user,
  primaryColorHex,
  isCurrentUserProfile,
  mounted,
  toast,
  qrCodeUrl,
  onPortfolioItemClick,
  primaryColor,
  secondaryColor,
  font,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeStory, setActiveStory] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { toast: showToast } = useToast();
  const [activeTab, setActiveTab] = useState('sobre');

  useEffect(() => {
    const sectionIds = [
      'sec-sobre',
      'sec-skills',
      'sec-portfolio',
      'sec-experiencia',
      'sec-educacao',
      'sec-avaliacoes',
      'sec-cupons',
      'sec-contato',
    ];
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el instanceof HTMLElement);
    if (sectionElements.length === 0) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (visible.length > 0) {
          // Pega a seção mais próxima do topo
          const topMost = visible.reduce((prev, curr) =>
            prev.boundingClientRect.top < curr.boundingClientRect.top ? prev : curr
          );
          const idx = sectionElements.findIndex(el => el === topMost.target);
          if (sectionIds[idx] && activeTab !== sectionIds[idx].replace('sec-', '')) {
            setActiveTab(sectionIds[idx].replace('sec-', ''));
          }
        }
      },
      {
        root: null,
        rootMargin: '-50% 0px -49% 0px', // Centraliza a detecção
        threshold: 0.1,
      }
    );
    sectionElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Função para compartilhar o perfil
  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/profile/${user.username}`;
    const shareData = {
      title: user.name,
      text: `Veja o perfil de ${user.name} no Whosdo!`,
      url: shareUrl,
    };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (err) {}
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        showToast({ title: 'Link copiado!', description: 'O link do perfil foi copiado para a área de transferência.' });
      } catch (err) {
        showToast({ title: 'Erro ao copiar', description: 'Não foi possível copiar o link.' });
      }
    }
  };

  // Dados de exemplo para exibição de todas as seções
  const exampleStories = user.stories && user.stories.length > 0 ? user.stories : [
    { id: 's1', title: 'Exemplo Story', imageUrl: 'https://picsum.photos/seed/story1/100/100' }
  ];
  const exampleBanner = user.premiumBanner || {
    imageUrl: 'https://picsum.photos/seed/banner/800/200',
    title: 'Banner Premium Exemplo',
    description: 'Descrição do banner premium de exemplo.',
    ctaText: 'Saiba mais',
    ctaLink: '#'
  };
  const exampleSkills = user.skills && user.skills.length > 0 ? user.skills : ['Liderança', 'Inovação', 'Gestão', 'Tecnologia'];
  const examplePortfolio = user.portfolio && user.portfolio.length > 0 ? user.portfolio : [
    { id: 'p1', imageUrl: 'https://picsum.photos/seed/portfolio1/400/300', caption: 'Projeto Exemplo', description: 'Descrição do projeto.' }
  ];
  const exampleYoutube = user.youtubeVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
  const exampleYoutubeTitle = user.youtubeVideoTitle || 'Título do Vídeo Exemplo';
  const exampleYoutubeDescription = user.youtubeVideoDescription || 'Descrição do vídeo de exemplo.';
  const exampleServices = user.services && user.services.length > 0 ? user.services : [
    { id: 's1', name: 'Serviço Exemplo', description: 'Descrição do serviço de exemplo.', price: 'R$ 100' }
  ];
  const exampleExperience = user.experience && user.experience.length > 0 ? user.experience : [
    { id: 'e1', title: 'Cargo Exemplo', company: 'Empresa Exemplo', years: '2020-2022', description: 'Descrição da experiência.' }
  ];
  const exampleEducation = user.education && user.education.length > 0 ? user.education : [
    { id: 'ed1', degree: 'Graduação Exemplo', institution: 'Universidade Exemplo', years: '2018-2022' }
  ];
  const exampleReviews = user.reviews && user.reviews.length > 0 ? user.reviews : [
    { id: 'r1', authorName: 'Cliente Exemplo', rating: 5, comment: 'Ótimo trabalho!', createdAt: '2024-01-01' }
  ];
  const exampleCoupons = user.coupons && user.coupons.length > 0 ? user.coupons : [
    { id: 'c1', code: 'EXEMPLO10', description: '10% de desconto no serviço exemplo', discountValue: 10, discountType: 'percentage', expiresAt: '2024-12-31' }
  ];
  const exampleQrCode = qrCodeUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://whosdo.com/exemplo';

  return (
    <div
      className="min-h-screen bg-background text-foreground"
      style={{
        background: secondaryColor || undefined,
        color: primaryColor || undefined,
      }}
    >
      {/* Gradiente animado de fundo premium */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08] animate-gradient-move z-0 pointer-events-none" />
      <main className="relative z-10">
        {/* Imagem de capa */}
        {user.cover_photo_url && (
          <div className="w-full h-64 md:h-80 relative mb-2 z-10">
            <img
              src={user.cover_photo_url}
              alt="Capa do perfil"
              className="w-full h-full object-cover object-center shadow-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>
        )}
        {/* Tabs de navegação - glassmorphism premium */}
        <div className="w-full flex justify-center z-20 mb-8 relative">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-4xl w-full">
            <TabsList className="w-full flex justify-between gap-2 bg-transparent border-0 shadow-none px-0 py-0">
              <TabsTrigger value="sobre" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-sobre')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Sobre</TabsTrigger>
              <TabsTrigger value="skills" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-skills')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Skills</TabsTrigger>
              <TabsTrigger value="portfolio" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-portfolio')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Portfólio</TabsTrigger>
              <TabsTrigger value="experiencia" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-experiencia')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Experiência</TabsTrigger>
              <TabsTrigger value="educacao" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-educacao')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Educação</TabsTrigger>
              <TabsTrigger value="avaliacoes" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-avaliacoes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Avaliações</TabsTrigger>
              <TabsTrigger value="cupons" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-cupons')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Cupons</TabsTrigger>
              <TabsTrigger value="contato" className="h-12 px-6 rounded-full font-semibold text-white bg-white/10 border border-white/20 shadow-lg transition-all duration-200 hover:bg-white/20 hover:shadow-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#6d28d9] data-[state=active]:to-[#ffd700] data-[state=active]:text-white data-[state=active]:shadow-2xl" onClick={() => document.getElementById('sec-contato')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Contato</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        {/* HERO SUPER PREMIUM */}
        <HeroSection user={user} />

        {/* Sobre (bio) */}
        <section id="sec-sobre" className="max-w-4xl mx-auto mt-12 mb-8 px-4">
          <h2 className="text-3xl font-bold text-white mb-4">Sobre Mim</h2>
          {((user as any).about && (user as any).about !== user.bio) && (
            <p className="text-lg text-gray-200">{(user as any).about}</p>
          )}
        </section>

        {/* Skills */}
        <section id="sec-skills" className="max-w-4xl mx-auto mb-12 px-4">
          <h2 className="text-2xl font-bold text-white mb-4">Skills & Expertise</h2>
          <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
            {exampleSkills.map((skill, index) => (
              <Badge key={index} className="relative px-6 py-3 text-sm bg-background/80 backdrop-blur-sm border-primary/20 hover:bg-primary hover:text-white transition-all rounded-full">
                <Sparkles className="w-4 h-4 mr-2" />
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        {/* Portfólio */}
        <section id="sec-portfolio" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Portfolio Showcase</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {examplePortfolio.map((item, index) => (
                <Card key={index} className="overflow-hidden">
                  <div className="relative aspect-video">
                    <img src={item.imageUrl} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500" />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-white mb-1">{item.caption}</h3>
                    <p className="text-white/60 text-sm">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* YouTube Video */}
        <section id="sec-youtube" className="py-16 relative">
          <div className="container mx-auto px-6 relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">{exampleYoutubeTitle}</h2>
              <p className="text-xl text-muted-foreground">{exampleYoutubeDescription}</p>
            </div>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src={exampleYoutube}
                title={exampleYoutubeTitle}
                className="w-full h-full"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="sec-servicos" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Serviços</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {exampleServices.map((service, index) => (
                <Card key={index} className="relative p-8 h-full bg-background/80 backdrop-blur-sm border-primary/20 rounded-2xl">
                  <div className="flex items-start justify-between mb-6">
                    <h3 className="text-2xl font-semibold">{service.name}</h3>
                    {service.price && (
                      <Badge className="bg-primary/10 text-primary rounded-full text-lg px-4 py-2">
                        {service.price}
                      </Badge>
                    )}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>
                  <Button className="w-full rounded-full bg-primary hover:bg-primary/90">
                    Solicitar Orçamento
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Experiência & Educação */}
        <section id="sec-experiencia" className="py-16 relative">
          <div className="container mx-auto px-6 relative">
            <div className="grid md:grid-cols-2 gap-16 max-w-7xl mx-auto">
              {/* Experiência */}
              <div>
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <Briefcase className="w-8 h-8 mr-4 text-primary" />
                  Experiência
                </h2>
                <div className="space-y-8">
                  {exampleExperience.map((exp, index) => (
                    <div key={index} className="relative pl-8 pb-8 border-l-4 border-primary/30 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                      <h3 className="text-xl font-semibold mb-2">{exp.title}</h3>
                      <p className="text-primary font-medium mb-1">{exp.company}</p>
                      <p className="text-sm text-muted-foreground">{exp.years}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Educação */}
              <div>
                <h2 className="text-3xl font-bold mb-8 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-4 text-primary" />
                  Educação
                </h2>
                <div className="space-y-8">
                  {exampleEducation.map((edu, index) => (
                    <div key={index} className="relative pl-8 pb-8 border-l-4 border-primary/30 last:border-l-0">
                      <div className="absolute -left-2 top-0 w-4 h-4 bg-primary rounded-full" />
                      <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
                      <p className="text-primary font-medium mb-1">{edu.institution}</p>
                      <p className="text-sm text-muted-foreground">{edu.years}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section id="sec-avaliacoes" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Avaliações</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {exampleReviews.map((review, index) => (
                <Card key={index} className="relative p-8 bg-background/80 backdrop-blur-sm border-primary/20 rounded-2xl">
                  <div className="flex items-center mb-6">
                    <Avatar className="w-16 h-16 mr-4">
                      <img src={review.authorAvatarUrl || 'https://api.dicebear.com/7.x/avataaars/svg?seed=avatar'} alt={review.authorName} />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-lg">{review.authorName}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">{review.comment}</p>
                  <p className="text-sm text-muted-foreground">{new Date(review.createdAt).toLocaleDateString()}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cupons */}
        <section id="sec-cupons" className="py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-12">Cupons Especiais</h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {exampleCoupons.map((coupon, index) => (
                <Card key={index} className="relative p-8 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 border-primary/20 rounded-2xl backdrop-blur-sm">
                  <div className="flex items-center justify-between mb-6">
                    <Badge className="bg-primary text-white text-xl px-6 py-3 rounded-full font-bold">
                      {coupon.code}
                    </Badge>
                    <Button variant="outline" size="sm" className="rounded-full border-primary/20 hover:bg-primary hover:text-white">
                      Copiar Código
                    </Button>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{coupon.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contato */}
        <section id="sec-contato" className="py-16 relative">
          <div className="container mx-auto px-6 relative">
            <h2 className="text-4xl font-bold text-center mb-12">Contato</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all border border-primary/20">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">{user.email || 'exemplo@email.com'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 p-6 rounded-2xl bg-background/80 backdrop-blur-sm hover:shadow-lg transition-all border border-primary/20">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Telefone</h3>
                    <p className="text-muted-foreground">{user.phone || '(00) 00000-0000'}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-semibold text-xl mb-6">Siga-me</h3>
                  <div className="flex gap-4">
                    {(user.socialLinks && user.socialLinks.length > 0 ? user.socialLinks : [{ id: 's1', platform: 'instagram', url: '#' }]).map((social) => (
                      <a
                        key={social.id}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors relative group"
                      >
                        <span className="relative z-10">
                          {getSocialIcon(social.platform)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-xl mb-6">QR Code</h3>
                  <div className="inline-block p-6 bg-white rounded-2xl shadow-lg relative">
                    <img src={exampleQrCode} alt="QR Code" className="w-40 h-40 relative z-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 border-t border-border/50 relative">
        <div className="container mx-auto px-6 text-center relative">
          <span className="flex items-center justify-center gap-2 text-muted-foreground">
            <span>© 2024 {user.name}. Todos os direitos reservados.</span>
            <span>|</span>
            <span className="flex items-center gap-1">
              Feito com <Heart className="w-4 h-4 text-red-500" fill="currentColor" />
            </span>
          </span>
        </div>
      </footer>

      {/* Botão flutuante de voltar ao topo */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-gradient-to-br from-[#6d28d9] via-[#4f46e5] to-[#ffd700] shadow-2xl border-2 border-white/20 transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_32px_8px_rgba(253,224,71,0.5)] focus:outline-none focus:ring-2 focus:ring-yellow-400/70 ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        aria-label="Voltar ao topo"
        style={{ boxShadow: '0 8px 32px 0 rgba(253,224,71,0.25), 0 2px 8px 0 rgba(80,80,180,0.18)' }}
      >
        <ChevronUp className="w-6 h-6 text-white drop-shadow-lg" />
      </button>
    </div>
  );
};

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(108, 0, 162)",
  gradientBackgroundEnd = "rgb(0, 17, 82)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "200, 50, 50",
  fifthColor = "180, 180, 50",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = React.useRef<HTMLDivElement>(null);
  const [curX, setCurX] = React.useState(0);
  const [curY, setCurY] = React.useState(0);
  const [tgX, setTgX] = React.useState(0);
  const [tgY, setTgY] = React.useState(0);

  React.useEffect(() => {
    document.body.style.setProperty("--gradient-background-start", gradientBackgroundStart);
    document.body.style.setProperty("--gradient-background-end", gradientBackgroundEnd);
    document.body.style.setProperty("--first-color", firstColor);
    document.body.style.setProperty("--second-color", secondColor);
    document.body.style.setProperty("--third-color", thirdColor);
    document.body.style.setProperty("--fourth-color", fourthColor);
    document.body.style.setProperty("--fifth-color", fifthColor);
    document.body.style.setProperty("--pointer-color", pointerColor);
    document.body.style.setProperty("--size", size);
    document.body.style.setProperty("--blending-value", blendingValue);
  }, []);

  React.useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  return (
    <div
      className={cn(
        "h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName
      )}
    >
      <div className={cn("", className)}>{children}</div>
      <div className="gradients-container h-full w-full blur-lg">
        <div className="absolute [background:radial-gradient(circle_at_center,_var(--first-color)_0,_var(--first-color)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-pulse opacity-100"></div>
        <div className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--second-color),_0.8)_0,_rgba(var(--second-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-[var(--size)] h-[var(--size)] top-[calc(50%-var(--size)/2)] left-[calc(50%-var(--size)/2)] animate-pulse opacity-100"></div>
        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className="absolute [background:radial-gradient(circle_at_center,_rgba(var(--pointer-color),_0.8)_0,_rgba(var(--pointer-color),_0)_50%)_no-repeat] [mix-blend-mode:var(--blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-70"
          />
        )}
      </div>
    </div>
  );
};

export default SuperPremiumProfileLayout; 