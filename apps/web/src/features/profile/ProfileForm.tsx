import { useForm, Controller, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
  Camera,
  Save,
  Eye,
  Star,
  Sparkles,
  Wrench,
  GraduationCap
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '@/components/ui/action-button';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { updateUserProfile } from '@/services/profile.service';
import { useToast } from '@/hooks/use-toast';

// Simulação de dados do usuário (substituir por dados reais do backend)
const mockCurrentUser = {
  id: "user_123",
  email: "joao.silva@example.com",
  name: "João Silva",
  username: "joao.silva",
  bio: "Entusiasta de tecnologia e desenvolvedor de software com paixão por criar soluções inovadoras. Aberto a novas oportunidades e colaborações.",
  category: "Desenvolvedor de Software",
  phone: "+55 (11) 98765-4321",
  whatsappNumber: "+55 (11) 98765-4321",
  profile_picture_url: "/images/mock-profile-pic.jpg",
  profilePictureDataAiHint: "homem sorrindo, camisa azul",
  cover_photo_url: "/images/mock-cover-pic.jpg",
  coverPhotoDataAiHint: "abstrato, tons azuis",
  sociallinks: [
    { id: "1", platform: "linkedin", url: "https://www.linkedin.com/in/joaosilva" },
    { id: "2", platform: "github", url: "https://github.com/joaosilva" },
    { id: "3", platform: "youtube", url: "https://www.youtube.com/user/joaosilva" },
  ],
  location: {
    city: "São Paulo",
    address: "Av. Paulista, 1000",
    state: "SP",
    country: "Brasil",
    googleMapsUrl: "https://maps.app.goo.gl/someplace",
  },
  plan: "premium",
  isAvailable: true,
  layoutTemplateId: "free",
  skills: ["React", "Node.js", "TypeScript", "SQL", "Cloud Computing"],
  experience: [
    { id: "exp1", title: "Desenvolvedor Sênior", company: "Tech Solutions Inc.", duration: "2020 - Atualmente", description: "Liderança de equipe no desenvolvimento de novas features." },
    { id: "exp2", title: "Desenvolvedor Júnior", company: "Startup Inovação", duration: "2018 - 2020", description: "Desenvolvimento e manutenção de APIs RESTful." },
  ],
  education: [
    { id: "edu1", degree: "Bacharel em Ciência da Computação", institution: "Universidade Federal", duration: "2014 - 2018", description: "Foco em algoritmos e estruturas de dados." },
  ],
  reviews: [], // Assumindo que reviews são carregadas separadamente ou não editáveis aqui
};

const defaultProfilePicUrl = "/images/default-profile.jpg";
const defaultCoverPicUrl = "/images/default-cover.jpg";

const platformOptions = [
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'https://linkedin.com/in/seu_usuario' },
  { value: 'github', label: 'GitHub', icon: Github, placeholder: 'https://github.com/seu_usuario' },
  { value: 'youtube', label: 'YouTube', icon: Youtube, placeholder: 'https://youtube.com/channel/seu_canal' },
  { value: 'instagram', label: 'Instagram', icon: Instagram, placeholder: 'https://instagram.com/seu_usuario' },
  { value: 'twitter', label: 'Twitter/X', icon: Twitter, placeholder: 'https://x.com/seu_usuario' },
  { value: 'facebook', label: 'Facebook', icon: Facebook, placeholder: 'https://facebook.com/seu_usuario' },
  { value: 'twitch', label: 'Twitch', icon: Twitch, placeholder: 'https://twitch.tv/seu_canal' },
  { value: 'website', label: 'Website', icon: Globe, placeholder: 'https://seu_site.com' },
];

type SocialLink = {
  id?: string | number;
  platform: string;
  url: string;
};

type Experience = {
  id?: string | number;
  title: string;
  company: string;
  duration: string;
  description?: string;
};

type Education = {
  id?: string | number;
  degree: string;
  institution: string;
  duration: string;
  description?: string;
};

