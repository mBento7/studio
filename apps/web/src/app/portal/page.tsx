'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  IoHomeOutline,
  IoSearchOutline,
  IoAddCircleOutline,
  IoDiamondOutline,
  IoSunnyOutline,
  IoMoonOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoMailOutline,
  IoSettingsOutline,
  IoPencilOutline,
  IoNewspaperOutline,
  IoNotificationsOutline,
  IoPersonOutline,
  IoMenuOutline,
  IoCloseOutline,
  IoChevronDownOutline,
  IoTimeOutline,
  IoHeartOutline,
  IoShareSocialOutline,
  IoChatbubbleOutline,
  IoTrendingUpOutline,
  IoEyeOutline,
  IoArrowUpOutline,
  IoArrowForwardOutline,
  IoPlayOutline,
  IoPauseOutline,
  IoBookmarkOutline,
  IoOpenOutline,
  IoBriefcaseOutline,
  IoPeopleOutline,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoColorPaletteOutline,
  IoConstructOutline,
  IoStorefrontOutline,
  IoPhonePortraitOutline,
  IoBarChartOutline,
  IoShieldOutline,
  IoLockClosedOutline,
  IoCameraOutline,
  IoLaptopOutline,
  IoScaleOutline,
  IoDesktopOutline,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
  IoLocationOutline,
  IoFlashOutline,
  IoCheckmarkOutline,
  IoFunnelOutline,
  IoAddOutline,
  IoGlobeOutline
} from 'react-icons/io5';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/use-auth';
import { Logo } from '@/components/common/logo';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Clock, Eye, User, UserCheck, Palette, Wrench, Store, ExternalLink, Bookmark, Smartphone, Edit, BarChart3, MessageSquare, MessageCircle, Bell, Linkedin, Instagram, Twitter, Youtube, ArrowRight, Mail, Phone, MapPin, Search, TrendingUp, ArrowUp, X, Filter, Scale, Camera, Monitor, Share2, Handshake, Zap, Check, Lock } from 'lucide-react';

