"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useTransform, MotionValue } from "framer-motion";
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
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ReviewForm } from "@/components/reviews/ReviewForm";
import { ReviewList } from "@/components/reviews/ReviewList";
import { ReviewSummary } from "@/components/reviews/ReviewSummary";
import { supabase } from '@/lib/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { SocialIcon } from 'react-social-icons';

interface UserProfile {
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
  }>;
}

interface PortfolioItem {
  id: string;
  caption: string;
  imageUrl: string;
}

const Badge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: "default" | "secondary" | "destructive" | "outline";
  }
>(({ className, variant = "default", ...props }, ref) => {
  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground border border-input",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        variantClasses[variant],
        className
      )}
      {...props}
    />
  );
});
Badge.displayName = "Badge";

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const Avatar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = "Avatar";

const Separator = React.forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & {
    orientation?: "horizontal" | "vertical";
    decorative?: boolean;
  }
>(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => (
  <div
    ref={ref}
    role={decorative ? "none" : "separator"}
    aria-orientation={orientation}
    className={cn(
      "shrink-0 bg-border",
      orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]",
      className
    )}
    {...props}
  />
));
Separator.displayName = "Separator";

const Tabs = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    defaultValue?: string;
    value?: string;
    onValueChange?: (value: string) => void;
  }
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("w-full", className)} {...props} />
));
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-slate-100 dark:bg-transparent shadow-md border border-slate-200 dark:border-0 py-2 rounded-full",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    value: string;
  }
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "px-6 py-2 flex items-center justify-center rounded-full font-semibold bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100",
      "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TextShimmer = ({
  children,
  className,
  duration = 2,
  spread = 2,
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
        ease: 'linear',
      }}
      style={
        {
          '--spread': `${dynamicSpread}px`,
          backgroundImage: `var(--bg), linear-gradient(var(--base-color), var(--base-color))`,
        } as React.CSSProperties
      }
    >
      {children}
    </motion.div>
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
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
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

const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
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
          perspective: "1000px",
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
        translateY: translate,
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
  children,
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
          "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
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
  className = "",
  quantity = 100,
  staticity = 50,
  ease = 50,
  size = 0.4,
  refresh = false,
  color = "#ffffff",
  vx = 0,
  vy = 0,
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
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);
    return () => {
      window.removeEventListener("resize", initCanvas);
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
      magnetism,
    };
  };

  const hexToRgb = (hex: string): number[] => {
    hex = hex.replace("#", "");
    if (hex.length === 3) {
      hex = hex
        .split("")
        .map((char) => char + char)
        .join("");
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
      context.current.fillStyle = `rgba(${rgb.join(", ")}, ${alpha})`;
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
        canvasSize.current.h,
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
    end2: number,
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
        canvasSize.current.h - circle.y - circle.translateY - circle.size,
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
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
    <div className={cn("pointer-events-none", className)} ref={canvasContainerRef} aria-hidden="true">
      {ready && <canvas ref={canvasRef} className="size-full" />}
    </div>
  );
};

