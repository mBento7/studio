import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { PlusCircle, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Esquema de validação para um item do portfólio
const portfolioItemSchema = z.object({
  id: z.string().optional(),
  imageUrl: z.string().url("URL da imagem inválida").min(1, "URL da imagem é obrigatória"),
  caption: z.string().optional(),
  description: z.string().optional(),
  dataAiHint: z.string().optional(),
});

// Esquema de validação para o formulário completo do perfil
const profileFormSchema = z.object({
  username: z.string().min(2, "Nome de usuário deve ter pelo menos 2 caracteres."),
  name: z.string().min(2, "Nome completo deve ter pelo menos 2 caracteres."),
  email: z.string().email("Email inválido.").optional(),
  phone: z.string().optional(),
  whatsappNumber: z.string().optional(),
  bio: z.string().optional(),
  profilePictureUrl: z.string().url("URL da imagem de perfil inválida").optional().or(z.literal("")),
  coverPhotoUrl: z.string().url("URL da foto de capa inválida").optional().or(z.literal("")),
  category: z.string().optional(),
  isAvailable: z.boolean().default(true).optional(),
  location: z.object({
    city: z.string().optional(),
    country: z.string().optional(),
  }).optional(),
  skills: z.array(z.string()).optional(),
  portfolio: z.array(portfolioItemSchema).optional(),
  services: z.array(z.object({
    id: z.string().optional(),
    name: z.string().min(1, "Nome do serviço é obrigatório"),
    description: z.string().optional(),
  })).optional(),
  socialLinks: z.array(z.object({
    id: z.string().optional(),
    platform: z.string().min(1, "Plataforma é obrigatória"),
    url: z.string().url("URL inválida").min(1, "URL é obrigatória"),
  })).optional(),
  // Novas propriedades adicionadas
  experience: z.array(z.object({
    id: z.string().optional(),
    title: z.string().min(1, "Título é obrigatório"),
    company: z.string().min(1, "Empresa é obrigatória"),
    years: z.string().min(1, "Anos de experiência são obrigatórios"),
  })).optional(),
  education: z.array(z.object({
    id: z.string().optional(),
    degree: z.string().min(1, "Grau/Diploma é obrigatório"),
    institution: z.string().min(1, "Instituição é obrigatória"),
    years: z.string().min(1, "Anos de estudo são obrigatórios"),
  })).optional(),
  reviews: z.array(z.object({
    id: z.string().optional(),
    authorName: z.string().min(1, "Nome do autor é obrigatório"),
    authorAvatarUrl: z.string().url("URL do avatar inválida").optional().or(z.literal("")),
    rating: z.number().int().min(1).max(5),
    comment: z.string().optional(),
  })).optional(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

interface ProfileFormProps {
  initialData: ProfileFormValues;
  onSubmit: (data: ProfileFormValues) => void;
  isLoading: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ initialData, onSubmit, isLoading }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: initialData,
    mode: "onChange",
  });

  const { fields: portfolioFields, append: appendPortfolio, remove: removePortfolio } = useFieldArray({
    control,
    name: "portfolio",
  });

  const { fields: socialLinksFields, append: appendSocialLink, remove: removeSocialLink } = useFieldArray({
    control,
    name: "socialLinks",
  });

  const { fields: servicesFields, append: appendService, remove: removeService } = useFieldArray({
    control,
    name: "services",
  });

  const { fields: experienceFields, append: appendExperience, remove: removeExperience } = useFieldArray({
    control,
    name: "experience",
  });

  const { fields: educationFields, append: appendEducation, remove: removeEducation } = useFieldArray({
    control,
    name: "education",
  });

  const { fields: reviewsFields, append: appendReview, remove: removeReview } = useFieldArray({
    control,
    name: "reviews",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Informações Básicas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Nome Completo</Label>
            <Input id="name" {...register("name")} />
            {errors.name && (
              <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="username">Nome de Usuário</Label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <p className="text-destructive text-sm mt-1">{errors.username.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" {...register("email")} />
            {errors.email && (
              <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Telefone</Label>
            <Input id="phone" {...register("phone")} />
          </div>
          <div>
            <Label htmlFor="whatsappNumber">Número de WhatsApp</Label>
            <Input id="whatsappNumber" {...register("whatsappNumber")} />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" {...register("bio")} />
          </div>
          <div>
            <Label htmlFor="profilePictureUrl">URL da Foto de Perfil</Label>
            <Input id="profilePictureUrl" {...register("profilePictureUrl")} />
            {errors.profilePictureUrl && (
              <p className="text-destructive text-sm mt-1">{errors.profilePictureUrl.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="coverPhotoUrl">URL da Foto de Capa</Label>
            <Input id="coverPhotoUrl" {...register("coverPhotoUrl")} />
            {errors.coverPhotoUrl && (
              <p className="text-destructive text-sm mt-1">{errors.coverPhotoUrl.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <Input id="category" {...register("category")} />
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" id="isAvailable" {...register("isAvailable")} />
            <Label htmlFor="isAvailable">Disponível para Trabalho/Consultoria</Label>
          </div>
          <div>
            <Label htmlFor="location.city">Cidade</Label>
            <Input id="location.city" {...register("location.city")} />
          </div>
          <div>
            <Label htmlFor="location.country">País</Label>
            <Input id="location.country" {...register("location.country")} />
          </div>
          <div>
            <Label htmlFor="skills">Habilidades (separadas por vírgula)</Label>
            <Input
              id="skills"
              {...register("skills", {
                setValueAs: (value) => String(value || '').split(',').map((s: string) => s.trim()),
              })}
              defaultValue={initialData.skills?.join(', ')} // Define o valor inicial como string
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links Sociais</CardTitle>
        </CardHeader>
        <CardContent>
          {socialLinksFields.length === 0 && (
            <p className="text-muted-foreground text-sm mb-4">Adicione links para suas redes sociais.</p>
          )}
          {socialLinksFields.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-end space-x-2 mb-4 border p-4 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor={`socialLinks.${index}.platform`}>Plataforma</Label>
                  <Input
                    id={`socialLinks.${index}.platform`}
                    {...register(`socialLinks.${index}.platform`, { required: "Plataforma é obrigatória" })}
                    placeholder="Instagram, LinkedIn, GitHub etc."
                  />
                  {errors.socialLinks?.[index]?.platform && (
                    <p className="text-destructive text-sm mt-1">{errors.socialLinks[index]?.platform?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`socialLinks.${index}.url`}>URL</Label>
                  <Input
                    id={`socialLinks.${index}.url`}
                    {...register(`socialLinks.${index}.url`, { required: "URL é obrigatória" })}
                    placeholder="https://exemplo.com/seu-perfil"
                  />
                  {errors.socialLinks?.[index]?.url && (
                    <p className="text-destructive text-sm mt-1">{errors.socialLinks[index]?.url?.message}</p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeSocialLink(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendSocialLink({ id: Date.now().toString(), platform: '', url: '' })}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Link Social
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Serviços</CardTitle>
        </CardHeader>
        <CardContent>
          {servicesFields.length === 0 && (
            <p className="text-muted-foreground text-sm mb-4">Adicione os serviços que você oferece.</p>
          )}
          {servicesFields.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-end space-x-2 mb-4 border p-4 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor={`services.${index}.name`}>Nome do Serviço</Label>
                  <Input
                    id={`services.${index}.name`}
                    {...register(`services.${index}.name`, { required: "Nome do serviço é obrigatório" })}
                    placeholder="Desenvolvimento Web, Design Gráfico, Consultoria etc."
                  />
                  {errors.services?.[index]?.name && (
                    <p className="text-destructive text-sm mt-1">{errors.services[index]?.name?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`services.${index}.description`}>Descrição (Opcional)</Label>
                  <Textarea
                    id={`services.${index}.description`}
                    {...register(`services.${index}.description`)}
                    placeholder="Descreva brevemente o serviço."
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeService(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendService({ id: Date.now().toString(), name: '', description: '' })}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Serviço
          </Button>
        </CardContent>
      </Card>

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
                    {...register(`experience.${index}.title`, { required: "Título é obrigatório" })}
                  />
                  {errors.experience?.[index]?.title && (
                    <p className="text-destructive text-sm mt-1">{errors.experience[index]?.title?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`experience.${index}.company`}>Empresa</Label>
                  <Input
                    id={`experience.${index}.company`}
                    {...register(`experience.${index}.company`, { required: "Empresa é obrigatória" })}
                  />
                  {errors.experience?.[index]?.company && (
                    <p className="text-destructive text-sm mt-1">{errors.experience[index]?.company?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`experience.${index}.years`}>Anos</Label>
                  <Input
                    id={`experience.${index}.years`}
                    {...register(`experience.${index}.years`, { required: "Anos de experiência são obrigatórios" })}
                    placeholder="Ex: 2018-2022"
                  />
                  {errors.experience?.[index]?.years && (
                    <p className="text-destructive text-sm mt-1">{errors.experience[index]?.years?.message}</p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
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
                    {...register(`education.${index}.degree`, { required: "Grau/Diploma é obrigatório" })}
                  />
                  {errors.education?.[index]?.degree && (
                    <p className="text-destructive text-sm mt-1">{errors.education[index]?.degree?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`education.${index}.institution`}>Instituição</Label>
                  <Input
                    id={`education.${index}.institution`}
                    {...register(`education.${index}.institution`, { required: "Instituição é obrigatória" })}
                  />
                  {errors.education?.[index]?.institution && (
                    <p className="text-destructive text-sm mt-1">{errors.education[index]?.institution?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`education.${index}.years`}>Anos</Label>
                  <Input
                    id={`education.${index}.years`}
                    {...register(`education.${index}.years`, { required: "Anos de estudo são obrigatórios" })}
                    placeholder="Ex: 2014-2018"
                  />
                  {errors.education?.[index]?.years && (
                    <p className="text-destructive text-sm mt-1">{errors.education[index]?.years?.message}</p>
                  )}
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
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

      <Card>
        <CardHeader>
          <CardTitle>Avaliações</CardTitle>
        </CardHeader>
        <CardContent>
          {reviewsFields.length === 0 && (
            <p className="text-muted-foreground text-sm mb-4">Adicione avaliações/depoimentos.</p>
          )}
          {reviewsFields.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="flex items-end space-x-2 mb-4 border p-4 rounded-lg"
            >
              <div className="flex-1 space-y-2">
                <div>
                  <Label htmlFor={`reviews.${index}.authorName`}>Nome do Autor</Label>
                  <Input
                    id={`reviews.${index}.authorName`}
                    {...register(`reviews.${index}.authorName`, { required: "Nome do autor é obrigatório" })}
                  />
                  {errors.reviews?.[index]?.authorName && (
                    <p className="text-destructive text-sm mt-1">{errors.reviews[index]?.authorName?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`reviews.${index}.authorAvatarUrl`}>URL do Avatar do Autor</Label>
                  <Input
                    id={`reviews.${index}.authorAvatarUrl`}
                    {...register(`reviews.${index}.authorAvatarUrl`)}
                    placeholder="https://exemplo.com/avatar.jpg"
                  />
                  {errors.reviews?.[index]?.authorAvatarUrl && (
                    <p className="text-destructive text-sm mt-1">{errors.reviews[index]?.authorAvatarUrl?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`reviews.${index}.rating`}>Avaliação (1-5)</Label>
                  <Input
                    id={`reviews.${index}.rating`}
                    type="number"
                    {...register(`reviews.${index}.rating`, { valueAsNumber: true, min: 1, max: 5 })}
                  />
                  {errors.reviews?.[index]?.rating && (
                    <p className="text-destructive text-sm mt-1">{errors.reviews[index]?.rating?.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor={`reviews.${index}.comment`}>Comentário (Opcional)</Label>
                  <Textarea
                    id={`reviews.${index}.comment`}
                    {...register(`reviews.${index}.comment`)}
                    placeholder="Escreva o comentário..."
                  />
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeReview(index)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </motion.div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={() => appendReview({
              id: Date.now().toString(),
              authorName: '',
              authorAvatarUrl: '',
              rating: 5,
              comment: ''
            })}
            className="w-full"
          >
            <PlusCircle className="mr-2 h-4 w-4" /> Adicionar Avaliação
          </Button>
        </CardContent>
      </Card>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Salvando..." : "Salvar Alterações"}
      </Button>
    </form>
  );
};
