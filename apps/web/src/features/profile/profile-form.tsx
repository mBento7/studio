import React from 'react';
import { useFieldArray, useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { PlusCircle, Trash2, Instagram, Linkedin, Github, Facebook, Twitter, Youtube, Globe } from 'lucide-react';
import { FilterButton } from '@/components/ui/filter-button';
import { User, Phone, Image as ImageIcon, MapPin, Briefcase, BookOpen, Star } from 'lucide-react';
import { logger } from '@/lib/logger';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { ImageUploadField } from '@/components/ui/image-upload-field';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

// Esquema de validação para um item do portfólio
const portfolioItemSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().url('URL da imagem inválida').min(1, 'URL da imagem é obrigatória'),
  caption: z.string().min(1, 'Legenda é obrigatória'),
  description: z.string().optional(),
  dataAiHint: z.string().optional()
});

// Esquema de validação para o formulário completo do perfil
const profileFormSchema = z.object({
  username: z.string().min(2, 'Nome de usuário deve ter pelo menos 2 caracteres.'),
  name: z.string().min(2, 'Nome completo deve ter pelo menos 2 caracteres.'),
  email: z.string().email('Email inválido.').optional(),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  bio: z.string().optional(),
  profilePictureUrl: z.string().url('URL da imagem de perfil inválida').optional().or(z.literal('')),
  coverPhotoUrl: z.string().url('URL da foto de capa inválida').optional().or(z.literal('')),
  category: z.string().optional(),
  isAvailable: z.boolean().default(true).optional(),
  location: z.object({
    city: z.string().optional(),
    country: z.string().optional()
  }).optional(),
  skills: z.array(z.string()).optional(),
  portfolio: z.array(portfolioItemSchema).optional(),
  services: z.array(z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Nome do serviço é obrigatório'),
    description: z.string().optional()
  })).optional(),
  sociallinks: z.array(z.object({
    id: z.string().optional(),
    platform: z.string().min(1, 'Plataforma é obrigatória'),
    url: z.string().url('URL inválida').min(1, 'URL é obrigatória')
  })).optional(),
  // Novas propriedades adicionadas
  experience: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Título é obrigatório'),
    company: z.string().min(1, 'Empresa é obrigatória'),
    years: z.string().min(1, 'Anos de experiência são obrigatórios')
  })).optional(),
  education: z.array(z.object({
    id: z.string().optional(),
    degree: z.string().min(1, 'Grau/Diploma é obrigatório'),
    institution: z.string().min(1, 'Instituição é obrigatória'),
    years: z.string().min(1, 'Anos de estudo são obrigatórios')
  })).optional(),
  reviews: z.array(z.object({
    id: z.string().optional(),
    authorName: z.string().min(1, 'Nome do autor é obrigatório'),
    authorAvatarUrl: z.string().url('URL do avatar inválida').optional().or(z.literal('')),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional()
  })).optional()
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialData: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading: boolean;
}

