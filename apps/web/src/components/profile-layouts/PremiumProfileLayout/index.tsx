'use client';

import React, { useState, useRef, useEffect, useCallback, lazy, Suspense } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from 'framer-motion';
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
  ChevronLeft,
  ChevronRight,
  Plus,
  Pencil,
  Github,
  Settings,
  Sun,
  Moon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { sanitizeObject, validateUserProfileSecurity, secureLog } from '@/lib/security';
import { isValidUUID } from '@/lib/validation';
import { ReviewForm } from '@/components/reviews/ReviewForm';
import { ReviewList } from '@/components/reviews/ReviewList';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { supabase } from '@/lib/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';
import CouponCard from '@/components/feed/CouponCard';
import { ProfileHeader } from '@/components/profile-layouts/ProfileHeader';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../../ui/tooltip';
import { CreateCouponModal } from '@/features/dashboard/create-coupon-modal';
import { PLAN_LIMITS } from '@/features/profile/new-edit-flow/layoutFeatures';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import type { PlanType } from '@/features/profile/new-edit-flow/layoutFeatures';
import { SocialLinks } from '@/components/social/SocialLinks';
import { SkillsList } from '@/components/skills/SkillsList';
import { PortfolioGrid } from '@/components/portfolio/PortfolioGrid';
import { ServicesList } from '@/components/services/ServicesList';
import { ExperienceList } from '@/components/experience/ExperienceList';
import { EducationList } from '@/components/education/EducationList';
import { ProfileActions } from '@/components/profile-layouts/ProfileActions';
import { LocationInfo } from '@/components/profile-layouts/LocationInfo';
import FreeProfileCardHeader from '@/components/profile-layouts/ProfileCardHeader';
import { FaqSection } from '@/components/profile-layouts/FaqSection';
import { BannerPremiumSection } from '@/components/profile-layouts/PremiumProfileLayout/BannerPremiumSection';
import { YoutubeSection } from '@/components/profile-layouts/PremiumProfileLayout/YoutubeSection';
import { EventList } from '@/components/events/EventList';
import { useProfileTheme, ProfileTheme } from '@/components/profile-layouts/useProfileTheme';
import { useProfileQrCode } from '@/components/profile-layouts/useProfileQrCode';

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email?: string;
  phone?: string;
  bio?: string;
  category: string;
  profile_picture_url: string;
  cover_photo_url: string;
  location?: {
    city: string;
    country: string;
  };
  whatsappNumber?: string;
  sociallinks?: Array<{
    id: string;
    platform: string;
    url: string;
  }>;
  skills?: string[];
  portfolio?: PortfolioItem[];
  stories?: Array<{
    title: string;
    imageUrl: string;
  }>;
  premiumBanner?: {
    title: string;
    description: string;
    imageUrl: string;
    ctaText?: string;
  };
  youtubeVideoUrl?: string;
  youtubeVideoTitle?: string;
  youtubeVideoDescription?: string;
  services?: Array<{
    name: string;
    description: string;
    price?: string;
  }>;
  experience?: Array<{
    title: string;
    company: string;
    years: string;
  }>;
  education?: Array<{
    degree: string;
    institution: string;
    years: string;
  }>;
  reviews?: Array<{
    id: string;
    authorName: string;
    authorAvatarUrl: string;
    rating: number;
    comment: string;
    createdAt: string;
  }>;
  coupons?: Array<{
    code: string;
    description: string;
    discount?: string;
    validUntil?: string;
    discount_value?: string; // Adicionado para compatibilidade
    expires_at?: string; // Adicionado para compatibilidade
    created_at?: string; // Adicionado para compatibilidade
    regulation?: string; // Adicionado para compatibilidade
  }>;
  faqs?: Array<{
    question: string;
    answer: string;
  }>;
  plan?: 'free' | 'standard' | 'premium';
  public_visibility?: boolean;
  public_sections?: Record<string, boolean>;
  endereco_rua?: string;
  endereco_numero?: string;
  endereco_complemento?: string;
  endereco_bairro?: string;
  endereco_cidade?: string;
  endereco_estado?: string;
  endereco_cep?: string;
  maps_link?: string;
  events?: Array<{
    title: string;
    description: string;
    date: string;
    location: string;
  }>;
}

interface PortfolioItem {
  id: string;
  caption: string;
  imageUrl: string;
  description?: string; // Adicionado para permitir a propriedade 'description'
}

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }
>(({ className, variant = 'default', ...props }, ref) => {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground border border-input'
  };

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = 'Badge';

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-lg border bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full',
      className
    )}
    {...props}
  />
));
Avatar.displayName = 'Avatar';

const Separator = React.forwardRef<
  React.ElementRef<'div'>,
  React.ComponentPropsWithoutRef<'div'> & {
    orientation?: 'horizontal' | 'vertical';
    decorative?: boolean;
  }
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? 'none' : 'separator'}
    aria-orientation={orientation}
    className={cn(
      'shrink-0 bg-border',
      orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]',
      className
    )}
    {...props}
  />
));
Separator.displayName = 'Separator';

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
      }
      >(({ className, ...props }, ref) => (
        <div ref={ref} className={cn('w-full', className)} {...props} />
      ));
Tabs.displayName = 'Tabs';

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'inline-flex h-10 items-center justify-center rounded-md bg-slate-100 dark:bg-transparent shadow-md border border-slate-200 dark:border-0 py-2 rounded-full',
      className
    )}
    {...props}
  />
));
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
  }
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      'px-6 py-2 flex items-center justify-center rounded-full font-semibold bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100',
      'data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg',
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = 'TabsTrigger';

