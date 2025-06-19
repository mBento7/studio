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
  Eye
} from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ActionButton } from '@/components/ui/action-button';
import { ImageUploadField } from '@/components/ui/image-upload-field';

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
  profilePictureUrl: "/images/mock-profile-pic.jpg",
  profilePictureDataAiHint: "homem sorrindo, camisa azul",
  coverPhotoUrl: "/images/mock-cover-pic.jpg",
  coverPhotoDataAiHint: "abstrato, tons azuis",
  socialLinks: [
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
  layoutTemplateId: "modern",
  services: [
    { id: "serv1", name: "Desenvolvimento Web", description: "Criação de websites responsivos e aplicativos web." },
    { id: "serv2", name: "Consultoria de Software", description: "Orientação e soluções para projetos de software." },
  ],
  portfolio: [
    { id: "port1", title: "E-commerce Moderno", description: "Desenvolvimento de plataforma de e-commerce utilizando Next.js e Stripe.", imageUrl: "/images/mock-project1.jpg", link: "https://example.com/ecommerce" },
    { id: "port2", title: "App de Produtividade", description: "Aplicativo móvel para gerenciamento de tarefas com sincronização em tempo real.", imageUrl: "/images/mock-project2.jpg", link: "https://example.com/app" },
  ],
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

type Service = {
  id?: string | number;
  name: string;
  description?: string;
};

type PortfolioItem = {
  id?: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  link?: string;
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
  profilePictureUrl: string;
  profilePictureDataAiHint: string;
  coverPhotoUrl: string;
  coverPhotoDataAiHint: string;
  socialLinks: SocialLink[];
  locationCity: string;
  locationAddress?: string;
  locationState?: string;
  locationCountry: string;
  locationGoogleMapsUrl?: string;
  plan: string;
  isAvailable: boolean;
  layoutTemplateId: string;
  services: Service[];
  portfolio: PortfolioItem[];
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
      isAvailable: baseProfile.isAvailable,
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

  const { fields: socialLinkFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({ control, name: "socialLinks" });
  const { fields: serviceFields, append: appendService, remove: removeService } = useFieldArray({ control, name: "services" });
  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({ control, name: "portfolio" });
  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({ control, name: "experience" });
  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({ control, name: "education" });

  const onSubmit = async (data: ProfileFormData) => {
    if (usernameAvailable === false && data.username !== mockCurrentUser.username) {
      alert("Nome de usuário indisponível");
      return;
    }
    
    console.log("Form submitted:", data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    alert("Perfil atualizado com sucesso!");
    setUsernameTouched(false);
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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Editar Perfil</h1>
              <p className="text-muted-foreground">Personalize suas informações e torne seu perfil único</p>
            </div>
            <Badge variant="secondary" className="px-3 py-1">
              <Eye className="w-4 h-4 mr-1" />
              Visualizar Perfil
            </Badge>
          </div>
          <Separator />
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Info */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Informações Básicas</CardTitle>
              <CardDescription>
                Configure suas informações principais que aparecerão no seu perfil
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">Nome Completo</Label>
                  <InputWithFeedback
                    id="name"
                    {...register("name", { required: "Nome é obrigatório" })}
                    placeholder="Seu nome completo"
                    error={errors.name?.message}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-sm font-medium">Nome de Usuário</Label>
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
                  />
                  {usernameTouched && usernameAvailable === false && (
                    <p className="text-sm text-destructive">Nome de usuário já em uso.</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="text-sm font-medium">Bio</Label>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Conte-nos sobre você em poucas palavras..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category" className="text-sm font-medium">Categoria</Label>
                <InputWithFeedback
                  id="category"
                  {...register("category")}
                  placeholder="Ex: Desenvolvedor de Software, Designer Gráfico"
                />
              </div>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Informações de Contato</CardTitle>
              <CardDescription>
                Seus contatos para que as pessoas possam interagir com você
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWithFeedback
                  label="Telefone"
                  id="phone"
                  type="tel"
                  {...register("phone")}
                  placeholder="(00) 00000-0000"
                />
                <InputWithFeedback
                  label="WhatsApp"
                  id="whatsappNumber"
                  type="tel"
                  {...register("whatsappNumber")}
                  placeholder="(00) 00000-0000"
                />
              </div>
            </CardContent>
          </Card>

          {/* Profile Images */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Imagens do Perfil</CardTitle>
              <CardDescription>
                Gerencie sua foto de perfil e capa
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <ImageUploadField
                label="Foto de Perfil"
                name="profilePictureUrl"
                control={control}
                setValue={setValue}
                currentImageUrl={watchedProfilePictureUrl}
                uploading={profileUploading}
                setUploading={setProfileUploading}
              />
              <ImageUploadField
                label="Foto de Capa"
                name="coverPhotoUrl"
                control={control}
                setValue={setValue}
                currentImageUrl={watchedCoverPhotoUrl}
                uploading={coverUploading}
                setUploading={setCoverUploading}
              />
            </CardContent>
          </Card>

          {/* Social Links */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Redes Sociais</CardTitle>
              <CardDescription>
                Adicione links para suas redes sociais e outras plataformas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {socialLinkFields.map((field, index) => (
                <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-end">
                  <Controller
                    name={`socialLinks.${index}.platform`}
                    control={control}
                    render={({ field: controllerField }) => (
                      <div className="space-y-2 flex-grow sm:flex-grow-0 w-full sm:w-auto">
                        <Label>Plataforma</Label>
                        <Select onValueChange={controllerField.onChange} value={controllerField.value}>
                          <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Selecione" />
                          </SelectTrigger>
                          <SelectContent>
                            {platformOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
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
                    <Label>URL</Label>
                    <Input
                      {...register(`socialLinks.${index}.url`, { required: "URL é obrigatória" })}
                      placeholder={platformOptions.find(opt => opt.value === watch(`socialLinks.${index}.platform`))?.placeholder || "https://"}
                    />
                    {errors.socialLinks?.[index]?.url && (
                      <p className="text-sm text-destructive">{errors.socialLinks[index]?.url?.message}</p>
                    )}
                  </div>
                  <Button type="button" variant="ghost" size="icon" onClick={() => removeSocialLink(index)} className="mt-2 sm:mt-0">
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              ))}
              <Button type="button" variant="outline" onClick={() => appendSocialLink({ platform: '', url: '' })}>
                <PlusCircle className="w-4 h-4 mr-2" />
                Adicionar Link Social
              </Button>
            </CardContent>
          </Card>

          {/* Location Info */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Localização</CardTitle>
              <CardDescription>
                Onde você está localizado ou atua
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputWithFeedback
                  label="Cidade"
                  id="locationCity"
                  {...register("locationCity")}
                  placeholder="Ex: São Paulo"
                />
                <InputWithFeedback
                  label="Estado/Província"
                  id="locationState"
                  {...register("locationState")}
                  placeholder="Ex: SP"
                />
                <InputWithFeedback
                  label="País"
                  id="locationCountry"
                  {...register("locationCountry")}
                  placeholder="Ex: Brasil"
                />
                <InputWithFeedback
                  label="Endereço (opcional)"
                  id="locationAddress"
                  {...register("locationAddress")}
                  placeholder="Ex: Av. Paulista, 1000"
                />
                <InputWithFeedback
                  label="Link Google Maps (opcional)"
                  id="locationGoogleMapsUrl"
                  {...register("locationGoogleMapsUrl")}
                  placeholder="https://maps.app.goo.gl/..."
                />
              </div>
              {googleMapsLink && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <a href={googleMapsLink} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary">
                    Ver no Google Maps
                  </a>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Skills (as a simple text input for now) */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle>Habilidades</CardTitle>
              <CardDescription>
                Liste suas habilidades principais (separadas por vírgula)
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="skills" className="text-sm font-medium">Suas Habilidades</Label>
                <Textarea
                  id="skills"
                  {...register("skills", {
                    setValueAs: (value: string) => value.split(',').map(s => s.trim()).filter(Boolean),
                    // For display, you might want to join them back:
                    // value: watch('skills')?.join(', ')
                  })}
                  placeholder="Ex: React, Node.js, TypeScript, SQL"
                  rows={3}
                />
                <div className="mt-2 flex flex-wrap gap-2">
                  {watch('skills')?.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-end"
          >
            <ActionButton type="submit" loading={isSubmitting} disabled={isSaveDisabled()}>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </ActionButton>
          </motion.div>
        </form>
      </div>
    </div>
  );
}

export default function ProfileFormDemo() {
  return <ProfileForm />;
} 