"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Youtube, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Globe, 
  Github, 
  MapPin, 
  Briefcase, 
  Phone, 
  MessageSquare, 
  Upload, 
  RefreshCw, 
  Image as ImageIcon, 
  X, 
  Facebook, 
  Twitch, 
  Link as LinkIcon, 
  CheckCircle, 
  AlertCircle, 
  PlusCircle, 
  Trash2, 
  BookOpenText,
  User,
  Mail,
  Save,
  Eye,
  Settings,
  Camera,
  MapPin as LocationIcon
} from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';

// Mock data types
interface UserProfile {
  id: string;
  email: string;
  name: string;
  username: string;
  bio?: string;
  category?: string;
  phone?: string;
  whatsappNumber?: string;
  profilePictureUrl?: string;
  profilePictureDataAiHint?: string;
  coverPhotoUrl?: string;
  coverPhotoDataAiHint?: string;
  socialLinks: SocialLink[];
  location?: {
    city?: string;
    address?: string;
    state?: string;
    country?: string;
    googleMapsUrl?: string;
  };
  plan: string;
  layoutTemplateId: string;
  services: any[];
  portfolio: any[];
  skills: any[];
  experience: any[];
  education: any[];
  isAvailable: boolean;
  themeColor: string;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
}

type ProfileFormData = Partial<UserProfile> & {
  locationCity?: string;
  locationAddress?: string;
  locationState?: string;
  locationCountry?: string;
  locationGoogleMapsUrl?: string;
};

interface SocialLinkOption {
  value: string;
  label: string;
  icon: React.ElementType;
}

// Mock data
const mockCurrentUser: UserProfile = {
  id: "1",
  email: "user@example.com",
  name: "João Silva",
  username: "joaosilva",
  bio: "Desenvolvedor Full Stack apaixonado por tecnologia",
  category: "Desenvolvedor",
  phone: "(11) 99999-9999",
  whatsappNumber: "+5511999999999",
  profilePictureUrl: "https://picsum.photos/seed/profile/400/400",
  coverPhotoUrl: "https://picsum.photos/seed/cover/1200/300",
  socialLinks: [
    { id: "1", platform: "github", url: "https://github.com/joaosilva" },
    { id: "2", platform: "linkedin", url: "https://linkedin.com/in/joaosilva" }
  ],
  location: {
    city: "São Paulo",
    state: "SP",
    country: "Brasil"
  },
  plan: "pro",
  layoutTemplateId: "modern",
  services: [],
  portfolio: [],
  skills: [],
  experience: [],
  education: [],
  isAvailable: true,
  themeColor: "#3b82f6"
};

const platformOptions: SocialLinkOption[] = [
  { value: "website", label: "Site", icon: Globe },
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "facebook", label: "Facebook", icon: Facebook },
  { value: "twitter", label: "Twitter/X", icon: Twitter },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin },
  { value: "github", label: "GitHub", icon: Github },
  { value: "youtube", label: "YouTube", icon: Youtube },
  { value: "twitch", label: "Twitch", icon: Twitch },
  { value: "discord", label: "Discord", icon: MessageSquare },
  { value: "tiktok", label: "TikTok", icon: MessageSquare },
];

const defaultProfilePicUrl = 'https://picsum.photos/seed/default-profile/400/400';
const defaultCoverPicUrl = 'https://picsum.photos/seed/default-cover/1200/300';

// Glow Effect Component
interface GlowEffectProps {
  className?: string;
  style?: React.CSSProperties;
  colors?: string[];
  mode?: 'rotate' | 'pulse' | 'breathe' | 'colorShift' | 'flowHorizontal' | 'static';
  blur?: number | 'softest' | 'soft' | 'medium' | 'strong' | 'stronger' | 'strongest' | 'none';
  scale?: number;
  duration?: number;
}