type ProfileFormData = {
  id: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  category: string;
  phone?: string;
  whatsappNumber?: string;
  profile_picture_url: string;
  profilePictureDataAiHint: string;
  cover_photo_url: string;
  coverPhotoDataAiHint: string;
  sociallinks: SocialLink[];
  locationCity: string;
  locationAddress?: string;
  locationState?: string;
  locationCountry: string;
  locationGoogleMapsUrl?: string;
  plan: string;
  isAvailable: boolean;
  layoutTemplateId: string;
  skills: string[];
  experience: Experience[];
  education: Education[];
};

interface InputWithFeedbackProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label?: string;
  error?: string;
  success?: string;
}

const InputWithFeedback: React.FC<InputWithFeedbackProps> = ({ id, error, success, ...props }) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{id}</Label>
    <Input id={id} {...props} className={cn({ "border-destructive": error, "border-success": success })} />
    {error && <p className="text-sm text-destructive">{error}</p>}
    {success && <p className="text-sm text-success">{success}</p>}
  </div>
);

export function ProfileForm() {
  const [profileUploading, setProfileUploading] = useState(false);
  const [coverUploading, setCoverUploading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState<boolean | null>(null);
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [activeTab, setActiveTab] = useState('basic-info');

  const { toast } = useToast();

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
      profile_picture_url: baseProfile.profile_picture_url || defaultProfilePicUrl,
      profilePictureDataAiHint: baseProfile.profilePictureDataAiHint || 'user profile',
      cover_photo_url: baseProfile.cover_photo_url || defaultCoverPicUrl,
      coverPhotoDataAiHint: baseProfile.coverPhotoDataAiHint || 'banner image',
      sociallinks: Array.isArray(baseProfile.sociallinks) 
        ? baseProfile.sociallinks.map(link => ({ ...link, id: link.id || Date.now().toString() })) 
        : [],
      locationCity: baseProfile.location?.city || '',
      locationAddress: baseProfile.location?.address || undefined,
      locationState: baseProfile.location?.state || undefined,
      locationCountry: baseProfile.location?.country || '',
      locationGoogleMapsUrl: baseProfile.location?.googleMapsUrl || undefined,
      id: baseProfile.id,
      email: baseProfile.email,
      plan: baseProfile.plan,
      isAvailable: baseProfile.isAvailable,
      layoutTemplateId: baseProfile.layoutTemplateId,
      skills: Array.isArray(baseProfile.skills) ? baseProfile.skills : [],
      experience: Array.isArray(baseProfile.experience) ? baseProfile.experience : [],
      education: Array.isArray(baseProfile.education) ? baseProfile.education : [],
    };
  }, []);

  const { control, register, handleSubmit, reset, formState: { errors, isSubmitting, dirtyFields }, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: getInitialFormValues(),
  });

  const watchedProfile_picture_url = watch("profile_picture_url");
  const watchedCover_photo_url = watch("cover_photo_url");
  const watchedLocationAddress = watch("locationAddress");
  const watchedLocationCity = watch("locationCity");
  const watchedLocationState = watch("locationState");
  const watchedLocationCountry = watch("locationCountry");
  const watchedLocationGoogleMapsUrl = watch("locationGoogleMapsUrl");
  const watchedUsername = watch("username");

  const checkUsernameAvailability = useCallback((usernameToCheck: string) => {
    if (!usernameToCheck) {
      setUsernameAvailable(null);
      return;
    }
    // Mock check - in real app this would be an API call
    const isTaken = usernameToCheck === 'admin' || usernameToCheck === 'test';
    setUsernameAvailable(!isTaken);
  }, []);

  useEffect(() => {
    const newFormValues = getInitialFormValues();
    reset(newFormValues);
    if (newFormValues.username) {
      checkUsernameAvailability(newFormValues.username);
    }
  }, [getInitialFormValues, reset, checkUsernameAvailability]);

  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control, name: "sociallinks" });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });

  const onSubmit = async (data: ProfileFormData) => {
    if (usernameAvailable === false && data.username !== mockCurrentUser.username) {
      toast({
        title: "Erro ao salvar",
        description: "Nome de usuário indisponível.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Extrair o ID do usuário para a chamada da API
      const userId = data.id;

      // Chamar a função de serviço para atualizar o perfil
      await updateUserProfile(userId, {
        name: data.name,
        username: data.username,
        bio: data.bio,
        category: data.category,
        phone: data.phone,
        whatsappNumber: data.whatsappNumber,
        profile_picture_url: data.profile_picture_url,
        cover_photo_url: data.cover_photo_url,
        sociallinks: data.sociallinks, // Passar o array de sociallinks
        location: {
          city: data.locationCity,
          address: data.locationAddress,
          state: data.locationState,
          country: data.locationCountry,
          googleMapsUrl: data.locationGoogleMapsUrl,
        },
        plan: data.plan,
        isAvailable: data.isAvailable,
        layoutTemplateId: data.layoutTemplateId,
        skills: data.skills,
        experience: data.experience,
        education: data.education,
        // Não passe o email aqui, ele é apenas para exibição no formulário.
        // id também já é passado como primeiro argumento para updateUserProfile.
      });

      toast({
        title: "Sucesso!",
        description: "Perfil atualizado com sucesso.",
        variant: "default",
      });
      setUsernameTouched(false);
    } catch (error: any) {
      console.error("Erro ao salvar perfil:", error);
      toast({
        title: "Erro ao salvar",
        description: error.message || "Ocorreu um erro ao atualizar o perfil.",
        variant: "destructive",
      });
    }
  };

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

  const isSaveDisabled = () => {
    if (isSubmitting || profileUploading || coverUploading) return true;
    if (usernameTouched && usernameAvailable === false) return true;
    return false;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-2 xxs:px-1 sm:px-4">
      <div className="container mx-auto px-0 py-0 max-w-2xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground dark:text-white mb-2">Editar Perfil</h1>
              <p className="text-muted-foreground dark:text-slate-300">Personalize suas informações e torne seu perfil único</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1 dark:bg-slate-800 dark:text-slate-100">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar Perfil
            </Badge>
          </div>
          <Separator className="dark:bg-slate-700" />
        </motion.div>

        <div className="bg-card rounded shadow-xl shadow-black/20 border border-black/5 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="flex h-auto w-full flex-wrap justify-center gap-x-2 gap-y-3 rounded-lg bg-white border border-black/10 shadow-sm p-2 mb-4">
                {[
                  { value: 'basic-info', label: 'Básico', icon: User },
                  { value: 'contact', label: 'Contato', icon: Phone },
                  { value: 'images', label: 'Imagens', icon: ImageIcon },
                  { value: 'social-links', label: 'Sociais', icon: Globe },
                  { value: 'location', label: 'Localização', icon: MapPin },
                  { value: 'experience', label: 'Experiência', icon: Briefcase },
                  { value: 'education', label: 'Educação', icon: GraduationCap },
                  { value: 'skills', label: 'Habilidades', icon: Star },
                ].map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className={cn(
                      "flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all whitespace-nowrap border border-transparent",
                      activeTab === tab.value && "bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white shadow-md border-none"
                    )}
                  >
                    <tab.icon className={cn("w-4 h-4", activeTab === tab.value ? "text-white" : "text-[#0e9094]")}/>
                    <span className={activeTab === tab.value ? "text-white" : "text-[#0e9094]"}>{tab.label}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

            <div className="p-6 dark:bg-slate-900">
              <TabsContent value="basic-info" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="grid gap-6">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Nome Completo</Label>
                    <InputWithFeedback
                      id="name"
                      {...register("name", { required: "Nome é obrigatório" })}
                      placeholder="Seu nome completo"
                      error={errors.name?.message}
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Nome de Usuário</Label>
                    <InputWithFeedback
                      id="username"
                      {...register("username", { 
                        required: "Nome de usuário é obrigatório",
                        minLength: { value: 3, message: "Nome de usuário deve ter no mínimo 3 caracteres" }
                      })}
                      placeholder="ex: joao.silva"
                      onChange={handleUsernameChange}
                      error={errors.username?.message}
                      success={usernameTouched && usernameAvailable === true ? "Disponível!" : undefined}
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    {usernameTouched && usernameAvailable === false && (
                      <p className="text-sm text-destructive dark:text-red-400">Nome de usuário já em uso.</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Bio</Label>
                    <Textarea
                      id="bio"
                      {...register("bio")}
                      placeholder="Conte-nos sobre você em poucas palavras..."
                      rows={4}
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 min-h-[100px] dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Categoria</Label>
                    <InputWithFeedback
                      id="category"
                      {...register("category")}
                      placeholder="Ex: Desenvolvedor de Software, Designer Gráfico"
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="contact" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="grid gap-6">
                  <InputWithFeedback
                    label="Telefone"
                    id="phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="(00) 00000-0000"
                    className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                  />
                  <InputWithFeedback
                    label="WhatsApp"
                    id="whatsappNumber"
                    type="tel"
                    {...register("whatsappNumber")}
                    placeholder="(00) 00000-0000"
                    className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                  />
                </div>
              </TabsContent>
              <TabsContent value="images" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="grid gap-8">
                  <ImageUploadField
                    label="Foto de Perfil"
                    name="profile_picture_url"
                    control={control}
                    setValue={setValue as (name: string, value: any, options?: any) => void}
                    currentImageUrl={watchedProfile_picture_url}
                    uploading={profileUploading}
                    setUploading={setProfileUploading}
                    userId={watch("id")}
                  />
                  <ImageUploadField
                    label="Foto de Capa"
                    name="cover_photo_url"
                    control={control}
                    setValue={setValue as (name: string, value: any, options?: any) => void}
                    currentImageUrl={watchedCover_photo_url}
                    uploading={coverUploading}
                    setUploading={setCoverUploading}
                    userId={watch("id")}
                  />
                </div>
              </TabsContent>
              <TabsContent value="social-links" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="space-y-4">
                  {socialLinkFields.map((field, index) => (
                    <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-end">
                      <Controller
                        name={`sociallinks.${index}.platform`}
                        control={control}
                        render={({ field: controllerField }) => (
                          <div className="space-y-2 flex-grow sm:flex-grow-0 w-full sm:w-auto">
                            <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Plataforma</Label>
                            <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                              <SelectTrigger className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700">
                                <SelectValue placeholder="Selecione" />
                              </SelectTrigger>
                              <SelectContent className="dark:bg-slate-800 dark:text-white">
                                {platformOptions.map(option => (
                                  <SelectItem key={option.value} value={option.value} className="dark:bg-slate-800 dark:text-white">
                                    <div className="flex items-center">
                                      <option.icon className="w-4 h-4 mr-2" />
                                      {option.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      />
                      <div className="space-y-2 flex-grow w-full">
                        <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">URL</Label>
                        <Input
                          {...register(`sociallinks.${index}.url`, { required: "URL é obrigatória" })}
                          placeholder={platformOptions.find(opt => opt.value === watch(`sociallinks.${index}.platform`))?.placeholder || "https://"}
                          className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                        />
                        {errors.sociallinks?.[index]?.url && (
                          <p className="text-sm text-destructive dark:text-red-400">{errors.sociallinks[index]?.url?.message}</p>
                        )}
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)} className="mt-2 sm:mt-0 dark:bg-slate-700 dark:text-white">
                        <Trash2 className="w-5 h-5" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendSocialLink({ platform: '', url: '' })} className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Adicionar Link Social
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="location" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputWithFeedback
                      label="Cidade"
                      id="locationCity"
                      {...register("locationCity")}
                      placeholder="Ex: São Paulo"
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    <InputWithFeedback
                      label="Estado/Província"
                      id="locationState"
                      {...register("locationState")}
                      placeholder="Ex: SP"
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    <InputWithFeedback
                      label="País"
                      id="locationCountry"
                      {...register("locationCountry")}
                      placeholder="Ex: Brasil"
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    <InputWithFeedback
                      label="Endereço (opcional)"
                      id="locationAddress"
                      {...register("locationAddress")}
                      placeholder="Ex: Av. Paulista, 1000"
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    <InputWithFeedback
                      label="Link Google Maps (opcional)"
                      id="locationGoogleMapsUrl"
                      {...register("locationGoogleMapsUrl")}
                      placeholder="https://maps.app.goo.gl/..."
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                  </div>
                  {googleMapsLink && (
                    <div className="text-sm text-muted-foreground dark:text-slate-300 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <Button asChild>
                        <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary dark:text-blue-400">
                          Ver no mapa
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              <TabsContent value="experience" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="space-y-4">
                  {experienceFields.map((field, index) => (
                    <div key={field.id} className="relative space-y-4 rounded-xl border p-4 dark:bg-slate-800 dark:border-slate-700">
                      <Input {...register(`experience.${index}.title`)} placeholder="Cargo" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      <Input {...register(`experience.${index}.company`)} placeholder="Empresa" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      <Input {...register(`experience.${index}.duration`)} placeholder="Duração (Ex: 2020 - Atualmente)" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      <Textarea {...register(`experience.${index}.description`)} placeholder="Descrição das atividades" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 min-h-[100px] dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeExperience(index)} className="absolute top-2 right-2 dark:bg-slate-700 dark:text-white">
                        <Trash2 className="w-5 h-5 text-destructive dark:text-red-400" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendExperience({ title: '', company: '', duration: '', description: '' })} className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Adicionar Experiência
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="education" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="space-y-4">
                  {educationFields.map((field, index) => (
                    <div key={field.id} className="relative rounded-xl border p-4 dark:bg-slate-800 dark:border-slate-700">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input {...register(`education.${index}.degree`)} placeholder="Grau (Ex: Bacharel em Ciência da Computação)" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                        <Input {...register(`education.${index}.institution`)} placeholder="Instituição de Ensino" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                        <Input {...register(`education.${index}.duration`)} placeholder="Período (Ex: 2014 - 2018)" className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                        <Textarea {...register(`education.${index}.description`)} placeholder="Descrição (Opcional)" className="md:col-span-2 rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 min-h-[100px] dark:bg-slate-700 dark:text-white dark:border-slate-600" />
                      </div>
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeEducation(index)} className="absolute top-2 right-2 dark:bg-slate-700 dark:text-white">
                        <Trash2 className="w-5 h-5 text-destructive dark:text-red-400" />
                      </Button>
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={() => appendEducation({ degree: '', institution: '', duration: '', description: '' })} className="dark:bg-slate-800 dark:text-white dark:border-slate-700">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Adicionar Formação
                  </Button>
                </div>
              </TabsContent>
              <TabsContent value="skills" className="space-y-6 p-6 dark:bg-slate-900">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-base font-semibold text-foreground dark:text-slate-100 mb-1">Suas Habilidades</Label>
                    <p className="text-sm text-muted-foreground dark:text-slate-300">Liste suas habilidades separadas por vírgula.</p>
                    <Textarea
                      id="skills"
                      {...register("skills", {
                        setValueAs: (value: any) => {
                          if (Array.isArray(value)) return value;
                          if (typeof value === "string") return value.split(',').map(s => s.trim()).filter(Boolean);
                          return [];
                        },
                      })}
                      placeholder="Ex: React, Node.js, TypeScript, SQL"
                      rows={3}
                      className="rounded-xl shadow-sm transition-all focus:ring-2 focus:ring-primary/30 focus:border-primary border-muted-foreground/20 bg-background/70 min-h-[100px] dark:bg-slate-800 dark:text-white dark:border-slate-700"
                    />
                    <div className="mt-2 flex flex-wrap gap-2">
                      {watch('skills')?.map((skill, index) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 dark:bg-slate-700 dark:text-white">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-end mt-8"
        >
          <Button 
            type="submit" 
            disabled={isSubmitting || isSaveDisabled()}
            className="bg-gradient-to-r from-[#14b8a6] to-[#0e9094] text-white font-semibold text-base rounded-full shadow-md hover:shadow-lg hover:brightness-110 transition-all px-8 py-2 h-auto"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Salvando...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Salvar Alterações
              </>
            )}
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function ProfileFormDemo() {
  return <ProfileForm />;
} 