const TextShimmer = ({
  children,
  className,
  duration = 2,
  spread = 2
}: {
  children: string;
  className?: string;
  duration?: number;
  spread?: number;
}) => {
  const dynamicSpread = children.length * spread;

  return (
    <motion.div
      className={cn(
        'relative inline-block bg-[length:250%_100%,auto] bg-clip-text',
        'text-transparent [--base-color:#333333] [--base-gradient-color:#000]',
        '[--bg:linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--base-gradient-color),#0000_calc(50%+var(--spread)))] [background-repeat:no-repeat,padding-box]',
        'dark:[--base-color:#71717a] dark:[--base-gradient-color:#ffffff]',
        className
      )}
      initial={{ backgroundPosition: '100% center' }}
      animate={{ backgroundPosition: '0% center' }}
      transition={{
        repeat: Infinity,
        duration,
        ease: 'linear'
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`
        } as React.CSSProperties
      }
    >
      {children}
    </motion.div>
  );
};

const BackgroundGradientAnimation = ({
  gradientBackgroundStart = 'rgb(108, 0, 162)',
  gradientBackgroundEnd = 'rgb(0, 17, 82)',
  firstColor = '18, 113, 255',
  secondColor = '221, 74, 255',
  thirdColor = '100, 220, 255',
  fourthColor = '200, 50, 50',
  fifthColor = '180, 180, 50',
  pointerColor = '140, 100, 255',
  size = '80%',
  blendingValue = 'hard-light',
  children,
  className,
  interactive = true,
  containerClassName
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
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty('--gradient-background-start', gradientBackgroundStart);
    document.body.style.setProperty('--gradient-background-end', gradientBackgroundEnd);
    document.body.style.setProperty('--first-color', firstColor);
    document.body.style.setProperty('--second-color', secondColor);
    document.body.style.setProperty('--third-color', thirdColor);
    document.body.style.setProperty('--fourth-color', fourthColor);
    document.body.style.setProperty('--fifth-color', fifthColor);
    document.body.style.setProperty('--pointer-color', pointerColor);
    document.body.style.setProperty('--size', size);
    document.body.style.setProperty('--blending-value', blendingValue);
  }, []);

  useEffect(() => {
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
        'h-screen w-screen relative overflow-hidden top-0 left-0 bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]',
        containerClassName
      )}
    >
      <div className={cn('', className)}>{children}</div>
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

const ContainerScroll = ({
  titleComponent,
  children
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-2 md:p-20"
      ref={containerRef}
    >
      <div
        className="py-10 md:py-40 w-full relative"
        style={{
          perspective: '1000px'
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <ScrollCard rotate={rotate} translate={translate} scale={scale}>
          {children}
        </ScrollCard>
      </div>
    </div>
  );
};

const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate
      }}
      className="div max-w-5xl mx-auto text-center"
    >
      {titleComponent}
    </motion.div>
  );
};

const ScrollCard = ({
  rotate,
  scale,
  children
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003'
      }}
      className="max-w-5xl -mt-12 mx-auto h-[30rem] md:h-[40rem] w-full border-4 border-[#6C6C6C] p-2 md:p-6 bg-[#222222] rounded-[30px] shadow-2xl"
    >
      <div className=" h-full w-full  overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4 ">
        {children}
      </div>
    </motion.div>
  );
};

const Particles = ({
  className = '',
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = '#ffffff',
  vx = 0,
  vy = 0
}: {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  size?: number;
  refresh?: boolean;
  color?: string;
  vx?: number;
  vy?: number;
}) => {
  const [ready, setReady] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const canvasSize = useRef({ w: 0, h: 0 });
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1;

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);
    return () => {
      window.removeEventListener('resize', initCanvas);
    };
  }, [color, ready]);

  useEffect(() => {
    if (!ready) return;
    initCanvas();
  }, [refresh, ready]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current.length = 0;
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  const circleParams = (): any => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const pSize = Math.floor(Math.random() * 2) + size;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size: pSize,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism
    };
  };

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace('#', '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((char) => char + char)
        .join('');
    }
    const hexInt = parseInt(hex, 16);
    const red = (hexInt >> 16) & 255;
    const green = (hexInt >> 8) & 255;
    const blue = hexInt & 255;
    return [red, green, blue];
  };

  const rgb = hexToRgb(color);

  const drawCircle = (circle: any, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(${rgb.join(', ')}, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h
      );
    }
  };

  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  const animate = () => {
    clearContext();
    circles.current.forEach((circle: any, i: number) => {
      const edge = [
        circle.x + circle.translateX - circle.size,
        canvasSize.current.w - circle.x - circle.translateX - circle.size,
        circle.y + circle.translateY - circle.size,
        canvasSize.current.h - circle.y - circle.translateY - circle.size
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx + vx;
      circle.y += circle.dy + vy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;

      drawCircle(circle, true);

      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        circles.current.splice(i, 1);
        const newCircle = circleParams();
        drawCircle(newCircle);
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={cn('pointer-events-none', className)} ref={canvasContainerRef} aria-hidden="true">
      {ready && <canvas ref={canvasRef} className="size-full" />}
    </div>
  );
};

const PortfolioItemModal = lazy(() => import('@/features/profile/portfolio-item-modal').then(mod => ({ default: mod.PortfolioItemModal })));

const PremiumProfileLayout: React.FC<{
  user?: UserProfile;
  primaryColorHex?: string;
  isCurrentUserProfile?: boolean;
  mounted?: boolean;
  onPortfolioItemClick?: (item: PortfolioItem) => void;
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
  onAddService?: () => void;
  onEditService?: (index: number) => void;
  isServiceModalOpen?: boolean;
  onCloseServiceModal?: () => void;
  editingServiceIndex?: number | null;
}> = ({
  user = {
    id: '1',
    name: 'Alex Rodriguez',
    username: 'alexrod',
    email: 'alex@example.com',
    phone: '+1 (555) 123-4567',
    bio: 'Creative designer and developer passionate about building beautiful digital experiences.',
    category: 'UI/UX Designer & Developer',
    profile_picture_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
    cover_photo_url: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop',
    location: {
      city: 'San Francisco',
      country: 'USA'
    },
    whatsappNumber: '+15551234567',
    sociallinks: [
      { id: '1', platform: 'instagram', url: 'https://instagram.com/alexrod' },
      { id: '2', platform: 'twitter', url: 'https://twitter.com/alexrod' },
      { id: '3', platform: 'linkedin', url: 'https://linkedin.com/in/alexrod' }
    ],
    skills: ['React', 'TypeScript', 'Figma', 'Node.js', 'Python', 'UI/UX Design', 'Framer Motion', 'Tailwind CSS'],
    portfolio: [
      { id: '1', caption: 'E-commerce Platform', imageUrl: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop' },
      { id: '2', caption: 'Mobile App Design', imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop' },
      { id: '3', caption: 'Brand Identity', imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop' }
    ],
    stories: [
      { title: 'Behind the Scenes', imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop' },
      { title: 'Latest Project', imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop' }
    ],
    premiumBanner: {
      title: 'Transform Your Vision',
      description: "Let's create something extraordinary together",
      imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop',
      ctaText: 'Start Project'
    },
    services: [
      { name: 'UI/UX Design', description: 'Complete design solutions from wireframes to high-fidelity prototypes', price: '$2,500' },
      { name: 'Web Development', description: 'Modern, responsive websites built with latest technologies', price: '$3,500' },
      { name: 'Brand Identity', description: 'Comprehensive branding packages including logo and guidelines', price: '$1,800' }
    ],
    experience: [
      { title: 'Senior Designer', company: 'Tech Corp', years: '2022 - Present' },
      { title: 'UI Designer', company: 'Startup Inc', years: '2020 - 2022' }
    ],
    education: [
      { degree: 'Master of Design', institution: 'Design University', years: '2018 - 2020' },
      { degree: 'Bachelor of Computer Science', institution: 'Tech Institute', years: '2014 - 2018' }
    ],
    reviews: [
      {
        id: '1',
        authorName: 'Sarah Johnson',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Exceptional work! Alex delivered beyond our expectations.',
        createdAt: '2024-01-15'
      },
      {
        id: '2',
        authorName: 'Mike Chen',
        authorAvatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        comment: 'Professional, creative, and delivered on time. Highly recommended!',
        createdAt: '2024-01-10'
      }
    ],
    coupons: [
      { code: 'FIRST20', description: '20% off your first project with us' },
      { code: 'BUNDLE50', description: '50% off when you book 3 or more services' }
    ],
    faqs: [
      { question: 'Como contratar?', answer: 'Clique no botão "Get Quote" em um dos serviços e envie sua solicitação.' },
      { question: 'Quais formas de pagamento?', answer: 'Aceito Pix, boleto e cartão de crédito.' },
      { question: 'Prazo de entrega?', answer: 'O prazo depende do serviço, mas geralmente entre 7 e 30 dias.' }
    ],
    public_visibility: true,
    public_sections: {
      about: true,
      experience: true,
      education: true,
      skills: true,
      portfolio: true,
      services: true,
      youtube: true
    },
    endereco_rua: 'Rua Exemplo',
    endereco_numero: '123',
    endereco_complemento: 'Apto 404',
    endereco_bairro: 'Bairro Exemplo',
    endereco_cidade: 'São Paulo',
    endereco_estado: 'SP',
    endereco_cep: '01310-100',
    maps_link: 'https://maps.google.com/?q=Rua+Exemplo+123+Apto+404+Bairro+Exemplo+São+Paulo+SP+01310-100'
  },
  primaryColorHex = '#6366f1',
  isCurrentUserProfile = false,
  mounted = true,
  onPortfolioItemClick = () => {},
  primaryColor,
  secondaryColor,
  font,
  onAddService = () => {},
  onEditService = () => {},
  isServiceModalOpen = false,
  onCloseServiceModal = () => {},
  editingServiceIndex = null
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [showCouponModal, setShowCouponModal] = React.useState(false);
  const [coupons, setCoupons] = React.useState(user.coupons || []);
  const [services, setServices] = useState(user.services || []);
  const [experience, setExperience] = useState(user.experience || []);
  const [portfolio, setPortfolio] = useState(user.portfolio || []);
  const [faqs, setFaqs] = useState(user.faqs || []);
  const [skills, setSkills] = useState(user.skills || []);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [editServiceIdx, setEditServiceIdx] = useState<number|null>(null);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const { theme, setTheme, setPrimaryColor, setSecondaryColor, toggleMode } = useProfileTheme();
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const { toast } = useToast();

  // Refs para as seções
  const aboutRef = useRef<HTMLDivElement>(null);
  const portfolioRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const youtubeRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id);
    };

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/profile/${user.username}`;
    const shareData = {
      title: user.name,
      text: `Check out ${user.name}'s profile!`,
      url: shareUrl
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        toast.error('Falha ao compartilhar perfil');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success('Link copiado para a área de transferência!');
      } catch (err) {
        toast.error('Falha ao copiar link');
      }
    }
  };

  const handleReviewSubmit = async ({ rating, comment }: { rating: number; comment: string }) => {
    if (!currentUserId) {
      toast({
        title: 'Erro',
        description: 'Você precisa estar logado para enviar uma avaliação.',
        variant: 'destructive'
      });
      return;
    }

    if (currentUserId === user?.id) {
      toast({
        title: 'Erro',
        description: 'Você não pode avaliar seu próprio perfil.',
        variant: 'destructive'
      });
      return;
    }

    if (!isValidUUID(currentUserId) || !isValidUUID(user?.id)) {
      toast({
        title: 'Erro',
        description: 'ID de usuário inválido para avaliação.',
        variant: 'destructive'
      });
      return;
    }

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewer_id: currentUserId,
          reviewed_user_id: user?.id,
          rating,
          comment
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar avaliação.');
      }

      toast({
        title: 'Sucesso',
        description: 'Avaliação enviada com sucesso!'
      });

    } catch (err: any) {
      console.error('Erro ao enviar avaliação:', err);
      toast({
        title: 'Erro',
        description: err.message || 'Não foi possível enviar sua avaliação.',
        variant: 'destructive'
      });
    }
  };

  // Normalização robusta do campo socialLinks (string JSON, array, ou outros formatos)
  let socialLinksArr = [];
  if (Array.isArray(user.sociallinks)) {
    socialLinksArr = user.sociallinks;
  } else if (typeof user.sociallinks === 'string') {
    try { socialLinksArr = JSON.parse(user.sociallinks); } catch {}
  }
  const safeUser = {
    ...user,
    sociallinks: Array.isArray(socialLinksArr) ? socialLinksArr : []
  };
  // Debug log removido para produção

  const handlePortfolioItemClick = (item: PortfolioItem) => {
    setSelectedPortfolioItem(item);
    setIsPortfolioModalOpen(true);
  };

  const portfolioItems = user.portfolio || [];
  let gridCols = 'grid-cols-1';
  if (portfolioItems.length === 2) gridCols = 'grid-cols-2';
  else if (portfolioItems.length === 3) gridCols = 'grid-cols-3';
  else if (portfolioItems.length === 4) gridCols = 'grid-cols-2 md:grid-cols-4';
  else if (portfolioItems.length >= 5) gridCols = 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4';

  // Dentro do componente PremiumProfileLayout, logo após a definição de user (antes de const [expandedFaq, ...]):
  // Adiciona 2 cupons de exemplo automaticamente para o usuário "joaosilva"
  if (user?.username === 'joaosilva') {
    user.coupons = [
      {
        code: 'JOAO10',
        description: '10% de desconto na primeira compra',
        discount: '10%',
        validUntil: '2099-12-31T23:59:59.000Z', // Data futura para manter o cupom ativo
        discount_value: '10%', // Adicionado para compatibilidade
        expires_at: '2099-11-30T23:59:59.000Z' // Adicionado para compatibilidade
      },
      {
        code: 'FRETEGRATIS',
        description: 'Frete grátis para todo o Brasil',
        discount: 'Frete Grátis',
        validUntil: '2099-11-30T23:59:59.000Z', // Data futura para manter o cupom ativo
        discount_value: 'Frete Grátis', // Adicionado para compatibilidade
        expires_at: '2099-11-30T23:59:59.000Z' // Adicionado para compatibilidade
      }
    ];
  }

  // Atualizar o state de cupons sempre que user.coupons mudar
  useEffect(() => {
    setCoupons(user.coupons || []);
    // Log para depuração sempre que os cupons mudarem
    // Debug log removido para produção
  }, [user.coupons]);

  const sectionRefs = {
    hero: useRef<HTMLDivElement>(null), // Adicionado para a seção Home
    portfolio: useRef<HTMLDivElement>(null),
    services: useRef<HTMLDivElement>(null),
    contact: useRef<HTMLDivElement>(null), // Adicionado para a seção Contact
    reviews: useRef<HTMLDivElement>(null),
    skills: useRef<HTMLDivElement>(null),
    experience: useRef<HTMLDivElement>(null),
    education: useRef<HTMLDivElement>(null),
    about: useRef<HTMLDivElement>(null) // Manter se for usado em outro lugar
  };

  const handleSectionClick = useCallback((section: keyof typeof sectionRefs | string) => {
    if (typeof section === 'string' && sectionRefs[section as keyof typeof sectionRefs]) {
      sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionRefs[section as keyof typeof sectionRefs]) {
      sectionRefs[section as keyof typeof sectionRefs]?.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [sectionRefs]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        // Fechar modais se existirem
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleAddCoupon = (newCoupon: any) => {
    setCoupons([...coupons, newCoupon]);
  };
  const handleRemoveCoupon = (idx: number) => {
    setCoupons(coupons.filter((_, i) => i !== idx));
  };

  const handleAddService = () => { setEditServiceIdx(null); setShowServiceModal(true); };
  const handleEditService = (idx: number) => { setEditServiceIdx(idx); setShowServiceModal(true); };

  const handleAddExperience = () => {
    setExperience(prev => [...prev, { title: '', company: '', years: '' }]);
  };
  const handleAddPortfolio = () => {
    setPortfolio(prev => [...prev, { id: Date.now().toString(), caption: '', imageUrl: '' }]);
  };
  const handleAddFaq = () => {
    setFaqs(prev => [...prev, { question: '', answer: '' }]);
  };
  const handleAddSkill = () => {
    setSkills(prev => [...prev, '']);
  };

  const plano = (user.plan === 'free' || user.plan === 'standard' || user.plan === 'premium') ? user.plan : 'free';

  // Adicione no início do componente PremiumProfileLayout, após as declarações de variáveis:
  function isSectionVisible(section: string) {
    if (!user?.public_sections) return true;
    return user.public_sections[section] !== false;
  }

  if (user?.public_visibility === false && !isCurrentUserProfile) {
    return <div className="text-center p-8">Este perfil é privado.</div>;
  }

  // Banner mock visual para teste
  // <div className="w-full h-24 bg-yellow-400 flex items-center justify-center rounded-lg mb-6 shadow-lg border border-yellow-500">
  // <span className="text-black text-xl font-bold">
  //   Promoção exclusiva: Assine o Premium e ganhe benefícios especiais!
  // </span>
  // </div>

  // Ordenar para WhatsApp primeiro
  const sortedSocialLinks = [
    ...safeUser.sociallinks.filter(link => link.platform === 'whatsapp'),
    ...safeUser.sociallinks.filter(link => link.platform !== 'whatsapp')
  ];

  // Função auxiliar para renderizar SocialLinks ou mensagem de ausência
  function RenderSocialLinks({ links }: { links: any[] }) {
    if (Array.isArray(links) && links.length > 0) {
      return (
        <SocialLinks
          links={links}
          maxToShow={10}
          highlightWhatsapp={true}
          variant="premium"
        />
      );
    }
    return (
      <div className="text-xs text-slate-500 dark:text-slate-500 mb-6 text-center">Nenhum link social cadastrado</div>
    );
  }

  // Função auxiliar para renderizar Skills Preview
  function RenderSkillsPreview({ skills }: { skills: string[] }) {
    if (!skills || skills.length === 0) return null;
    return (
      <div className="flex flex-wrap justify-center gap-2">
        {skills.slice(0, 4).map((skill, index) => (
          <Badge key={skill + '-' + index} className="bg-blue-100 dark:bg-blue-800/70 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-600/30 text-xs">
            {skill}
          </Badge>
        ))}
        {skills.length > 4 && (
          <Badge className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 border-slate-200 dark:border-slate-600/30 text-xs">
            +{skills.length - 4} mais
          </Badge>
        )}
      </div>
    );
  }

  // Função auxiliar para renderizar Avatares de Reviews
  function RenderReviewAvatars({ reviews }: { reviews: any[] }) {
    if (!reviews || reviews.length === 0) return null;
    return (
      <div className="flex -space-x-2">
        {reviews.slice(0, 3).map((review, index) => (
          <Avatar key={review.id || index} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
            <img src={review.authorAvatarUrl || '/avatar-default.png'} alt={review.authorName || 'Usuário Anônimo'} />
          </Avatar>
        ))}
      </div>
    );
  }

  // Bloco de horário de funcionamento (mock)
  const mockWorkingHours: Record<string, string> = {
    'segunda-feira': '08:00–21:00',
    'terça-feira': '08:00–21:00',
    'quarta-feira': '08:00–21:00',
    'quinta-feira': '08:00–21:00',
    'sexta-feira': '08:00–21:00',
    'sábado': '08:00–21:00',
    'domingo': '08:00–20:00'
  };
  const dias = [
    'domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'
  ];
  const hoje = dias[new Date().getDay()];
  const agora = new Date();
  const [horaInicio, horaFim] = mockWorkingHours[hoje].split('–').map((h: string) => h.trim());
  const [hInicio, mInicio] = horaInicio.split(':').map(Number);
  const [hFim, mFFim] = horaFim.split(':').map(Number); // Corrigido mFim para mFFim
  const aberto = (agora.getHours() > hInicio || (agora.getHours() === hInicio && agora.getMinutes() >= mInicio)) &&
                 (agora.getHours() < hFim || (agora.getHours() === hFim && agora.getMinutes() <= mFFim));

  // Após a definição de 'user', force o portfólio mock para teste:
  // user.portfolio = [
  //   { id: '1', caption: 'Website Institucional', imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop' },
  //   { id: '2', caption: 'App Mobile Delivery', imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop' },
  //   { id: '3', caption: 'Identidade Visual Loja', imageUrl: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?w=600&h=400&fit=crop' }
  // ];

  // Antes do return do componente PremiumProfileLayout, forçar mocks se portfolio.length === 0
  let portfolioToShow = portfolio;
  if (!portfolioToShow || portfolioToShow.length === 0) {
    portfolioToShow = [
      {
        id: '1',
        caption: 'Website Institucional',
        imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
        description: 'Site institucional moderno, responsivo e otimizado para SEO.'
      },
      {
        id: '2',
        caption: 'Campanha de Oferta',
        imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80',
        description: 'Landing page de alta conversão para campanha promocional.'
      },
      {
        id: '3',
        caption: 'Anúncio Patrocinado',
        imageUrl: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80',
        description: 'Criativo para mídia paga com foco em engajamento.'
      },
      {
        id: '4',
        caption: 'Landing Page Responsiva',
        imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        description: 'Página responsiva para captação de leads.'
      }
    ] as PortfolioItem[]; // Cast explícito para PortfolioItem[]
  }

  // Debug logs removidos para produção

  // Dentro do componente PremiumProfileLayout, antes do return (ou logo após a definição de user):
  // Banner de exemplo para o perfil micaelsants
  const exemploBannerPremium = {
    title: 'Bem-vindo ao WhosDo Premium!',
    description: 'Aproveite benefícios exclusivos, destaque seu perfil e conquiste mais clientes.',
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
    ctaText: 'Quero ser Premium!'
  };

  const profileUrl = typeof window !== 'undefined' ? window.location.href : '';
  const { qrCodeUrl, isLoading: isQrLoading } = useProfileQrCode(profileUrl);

  // Filtrar cupons válidos (sem validade ou com validade futura)
  const cuponsValidos = coupons.filter(
    c => !c.expires_at || new Date(c.expires_at) >= new Date()
  );

  return (
    <>
      <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
        {/* Banner de capa com gradiente melhorado */}
        <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative">
          <Image
            src={user.cover_photo_url || '/banners/institucional1.png'} // Fallback para imagem de capa
            alt="Capa do perfil"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            quality={90}
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          />
        </div>

        {/* Partículas e gradiente de fundo agora só aparecem após o banner de capa */}
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(15, 23, 42)"
          gradientBackgroundEnd="rgb(30, 41, 59)"
          firstColor="99, 102, 241"
          secondColor="139, 92, 246"
          thirdColor="236, 72, 153"
          fourthColor="245, 158, 11"
          fifthColor="34, 197, 94"
          containerClassName="fixed inset-0 opacity-20 dark:opacity-30"
          interactive={false}
        />
        <Particles
          className="fixed inset-0 opacity-20 dark:opacity-30"
          quantity={70}
          ease={60}
          color={primaryColorHex}
          refresh={false}
        />

        <div className="relative z-10">
          {/* Hero Section com espaçamento melhorado */}
          <section id="hero" className="relative flex items-center justify-center overflow-hidden pb-16 pt-8" ref={sectionRefs.hero}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Card de perfil */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="flex justify-center lg:justify-start order-1 lg:order-1"
                >
                  <Card className="relative bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 p-4 sm:p-6 rounded-2xl shadow-xl max-w-md w-full">
                    {isCurrentUserProfile && (
                      <Button
                        size="icon"
                        variant="ghost"
                        className="absolute top-3 right-3 z-20"
                        onClick={() => window.location.href = '/dashboard/profile-edit-v2'}
                        title="Editar Perfil"
                      >
                        <Pencil className="w-5 h-5" />
                      </Button>
                    )}
                    <div className="text-center">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="relative mb-6 inline-block"
                      >
                        <Avatar className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 border-4 border-white/20 shadow-2xl ring-4 ring-primary/60 mx-auto transition-transform duration-300 hover:scale-105 hover:shadow-2xl hover:ring-8 hover:ring-primary/80">
                          <img src={user.profile_picture_url || '/avatar-default.png'} alt={user.name} className="w-full h-full object-cover" />
                        </Avatar>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                        </div>
                      </motion.div>

                      {/* Nome do usuário dentro do card de perfil */}
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-slate-900 dark:text-white leading-tight">{user.name}</h3>
                      <p className="text-blue-700 dark:text-blue-400 font-medium mb-4">{user.category}</p>

                      {/* Quick Info com espaçamento melhorado */}
                      <div className="space-y-3 mb-6">
                        {/* Endereço completo + pino do Google Maps destacado visualmente, sem duplicidade */}

                        <div
                          className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400 mb-4 cursor-pointer select-none"
                          onClick={() => setShowFullSchedule((v) => !v)}
                        >
                          <Clock className="w-4 h-4" />
                          <span className={`font-bold ${aberto ? 'text-green-600' : 'text-red-500'}`}>{aberto ? 'Aberto' : 'Fechado'}</span>
                          {!aberto && (
                            <span className="text-xs text-gray-500">Abre {dias[(new Date().getDay() + 1) % 7]} às {mockWorkingHours[dias[(new Date().getDay() + 1) % 7]].split('–')[0]}</span>
                          )}
                          {showFullSchedule ? (
                            <ChevronUp className="w-4 h-4 ml-1" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-1" />
                          )}
                        </div>
                        {showFullSchedule && (
                          <div className="mt-1 text-xs text-gray-500 text-center">
                            <div className="font-bold text-white">Horário de funcionamento:</div>
                            <div className="font-bold text-white">{hoje} {mockWorkingHours[hoje]}</div>
                            {dias.filter(d => d !== hoje).map(dia => (
                              <div key={dia}>{dia} {mockWorkingHours[dia]}</div>
                            ))}
                          </div>
                        )}

                        {/* Social Links com layout responsivo */}
                        <div className="flex justify-center w-full my-4">
                          <RenderSocialLinks links={sortedSocialLinks} />
                        </div>
                      </div>
                      <div className="flex flex-col items-center w-full my-4">
                        <LocationInfo city={user.location?.city} country={user.location?.country} mapsLink={user.maps_link} />
                        {(user.email || user.phone) && (
                          <div className="mt-2 flex flex-col gap-1 items-center">
                            {user.email && (
                              <span className="text-sm text-gray-500">
                                <strong>Email:</strong> {user.email}
                              </span>
                            )}
                            {user.phone && (
                              <span className="text-sm text-gray-500">
                                <strong>Telefone:</strong> {user.phone}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                      {/* Botões de contato com hover effects */}
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-700 dark:to-blue-500 text-white hover:from-blue-700 hover:to-blue-500 dark:hover:from-blue-800 dark:hover:to-blue-600 font-semibold rounded-full text-base sm:text-lg py-2.5 sm:py-3 flex items-center justify-center mb-2 shadow-lg transition-all duration-300 hover:shadow-xl"
                        onClick={() => {/* lógica para abrir chat */}}
                      >
                        <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                        Chamar no Chat
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 backdrop-blur-sm font-semibold rounded-full flex items-center justify-center"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 mr-2" />
                        Compartilhar Perfil
                      </Button>
                    </div>
                  </Card>
                </motion.div>

                {/* Conteúdo principal */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="text-white order-2 lg:order-2"
                >

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                  >
                    <RenderReviewAvatars reviews={user.reviews || []} />
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
                      <div className="flex items-center gap-1 mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <span>Trusted by 100+ clients</span>
                    </div>
                  </motion.div>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-8 mt-2 leading-tight text-slate-900 dark:text-white overflow-visible"
                    style={{ marginTop: '1.5rem', marginBottom: '1.5rem' }}
                  >
                    <TextShimmer duration={3} spread={1}>
                      {user.name}
                    </TextShimmer>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="text-lg sm:text-xl md:text-2xl text-slate-700 dark:text-slate-400 mb-8 leading-relaxed max-w-2xl"
                  >
                    {user.bio || 'Transforme sua visão em realidade com expertise profissional e soluções criativas que geram resultados.'}
                  </motion.p>

                  <div className="flex flex-col items-center w-full my-4">

                  </div>

                  {/* Disponível para projetos e tags */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="mb-6 flex flex-col items-start gap-2"
                  >

                    {user.skills && user.skills.length > 0 && (
                      <SkillsList
                        skills={user.skills}
                        maxToShow={20}
                        variant="premium"
                      />
                    )}
                  </motion.div>

                  {/* CTA Buttons com espaçamento melhorado */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4"
                  >
                    <Button
                      size="lg"
                      className="bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Start Project
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700/50 backdrop-blur-sm px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-full transition-all duration-300 hover:scale-105"
                      onClick={() => handleSectionClick('portfolio')}
                    >
                      <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      View Work
                    </Button>
                  </motion.div>

                  {/* Social Proof com layout responsivo */}

                </motion.div>
              </div>
            </div>

            {/* Scroll Indicator melhorado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center gap-2"
              >
                <span className="text-xs sm:text-sm text-slate-300">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </section>

          {/* Stories reposicionados e centralizados */}
          {user.stories && user.stories.length > 0 && (
            <section className="w-full flex flex-col items-center justify-center py-8">
              <div className="flex gap-4 overflow-x-auto max-w-5xl w-full px-4 justify-center items-center">
                {user.stories.map((story, idx) => (
                  <Card key={story.title + idx} className="min-w-[120px] max-w-[120px] flex flex-col items-center p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                    <img src={story.imageUrl || '/banners/institucional1.png'} alt={story.title} className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-blue-400" />
                    <span className="text-xs text-center font-semibold text-blue-700 dark:text-blue-300">{story.title}</span>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Novo Header de Navegação */}
          <ProfileHeader
            sections={[
              { key: 'about', label: 'Sobre' },
              { key: 'portfolio', label: 'Portfólio' },
              { key: 'services', label: 'Serviços' },
              { key: 'experience', label: 'Experiência' },
              { key: 'education', label: 'Educação' },
              { key: 'reviews', label: 'Avaliações' },
              { key: 'faq', label: 'FAQ' },
              { key: 'contact', label: 'Contato' }
            ]}
            sectionRefs={sectionRefs}
            onSectionClick={handleSectionClick}
            variant="premium"
          />

          {/* Espaço entre Tabs e Banner Premium */}
          <div className="mt-8" />

          {/* Banner Premium destacado após o hero */}
          {(user.username === 'micaelsants' ? true : !!user.premiumBanner) && (
            <BannerPremiumSection premiumBanner={user.username === 'micaelsants' ? exemploBannerPremium : user.premiumBanner} />
          )}

          {/* Seção de Serviços acima do Portfólio */}
          <section id="services" className="py-20 px-4 scroll-mt-24" ref={sectionRefs.services}>
            <div className="w-full flex flex-col items-center justify-center">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
              >
                <h2 className="text-4xl font-bold mb-4 text-slate-900 dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">Serviços</h2>
                <p className="text-xl text-slate-800 dark:text-slate-400">O que posso fazer por você</p>
              </motion.div>
              <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                {services.map((service, idx) => (
                  <div key={idx} className="relative">
                    <Card className="p-5 bg-white/90 dark:bg-slate-800/90 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 transition hover:scale-[1.02] hover:shadow-lg">
                      <div className="font-semibold text-blue-800 dark:text-blue-300 text-lg mb-1">{service.name}</div>
                      <div className="text-sm text-slate-700 dark:text-slate-300 mb-2">{service.description}</div>
                      {service.price && <div className="text-xs text-primary font-bold mt-2">{service.price}</div>}
                    </Card>
                  </div>
                ))}
              </div>
            </div>
            {/* Modal de adição/edição de serviço */}
            <Dialog open={showServiceModal} onOpenChange={setShowServiceModal}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editServiceIdx === null ? 'Adicionar Serviço' : 'Editar Serviço'}</DialogTitle>
                  <DialogDescription>Preencha os dados do serviço.</DialogDescription>
                </DialogHeader>
                {/* Formulário de serviço aqui */}
                <DialogFooter>
                  {/* Botões de ação */}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>

          {/* Seção de Portfólio */}
          <section id="portfolio" className="py-20 px-4 scroll-mt-24" ref={sectionRefs.portfolio}>
            <div className="w-full flex flex-col items-center justify-center">
              {/* Debug logs removidos para produção */}
              {isSectionVisible('portfolio') && portfolioToShow.length > 0 && (
                <PortfolioGrid
                  items={portfolioToShow}
                  maxToShow={12}
                  variant="premium"
                  onItemClick={onPortfolioItemClick}
                />
              )}
            </div>
            <Suspense fallback={null}>
              <PortfolioItemModal
                item={selectedPortfolioItem}
                open={isPortfolioModalOpen}
                onOpenChange={setIsPortfolioModalOpen}
              />
            </Suspense>
          </section>

          {/* Seção de vídeo do YouTube após o portfólio */}
          {user.youtubeVideoUrl && (
            <>
              <YoutubeSection
                youtubeVideoUrl={user.youtubeVideoUrl}
                youtubeVideoTitle={user.youtubeVideoTitle}
                youtubeVideoDescription={user.youtubeVideoDescription}
              />
            </>
          )}

          {/* Experiência e Educação */}
          {isSectionVisible('experience') && (user.experience && user.experience.length > 0) && (
            <section className="py-16 px-4 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                {(user.experience && user.experience.length > 0) && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"><Briefcase className="w-5 h-5" /> Experiência</h3>
                    <div className="space-y-4">
                      {experience?.map((exp, idx) => (
                        <Card key={exp.title + exp.company + idx} className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                          <div className="font-semibold text-blue-800 dark:text-blue-300">{exp.title}</div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">{exp.company}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-500">{exp.years}</div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
                {(user.education && user.education.length > 0) && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900 dark:text-white dark:drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"><GraduationCap className="w-5 h-5" /> Educação</h3>
                    <div className="space-y-4">
                      {user.education?.map((edu, idx) => (
                        <Card key={edu.degree + edu.institution + idx} className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                          <div className="font-semibold text-blue-800 dark:text-blue-300">{edu.degree}</div>
                          <div className="text-sm text-slate-700 dark:text-slate-300">{edu.institution}</div>
                          <div className="text-xs text-slate-600 dark:text-slate-500">{edu.years}</div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {isCurrentUserProfile && (
                <Button
                  onClick={handleAddExperience}
                  disabled={(user.experience?.length ?? 0) >= PLAN_LIMITS[plano].experiences}
                  className="mb-4"
                >
                  Adicionar Experiência
                </Button>
              )}
            </section>
          )}

          {/* Seção de FAQ acima das avaliações */}
          <FaqSection
            faqs={faqs}
            canAdd={false} // Removido botão de adicionar pergunta
            onAddFaq={undefined}
            expandedFaq={expandedFaq}
            setExpandedFaq={setExpandedFaq}
            maxFaqs={PLAN_LIMITS[plano]?.faq}
          />

          <section ref={reviewsRef} className="py-20 px-6 max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <h2 className="text-5xl font-extrabold bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-md">
      Avaliações
              </h2>
              <p className="text-lg text-slate-600 dark:text-slate-400 mt-2">
      O que nossos clientes dizem
              </p>
            </div>

            {/* Bloco de Resumo e Formulário em duas colunas */}
            <div className="flex flex-col md:flex-row gap-10 mb-14 md:items-start md:justify-between">
              <div className="flex-1 min-w-[320px] bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6">
                <ReviewSummary reviewedUserId={user.id} />
              </div>

              {isCurrentUserProfile && (
                <div className="flex-1 min-w-[320px] bg-white dark:bg-slate-800 shadow-md rounded-2xl p-6">
                  <ReviewForm onSubmit={handleReviewSubmit} />
                </div>
              )}
            </div>

            {/* Carrossel de Comentários */}
            {user.reviews && user.reviews.length > 0 ? (
              <div className="w-full">
                <ReviewList
                  reviewedUserId={user.id}
                  currentUserId={currentUserId}
                  renderAsCarousel
                  reviews={user.reviews}
                />
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <div className="flex flex-col items-center text-gray-500 dark:text-gray-400">
                  <svg className="w-16 h-16 mb-6 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Nenhuma avaliação ainda</h3>
                  <p className="text-sm">Seja o primeiro a deixar uma avaliação!</p>
                </div>
              </div>
            )}
          </section>

          <Suspense fallback={null}>
            {/* Conteúdo do modal de eventos */}
            {/* <ModalCriarEvento
    open={showCreateEventModal}
    onOpenChange={setShowCreateEventModal}
    onSave={(newEvent) => { /* lógica de salvar evento * / }}
    eventToEdit={editingEvent}
  /> */}
          </Suspense>

          <ThemeCustomizer
            isOpen={isThemeOpen}
            onClose={() => setIsThemeOpen(false)}
            theme={theme}
            onThemeChange={setTheme} // Corrigido para passar a função setTheme
          />
        </div>
      </div>
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={() => setIsThemeOpen(!isThemeOpen)}
        className="absolute top-3 left-3 z-20 p-2 bg-white/80 backdrop-blur-md border border-white/20 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
        aria-label="Abrir customizador de tema"
      >
        <Settings className="w-5 h-5 text-gray-700" />
      </motion.button>
      {isThemeOpen && (
        <div className="flex justify-end mb-8">
          <ThemeCustomizer
            isOpen={isThemeOpen}
            onClose={() => setIsThemeOpen(false)}
            theme={theme}
            onThemeChange={setPrimaryColor}
          />
        </div>
      )}
      <ProfileActions user={user} isCurrentUserProfile={isCurrentUserProfile} />
      {/* Seção de Eventos */}
      {user.events && user.events.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Eventos</h2>
          {isCurrentUserProfile && (user.plan === 'standard' || user.plan === 'premium') && (
            <button
              className="btn btn-primary mb-4"
              onClick={abrirModalCriarEvento} // Implemente a função para abrir o modal/formulário
            >
              Criar novo evento
            </button>
          )}
          <EventList events={user.events} />
        </section>
      )}
      {/* Seção de Contato e QR Code */}
      <section className="py-12 px-4 sm:px-8 bg-[#f7fafd] dark:bg-gray-950 mt-12 rounded-2xl max-w-5xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-center shadow-lg">
        <div className="flex-1 flex flex-col gap-6 w-full max-w-md">
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 dark:bg-blue-800 dark:text-blue-100">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M21 8.5V17a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8.5M12 13v.01M12 17a5 5 0 0 0 5-5V7a5 5 0 0 0-10 0v5a5 5 0 0 0 5 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className="font-semibold text-lg">Email</div>
              <div className="text-gray-500 dark:text-gray-300">{user.email || 'Não informado'}</div>
            </div>
          </div>
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="bg-blue-100 text-blue-600 rounded-full p-3 dark:bg-blue-800 dark:text-blue-100">
              <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div>
              <div className="font-semibold text-lg">Localização</div>
              <div className="text-gray-500 dark:text-gray-300">{user.location?.city || ''}{user.location?.country ? ', ' + user.location.country : ''}</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 flex flex-col items-center w-full max-w-xs">
          <div className="font-semibold text-lg mb-2">Conecte-se</div>
          {/* QRCode gerado dinamicamente para o perfil */}
          <div className="mb-4">
            {isQrLoading ? (
              <span>Carregando QR Code...</span>
            ) : (
              <img src={qrCodeUrl} alt="QR Code do perfil" width={128} height={128} className="rounded-lg border p-1 bg-white shadow-md" />
            )}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition dark:border-blue-700 dark:text-blue-200 dark:hover:bg-blue-900 shadow-md shadow-black/10 dark:shadow-none">
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 8V7a5 5 0 0 0-10 0v1M12 15v2m0 0v2m0-2h2m-2 0H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Compartilhar Perfil
          </button>
        </div>
      </section>
      {/* Exibir cupons se houver */}
      {cuponsValidos.length > 0 && (
        <div className="mt-4 flex flex-col items-center">
          {cuponsValidos.map((cupom, idx) => {
            // Debug log removido para produção
            return (
              <div key={cupom.code || idx} className="w-full max-w-md">
                <CouponCard
                  user={{
                    name: user.name,
                    username: user.username,
                    avatarUrl: user.profile_picture_url || '/avatar-default.png'
                  }}
                  publishedAt={cupom.created_at || new Date().toISOString()}
                  discount={cupom.discount_value || cupom.discount || ''}
                  code={cupom.code || ''}
                  description={cupom.description || ''}
                  validUntil={cupom.expires_at || cupom.validUntil || ''}
                  brand={user.name}
                  regulation={cupom.regulation || ''}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

const ThemeCustomizer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  theme: ProfileTheme;
  onThemeChange: (theme: ProfileTheme) => void;
}> = ({ isOpen, onClose, theme, onThemeChange }) => {
  const handleColorChange = (key: keyof ProfileTheme, color: string) => {
    const newTheme = { ...theme, [key]: color };
    onThemeChange(newTheme);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-6 z-30 w-80 border border-slate-200 dark:border-slate-700 backdrop-blur-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Personalizar Tema</h3>
            <motion.button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              aria-label="Fechar customizador de tema"
              whileHover={{ scale: 1.1, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <X className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Cor Primária</label>
              <div className="flex gap-2">
                {['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'].map(color => (
                  <motion.button
                    key={color}
                    onClick={() => handleColorChange('primary', color)}
                    className={`w-8 h-8 rounded-full border-2 ${theme.primary === color ? 'border-blue-500 scale-110' : 'border-gray-300'}`}
                    style={{ backgroundColor: color }}
                    aria-label={`Selecionar cor primária ${color}`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  />
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Modo</label>
              <div className="flex gap-2">
                <button
                  onClick={() => handleColorChange('mode', 'light')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.mode === 'light' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                  aria-label="Modo claro"
                >
                  <Sun className="w-4 h-4" />
                  Claro
                </button>
                <button
                  onClick={() => handleColorChange('mode', 'dark')}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg ${theme.mode === 'dark' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'}`}
                  aria-label="Modo escuro"
                >
                  <Moon className="w-4 h-4" />
                  Escuro
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PremiumProfileLayout;