const socialPlatforms = [
  { value: 'instagram', label: 'Instagram', icon: Instagram },
  { value: 'linkedin', label: 'LinkedIn', icon: Linkedin },
  { value: 'github', label: 'GitHub', icon: Github },
  { value: 'facebook', label: 'Facebook', icon: Facebook },
  { value: 'twitter', label: 'Twitter/X', icon: Twitter },
  { value: 'youtube', label: 'YouTube', icon: Youtube },
  { value: 'website', label: 'Website', icon: Globe },
  { value: 'outra', label: 'Outra', icon: Globe }
];

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    watch
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData,
    mode: 'onChange'
  });

  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({
    control,
    name: 'portfolio'
  });

  const { fields: sociallinksFields, append: appendSociallink, remove: removeSociallink } = useFieldArray({
    control,
    name: 'sociallinks'
  });

  const { fields: servicesFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: 'services'
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: 'experience'
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: 'education'
  });

  const { fields: reviewsFields, append: appendReview, remove: removeReview } = useFieldArray({
    control,
    name: 'reviews'
  });

  const [activeTab, setActiveTab] = React.useState('basico');
  const tabOptions = [
    { value: 'basico', label: 'Básico', icon: User },
    { value: 'contato', label: 'Contato', icon: Phone },
    { value: 'imagens', label: 'Imagens', icon: ImageIcon },
    { value: 'redes', label: 'Redes Sociais', icon: Globe },
    { value: 'localizacao', label: 'Localização', icon: MapPin },
    { value: 'experiencia', label: 'Experiência', icon: Briefcase },
    { value: 'educacao', label: 'Educação', icon: BookOpen },
    { value: 'habilidades', label: 'Habilidades', icon: Star }
  ];

  // Crie uma função onSubmit interna para logar e repassar
  const handleInternalSubmit = (data: ProfileFormValues) => {
    logger.debug('Profile form submitted');
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleInternalSubmit)} className="space-y-6">
      <div className="w-full bg-card rounded shadow-xl shadow-black/20 dark:shadow-black/50 overflow-hidden border border-black/5 dark:border-white/10 p-2 mb-6">
        <div className="flex flex-row flex-wrap justify-center items-center gap-2 min-h-[56px]">
          {tabOptions.map(tab => (
            <FilterButton
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              isActive={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
            />
          ))}
        </div>
      </div>
      {activeTab === 'basico' && (
        <div>
          {/* Campos da seção Básico */}
          <Card>
            <CardHeader>
              <CardTitle>Informações Básicas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Nome Completo</Label>
                <Input id="name" {...register('name')} />
                {errors.name && (
                  <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="username">Nome de Usuário</Label>
                <Input id="username" {...register('username')} />
                {errors.username && (
                  <p className="text-destructive text-sm mt-1">{errors.username.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" {...register('bio')} />
              </div>
              <div>
                <Label htmlFor="category">Categoria</Label>
                <Input id="category" {...register('category')} />
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="isAvailable" {...register('isAvailable')} />
                <Label htmlFor="isAvailable">Disponível para Trabalho/Consultoria</Label>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'contato' && (
        <div>
          {/* Campos da seção Contato */}
          <Card>
            <CardHeader>
              <CardTitle>Contato</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" {...register('email')} />
                {errors.email && (
                  <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone">Telefone</Label>
                <Input id="phone" {...register('phone')} />
              </div>
              <div>
                <Label htmlFor="whatsappNumber">Número de WhatsApp</Label>
                <Input id="whatsappNumber" {...register('whatsappNumber')} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'imagens' && (
        <div>
          {/* Campos da seção Imagens */}
          <Card className="border-0 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-center">Imagens do Perfil</CardTitle>
              <CardDescription className="text-center">
                Gerencie sua foto de perfil e capa
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-12 items-center justify-center w-full min-h-[60vh]">
                {/* Foto de Perfil */}
                <div className="flex flex-col items-center w-full">
                  <span className="font-medium mb-2 flex items-center gap-2 text-center"><ImageIcon className="w-5 h-5" /> Foto de Perfil</span>
                  <div className="flex flex-col items-center">
                    <ImageUploadField
                      label="Foto de Perfil"
                      name="profilePictureUrl"
                      control={control}
                      setValue={setValue as (name: string, value: any, options?: any) => void}
                      currentImageUrl={watch('profilePictureUrl')}
                      uploading={false}
                      setUploading={() => {}}
                      aspectRatio="1/1"
                      hint={<span className="block text-center">Recomendado: 1:1, 400x400px, até 2MB.</span>}
                      buttonText="Enviar Foto"
                    />
                  </div>
                </div>
                {/* Imagem de Capa */}
                <div className="flex flex-col items-center w-full">
                  <span className="font-medium mb-2 flex items-center gap-2 text-center"><ImageIcon className="w-5 h-5" /> Imagem de Capa</span>
                  <div className="flex flex-col items-center w-full">
                    <ImageUploadField
                      label="Foto de Capa"
                      name="coverPhotoUrl"
                      control={control}
                      setValue={setValue as (name: string, value: any, options?: any) => void}
                      currentImageUrl={watch('coverPhotoUrl')}
                      uploading={false}
                      setUploading={() => {}}
                      aspectRatio="16/9"
                      hint={<span className="block text-center">Recomendado: 16:9, 1200x675px, até 2MB.</span>}
                      buttonText="Enviar Capa"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'redes' && (
        <div>
          {/* Campos da seção Redes Sociais */}
          <Card>
            <CardHeader>
              <CardTitle>Links Sociais</CardTitle>
            </CardHeader>
            <CardContent>
              {sociallinksFields.length === 0 && (
                <p className="text-muted-foreground text-sm mb-4">Adicione links para suas redes sociais.</p>
              )}
              <div className="space-y-4">
                {sociallinksFields.map((link, index) => (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end border p-4 rounded-lg">
                      <div>
                        <Label htmlFor={`sociallinks.${index}.platform`}>Plataforma</Label>
                        <Controller
                          control={control}
                          name={`sociallinks.${index}.platform`}
                          render={({ field }) => (
                            <Select value={field.value} onValueChange={field.onChange}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione a plataforma" />
                              </SelectTrigger>
                              <SelectContent>
                                {socialPlatforms.map((option) => (
                                  <SelectItem key={option.value} value={option.value}>
                                    <div className="flex items-center">
                                      <option.icon className="w-4 h-4 mr-2" />
                                      {option.label}
                                    </div>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.sociallinks?.[index]?.platform && (
                          <p className="text-destructive text-sm mt-1">{errors.sociallinks[index]?.platform?.message}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor={`sociallinks.${index}.url`}>URL</Label>
                        <Input
                          id={`sociallinks.${index}.url`}
                          {...register(`sociallinks.${index}.url`, { required: 'URL é obrigatória' })}
                          placeholder={
                            socialPlatforms.find(opt => opt.value === watch(`sociallinks.${index}.platform`))?.label === 'Website'
                              ? 'https://seusite.com'
                              : 'https://exemplo.com/seu-perfil'
                          }
                        />
                        {errors.sociallinks?.[index]?.url && (
                          <p className="text-destructive text-sm mt-1">{errors.sociallinks[index]?.url?.message}</p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeSociallink(index)}
                        className="md:col-span-2 mt-2 md:mt-0"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => appendSociallink({ id: Date.now().toString(), platform: '', url: '' })}
                className="w-full mt-4"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Link Social
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'localizacao' && (
        <div>
          {/* Campos da seção Localização */}
          <Card>
            <CardHeader>
              <CardTitle>Localização</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="location.city">Cidade</Label>
                <Input id="location.city" {...register('location.city')} />
              </div>
              <div>
                <Label htmlFor="location.country">País</Label>
                <Input id="location.country" {...register('location.country')} />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'experiencia' && (
        <div>
          {/* Campos da seção Experiência */}
          <Card>
            <CardHeader>
              <CardTitle>Experiência Profissional</CardTitle>
            </CardHeader>
            <CardContent>
              {experienceFields.length === 0 && (
                <p className="text-muted-foreground text-sm mb-4">Adicione suas experiências profissionais.</p>
              )}
              {experienceFields.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-end space-x-2 mb-4 border p-4 rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label htmlFor={`experience.${index}.title`}>Título do Cargo</Label>
                      <Input
                        id={`experience.${index}.title`}
                        {...register(`experience.${index}.title`, { required: 'Título é obrigatório' })}
                      />
                      {errors.experience?.[index]?.title && (
                        <p className="text-destructive text-sm mt-1">{errors.experience[index]?.title?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.company`}>Empresa</Label>
                      <Input
                        id={`experience.${index}.company`}
                        {...register(`experience.${index}.company`, { required: 'Empresa é obrigatória' })}
                      />
                      {errors.experience?.[index]?.company && (
                        <p className="text-destructive text-sm mt-1">{errors.experience[index]?.company?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`experience.${index}.years`}>Anos</Label>
                      <Input
                        id={`experience.${index}.years`}
                        {...register(`experience.${index}.years`, { required: 'Anos de experiência são obrigatórios' })}
                        placeholder="Ex: 2018-2022"
                      />
                      {errors.experience?.[index]?.years && (
                        <p className="text-destructive text-sm mt-1">{errors.experience[index]?.years?.message}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeExperience(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </motion.div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendExperience({ id: Date.now().toString(), title: '', company: '', years: '' })}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Experiência
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'educacao' && (
        <div>
          {/* Campos da seção Educação */}
          <Card>
            <CardHeader>
              <CardTitle>Educação</CardTitle>
            </CardHeader>
            <CardContent>
              {educationFields.length === 0 && (
                <p className="text-muted-foreground text-sm mb-4">Adicione sua formação acadêmica.</p>
              )}
              {educationFields.map((edu, index) => (
                <motion.div
                  key={edu.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-end space-x-2 mb-4 border p-4 rounded-lg"
                >
                  <div className="flex-1 space-y-2">
                    <div>
                      <Label htmlFor={`education.${index}.degree`}>Grau/Diploma</Label>
                      <Input
                        id={`education.${index}.degree`}
                        {...register(`education.${index}.degree`, { required: 'Grau/Diploma é obrigatório' })}
                      />
                      {errors.education?.[index]?.degree && (
                        <p className="text-destructive text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.institution`}>Instituição</Label>
                      <Input
                        id={`education.${index}.institution`}
                        {...register(`education.${index}.institution`, { required: 'Instituição é obrigatória' })}
                      />
                      {errors.education?.[index]?.institution && (
                        <p className="text-destructive text-sm mt-1">{errors.education[index]?.institution?.message}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor={`education.${index}.years`}>Anos</Label>
                      <Input
                        id={`education.${index}.years`}
                        {...register(`education.${index}.years`, { required: 'Anos de estudo são obrigatórios' })}
                        placeholder="Ex: 2014-2018"
                      />
                      {errors.education?.[index]?.years && (
                        <p className="text-destructive text-sm mt-1">{errors.education[index]?.years?.message}</p>
                      )}
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeEducation(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </motion.div>
              ))}
              <Button
                type="button"
                variant="outline"
                onClick={() => appendEducation({ id: Date.now().toString(), degree: '', institution: '', years: '' })}
                className="w-full"
              >
                <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Educação
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
      {activeTab === 'habilidades' && (
        <div>
          {/* Campos da seção Habilidades */}
          <Card>
            <CardHeader>
              <CardTitle>Habilidades</CardTitle>
            </CardHeader>
            <CardContent>
              <div>
                <Label htmlFor="skills">Habilidades (separadas por vírgula)</Label>
                <Input
                  id="skills"
                  {...register('skills', {
                    setValueAs: (value) => String(value || '').split(',').map((s: string) => s.trim())
                  })}
                  defaultValue={initialData.skills?.join(', ')}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}
      <Button type="submit" disabled={isLoading} className="mt-4">
        {isLoading ? 'Salvando...' : 'Salvar Alterações'}
      </Button>
    </form>
  );
};