const PremiumProfileLayout: React.FC<{
  user?: UserProfile;
  primaryColorHex?: string;
  isCurrentUserProfile?: boolean;
  mounted?: boolean;
  qrCodeUrl?: string;
  onPortfolioItemClick?: (item: PortfolioItem) => void;
  primaryColor?: string;
  secondaryColor?: string;
  font?: string;
}> = ({
  user = {
    id: "1",
    name: "Alex Rodriguez",
    username: "alexrod",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Creative designer and developer passionate about building beautiful digital experiences.",
    category: "UI/UX Designer & Developer",
    profile_picture_url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    cover_photo_url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=400&fit=crop",
    location: {
      city: "San Francisco",
      country: "USA"
    },
    whatsappNumber: "+15551234567",
    sociallinks: [
      { id: "1", platform: "instagram", url: "https://instagram.com/alexrod" },
      { id: "2", platform: "twitter", url: "https://twitter.com/alexrod" },
      { id: "3", platform: "linkedin", url: "https://linkedin.com/in/alexrod" }
    ],
    skills: ["React", "TypeScript", "Figma", "Node.js", "Python", "UI/UX Design", "Framer Motion", "Tailwind CSS"],
    portfolio: [
      { id: "1", caption: "E-commerce Platform", imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop" },
      { id: "2", caption: "Mobile App Design", imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop" },
      { id: "3", caption: "Brand Identity", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?w=600&h=400&fit=crop" }
    ],
    stories: [
      { title: "Behind the Scenes", imageUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop" },
      { title: "Latest Project", imageUrl: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=200&h=200&fit=crop" }
    ],
    premiumBanner: {
      title: "Transform Your Vision",
      description: "Let's create something extraordinary together",
      imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=600&fit=crop",
      ctaText: "Start Project"
    },
    services: [
      { name: "UI/UX Design", description: "Complete design solutions from wireframes to high-fidelity prototypes", price: "$2,500" },
      { name: "Web Development", description: "Modern, responsive websites built with latest technologies", price: "$3,500" },
      { name: "Brand Identity", description: "Comprehensive branding packages including logo and guidelines", price: "$1,800" }
    ],
    experience: [
      { title: "Senior Designer", company: "Tech Corp", years: "2022 - Present" },
      { title: "UI Designer", company: "Startup Inc", years: "2020 - 2022" }
    ],
    education: [
      { degree: "Master of Design", institution: "Design University", years: "2018 - 2020" },
      { degree: "Bachelor of Computer Science", institution: "Tech Institute", years: "2014 - 2018" }
    ],
    reviews: [
      {
        id: "1",
        authorName: "Sarah Johnson",
        authorAvatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        comment: "Exceptional work! Alex delivered beyond our expectations.",
        createdAt: "2024-01-15"
      },
      {
        id: "2",
        authorName: "Mike Chen",
        authorAvatarUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        comment: "Professional, creative, and delivered on time. Highly recommended!",
        createdAt: "2024-01-10"
      }
    ],
    coupons: [
      { code: "FIRST20", description: "20% off your first project with us" },
      { code: "BUNDLE50", description: "50% off when you book 3 or more services" }
    ]
  },
  primaryColorHex = "#6366f1",
  isCurrentUserProfile = false,
  mounted = true,
  qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=https://example.com",
  onPortfolioItemClick = () => {},
  primaryColor,
  secondaryColor,
  font,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [activeStory, setActiveStory] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>(undefined);

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
      url: shareUrl,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Share failed');
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        console.log('Link copied!');
      } catch (err) {
        console.log('Copy failed');
      }
    }
  };

  // Função utilitária para validar UUID
  const isValidUUID = (uuid: string) => {
    return /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/.test(uuid);
  };

  const handleReviewSubmit = async ({ rating, comment }: { rating: number; comment: string }) => {
    if (!currentUserId) {
      toast({
        title: "Erro",
        description: "Você precisa estar logado para enviar uma avaliação.",
        variant: "destructive",
      });
      return;
    }

    if (currentUserId === user?.id) {
      toast({
        title: "Erro",
        description: "Você não pode avaliar seu próprio perfil.",
        variant: "destructive",
      });
      return;
    }

    if (!isValidUUID(currentUserId) || !isValidUUID(user?.id)) {
      toast({
        title: "Erro",
        description: "ID de usuário inválido para avaliação.",
        variant: "destructive",
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
          comment,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao enviar avaliação.');
      }

      toast({
        title: "Sucesso!",
        description: "Sua avaliação foi enviada.",
        variant: "default",
      });
      // Opcional: Atualizar a lista de avaliações no frontend sem recarregar a página
      // Você pode buscar novamente as avaliações ou adicionar a nova avaliação ao estado local
    } catch (err: any) {
      console.error('Erro ao enviar avaliação:', err);
      toast({
        title: "Erro",
        description: err.message || 'Não foi possível enviar sua avaliação.',
        variant: "destructive",
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
    sociallinks: Array.isArray(socialLinksArr) ? socialLinksArr : [],
  };
  console.log('safeUser.sociallinks', safeUser.sociallinks);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Banner de capa com gradiente melhorado */}
      <div className="w-full h-64 md:h-80 lg:h-96 overflow-hidden relative">
        <Image
          src={user.cover_photo_url}
          alt="Capa do perfil"
          fill
          style={{ objectFit: 'cover', objectPosition: 'center' }}
          quality={90}
          priority
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
        <section id="hero" className="relative flex items-center justify-center overflow-hidden pb-16 pt-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Card de perfil */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex justify-center lg:justify-start order-1 lg:order-1"
              >
                <Card className="bg-white/10 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700/30 p-4 sm:p-6 rounded-2xl shadow-xl max-w-md w-full">
                  <div className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="relative mb-6 inline-block"
                    >
                      <Avatar className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 border-4 border-white/20 shadow-xl mx-auto">
                        <img src={user.profile_picture_url} alt={user.name} className="w-full h-full object-cover" />
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
                      {user.location && (
                        <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{user.location.city}, {user.location.country}</span>
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2 text-slate-600 dark:text-slate-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">Available for projects</span>
                      </div>
                    </div>

                    {/* Social Links com layout responsivo */}
                    {Array.isArray(safeUser.sociallinks) && safeUser.sociallinks.length > 0 ? (
                      <div className="flex flex-wrap justify-center gap-2 mb-6">
                        {safeUser.sociallinks.map((link, idx) => {
                          const platform = link.platform || link.type;
                          if (typeof platform !== 'string' || !platform.trim() || typeof link.url !== 'string' || !link.url.trim()) return null;
                          return (
                            <motion.div
                              key={link.id || idx}
                              whileHover={{ scale: 1.15, y: -2 }}
                              className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-100 dark:bg-slate-700/30 backdrop-blur-sm rounded-full flex items-center justify-center text-blue-600 hover:bg-blue-500 hover:text-white transition-colors border border-slate-200 dark:border-slate-600"
                            >
                              <SocialIcon
                                url={link.url}
                                style={{ width: '36px', height: '36px' }}
                                target="_blank"
                                rel="noopener noreferrer"
                              />
                            </motion.div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-xs text-slate-500 dark:text-slate-500 mb-6 text-center">Nenhum link social cadastrado</div>
                    )}

                    {/* Skills Preview com chips melhorados */}
                    <div className="mb-6">
                      <div className="flex flex-wrap justify-center gap-2">
                        {user.skills?.slice(0, 4).map((skill, index) => (
                          <Badge key={skill + '-' + index} className="bg-blue-100 dark:bg-blue-800/70 text-blue-800 dark:text-blue-100 border-blue-200 dark:border-blue-600/30 text-xs">
                            {skill}
                          </Badge>
                        ))}
                        {user.skills && user.skills.length > 4 && (
                          <Badge className="bg-slate-100 dark:bg-slate-700/50 text-slate-700 border-slate-200 dark:border-slate-600 text-xs">
                            +{user.skills.length - 4} mais
                          </Badge>
                        )}
                      </div>
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
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="inline-flex items-center bg-blue-100 dark:bg-blue-900/30 backdrop-blur-sm border border-blue-200 dark:border-blue-600/30 rounded-full px-4 py-2 mb-6"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-blue-600 dark:text-blue-300" />
                  <span className="text-sm font-medium text-blue-800 dark:text-blue-200">Professional {user.category}</span>
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
                  {user.bio || "Transform your vision into reality with professional expertise and creative solutions that drive results."}
                </motion.p>

                {/* Stats com layout responsivo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 mb-8"
                >
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300">50+</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500">Projects</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300">5.0</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500">Rating</div>
                  </div>
                  <div className="text-center sm:col-span-1 col-span-2">
                    <div className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-700 dark:text-blue-300">24h</div>
                    <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-500">Response</div>
                  </div>
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
                    onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
                  >
                    <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    View Work
                  </Button>
                </motion.div>

                {/* Social Proof com layout responsivo */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                  className="flex flex-col sm:flex-row items-center gap-4 mt-8"
                >
                  <div className="flex -space-x-2">
                    {user.reviews?.slice(0, 3).map((review, index) => (
                      <Avatar key={review.id || index} className="w-8 h-8 sm:w-10 sm:h-10 border-2 border-white">
                        <img src={review.authorAvatarUrl} alt={review.authorName} />
                      </Avatar>
                    ))}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 text-center sm:text-left">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <span>Trusted by 100+ clients</span>
                  </div>
                </motion.div>
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
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
            </motion.div>
          </motion.div>
        </section>

        {/* Stories reposicionados e centralizados */}
        {user.stories && user.stories.length > 0 && (
          <section className="w-full flex flex-col items-center justify-center py-8">
            <div className="flex gap-4 overflow-x-auto max-w-5xl w-full px-4 justify-center items-center">
              {user.stories.map((story, idx) => (
                <Card key={story.title + idx} className="min-w-[120px] max-w-[120px] flex flex-col items-center p-2 rounded-lg bg-white/80 dark:bg-slate-800/80">
                  <img src={story.imageUrl} alt={story.title} className="w-20 h-20 rounded-full object-cover mb-2 border-4 border-blue-400" />
                  <span className="text-xs text-center font-semibold text-blue-700 dark:text-blue-300">{story.title}</span>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Header Tabs Navigation entre as seções */}
        <Tabs defaultValue="portfolio" className="w-full mt-4">
          <TabsList className="flex justify-center gap-2 py-2 rounded-full">
            {[ 
              { id: 'hero', label: 'Home' },
              { id: 'portfolio', label: 'Portfolio' },
              { id: 'services', label: 'Services' },
              { id: 'contact', label: 'Contact' }
            ].map((tab) => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                onClick={() => {
                  if (tab.id === 'hero') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  } else {
                    const el = document.getElementById(tab.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 88;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }
                }}
                className={cn(
                  "px-6 py-2 flex items-center justify-center rounded-full font-semibold bg-white text-slate-700 shadow-sm transition-all duration-200 hover:bg-slate-100",
                  "data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-400 data-[state=active]:text-white data-[state=active]:shadow-lg"
                )}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        {/* Banner Premium reposicionado */}
        {user.premiumBanner && (
          <section className="w-full py-0">
            <Card className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white shadow-xl p-6 md:p-8 rounded-none">
              <img src={user.premiumBanner.imageUrl} alt="Banner Premium" className="w-full md:w-1/2 object-cover max-h-60 rounded-none" />
              <div className="flex-1 flex flex-col items-start gap-4">
                <h2 className="text-3xl font-bold">{user.premiumBanner.title}</h2>
                <p className="text-lg opacity-90">{user.premiumBanner.description}</p>
                {user.premiumBanner.ctaText && (
                  <Button size="lg" className="bg-white text-blue-700 font-bold hover:bg-blue-100 mt-2">
                    {user.premiumBanner.ctaText}
                  </Button>
                )}
              </div>
            </Card>
          </section>
        )}

        <section id="portfolio" className="py-20 px-4 scroll-mt-24">
          <div className="w-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Portfolio Showcase</h2>
              <p className="text-xl text-slate-800 dark:text-slate-400">Recent projects and creative work</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl items-center justify-center">
              {(user.portfolio || []).map((item, index) => {
                const imgSrc = item.imageUrl || '';
                return (
                  <motion.div
                    key={item.id || index}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="group cursor-pointer flex flex-col items-center justify-center"
                    onClick={() => onPortfolioItemClick(item)}
                  >
                    <Card className="overflow-hidden bg-white dark:bg-slate-800 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-lg">
                      <div className="aspect-video overflow-hidden">
                        {imgSrc ? (
                          <Image
                            src={imgSrc}
                            alt={item.caption}
                            width={600}
                            height={400}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-slate-100 text-slate-700">Sem imagem</div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-slate-800">{item.caption}</h3>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="services" className="py-20 px-4 bg-slate-100 dark:bg-slate-800 scroll-mt-24">
          <div className="w-full flex flex-col items-center justify-center">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4 text-slate-900">Services</h2>
              <p className="text-xl text-slate-800 dark:text-slate-400">What I can do for you</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl items-center justify-center">
              {user.services?.map((service) => (
                <motion.div
                  key={service.name || service.name}
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  whileHover={{ y: -5 }}
                  className="flex flex-col items-center justify-center"
                >
                  <Card className="p-6 h-full bg-white dark:bg-slate-900 shadow-lg hover:shadow-xl transition-all duration-300 rounded-lg">
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-xl font-semibold text-slate-900">{service.name}</h3>
                      {service.price && (
                        <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                          {service.price}
                        </Badge>
                      )}
                    </div>
                    <p className="text-slate-700 dark:text-slate-400 mb-6">{service.description}</p>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Get Quote
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Experiência e Educação */}
        {(user.experience?.length ?? 0) > 0 || (user.education?.length ?? 0) > 0 ? (
          <section className="py-16 px-4 max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {(user.experience?.length ?? 0) > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900"><Briefcase className="w-5 h-5" /> Experiência</h3>
                  <div className="space-y-4">
                    {user.experience?.map((exp, idx) => (
                      <Card key={exp.title + exp.company + idx} className="p-3 bg-white/80 dark:bg-slate-800/80 rounded-lg">
                        <div className="font-semibold text-blue-800 dark:text-blue-300">{exp.title}</div>
                        <div className="text-sm text-slate-700 dark:text-slate-300">{exp.company}</div>
                        <div className="text-xs text-slate-600 dark:text-slate-500">{exp.years}</div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              {(user.education?.length ?? 0) > 0 && (
                <div>
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2 text-slate-900"><GraduationCap className="w-5 h-5" /> Educação</h3>
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
          </section>
        ) : null}

        {/* Seção de Avaliações (Reviews) */}
        <section ref={reviewsRef} className="py-16 px-4 max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" /> Avaliações
          </h3>
          <ReviewSummary reviewedUserId={user.id} />
          <ReviewList reviewedUserId={user.id} currentUserId={currentUserId} />
          {!isCurrentUserProfile && currentUserId && (
            <ReviewForm onSubmit={handleReviewSubmit} />
          )}
        </section>

        {/* Cupons */}
        {user.coupons && user.coupons.length > 0 && (
          <section className="py-16 px-4 w-full flex flex-col items-center justify-center">
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-slate-900"><Award className="w-5 h-5 text-green-500" /> Cupons Exclusivos</h3>
            <div className="flex flex-wrap gap-4 w-full max-w-5xl items-center justify-center">
              {user.coupons.map((coupon, idx) => (
                <Card key={coupon.code + idx} className="py-2 px-4 sm:py-3 sm:px-5 rounded-lg shadow-md bg-white dark:bg-slate-800 flex flex-col items-center gap-1 text-center">
                  <span className="font-bold text-green-700 dark:text-green-300 text-lg sm:text-xl">{coupon.code}</span>
                  <span className="text-sm sm:text-base text-green-800 dark:text-green-200">{coupon.description}</span>
                </Card>
              ))}
            </div>
          </section>
        )}

        <section id="contact" className="py-20 px-4 scroll-mt-24">
          <div className="container mx-auto">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl font-bold mb-4">Get In Touch</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400">Let's work together</p>
            </motion.div>
            
            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                {user.email && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Email</h3>
                      <p className="text-slate-600 dark:text-slate-400">{user.email}</p>
                    </div>
                  </motion.div>
                )}
                
                {user.phone && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Phone</h3>
                      <p className="text-slate-600 dark:text-slate-400">{user.phone}</p>
                    </div>
                  </motion.div>
                )}
                
                {user.location && (
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-xl shadow-lg">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-slate-600 dark:text-slate-400">{user.location.city}, {user.location.country}</p>
                    </div>
                  </motion.div>
                )}
              </div>
              
              <div className="flex flex-col items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg text-center"
                >
                  <h3 className="text-xl font-semibold mb-4">Scan to Connect</h3>
                  <img src={qrCodeUrl} alt="QR Code" className="w-40 h-40 mx-auto mb-4" />
                  <Button onClick={handleShare} variant="outline" className="w-full">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Profile
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center gap-2"
            >
              <span>© 2024 {user.name}. All rights reserved.</span>
              <span className="flex items-center gap-1">
                Made with <Heart className="w-4 h-4 text-red-500" fill="currentColor" /> and creativity
              </span>
            </motion.div>
          </div>
        </footer>
        <motion.button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-700 ${showScrollTop ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp className="w-6 h-6" />
        </motion.button>
      </div>
    </div>
  );
};

export default PremiumProfileLayout;