function GlowEffect({
  className,
  style,
  colors = ['#3b82f6', '#8b5cf6', '#ef4444', '#f59e0b'],
  mode = 'static',
  blur = 'medium',
  scale = 1,
  duration = 5,
}: GlowEffectProps) {
  const getBlurClass = (blur: GlowEffectProps['blur']) => {
    if (typeof blur === 'number') {
      return `blur-[${blur}px]`;
    }

    const presets = {
      softest: 'blur-sm',
      soft: 'blur',
      medium: 'blur-md',
      strong: 'blur-lg',
      stronger: 'blur-xl',
      strongest: 'blur-xl',
      none: 'blur-none',
    };

    return presets[blur as keyof typeof presets];
  };

  return (
    <motion.div
      style={{
        ...style,
        background: `linear-gradient(to right, ${colors.join(', ')})`,
        willChange: 'transform',
        backfaceVisibility: 'hidden',
      }}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full',
        getBlurClass(blur),
        className
      )}
    />
  );
}

// Enhanced Form Component
function ProfileForm() {
  const [profileUploading, setProfileUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [usernameAvailability, setUsernameAvailability] = useState<'checking' | 'available' | 'taken' | null>(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');

  const getInitialFormValues = useCallback((): ProfileFormData => {
    const baseProfile = mockCurrentUser;
    return {
      ...baseProfile,
      name: baseProfile.name || '',
      username: baseProfile.username || '',
      bio: baseProfile.bio || '',
      category: baseProfile.category || '',
      phone: baseProfile.phone || undefined,
      whatsappNumber: baseProfile.whatsappNumber || undefined,
      profilePictureUrl: baseProfile.profilePictureUrl || defaultProfilePicUrl,
      profilePictureDataAiHint: baseProfile.profilePictureDataAiHint || 'user profile',
      coverPhotoUrl: baseProfile.coverPhotoUrl || defaultCoverPicUrl,
      coverPhotoDataAiHint: baseProfile.coverPhotoDataAiHint || 'banner image',
      socialLinks: Array.isArray(baseProfile.socialLinks) 
        ? baseProfile.socialLinks.map(link => ({ ...link, id: link.id || Date.now().toString() })) 
        : [],
      locationCity: baseProfile.location?.city || '',
      locationAddress: baseProfile.location?.address || undefined,
      locationState: baseProfile.location?.state || undefined,
      locationCountry: baseProfile.location?.country || '',
      locationGoogleMapsUrl: baseProfile.location?.googleMapsUrl || undefined,
      id: baseProfile.id,
      email: baseProfile.email,
      plan: baseProfile.plan,
      layoutTemplateId: baseProfile.layoutTemplateId,
      services: Array.isArray(baseProfile.services) ? baseProfile.services : [],
      portfolio: Array.isArray(baseProfile.portfolio) ? baseProfile.portfolio : [],
      skills: Array.isArray(baseProfile.skills) ? baseProfile.skills : [],
      experience: Array.isArray(baseProfile.experience) ? baseProfile.experience : [],
      education: Array.isArray(baseProfile.education) ? baseProfile.education : [],
    };
  }, []);

  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting, dirtyFields }, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: getInitialFormValues(),
  });

  const watchedProfilePictureUrl = watch("profilePictureUrl");
  const watchedCoverPhotoUrl = watch("coverPhotoUrl");
  const watchedLocationAddress = watch("locationAddress");
  const watchedLocationCity = watch("locationCity");
  const watchedLocationState = watch("locationState");
  const watchedLocationCountry = watch("locationCountry");
  const watchedLocationGoogleMapsUrl = watch("locationGoogleMapsUrl");
  const watchedUsername = watch("username");

  const checkUsernameAvailability = useCallback(async (usernameToCheck: string) => {
    if (!usernameToCheck || usernameToCheck.length < 3) {
      setUsernameAvailability(null);
      return;
    }
    setUsernameAvailability('checking');
    // Simula chamada à API
    await new Promise(resolve => setTimeout(resolve, 500));
    const isTaken = usernameToCheck.toLowerCase() === 'admin' || usernameToCheck.toLowerCase() === 'test' || usernameToCheck.toLowerCase() === mockCurrentUser.username.toLowerCase();
    setUsernameAvailability(isTaken ? 'taken' : 'available');
  }, []);

  useEffect(() => {
    const newFormValues = getInitialFormValues();
    reset(newFormValues);
    if (newFormValues.username) {
      checkUsernameAvailability(newFormValues.username);
    }
  }, [getInitialFormValues, reset, checkUsernameAvailability]);

  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control, name: "socialLinks" });
  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control, name: "services" });
  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({ control, name: "portfolio" });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });

  const onSubmit = async (data: ProfileFormData) => {
    setSaveStatus('saving');
    try {
      // Simula chamada à API
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 2000);
      const newFormValuesAfterSubmit: ProfileFormData = {
        ...data,
        socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
        locationCity: data.locationCity || '',
        locationAddress: data.locationAddress,
        locationState: data.locationState,
        locationCountry: data.locationCountry || '',
        locationGoogleMapsUrl: data.locationGoogleMapsUrl,
        services: Array.isArray(data.services) ? data.services : [],
        portfolio: Array.isArray(data.portfolio) ? data.portfolio : [],
        skills: Array.isArray(data.skills) ? data.skills : [],
        experience: Array.isArray(data.experience) ? data.experience : [],
        education: Array.isArray(data.education) ? data.education : [],
      };
      reset(newFormValuesAfterSubmit);
      setUsernameTouched(false);
    } catch (error) {
      setSaveStatus('error');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }
  };

  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfileUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("profilePictureUrl", reader.result as string, { shouldDirty: true });
        setValue("profilePictureDataAiHint", "user uploaded", { shouldDirty: true });
        setProfileUploading(false);
        toast({ title: "Sucesso", description: "Nova foto de perfil carregada. Salve as alterações para aplicar." });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue("coverPhotoUrl", reader.result as string, { shouldDirty: true });
        setValue("coverPhotoDataAiHint", "user banner", { shouldDirty: true });
        setCoverUploading(false);
        toast({ title: "Sucesso", description: "Nova imagem de capa carregada. Salve as alterações para aplicar." });
      };
      reader.readAsDataURL(file);
    }
  };

  const getPlatformIcon = (platformValue?: string) => {
    const platform = platformOptions.find(opt => opt.value === platformValue);
    return platform ? platform.icon : Globe;
  };

  const generateGoogleMapsLink = useCallback(() => {
    if (watchedLocationGoogleMapsUrl) {
      return watchedLocationGoogleMapsUrl;
    }
    const addressParts = [
      watchedLocationAddress,
      watchedLocationCity,
      watchedLocationState,
      watchedLocationCountry,
    ].filter(Boolean);
    if (addressParts.length === 0) return null;
    const query = encodeURIComponent(addressParts.join(', '));
    return `https://www.google.com/maps/search/?api=1&query=${query}`;
  }, [watchedLocationGoogleMapsUrl, watchedLocationAddress, watchedLocationCity, watchedLocationState, watchedLocationCountry]);

  const googleMapsLink = generateGoogleMapsLink();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    setValue("username", newUsername, { shouldDirty: true });
    setUsernameTouched(true);
    if (newUsername.length > 2) {
      checkUsernameAvailability(newUsername);
    } else {
      setUsernameAvailability(null);
    }
  };

  const isSaveDisabled = () => {
    if (isSubmitting || profileUploading || coverUploading) return true;
    if (usernameTouched && usernameAvailability === 'taken') return true;

    const dirtyFieldKeys = Object.keys(dirtyFields);
    if (dirtyFieldKeys.length === 0 && !usernameTouched) return true;
    if (dirtyFieldKeys.length === 0 && usernameTouched && usernameAvailability !== 'available') return true;

    return false;
  };

  // Definição das abas com ícones
  const tabs = [
    { value: 'basic-info', label: 'Básico', icon: Briefcase },
    { value: 'contact', label: 'Contato', icon: Phone },
    { value: 'images', label: 'Imagens', icon: ImageIcon },
    { value: 'social-links', label: 'Redes Sociais', icon: Globe },
    { value: 'location', label: 'Localização', icon: MapPin },
    { value: 'services', label: 'Serviços', icon: PlusCircle },
    { value: 'portfolio', label: 'Portfólio', icon: Upload },
    { value: 'experience', label: 'Experiência', icon: Briefcase },
    { value: 'education', label: 'Educação', icon: BookOpenText },
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Dados Básicos</CardTitle></CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="name">Nome</Label>
            <Input id="name" {...register("name")} />
            {errors.name && <p className="text-sm text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...register("bio")} placeholder="Conte-nos sobre você..." />
            {errors.bio && <p className="text-sm text-destructive">{errors.bio.message}</p>}
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input id="category" {...register("category")} placeholder="Ex: Desenvolvedor de Software, Artista, Consultor" className="pl-10"/>
            </div>
            {errors.category && <p className="text-sm text-destructive">{errors.category.message}</p>}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Contato</CardTitle></CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="email">Email (para login)</Label>
            <Input id="email" type="email" value={mockCurrentUser.email} disabled />
            <p className="text-xs text-muted-foreground mt-1">Seu email é usado para login e notificações. Não é exibido publicamente por padrão.</p>
          </div>
          <div>
            <Label htmlFor="phone">Número de Telefone (Opcional, apenas para exibição)</Label>
            <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="phone" {...register("phone")} placeholder="(XX) XXXXX-XXXX" className="pl-10"/>
            </div>
          </div>
          <div>
            <Label htmlFor="whatsappNumber">Número do WhatsApp (Opcional)</Label>
            <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input id="whatsappNumber" {...register("whatsappNumber")} placeholder="+5511999999999" className="pl-10"/>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Inclua o código do país, ex: +55 para Brasil. Isso cria um link direto para o chat do WhatsApp no seu perfil.
            </p>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Imagens</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Foto de Perfil (Recomendado: 400x400px)</Label>
            <div className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className={cn(
                  "h-32 w-32 rounded-lg flex items-center justify-center overflow-hidden border-2 bg-muted",
                  watchedProfilePictureUrl && !watchedProfilePictureUrl.includes("picsum.photos/seed/default-profile") ? "border-primary" : "border-border border-dashed"
                )}>
                  {profileUploading ? (
                    <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
                  ) : watchedProfilePictureUrl && !watchedProfilePictureUrl.includes("picsum.photos/seed/default-profile") ? (
                    <Image
                      src={watchedProfilePictureUrl}
                      alt="Prévia do Perfil"
                      width={128}
                      height={128}
                      className="object-cover h-full w-full rounded-lg"
                      data-ai-hint={watch("profilePictureDataAiHint") || "user profile"}
                    />
                  ) : (
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                  onClick={() => {
                    setValue("profilePictureUrl", defaultProfilePicUrl, { shouldDirty: true });
                    setValue("profilePictureDataAiHint", "user profile", { shouldDirty: true });
                    toast({ title: "Imagem Removida", description: "A foto de perfil foi redefinida para o padrão." });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("profile-upload-input")?.click()}
                disabled={profileUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {watchedProfilePictureUrl && !watchedProfilePictureUrl.includes("picsum.photos/seed/default-profile") ? "Mudar Foto" : "Enviar Foto"}
              </Button>
              <input
                id="profile-upload-input"
                type="file"
                accept="image/*"
                onChange={handleProfileFileChange}
                className="hidden"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Imagem de Capa (Recomendado: 1200x300px)</Label>
            <div className="flex flex-col items-center space-y-3">
              <div className="relative w-full">
                <div className={cn(
                  "w-full aspect-[4/1] rounded-lg flex items-center justify-center overflow-hidden border-2 bg-muted",
                   watchedCoverPhotoUrl && !watchedCoverPhotoUrl.includes("picsum.photos/seed/default-cover") ? "border-primary" : "border-border border-dashed"
                  )}>
                  {coverUploading ? (
                    <RefreshCw className="h-8 w-8 text-muted-foreground animate-spin" />
                  ) : watchedCoverPhotoUrl && !watchedCoverPhotoUrl.includes("picsum.photos/seed/default-cover") ? (
                    <Image
                      src={watchedCoverPhotoUrl}
                      alt="Prévia da Capa"
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover rounded-lg"
                      data-ai-hint={watch("coverPhotoDataAiHint") || "banner image"}
                    />
                  ) : (
                     <ImageIcon className="h-10 w-10 text-muted-foreground" />
                  )}
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                  onClick={() => {
                    setValue("coverPhotoUrl", defaultCoverPicUrl, { shouldDirty: true });
                    setValue("coverPhotoDataAiHint", "banner image", { shouldDirty: true });
                    toast({ title: "Imagem Removida", description: "A imagem de capa foi redefinida para o padrão." });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("cover-upload-input")?.click()}
                disabled={coverUploading}
              >
                <Upload className="mr-2 h-4 w-4" />
                {watchedCoverPhotoUrl && !watchedCoverPhotoUrl.includes("picsum.photos/seed/default-cover") ? "Mudar Capa" : "Enviar Capa"}
              </Button>
              <input
                id="cover-upload-input"
                type="file"
                accept="image/*"
                onChange={handleCoverFileChange}
                className="hidden"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Redes Sociais</CardTitle></CardHeader>
        <CardContent>
          {socialLinkFields.length === 0 && (
            <p className="text-muted-foreground text-sm">Nenhum link de rede social adicionado. Clique em "Adicionar Link" para começar.</p>
          )}
          {socialLinkFields.map((field, index) => (
            <div key={field.id} className="flex items-end gap-2">
              <Controller
                name={`socialLinks.${index}.platform`}
                control={control}
                render={({ field: selectField }) => (
                  <Select onValueChange={selectField.onChange} defaultValue={selectField.value}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Plataforma" />
                    </SelectTrigger>
                    <SelectContent>
                      {platformOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center gap-2">
                            <option.icon className="h-4 w-4" /> {option.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <Input
                {...register(`socialLinks.${index}.url` as const, { required: "URL é obrigatória" })}
                placeholder="https://seuperfil.com/usuario"
                className="flex-1"
              />
              <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)} className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10">
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => appendSocialLink({ id: Date.now().toString(), platform: 'website', url: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Link
          </Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Localização</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="locationAddress">Endereço (Opcional)</Label>
              <Input id="locationAddress" {...register("locationAddress")} placeholder="Rua Principal, 123" />
            </div>
            <div>
              <Label htmlFor="locationCity">Cidade</Label>
              <Input id="locationCity" {...register("locationCity")} placeholder="São Paulo" />
              {errors.locationCity && <p className="text-sm text-destructive">{errors.locationCity.message}</p>}
            </div>
            <div>
              <Label htmlFor="locationState">Estado (Opcional)</Label>
              <Input id="locationState" {...register("locationState")} placeholder="SP" />
            </div>
            <div>
              <Label htmlFor="locationCountry">País</Label>
              <Input id="locationCountry" {...register("locationCountry")} placeholder="Brasil" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="locationGoogleMapsUrl">URL do Google Maps (Opcional)</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  id="locationGoogleMapsUrl"
                  {...register("locationGoogleMapsUrl")}
                  placeholder="https://maps.app.goo.gl/seulocalizacao"
                  className="pl-10"
                />
              </div>
              {googleMapsLink && (
                <p className="text-xs text-muted-foreground mt-1">
                  <Link href={googleMapsLink} target="_blank" className="text-primary hover:underline flex items-center">
                    <MapPin className="w-3 h-3 mr-1"/> Ver no Google Maps
                  </Link>
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>Educação</CardTitle></CardHeader>
        <CardContent>
          {educationFields.length === 0 && (
            <p className="text-muted-foreground text-sm">Nenhum serviço adicionado. Clique em "Adicionar Serviço" para começar.</p>
          )}
          {educationFields.map((field, index) => (
            <div key={field.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
              <div className="flex-1 min-w-0">
                <Label htmlFor={`education.${index}.degree`} className="text-xs font-medium text-muted-foreground">Grau/Curso</Label>
                <Input id={`education.${index}.degree`} {...register(`education.${index}.degree`)} placeholder="Bacharelado em Ciência da Computação" className="w-full mt-1" />
              </div>
              <div className="flex-1 min-w-0">
                <Label htmlFor={`education.${index}.institution`} className="text-xs font-medium text-muted-foreground">Instituição</Label>
                <Input id={`education.${index}.institution`} {...register(`education.${index}.institution`)} placeholder="Universidade XYZ" className="w-full mt-1" />
              </div>
              <div className="flex-1 min-w-0 md:col-span-2">
                <Label htmlFor={`education.${index}.years`} className="text-xs font-medium text-muted-foreground">Anos</Label>
                <Input id={`education.${index}.years`} {...register(`education.${index}.years`)} placeholder="2014 - 2018" className="w-full mt-1" />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeEducation(index)}
                className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 ml-2 flex-shrink-0"
                aria-label="Remover educação"
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))}
          <Button type="button" variant="outline" onClick={() => appendEducation({ id: Date.now().toString(), degree: '', institution: '', years: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Educação
          </Button>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting || isSaveDisabled()}>
          Salvar Alterações
        </Button>
      </div>
    </form>
  );
}

export default ProfileForm;
