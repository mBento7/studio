
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
import { Youtube, Linkedin, Twitter, Instagram, Globe, Github, MapPin, Briefcase, Phone, MessageSquare, Upload, RefreshCw, Image as ImageIcon, X, Facebook, Twitch, Link as LinkIcon, CheckCircle, AlertCircle, PlusCircle, Trash2 } from 'lucide-react';
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
  const { currentUserProfile: authProvidedProfile, updateCurrentAuthProfile, user } = useAuth();

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
      socialLinks: Array.isArray(baseProfile.socialLinks) ? baseProfile.socialLinks : [],
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
      const currentUserId = authProvidedProfile?.id || user?.uid;
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
      updateCurrentAuthProfile(updatedProfileData);
    }

    toast({
      title: "Perfil Atualizado",
      description: "Suas informações de perfil foram salvas. As alterações serão visíveis no seu perfil público.",
    });

    const newFormValuesAfterSubmit: ProfileFormData = {
        ...updatedProfileData,
        socialLinks: Array.isArray(updatedProfileData.socialLinks) ? updatedProfileData.socialLinks : [],
        locationCity: updatedProfileData.location.city,
        locationAddress: updatedProfileData.location.address,
        locationState: updatedProfileData.location.state,
        locationCountry: updatedProfileData.location.country,
        locationGoogleMapsUrl: updatedProfileData.location.googleMapsUrl,
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                {watchedProfilePictureUrl && !watchedProfilePictureUrl.includes("picsum.photos/seed/default-profile") && !profileUploading && (
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
                )}
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
                {watchedCoverPhotoUrl && !watchedCoverPhotoUrl.includes("picsum.photos/seed/default-cover") && !coverUploading && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                    onClick={() => {
                      setValue("coverPhotoUrl", defaultCoverPicUrl, { shouldDirty: true });
                       setValue("coverPhotoDataAiHint", "abstract banner", { shouldDirty: true });
                      toast({ title: "Imagem Removida", description: "A imagem de capa foi redefinida para o padrão." });
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
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

      <Card id="social-links-section">
        <CardHeader>
          <CardTitle>Links de Redes Sociais</CardTitle>
          <CardDescription>Conecte seus perfis sociais e website.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {(socialLinkFields || []).map((item, index) => {
            const IconComponent = getPlatformIcon(watch(`socialLinks.${index}.platform`));
            return (
              <div key={item.id} className="flex items-center space-x-3 p-4 border rounded-lg bg-card shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-muted rounded-md">
                  <IconComponent className="w-5 h-5 text-foreground" />
                </div>
                <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-x-3 gap-y-2 items-end">
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={`socialLinks.${index}.platform`} className="text-xs font-medium text-muted-foreground">Plataforma</Label>
                    <Controller
                      control={control}
                      name={`socialLinks.${index}.platform`}
                      render={({ field }) => (
                        <Select
                            value={field.value}
                            onValueChange={field.onChange}
                        >
                          <SelectTrigger id={`socialLinks.${index}.platform`} className="w-full mt-1">
                              <SelectValue placeholder="Selecione..." />
                          </SelectTrigger>
                          <SelectContent>
                              {platformOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                  <div className="flex items-center">
                                  <option.icon className="mr-2 h-4 w-4" />
                                  {option.label}
                                  </div>
                              </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Label htmlFor={`socialLinks.${index}.url`} className="text-xs font-medium text-muted-foreground">URL</Label>
                    <Input
                      id={`socialLinks.${index}.url`}
                      {...register(`socialLinks.${index}.url`)}
                      placeholder={`Link para ${platformOptions.find(o => o.value === watch(`socialLinks.${index}.platform`))?.label || 'Plataforma'}`}
                      className="w-full mt-1"
                    />
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeSocialLink(index)}
                  className="text-destructive hover:text-destructive-foreground hover:bg-destructive/10 ml-2 flex-shrink-0"
                  aria-label="Remover link"
                >
                  <X size={18} />
                </Button>
              </div>
            );
          })}
          <Button type="button" variant="outline" onClick={() => appendSocialLink({ id: Date.now().toString(), platform: 'website', url: '' })}>
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Link Social
          </Button>
        </CardContent>
      </Card>

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
             <div className="md:col-span-2">
              <Label htmlFor="locationGoogleMapsUrl">Link Manual do Google Maps (Opcional)</Label>
              <Input
                id="locationGoogleMapsUrl"
                {...register("locationGoogleMapsUrl")}
                placeholder="https://maps.app.goo.gl/seu-link-aqui"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Cole aqui o link de compartilhamento do Google Maps se desejar um local específico.
              </p>
            </div>
          </div>
          {googleMapsLink && (
            <div className="mt-2">
              <Link href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                Ver no Google Maps (Prévia do Link)
              </Link>
            </div>
          )}
           <div className="mt-4">
            <Label>Pré-visualização do Mapa (Placeholder)</Label>
            <div className="h-48 bg-muted rounded-md flex items-center justify-center text-muted-foreground border">
              <MapPin className="w-8 h-8 mr-2"/> Integração de Mapa (Placeholder)
            </div>
             <p className="text-xs text-muted-foreground mt-1">Sua localização aproximada pode ser mostrada no seu perfil público.</p>
          </div>
        </CardContent>
      </Card>

      

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
