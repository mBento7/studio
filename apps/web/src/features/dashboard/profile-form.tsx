"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import type { UserProfile, SocialLink } from '@/lib/types';
import { mockCurrentUser, updateMockCurrentUser, mockUserProfiles } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Youtube, Linkedin, Twitter, Instagram, Globe, Github, MapPin, Briefcase, Phone, MessageSquare, Upload, RefreshCw, Image as ImageIcon, X, Facebook, Twitch, Link as LinkIcon, CheckCircle, AlertCircle, PlusCircle, Trash2, BookOpenText } from 'lucide-react';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

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

export function ProfileForm() {
  const { toast } = useToast();
  const { currentUserProfile: authProvidedProfile, updateUserProfile, user } = useAuth();

  const [profileUploading, setProfileUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameTouched, setUsernameTouched] = useState(false);

  const getInitialFormValues = useCallback((): ProfileFormData => {
    const baseProfile = authProvidedProfile || mockCurrentUser;
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
      // Ensure other array fields are initialized as arrays
      services: Array.isArray(baseProfile.services) ? baseProfile.services : [],
      portfolio: Array.isArray(baseProfile.portfolio) ? baseProfile.portfolio : [],
      skills: Array.isArray(baseProfile.skills) ? baseProfile.skills : [],
      experience: Array.isArray(baseProfile.experience) ? baseProfile.experience : [],
      education: Array.isArray(baseProfile.education) ? baseProfile.education : [],
    };
  }, [authProvidedProfile]);

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

  const checkUsernameAvailability = useCallback(
    (usernameToCheck: string) => {
      if (!usernameToCheck) {
        setUsernameAvailable(null);
        return;
      }
      const currentUserId = authProvidedProfile?.id || user?.id;
      const isTaken = mockUserProfiles.some(
        (p) => p.username === usernameToCheck && p.id !== currentUserId
      );
      setUsernameAvailable(!isTaken);
    },
    [authProvidedProfile, user]
  );

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
    if (usernameAvailable === false && data.username !== (authProvidedProfile?.username || mockCurrentUser.username)) {
      toast({
        title: "Nome de Usuário Indisponível",
        description: "Por favor, escolha um nome de usuário diferente.",
        variant: "destructive",
      });
      return;
    }
    if (!data.username || !/^[a-zA-Z0-9_.-]+$/.test(data.username)) {
      toast({
        title: "Nome de Usuário Inválido",
        description: "Nome de usuário pode conter apenas letras, números, '.', '-', e '_'.",
        variant: "destructive",
      });
      return;
    }

    const baseProfileForUpdate = authProvidedProfile || mockCurrentUser;
    const updatedProfileData: UserProfile = {
      id: baseProfileForUpdate.id,
      email: baseProfileForUpdate.email,
      plan: baseProfileForUpdate.plan,
      layoutTemplateId: baseProfileForUpdate.layoutTemplateId,
      services: Array.isArray(data.services) ? data.services : (baseProfileForUpdate.services || []),
      portfolio: Array.isArray(data.portfolio) ? data.portfolio : (baseProfileForUpdate.portfolio || []),
      skills: Array.isArray(data.skills) ? data.skills : (baseProfileForUpdate.skills || []),
      experience: Array.isArray(data.experience) ? data.experience : (baseProfileForUpdate.experience || []),
      education: Array.isArray(data.education) ? data.education : (baseProfileForUpdate.education || []),
      isAvailable: baseProfileForUpdate.isAvailable,
      themeColor: baseProfileForUpdate.themeColor,

      name: data.name || '',
      username: data.username || baseProfileForUpdate.username,
      bio: data.bio || '',
      category: data.category || '',
      phone: data.phone,
      whatsappNumber: data.whatsappNumber,
      profilePictureUrl: data.profilePictureUrl || defaultProfilePicUrl,
      profilePictureDataAiHint: data.profilePictureUrl !== defaultProfilePicUrl ? 'user uploaded' : (data.profilePictureDataAiHint || 'user profile'),
      coverPhotoUrl: data.coverPhotoUrl || defaultCoverPicUrl,
      coverPhotoDataAiHint: data.coverPhotoUrl !== defaultCoverPicUrl ? 'user banner' : (data.coverPhotoDataAiHint || 'abstract banner'),
      socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : [],
      location: {
        city: data.locationCity || '',
        address: data.locationAddress,
        state: data.locationState,
        country: data.locationCountry || '',
        googleMapsUrl: data.locationGoogleMapsUrl,
      },
    };

    updateMockCurrentUser(updatedProfileData);

    if (authProvidedProfile && authProvidedProfile.id === updatedProfileData.id) {
      updateUserProfile(updatedProfileData);
    }

    toast({
      title: "Perfil Atualizado",
      description: "Suas informações de perfil foram salvas. As alterações serão visíveis no seu perfil público.",
    });

    const newFormValuesAfterSubmit: ProfileFormData = {
        ...updatedProfileData,
        socialLinks: Array.isArray(updatedProfileData.socialLinks) ? updatedProfileData.socialLinks : [],
        locationCity: updatedProfileData.location?.city || '',
        locationAddress: updatedProfileData.location?.address,
        locationState: updatedProfileData.location?.state,
        locationCountry: updatedProfileData.location?.country || '',
        locationGoogleMapsUrl: updatedProfileData.location?.googleMapsUrl,
        // ensure other array fields are correctly passed for reset
        services: Array.isArray(updatedProfileData.services) ? updatedProfileData.services : [],
        portfolio: Array.isArray(updatedProfileData.portfolio) ? updatedProfileData.portfolio : [],
        skills: Array.isArray(updatedProfileData.skills) ? updatedProfileData.skills : [],
        experience: Array.isArray(updatedProfileData.experience) ? updatedProfileData.experience : [],
        education: Array.isArray(updatedProfileData.education) ? updatedProfileData.education : [],
    };
    reset(newFormValuesAfterSubmit);
    setUsernameTouched(false);
    if (updatedProfileData.username) {
        checkUsernameAvailability(updatedProfileData.username);
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
      setUsernameAvailable(null);
    }
  };

  const isSaveDisabled = () => {
    if (isSubmitting || profileUploading || coverUploading) return true;
    if (usernameTouched && usernameAvailable === false) return true;

    const dirtyFieldKeys = Object.keys(dirtyFields);
    if (dirtyFieldKeys.length === 0 && !usernameTouched) return true;
    if (dirtyFieldKeys.length === 0 && usernameTouched && usernameAvailable !== true) return true;

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
  const [activeTab, setActiveTab] = useState('basic-info');

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Abas como cards com ícones */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            type="button"
            onClick={() => setActiveTab(tab.value)}
            className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:z-10
              ${activeTab === tab.value
                ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20'
                : 'bg-card hover:bg-card/80 border-border hover:border-primary/30 hover:shadow-md'}
            `}
          >
            <tab.icon className={`w-5 h-5 ${activeTab === tab.value ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
            <span className="text-xs font-medium text-center leading-tight">{tab.label}</span>
            {activeTab === tab.value && (
              <span className="absolute inset-0 bg-primary/10 rounded-xl pointer-events-none" />
            )}
          </button>
        ))}
      </div>

      {/* Conteúdo das abas */}
      {activeTab === 'basic-info' && (
        <div className="space-y-8 pt-4">
          <Card id="url-config">
            <CardHeader>
              <CardTitle>URL do Perfil Público</CardTitle>
              <CardDescription>Escolha um nome de usuário único para seu perfil WhosDo.com.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="username">Nome de Usuário</Label>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-muted-foreground p-2 rounded-l-md border border-r-0 border-input bg-muted text-sm">
                    whosdo.com/
                  </span>
                  <Input
                    id="username"
                    {...register("username", {
                      pattern: {
                        value: /^[a-zA-Z0-9_.-]+$/,
                        message: "Use apenas letras, números e '.', '-', '_'."
                      },
                      minLength: {
                        value: 3,
                        message: "Mínimo 3 caracteres."
                      },
                      maxLength: {
                        value: 30,
                        message: "Máximo 30 caracteres."
                      }
                    })}
                    placeholder="seunomeunico"
                    className="rounded-l-none flex-1"
                    onChange={handleUsernameChange}
                    onBlur={() => { if (watchedUsername) checkUsernameAvailability(watchedUsername); }}
                  />
                </div>
                {errors.username && <p className="text-sm text-destructive mt-1">{errors.username.message}</p>}
                {usernameTouched && watchedUsername && watchedUsername.length >=3 && (
                  usernameAvailable === true ? (
                    <p className="text-sm text-green-600 mt-1 flex items-center"><CheckCircle className="w-4 h-4 mr-1"/>Nome de usuário disponível!</p>
                  ) : usernameAvailable === false ? (
                    <p className="text-sm text-destructive mt-1 flex items-center"><AlertCircle className="w-4 h-4 mr-1"/>Este nome de usuário já está em uso.</p>
                  ) : (
                    <p className="text-sm text-muted-foreground mt-1">Verificando disponibilidade...</p>
                  )
                )}
                {watchedUsername && (
                     <p className="text-xs text-muted-foreground mt-2">
                        Seu perfil será acessível em: <Link href={`/profile/${watchedUsername}`} target="_blank" className="text-primary hover:underline">whosdo.com/{watchedUsername}</Link>
                     </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card id="personal-info">
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Atualize seu nome, bio e categoria.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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
        </div>
      )}
      {activeTab === 'contact' && (
        <Card id="contact-info">
          <CardHeader>
            <CardTitle>Formas de Contato</CardTitle>
            <CardDescription>Como as pessoas podem entrar em contato com você. Seu e-mail é usado para login e não é exibido publicamente, a menos que você opte por exibi-lo por outros meios.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="email">Email (para login)</Label>
              <Input id="email" type="email" value={authProvidedProfile?.email || user?.email || ""} disabled />
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
      )}
      {activeTab === 'images' && (
        <Card id="profile-images-section">
          <CardHeader>
            <CardTitle>Imagens do Perfil</CardTitle>
            <CardDescription>Envie sua foto de perfil e imagem de capa.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      )}
      {activeTab === 'social-links' && (
        <Card id="social-links-section">
          <CardHeader>
            <CardTitle>Redes Sociais</CardTitle>
            <CardDescription>Adicione links para seus perfis de redes sociais.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
      )}
      {activeTab === 'location' && (
        <Card id="location">
          <CardHeader>
            <CardTitle>Localização</CardTitle>
            <CardDescription>Onde você está baseado?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
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
      )}
      {activeTab === 'services' && (
        <Card>
          <CardHeader>
            <CardTitle>Serviços</CardTitle>
            <CardDescription>Liste os serviços que você oferece.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {serviceFields.length === 0 && (
              <p className="text-muted-foreground text-sm">Nenhum serviço adicionado. Clique em "Adicionar Serviço" para começar.</p>
            )}
            {serviceFields.map((field, index) => (
              <div key={field.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
                <div className="flex-1 min-w-0">
                  <Label htmlFor={`services.${index}.name`} className="text-xs font-medium text-muted-foreground">Nome do Serviço</Label>
                  <Input id={`services.${index}.name`} {...register(`services.${index}.name`)} placeholder="Desenvolvimento Web" className="w-full mt-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <Label htmlFor={`services.${index}.description`} className="text-xs font-medium text-muted-foreground">Descrição (Opcional)</Label>
                  <Input id={`services.${index}.description`} {...register(`services.${index}.description`)} placeholder="Criação de websites responsivos e aplicativos web." className="w-full mt-1" />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeService(index)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 ml-2 flex-shrink-0"
                  aria-label="Remover serviço"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendService({ id: Date.now().toString(), name: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Serviço
            </Button>
          </CardContent>
        </Card>
      )}
      {activeTab === 'portfolio' && (
        <Card>
          <CardHeader>
            <CardTitle>Portfólio</CardTitle>
            <CardDescription>Mostre seus melhores trabalhos.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(portfolioFields || []).map((item, index) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
                <div className="flex-shrink-0">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.caption || 'Portfolio Item'} width={64} height={64} className="rounded object-cover" />
                  ) : (
                    <div className="w-16 h-16 bg-muted flex items-center justify-center rounded">
                      <ImageIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <Label htmlFor={`portfolio.${index}.caption`} className="text-xs font-medium text-muted-foreground">Título</Label>
                  <Input id={`portfolio.${index}.caption`} {...register(`portfolio.${index}.caption`)} placeholder="Título do Projeto" className="w-full mt-1" />
                  <Label htmlFor={`portfolio.${index}.description`} className="text-xs font-medium text-muted-foreground mt-2">Descrição</Label>
                  <Textarea id={`portfolio.${index}.description`} {...register(`portfolio.${index}.description`)} placeholder="Breve descrição do projeto." className="w-full mt-1" />
                  <Label htmlFor={`portfolio.${index}.imageUrl`} className="text-xs font-medium text-muted-foreground mt-2">URL da Imagem</Label>
                  <Input id={`portfolio.${index}.imageUrl`} {...register(`portfolio.${index}.imageUrl`)} placeholder="https://example.com/image.jpg" className="w-full mt-1" />
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removePortfolio(index)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 ml-2 flex-shrink-0"
                  aria-label="Remover item de portfólio"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendPortfolio({ id: Date.now().toString(), imageUrl: '', caption: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Item de Portfólio
            </Button>
          </CardContent>
        </Card>
      )}
      {activeTab === 'experience' && (
        <Card>
          <CardHeader>
            <CardTitle>Experiência Profissional</CardTitle>
            <CardDescription>Adicione seu histórico de trabalho.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(experienceFields || []).map((item, index) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor={`experience.${index}.title`} className="text-xs font-medium text-muted-foreground">Cargo</Label>
                    <Input id={`experience.${index}.title`} {...register(`experience.${index}.title`)} placeholder="Desenvolvedor Frontend Sênior" className="w-full mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`experience.${index}.company`} className="text-xs font-medium text-muted-foreground">Empresa</Label>
                    <Input id={`experience.${index}.company`} {...register(`experience.${index}.company`)} placeholder="Tech Solutions" className="w-full mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`experience.${index}.years`} className="text-xs font-medium text-muted-foreground">Período</Label>
                    <Input id={`experience.${index}.years`} {...register(`experience.${index}.years`)} placeholder="2020 - Presente" className="w-full mt-1" />
                  </div>
                  <div className="col-span-2">
                    <Label htmlFor={`experience.${index}.description`} className="text-xs font-medium text-muted-foreground">Descrição (Opcional)</Label>
                    <Textarea id={`experience.${index}.description`} {...register(`experience.${index}.description`)} placeholder="Descreva suas responsabilidades e conquistas." className="w-full mt-1" />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeExperience(index)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 ml-2 flex-shrink-0"
                  aria-label="Remover experiência"
                >
                  <Trash2 size={18} />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={() => appendExperience({ id: Date.now().toString(), title: '', company: '', years: '', description: '' })}>
              <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Experiência
            </Button>
          </CardContent>
        </Card>
      )}
      {activeTab === 'education' && (
        <Card>
          <CardHeader>
            <CardTitle>Educação</CardTitle>
            <CardDescription>Adicione seu histórico educacional.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {(educationFields || []).map((item, index) => (
              <div key={item.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
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
      )}
      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          size="lg"
          disabled={isSaveDisabled()}
        >
          {isSubmitting ? 'Salvando...' : 'Salvar Alterações do Perfil'}
        </Button>
      </div>
    </form>
  );
}