// Custom CSS for animations and Whosfy theme
const customStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(40px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-40px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
  
  @keyframes bounce {
    0%, 20%, 53%, 80%, 100% {
      transform: translate3d(0,0,0);
    }
    40%, 43% {
      transform: translate3d(0,-30px,0);
    }
    70% {
      transform: translate3d(0,-15px,0);
    }
    90% {
      transform: translate3d(0,-4px,0);
    }
  }
  
  .animate-fade-in-up {
    animation: fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .animate-slide-in-right {
    animation: slideInRight 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .animate-scale-in {
    animation: scaleIn 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
  
  .animate-shimmer {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200px 100%;
    animation: shimmer 1.5s infinite;
  }
  
  .animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  }
  
  .animate-bounce {
    animation: bounce 1s infinite;
  }
  
  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  
  .backdrop-blur-sm {
    backdrop-filter: blur(4px);
  }
  
  .backdrop-blur-md {
    backdrop-filter: blur(12px);
  }
  
  .backdrop-blur-lg {
    backdrop-filter: blur(16px);
  }
  
  .glass-effect {
    background: rgba(255, 255, 255, 0.25);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
  
  .whosfy-gradient {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%);
  }
  
  .whosfy-gradient-soft {
    background: linear-gradient(135deg, #fef2f2 0%, #fff7ed 50%, #fef2f2 100%);
  }
  
  .magma-gradient {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%);
  }
  
  .gradient-text {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 50%, #ef4444 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  
  .magma-card {
    background: linear-gradient(145deg, #ffffff 0%, #f8fafc 100%);
    border-radius: 20px;
    box-shadow: 
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06),
      0 0 0 1px rgba(255, 255, 255, 0.05);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    border: 1px solid rgba(226, 232, 240, 0.8);
    position: relative;
    overflow: hidden;
  }
  
  .magma-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(239, 68, 68, 0.3), transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .magma-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.15),
      0 0 0 1px rgba(239, 68, 68, 0.1),
      0 0 20px rgba(239, 68, 68, 0.1);
  }
  
  .magma-card:hover::before {
    opacity: 1;
  }
  
  .modern-button {
    background: linear-gradient(135deg, #ef4444 0%, #f97316 100%);
    border: none;
    border-radius: 12px;
    color: white;
    font-weight: 600;
    padding: 12px 24px;
    transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    box-shadow: 0 4px 15px rgba(239, 68, 68, 0.3);
  }
  
  .modern-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(239, 68, 68, 0.4);
    background: linear-gradient(135deg, #dc2626 0%, #ea580c 100%);
  }
  
  .magma-overlay {
    background: linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 100%);
  }
`;

// Mover para o topo do arquivo, antes do componente:
export interface FeedPost {
  id: number;
  tipo: string;
  titulo: string;
  descricao: string;
  imagem: string;
  preco: string;
  localizacao: string;
  usuario: { nome: string; avatar: string };
  curtidas: number;
  comentarios: number;
  tags: string[];
  category: string;
  date: string;
  views: string;
}

export default function MagmaPortal() {
  const { user, currentUserProfile, loading, signOutUser } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'trending' | 'latest' | 'popular'>('trending');
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [readingProgress, setReadingProgress] = useState(0);
  const heroRef = useRef(null);

  // Estados para filtros
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [hasActiveFilters, setHasActiveFilters] = useState(false);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);
      setShowScrollTop(currentScrollY > 300);

      // Reading progress
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setReadingProgress(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const toggleLike = (postId: number) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Dentro do componente, manter:
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>([]);
  const [feedLoading, setFeedLoading] = useState(true);

  // Função para capturar postagens do feed
  const fetchFeedPosts = async () => {
    try {
      setFeedLoading(true);
      // Simular busca de dados do feed - aqui você pode integrar com sua API
      const mockFeedData = [
        {
          id: 1,
          tipo: 'oferta_servico',
          titulo: 'Consultoria em Marketing Digital',
          descricao: 'Aumente suas vendas com estratégias personalizadas de marketing digital.',
          imagem: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          preco: 'R$ 299,90',
          localizacao: 'São Paulo, SP',
          usuario: { nome: 'Ana Silva', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face' },
          curtidas: 45,
          comentarios: 12,
          tags: ['marketing', 'digital', 'vendas'],
          category: 'Marketing',
          date: '2 horas atrás',
          views: '1.2k'
        },
        {
          id: 2,
          tipo: 'oferta_produto',
          titulo: 'Curso de Desenvolvimento Web',
          descricao: 'Aprenda a criar sites modernos e responsivos do zero.',
          imagem: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
          preco: 'R$ 197,00',
          localizacao: 'Online',
          usuario: { nome: 'Carlos Tech', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face' },
          curtidas: 89,
          comentarios: 23,
          tags: ['programação', 'web', 'curso'],
          category: 'Educação',
          date: '4 horas atrás',
          views: '3.5k'
        },
        {
          id: 3,
          tipo: 'solicitacao_servico',
          titulo: 'Preciso de Designer Gráfico',
          descricao: 'Busco profissional para criar identidade visual da minha empresa.',
          imagem: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
          preco: 'R$ 500,00',
          localizacao: 'Rio de Janeiro, RJ',
          usuario: { nome: 'Maria Santos', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face' },
          curtidas: 32,
          comentarios: 8,
          tags: ['design', 'identidade', 'visual'],
          category: 'Design',
          date: '6 horas atrás',
          views: '890'
        },
        {
          id: 4,
          tipo: 'oferta_servico',
          titulo: 'Personal Trainer Online',
          descricao: 'Treinos personalizados e acompanhamento nutricional.',
          imagem: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
          preco: 'R$ 150,00/mês',
          localizacao: 'Belo Horizonte, MG',
          usuario: { nome: 'João Fitness', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face' },
          curtidas: 67,
          comentarios: 15,
          tags: ['fitness', 'saúde', 'treino'],
          category: 'Saúde',
          date: '1 dia atrás',
          views: '2.1k'
        },
        {
          id: 5,
          tipo: 'oferta_produto',
          titulo: 'E-book de Receitas Saudáveis',
          descricao: '50 receitas nutritivas e saborosas para uma vida mais saudável.',
          imagem: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=600&fit=crop',
          preco: 'R$ 29,90',
          localizacao: 'Digital',
          usuario: { nome: 'Chef Healthy', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face' },
          curtidas: 156,
          comentarios: 34,
          tags: ['receitas', 'saúde', 'ebook'],
          category: 'Gastronomia',
          date: '2 dias atrás',
          views: '4.7k'
        },
        {
          id: 6,
          tipo: 'solicitacao_produto',
          titulo: 'Procuro Notebook Gamer',
          descricao: 'Interessado em notebook para jogos, orçamento até R$ 3000.',
          imagem: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=800&h=600&fit=crop',
          preco: 'Até R$ 3.000',
          localizacao: 'Brasília, DF',
          usuario: { nome: 'Pedro Gamer', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face' },
          curtidas: 23,
          comentarios: 7,
          tags: ['notebook', 'gamer', 'tecnologia'],
          category: 'Tecnologia',
          date: '3 dias atrás',
          views: '1.8k'
        }
      ];

      setFeedPosts(mockFeedData);
    } catch (error) {
      console.error('Erro ao buscar postagens do feed:', error);
    } finally {
      setFeedLoading(false);
    }
  };

  // Carregar postagens do feed
  useEffect(() => {
    fetchFeedPosts();
  }, []);

  // Organizar postagens por categoria para o portal
  const trendingPosts = {
    latest: feedPosts.slice(0, 3).map(post => ({
      id: post.id,
      title: post.titulo,
      excerpt: post.descricao,
      image: post.imagem,
      category: post.category,
      author: post.usuario.nome,
      date: post.date,
      likes: post.curtidas,
      views: post.views
    })),
    popular: feedPosts.filter(post => post.curtidas > 50).slice(0, 3).map(post => ({
      id: post.id,
      title: post.titulo,
      excerpt: post.descricao,
      image: post.imagem,
      category: post.category,
      author: post.usuario.nome,
      date: post.date,
      likes: post.curtidas,
      views: post.views
    })),
    trending: feedPosts.filter(post => post.tipo.includes('oferta')).slice(0, 3).map(post => ({
      id: post.id,
      title: post.titulo,
      excerpt: post.descricao,
      image: post.imagem,
      category: post.category,
      author: post.usuario.nome,
      date: post.date,
      likes: post.curtidas,
      views: post.views
    }))
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-red-600 border-t-transparent mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-red-600 animate-pulse">MAGMA</h2>
          <p className="text-gray-600 mt-2">Carregando portal...</p>
        </div>
      </div>
    );
  }

  const featuredPosts = [
    {
      id: 1,
      title: 'The Future of Artificial Intelligence in Modern Society',
      excerpt: 'Exploring how AI is reshaping industries and transforming the way we live and work in the 21st century.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop&crop=center&auto=format&q=80',
      category: 'Technology',
      author: 'John Smith',
      date: '2 hours ago',
      likes: 324,
      views: '12.5k'
    },
    {
      id: 2,
      title: 'Climate Change Solutions: A Global Perspective',
      excerpt: 'Innovative approaches to combating climate change from around the world.',
      image: 'https://images.unsplash.com/photo-1569163139394-de4e4f43e4e5?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      category: 'Environment',
      author: 'Sarah Johnson',
      date: '4 hours ago',
      likes: 256,
      views: '8.9k'
    },
    {
      id: 3,
      title: 'The Rise of Remote Work Culture',
      excerpt: 'How remote work is changing corporate culture and employee satisfaction.',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center&auto=format&q=80',
      category: 'Business',
      author: 'Mike Davis',
      date: '6 hours ago',
      likes: 189,
      views: '6.2k'
    }
  ];

  const sidebarPosts = [
    { title: 'Quick News Update #1', time: '10 min ago', category: 'Tech' },
    { title: 'Market Analysis Report', time: '25 min ago', category: 'Business' },
    { title: 'Sports Highlights Today', time: '1 hour ago', category: 'Sports' },
    { title: 'Weather Alert Update', time: '2 hours ago', category: 'Weather' }
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="min-h-screen bg-gray-50">
        {/* Reading Progress Bar */}
        <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-700 transition-all duration-300 ease-out"
            style={{ width: `${readingProgress}%` }}
          ></div>
        </div>

        {/* Scroll to Top Button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-110 z-40 animate-bounce"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <header className="fixed inset-x-0 top-0 z-50 border-b border-border backdrop-blur-lg bg-[rgba(255,255,255,0.55)] dark:bg-[rgba(24,27,32,0.45)] shadow-soft before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/60 before:to-white/20 before:dark:from-[#181B20]/60 before:dark:to-[#23262C]/20 before:rounded-b-2xl before:pointer-events-none before:z-[-1] backdrop-saturate-150" style={{ transform: `translateY(${Math.min(scrollY * 0.1, 10)}px)` }}>

          {/* Main Header Modernizado */}
          <div className="container mx-auto px-4 py-2">
            <div className="flex items-center justify-between">
              {/* Logo - Desktop */}
              <div className="hidden md:flex items-center animate-scale-in">
                <Logo className="h-10 w-10 text-red-500 mr-3" />
                <div>
                  <h1 className="text-4xl font-bold gradient-text tracking-tight">WHOSFY</h1>
                  <span className="text-gray-600 text-sm font-medium">Portal de Oportunidades</span>
                </div>
              </div>

              {/* Logo Mobile - Apenas ícone */}
              <div className="md:hidden flex items-center">
                <Logo className="h-8 w-8 text-red-500" />
              </div>

              {/* Mobile App-style Icons */}
              <div className="md:hidden flex items-center space-x-1">
                {/* Home Button */}
                <a href="/dashboard/feed" className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <IoHomeOutline className="w-6 h-6 text-gray-600" />
                </a>

                {/* Portal Button */}
                <a href="/portal" className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <IoNewspaperOutline className="w-6 h-6 text-gray-600" />
                </a>

                {/* Search Button */}
                <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <IoSearchOutline className="w-6 h-6 text-gray-600" />
                </button>

                {/* Create Button */}
                <a href="/create" className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <IoAddOutline className="w-6 h-6 text-gray-600" />
                </a>

                {/* Theme Toggle Button */}
                <div className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <ThemeToggle />
                </div>

                {/* Notifications Button */}
                <div className="md:block hidden">
                  <button className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center relative">
                    <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
                    <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
                  </button>
                </div>

                {/* Profile Button Mobile */}
                {loading ? (
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                ) : user && currentUserProfile ? (
                  <button className="p-1 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUserProfile.profile_picture_url} />
                      <AvatarFallback className="bg-red-100 text-red-600 text-xs">
                        {currentUserProfile.name?.charAt(0).toUpperCase() ?? '?'}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                ) : (
                  <a href="/login" className="p-3 rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                    <IoPersonOutline className="w-6 h-6 text-gray-600" />
                  </a>
                )}
              </div>

              {/* Search Bar Modernizada */}
              <div className="hidden md:flex flex-1 max-w-2xl mx-8 items-center space-x-4">
                {/* Botão Home */}
                <a href="/dashboard/feed" className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center justify-center">
                  <IoHomeOutline className="w-6 h-6 text-gray-600 hover:text-red-600" />
                </a>

                {/* Search Input Container */}
                <div className="relative flex-1 group">
                  <input
                    type="text"
                    placeholder="Buscar oportunidades, serviços, produtos..."
                    className="w-full px-8 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl bg-white/80 backdrop-blur-sm group-hover:bg-white"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2 whosfy-gradient text-white p-3 rounded-xl hover:scale-110 transition-all duration-300 shadow-lg modern-button">
                    <IoSearchOutline className="w-5 h-5" />
                  </button>
                </div>

                {/* Botão Filtro */}
                <button
                  onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                  className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center ${
                    isFiltersVisible || hasActiveFilters
                      ? 'bg-red-100 text-red-600'
                      : 'hover:bg-gray-100 text-gray-600 hover:text-red-600'
                  }`}
                >
                  <IoFunnelOutline className="w-6 h-6" />
                </button>

                {/* Botão Criar */}
                <a href="/create" className="whosfy-gradient text-white px-6 py-3 rounded-xl hover:scale-105 transition-all duration-300 shadow-lg modern-button flex items-center space-x-2 font-semibold">
                  <IoAddOutline className="w-5 h-5" />
                  <span>Criar</span>
                </a>
              </div>

              {/* Actions */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Theme Toggle */}
                <ThemeToggle />

                <div className="md:block hidden">
                  <button className="p-3 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                    <IoNotificationsOutline className="w-6 h-6 text-gray-600" />
                  </button>
                </div>

                {/* Profile Dropdown */}
                {loading ? (
                  <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                ) : user && currentUserProfile ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Avatar className="h-10 w-10 cursor-pointer ring-2 ring-transparent hover:ring-red-400 transition">
                        <AvatarImage src={currentUserProfile.profile_picture_url} />
                        <AvatarFallback className="bg-red-100 text-red-600">
                          {currentUserProfile.name?.charAt(0).toUpperCase() ?? '?'}
                        </AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium">{currentUserProfile.name}</p>
                          <p className="text-xs text-gray-500">{currentUserProfile.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href={`/${currentUserProfile.username}`} className="flex items-center gap-2 cursor-pointer">
                          <IoPersonOutline className="h-4 w-4" />
                        Ver perfil
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                          <IoPencilOutline className="h-4 w-4" />
                        Editar perfil
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/dashboard/messages" className="flex items-center gap-2 cursor-pointer">
                          <IoMailOutline className="h-4 w-4" />
                        Mensagens
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <a href="/dashboard/account" className="flex items-center gap-2 cursor-pointer">
                          <IoSettingsOutline className="h-4 w-4" />
                        Conta
                        </a>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOutUser} className="text-red-600 bg-red-50 hover:bg-red-100 flex items-center gap-2 cursor-pointer">
                        <IoLogOutOutline className="h-4 w-4" />
                      Sair
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <a
                    href="/login"
                    className="flex items-center gap-2 rounded-xl bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 transition"
                  >
                    <IoLogInOutline className="h-4 w-4" />
                    <span className="hidden sm:inline">Entrar</span>
                  </a>
                )}
              </div>

            </div>
          </div>

          {/* Mobile Menu Overlay */}
          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 bg-black/20 z-40 md:hidden"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="md:hidden bg-white border-t border-gray-200 shadow-lg relative z-50">
                <div className="container mx-auto px-4 py-4">
                  {/* Mobile Search */}
                  <div className="mb-4">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Buscar oportunidades..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-lg">
                        <IoSearchOutline className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Mobile Navigation Links */}
                  <div className="space-y-2 mb-4">
                    <a
                      href="/dashboard/feed"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IoHomeOutline className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Home</span>
                    </a>
                    <button
                      onClick={() => setIsFiltersVisible(!isFiltersVisible)}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors w-full text-left"
                    >
                      <IoFunnelOutline className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Filtros</span>
                      <IoChevronDownOutline className={`w-4 h-4 ml-auto transition-transform ${isFiltersVisible ? 'rotate-180' : ''}`} />
                    </button>
                    <a
                      href="/create"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <IoAddOutline className="w-5 h-5 text-gray-600" />
                      <span className="font-medium">Criar</span>
                    </a>
                  </div>

                  {/* Mobile Profile Section */}
                  {loading ? (
                    <div className="flex items-center gap-3 p-3">
                      <div className="h-10 w-10 animate-pulse rounded-full bg-gray-200" />
                      <div className="h-4 w-24 animate-pulse bg-gray-200 rounded" />
                    </div>
                  ) : user && currentUserProfile ? (
                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={currentUserProfile.profile_picture_url} />
                          <AvatarFallback className="bg-red-100 text-red-600">
                            {currentUserProfile.name?.charAt(0).toUpperCase() ?? '?'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{currentUserProfile.name}</p>
                          <p className="text-xs text-gray-500">{currentUserProfile.email}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <a
                          href={`/${currentUserProfile.username}`}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IoPersonOutline className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">Ver perfil</span>
                        </a>
                        <a
                          href="/dashboard"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IoPencilOutline className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">Editar perfil</span>
                        </a>
                        <a
                          href="/dashboard/messages"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IoMailOutline className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">Mensagens</span>
                        </a>
                        <a
                          href="/dashboard/account"
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <IoSettingsOutline className="w-5 h-5 text-gray-600" />
                          <span className="font-medium">Conta</span>
                        </a>
                        <button
                          onClick={() => {
                            signOutUser();
                            setIsMenuOpen(false);
                          }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 transition-colors w-full text-left text-red-600"
                        >
                          <IoLogOutOutline className="w-5 h-5" />
                          <span className="font-medium">Sair</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="border-t border-gray-200 pt-4">
                      <a
                        href="/login"
                        className="flex items-center justify-center gap-2 w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors"
                      >
                        <IoLogInOutline className="w-5 h-5" />
                    Entrar
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Filtros Recolhíveis */}
          <div className={`bg-white border-t border-gray-200 transition-all duration-500 ease-in-out overflow-hidden ${
            isFiltersVisible ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}>
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-wrap items-center gap-4">
                {/* Filtro de Categoria */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Categoria</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setHasActiveFilters(e.target.value !== 'all' || selectedLocation !== 'all' || selectedType !== 'all');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white min-w-[150px]"
                  >
                    <option value="all">Todas categorias</option>
                    <option value="servicos">Serviços</option>
                    <option value="produtos">Produtos</option>
                    <option value="oportunidades">Oportunidades</option>
                    <option value="freelance">Freelance</option>
                    <option value="consultoria">Consultoria</option>
                  </select>
                </div>

                {/* Filtro de Localização */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Localização</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => {
                      setSelectedLocation(e.target.value);
                      setHasActiveFilters(selectedCategory !== 'all' || e.target.value !== 'all' || selectedType !== 'all');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white min-w-[150px]"
                  >
                    <option value="all">Todas localizações</option>
                    <option value="sp">São Paulo</option>
                    <option value="rj">Rio de Janeiro</option>
                    <option value="mg">Minas Gerais</option>
                    <option value="online">Online</option>
                    <option value="nacional">Nacional</option>
                  </select>
                </div>

                {/* Filtro de Tipo */}
                <div className="flex flex-col">
                  <label className="text-sm font-medium text-gray-700 mb-2">Tipo</label>
                  <select
                    value={selectedType}
                    onChange={(e) => {
                      setSelectedType(e.target.value);
                      setHasActiveFilters(selectedCategory !== 'all' || selectedLocation !== 'all' || e.target.value !== 'all');
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 bg-white min-w-[150px]"
                  >
                    <option value="all">Todos tipos</option>
                    <option value="recente">Mais recentes</option>
                    <option value="popular">Mais populares</option>
                    <option value="urgente">Urgentes</option>
                    <option value="destaque">Em destaque</option>
                  </select>
                </div>

                {/* Botão Limpar Filtros */}
                {hasActiveFilters && (
                  <div className="flex flex-col justify-end">
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSelectedLocation('all');
                        setSelectedType('all');
                        setHasActiveFilters(false);
                      }}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all duration-300 flex items-center space-x-2 font-medium"
                    >
                      <X className="w-4 h-4" />
                      <span>Limpar filtros</span>
                    </button>
                  </div>
                )}

                {/* Indicador de filtros ativos */}
                {hasActiveFilters && (
                  <div className="flex items-center space-x-2 ml-auto">
                    <div className="flex items-center space-x-1 text-sm text-red-600 font-medium">
                      <Filter className="w-4 h-4" />
                      <span>Filtros ativos</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Filtros rápidos */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Filtros rápidos:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'Serviços Online', value: 'online' },
                    { label: 'Urgentes', value: 'urgente' },
                    { label: 'Freelance', value: 'freelance' },
                    { label: 'São Paulo', value: 'sp' },
                    { label: 'Consultoria', value: 'consultoria' }
                  ].map((filter) => (
                    <button
                      key={filter.value}
                      onClick={() => {
                        if (filter.value === 'online') {
                          setSelectedLocation('online');
                        } else if (filter.value === 'sp') {
                          setSelectedLocation('sp');
                        } else {
                          setSelectedCategory(filter.value);
                        }
                        setHasActiveFilters(true);
                      }}
                      className="px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-sm hover:bg-red-50 hover:text-red-600 transition-all duration-300 border border-gray-200 hover:border-red-200"
                    >
                      {filter.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Hero Section with Featured Articles */}
              <section className="mb-12">
                {/* Main Featured Article */}
                <div className="magma-card mb-8 animate-fade-in-up group">
                  <div className="relative overflow-hidden">
                    <img
                      src={featuredPosts[0].image}
                      alt={featuredPosts[0].title}
                      className="w-full h-80 md:h-96 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      ref={heroRef}
                      style={{ transform: `translateY(${scrollY * 0.2}px)` }}
                    />
                    <div className="absolute inset-0 magma-overlay group-hover:opacity-90 transition-all duration-500"></div>

                    {/* Category Badge */}
                    <div className="absolute top-6 left-6">
                      <span className="magma-gradient px-4 py-2 rounded-full text-white text-sm font-bold shadow-lg">
                        <IoTrendingUpOutline className="w-4 h-4 mr-1" /> {featuredPosts[0].category}
                      </span>
                    </div>

                    {/* Floating Action Buttons */}
                    <div className="absolute top-6 right-6 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <button
                        onClick={() => toggleLike(featuredPosts[0].id)}
                        className={`p-3 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                          likedPosts.has(featuredPosts[0].id)
                            ? 'bg-red-600 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <IoHeartOutline className={`w-5 h-5 ${likedPosts.has(featuredPosts[0].id) ? 'fill-current' : ''}`} />
                      </button>
                      <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                        <IoShareSocialOutline className="w-5 h-5" />
                      </button>
                      <button className="p-3 rounded-full bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                        <IoBookmarkOutline className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Content Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                      <h1 className="text-3xl md:text-4xl font-bold mb-4 group-hover:text-orange-300 transition-colors duration-300 leading-tight">
                        {featuredPosts[0].title}
                      </h1>
                      <p className="text-gray-200 mb-6 text-lg line-clamp-2">{featuredPosts[0].excerpt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6 text-sm">
                          <span className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            <IoPersonOutline className="w-4 h-4 mr-2" /> {featuredPosts[0].author}
                          </span>
                          <span className="flex items-center bg-white/20 px-3 py-1 rounded-full backdrop-blur-sm">
                            <Clock className="w-4 h-4 mr-2" /> {featuredPosts[0].date}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className="flex items-center text-orange-300 font-semibold">
                            <IoHeartOutline className={`w-5 h-5 mr-1 ${likedPosts.has(featuredPosts[0].id) ? 'fill-current text-red-400' : ''}`} />
                            {featuredPosts[0].likes + (likedPosts.has(featuredPosts[0].id) ? 1 : 0)}
                          </span>
                          <span className="flex items-center text-orange-300 font-semibold">
                            <Eye className="w-5 h-5 mr-1" /> {featuredPosts[0].views}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Secondary Featured Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {featuredPosts.slice(1).map((post, index) => (
                    <div key={post.id} className="magma-card group animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="relative overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Category Badge */}
                        <span className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                          {post.category}
                        </span>

                        {/* Quick Actions */}
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => toggleLike(post.id)}
                            className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 ${
                              likedPosts.has(post.id)
                                ? 'bg-red-600 text-white'
                                : 'bg-white/80 text-gray-700 hover:bg-red-600 hover:text-white'
                            }`}
                          >
                            <IoHeartOutline className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-4">
                            <span className="flex items-center">
                              <IoPersonOutline className="w-4 h-4 mr-1" /> {post.author}
                            </span>
                            <span className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" /> {post.date}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`flex items-center transition-colors ${
                                likedPosts.has(post.id)
                                  ? 'text-red-600'
                                  : 'hover:text-red-600'
                              }`}
                            >
                              <IoHeartOutline className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                              {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                            </button>
                            <span className="text-gray-400">{post.views}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Trending Section */}
              <section className="mb-12">
                <div className="magma-card p-8">
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center">
                      <div className="magma-gradient p-3 rounded-full mr-4">
                        <IoTrendingUpOutline className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-800">Trending Now</h3>
                        <p className="text-gray-600 mt-1">What's hot in the community</p>
                      </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex space-x-2 bg-gray-100 p-1 rounded-xl">
                      {['trending', 'latest', 'popular'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab as 'trending' | 'latest' | 'popular')}
                          className={`px-6 py-3 rounded-lg font-semibold capitalize transition-all duration-300 transform hover:scale-105 ${
                            activeTab === tab
                              ? 'magma-gradient text-white shadow-lg'
                              : 'text-gray-600 hover:text-gray-800 hover:bg-white'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Articles Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {((trendingPosts as Record<'trending' | 'latest' | 'popular', any[]>)[activeTab] || featuredPosts.slice(1)).map((post: FeedPost, index: number) => (
                      <article
                        key={post.id}
                        className="magma-card group cursor-pointer hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 animate-fade-in-up"
                        style={{ animationDelay: `${index * 150}ms` }}
                      >
                        <div className="relative overflow-hidden rounded-t-xl">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />
                          <div className="absolute inset-0 magma-overlay opacity-0 group-hover:opacity-80 transition-all duration-500"></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="magma-gradient px-3 py-1 rounded-full text-white text-xs font-bold shadow-lg">
                              {post.category}
                            </span>
                          </div>

                          {/* Quick Actions */}
                          <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <button
                              onClick={() => toggleLike(post.id)}
                              className={`p-2 rounded-full backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                                likedPosts.has(post.id)
                                  ? 'bg-red-600 text-white'
                                  : 'bg-white/90 text-gray-700 hover:bg-red-600 hover:text-white'
                              }`}
                            >
                              <IoHeartOutline className={`w-4 h-4 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                            </button>
                            <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-orange-500 hover:text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                              <IoShareSocialOutline className="w-4 h-4" />
                            </button>
                            <button className="p-2 rounded-full bg-white/90 text-gray-700 hover:bg-blue-500 hover:text-white backdrop-blur-sm transition-all duration-300 transform hover:scale-110">
                              <IoBookmarkOutline className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Reading Time Badge */}
                          <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm font-semibold flex items-center">
                            <Clock className="w-3 h-3 mr-1" /> {Math.ceil(post.excerpt.length / 200)} min read
                          </div>

                          {/* Hover Overlay Content */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                            <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold hover:bg-orange-500 hover:text-white transition-all duration-300 transform hover:scale-105">
                            Read Article
                            </button>
                          </div>
                        </div>

                        <div className="p-6">
                          <h4 className="font-bold text-xl mb-3 group-hover:text-red-600 transition-colors duration-300 line-clamp-2 leading-tight">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">{post.excerpt}</p>

                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center space-x-4 text-gray-500">
                              <span className="flex items-center hover:text-red-600 transition-colors cursor-pointer">
                                <User className="w-4 h-4 mr-1" /> {post.author}
                              </span>
                              <span className="flex items-center hover:text-red-600 transition-colors cursor-pointer">
                                <Clock className="w-4 h-4 mr-1" /> {post.date}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => toggleLike(post.id)}
                                className={`flex items-center transition-all duration-300 transform hover:scale-110 font-semibold ${
                                  likedPosts.has(post.id)
                                    ? 'text-red-600'
                                    : 'text-gray-500 hover:text-red-600'
                                }`}
                              >
                                <IoHeartOutline className={`w-4 h-4 mr-1 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                {post.likes + (likedPosts.has(post.id) ? 1 : 0)}
                              </button>
                              <span className="flex items-center text-gray-500 hover:text-orange-500 transition-colors cursor-pointer font-semibold">
                                <Eye className="w-4 h-4 mr-1" /> {post.views}
                              </span>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </section>

              {/* Categories Section */}
              <section className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">Categorias em Destaque</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Explore nossos serviços organizados por categoria profissional</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      title: 'Profissionais',
                      description: 'Advogados, médicos, consultores e outros profissionais liberais',
                      icon: UserCheck,
                      color: 'from-blue-500 to-blue-600',
                      posts: 45
                    },
                    {
                      title: 'Criadores',
                      description: 'Artistas, designers, fotógrafos e criadores de conteúdo',
                      icon: Palette,
                      color: 'from-purple-500 to-purple-600',
                      posts: 38
                    },
                    {
                      title: 'Técnicos',
                      description: 'Desenvolvedores, engenheiros e especialistas técnicos',
                      icon: Wrench,
                      color: 'from-green-500 to-green-600',
                      posts: 52
                    },
                    {
                      title: 'Pequenos Negócios',
                      description: 'Empreendedores, startups e pequenas empresas',
                      icon: Store,
                      color: 'from-orange-500 to-orange-600',
                      posts: 41
                    }
                  ].map((category, index) => (
                    <article
                      key={category.title}
                      className="magma-card group relative cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <div className={`h-32 bg-gradient-to-br ${category.color} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}>
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            {React.createElement(category.icon, { className: 'w-12 h-12 text-white' })}
                          </div>
                          <div className="absolute inset-0 magma-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                                {category.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {category.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
                                <IoTrendingUpOutline className="w-3 h-3 mr-1" /> {category.posts} serviços
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Features Section */}
              <section className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">Recursos Principais</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Ferramentas poderosas para impulsionar seu negócio</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      title: 'Mobile-First',
                      description: 'Design responsivo otimizado para dispositivos móveis',
                      icon: Smartphone,
                      color: 'from-pink-500 to-rose-500',
                      stats: '95% mobile'
                    },
                    {
                      title: 'Editor Visual',
                      description: 'Interface intuitiva para criação de conteúdo',
                      icon: Edit,
                      color: 'from-indigo-500 to-purple-500',
                      stats: 'Drag & Drop'
                    },
                    {
                      title: 'Analytics',
                      description: 'Métricas detalhadas e insights de performance',
                      icon: BarChart3,
                      color: 'from-emerald-500 to-teal-500',
                      stats: 'Real-time'
                    },
                    {
                      title: 'Comunicação',
                      description: 'Ferramentas integradas de chat e mensagens',
                      icon: MessageSquare,
                      color: 'from-blue-500 to-cyan-500',
                      stats: '24/7 Support'
                    },
                    {
                      title: 'SEO Otimizado',
                      description: 'Melhor posicionamento nos motores de busca',
                      icon: Search,
                      color: 'from-amber-500 to-orange-500',
                      stats: 'Top Rankings'
                    },
                    {
                      title: 'Segurança',
                      description: 'Proteção avançada de dados e privacidade',
                      icon: Lock,
                      color: 'from-red-500 to-pink-500',
                      stats: 'SSL + 2FA'
                    }
                  ].map((feature, index) => (
                    <article
                      key={feature.title}
                      className="magma-card group relative cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <div className={`h-24 bg-gradient-to-br ${feature.color} flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500`}>
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            {React.createElement(feature.icon, { className: 'w-10 h-10 text-white' })}
                          </div>
                          <div className="absolute inset-0 magma-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                                {feature.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {feature.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="flex items-center bg-red-50 text-red-600 px-3 py-1 rounded-full font-medium">
                                <TrendingUp className="w-3 h-3 mr-1" /> {feature.stats}
                              </span>
                            </div>

                            <div className="flex items-center space-x-2">
                              <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                                <ExternalLink className="w-4 h-4" />
                              </button>
                              <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                                <Bookmark className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Success Stories Section */}
              <section className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">Casos de Sucesso</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Histórias reais de transformação digital</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {[
                    {
                      title: 'Advocacia Digital',
                      description: 'Escritório aumentou clientela em 300% com presença online',
                      metric: '+300%',
                      category: 'Jurídico',
                      image: Scale,
                      author: 'Dr. Silva & Associados',
                      date: '6 meses atrás',
                      views: '2.1k'
                    },
                    {
                      title: 'Fotógrafo Freelancer',
                      description: 'Portfolio online gerou 5x mais contratos',
                      metric: '5x mais',
                      category: 'Criativo',
                      image: Camera,
                      author: 'João Photographer',
                      date: '4 meses atrás',
                      views: '1.8k'
                    },
                    {
                      title: 'Consultoria Tech',
                      description: 'Automação de processos reduziu custos em 40%',
                      metric: '-40%',
                      category: 'Tecnologia',
                      image: Monitor,
                      author: 'TechSolutions Ltd',
                      date: '3 meses atrás',
                      views: '3.2k'
                    }
                  ].map((story, index) => (
                    <article
                      key={story.title}
                      className="magma-card group relative cursor-pointer animate-fade-in-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative overflow-hidden">
                        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                          <div className="transform group-hover:scale-110 transition-transform duration-300">
                            <story.image className="w-16 h-16 text-gray-600" />
                          </div>
                          <div className="absolute inset-0 magma-overlay opacity-0 group-hover:opacity-60 transition-opacity duration-300"></div>

                          {/* Category Badge */}
                          <div className="absolute top-4 right-4">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                              {story.category}
                            </span>
                          </div>

                          {/* Metric Badge */}
                          <div className="absolute top-4 left-4">
                            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                              {story.metric}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
                                {story.title}
                              </h3>
                              <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                                {story.description}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                            <div className="flex items-center space-x-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" /> {story.author}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" /> {story.date}
                              </span>
                            </div>

                            <div className="flex items-center space-x-4">
                              <span className="flex items-center text-gray-500 hover:text-orange-500 transition-colors cursor-pointer font-semibold">
                                <Eye className="w-4 h-4 mr-1" /> {story.views}
                              </span>
                              <button className="p-2 rounded-full bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                                <Share2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              {/* Market Trends Section */}
              <section className="mb-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">Tendências do Mercado</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">Dados e insights sobre o futuro digital</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                  {[
                    {
                      title: 'Digitalização',
                      value: '85%',
                      description: 'das empresas investem em transformação digital',
                      trend: IoTrendingUpOutline,
                      color: 'from-blue-500 to-blue-600'
                    },
                    {
                      title: 'Mobile-First',
                      value: '70%',
                      description: 'do tráfego web vem de dispositivos móveis',
                      trend: Smartphone,
                      color: 'from-green-500 to-green-600'
                    },
                    {
                      title: 'Economia da Confiança',
                      value: '92%',
                      description: 'dos consumidores confiam em recomendações',
                      trend: Handshake,
                      color: 'from-purple-500 to-purple-600'
                    },
                    {
                      title: 'Velocidade',
                      value: '3s',
                      description: 'tempo máximo de carregamento esperado',
                      trend: Zap,
                      color: 'from-orange-500 to-orange-600'
                    }
                  ].map((trend, index) => (
                    <div
                      key={trend.title}
                      className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 p-6 text-center"
                      style={{ animationDelay: `${index * 75}ms` }}
                    >
                      <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${trend.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <trend.trend className="w-8 h-8 text-white" />
                      </div>
                      <div className="text-3xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                        {trend.value}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {trend.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {trend.description}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6">
              {/* Quick Updates */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 animate-slide-in-right">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-800 flex items-center border-b border-red-600 pb-2">
                    <IoTrendingUpOutline className="w-5 h-5 mr-2 text-red-600" />
                  Quick Updates
                  </h3>
                  <button className="text-red-600 hover:text-red-700 transition-colors">
                    <Bell className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {sidebarPosts.map((post, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer hover:bg-gray-50 p-2 rounded transition-all duration-300"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <h4 className="font-medium text-sm group-hover:text-red-600 transition-colors mb-1">
                        {post.title}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                        <span className="bg-gray-100 px-2 py-1 rounded group-hover:bg-red-100 transition-colors">{post.category}</span>
                        <span className="flex items-center hover:text-red-600 transition-colors"><Clock className="w-3 h-3 mr-1" /> {post.time}</span>
                      </div>
                      <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button className="p-1 rounded text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                          <IoHeartOutline className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                          <IoBookmarkOutline className="w-3 h-3" />
                        </button>
                        <button className="p-1 rounded text-gray-400 hover:text-red-600 transition-all duration-300 transform hover:scale-110">
                          <IoShareSocialOutline className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* View All Button */}
                <button className="w-full mt-4 py-2 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-all duration-300 transform hover:scale-105">
                View All Updates
                </button>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-red-600 to-red-700 rounded-lg shadow-lg p-6 text-white mb-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-slide-in-right">
                <div className="text-center mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
                  <p className="text-red-100 text-sm">Join 50,000+ readers getting the latest news and updates.</p>
                </div>

                <form className="space-y-3">
                  <div className="relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-red-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/30 transition-all duration-300"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-red-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-red-600 py-3 rounded-lg font-medium hover:bg-red-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                  Subscribe Now
                  </button>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-red-200 text-xs flex items-center gap-1"><Check className="w-3 h-3" /> No spam, unsubscribe anytime</p>
                </div>
              </div>

              {/* Popular Categories */}
              <div className="bg-white rounded-lg shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow duration-300 animate-slide-in-right">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-red-600" />
                Popular Categories
                </h3>
                <div className="space-y-2">
                  {['Technology', 'Business', 'Sports', 'Entertainment', 'Health', 'Science'].map((category, index) => (
                    <button
                      key={category}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-all duration-300 transform hover:translate-x-2 group"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{category}</span>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-gray-500 group-hover:text-red-500">{Math.floor(Math.random() * 50) + 10} posts</span>
                          <ArrowUp className="w-3 h-3 text-gray-400 group-hover:text-red-600 transform group-hover:rotate-45 transition-all duration-300" />
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4 border-b border-red-600 pb-2">
                Follow Us
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((platform) => (
                    <a
                      key={platform}
                      href="#"
                      className="bg-gray-100 hover:bg-red-600 hover:text-white text-center py-3 rounded transition-colors font-medium text-sm"
                    >
                      {platform}
                    </a>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </main>

        {/* Feed de Oportunidades */}
        <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-600 via-orange-500 to-red-700 bg-clip-text text-transparent">
                Feed de Oportunidades
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Descubra as últimas oportunidades de negócios, serviços e produtos da nossa comunidade
              </p>
            </div>

            {feedLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="magma-card p-6 animate-pulse">
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-6 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded mb-4"></div>
                    <div className="h-32 bg-gray-300 rounded mb-4"></div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-300 rounded w-20"></div>
                      <div className="h-4 bg-gray-300 rounded w-16"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {feedPosts.slice(0, 9).map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="magma-card group cursor-pointer"
                  >
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {post.usuario.nome.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-800">{post.usuario.nome}</h4>
                            <p className="text-xs text-gray-500">{post.localizacao}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            post.tipo === 'oferta_servico' ? 'bg-blue-100 text-blue-800' :
                              post.tipo === 'oferta_produto' ? 'bg-green-100 text-green-800' :
                                'bg-purple-100 text-purple-800'
                          }`}>
                            {post.tipo === 'oferta_servico' ? 'Serviço' :
                              post.tipo === 'oferta_produto' ? 'Produto' : 'Solicitação'}
                          </span>
                          {post.preco && (
                            <span className="text-lg font-bold text-red-600">
                              {post.preco}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-red-600 transition-colors duration-300">
                          {post.titulo}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                          {post.descricao}
                        </p>
                      </div>

                      {/* Image */}
                      {post.imagem && (
                        <div className="mb-4 rounded-lg overflow-hidden">
                          <img
                            src={post.imagem}
                            alt={post.titulo}
                            className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs hover:bg-red-100 hover:text-red-600 transition-colors duration-300"
                            >
                            #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                            <IoHeartOutline className="w-4 h-4" />
                            <span>{post.curtidas}</span>
                          </div>
                          <div className="flex items-center space-x-1 hover:text-red-600 transition-colors duration-300 cursor-pointer">
                            <MessageCircle className="w-4 h-4" />
                            <span>{post.comentarios}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="w-4 h-4" />
                            <span>{post.views}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg text-sm font-medium hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                        Ver Detalhes
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Ver Mais */}
            <div className="text-center mt-12">
              <button className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg font-semibold hover:from-red-700 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Ver Todas as Oportunidades
              </button>
            </div>
          </div>
        </section>

        {/* Footer Modernizado */}
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-16 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.1'%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-red-600/10 rounded-full animate-float"></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-orange-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>

          <div className="container mx-auto px-4 relative">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* About Whosfy */}
              <div className="animate-fade-in-up">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-red-600 to-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                    <IoTrendingUpOutline className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold gradient-text">Whosfy</h3>
                </div>
                <p className="text-gray-300 text-base mb-8 leading-relaxed">
                Conectando pessoas, oportunidades e negócios. Sua plataforma de confiança para descobrir e compartilhar as melhores oportunidades do mercado.
                </p>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, name: 'LinkedIn', color: 'from-blue-600 to-blue-700' },
                    { icon: Instagram, name: 'Instagram', color: 'from-pink-500 to-purple-600' },
                    { icon: Twitter, name: 'Twitter', color: 'from-blue-400 to-blue-500' },
                    { icon: Youtube, name: 'YouTube', color: 'from-red-500 to-red-600' }
                  ].map((social, index) => (
                    <a
                      key={social.name}
                      href="#"
                      className={`w-12 h-12 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-white hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-2 group`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <social.icon className="w-6 h-6 group-hover:animate-bounce" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Links Rápidos */}
              <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <ExternalLink className="w-6 h-6 mr-3 text-red-500" />
                Links Rápidos
                </h4>
                <ul className="space-y-4 text-base">
                  {['Sobre Nós', 'Contato', 'Política de Privacidade', 'Termos de Serviço', 'Anunciar'].map((link, index) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white hover:text-red-400 transition-all duration-300 transform hover:translate-x-3 flex items-center group font-medium"
                        style={{ animationDelay: `${index * 75}ms` }}
                      >
                        <ArrowRight className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-red-500" />
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Categorias */}
              <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <IoTrendingUpOutline className="w-6 h-6 mr-3 text-red-500" />
                Categorias
                </h4>
                <ul className="space-y-4 text-base">
                  {['Tecnologia', 'Negócios', 'Serviços', 'Produtos', 'Comunidade'].map((category, index) => (
                    <li key={category}>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-white hover:text-red-400 transition-all duration-300 transform hover:translate-x-3 flex items-center group font-medium"
                        style={{ animationDelay: `${index * 75}ms` }}
                      >
                        <ArrowRight className="w-5 h-5 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2 text-red-500" />
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Informações de Contato */}
              <div className="animate-fade-in-up" style={{ animationDelay: '400ms' }}>
                <h4 className="text-xl font-semibold mb-6 flex items-center">
                  <IoPersonOutline className="w-6 h-6 mr-3 text-red-500" />
                Contato
                </h4>
                <div className="space-y-5 text-base text-gray-300">
                  {[
                    { icon: Mail, text: 'contato@whosfy.com', type: 'email' },
                    { icon: Phone, text: '+55 (11) 99999-9999', type: 'phone' },
                    { icon: MapPin, text: 'São Paulo, SP - Brasil', type: 'address' }
                  ].map((contact, index) => (
                    <div
                      key={contact.type}
                      className="flex items-center space-x-4 hover:text-red-400 transition-all duration-300 cursor-pointer transform hover:translate-x-2 group"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <contact.icon className="w-6 h-6 group-hover:scale-110 transition-transform duration-300 text-red-500" />
                      <span className="font-medium">{contact.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 mt-16 pt-8 text-center">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                <p className="text-base text-gray-400 font-medium">
                &copy; 2024 Whosfy Portal. Todos os direitos reservados.
                </p>
                <p className="text-base text-gray-400 flex items-center font-medium">
                Desenvolvido com <IoHeartOutline className="w-5 h-5 mx-2 text-red-500 fill-current animate-pulse" /> para conectar oportunidades
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
