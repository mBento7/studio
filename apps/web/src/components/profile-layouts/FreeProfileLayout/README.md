# FreeProfileLayout

**Plano:** free

**Gatilho:** `user.plan === 'free' && (user.layoutTemplateId === 'modern' || !user.layoutTemplateId)`

## Itens/Seções liberados
- Serviços
- Portfólio
- Habilidades
- Experiência
- Formação Acadêmica
- FAQ
- Avaliações de clientes

Layout moderno e visualmente atrativo, ideal para perfis gratuitos, com foco em exibir seções essenciais de forma clara e organizada.

## Props principais
- `user`: Objeto de perfil do usuário (obrigatório, tipo `UserProfile`)
- `isCurrentUserProfile?`: Indica se é o perfil do usuário logado
- `qrCodeUrl?`: URL do QR Code do perfil
- `onPortfolioItemClick?`: Função callback ao clicar em um item do portfólio
- `toast?`: Função de toast para feedbacks
- `mounted?`: Indica se o componente já foi montado

## Exemplo de uso
```tsx
import FreeProfileLayout from './FreeProfileLayout';

const profileData = {
  username: "mariasilva",
  name: "Maria Silva",
  profilePictureUrl: "/avatar-default.png",
  coverPhotoUrl: "/capa-exemplo.png",
  category: "Designer Gráfico",
  bio: "Profissional criativa com mais de 10 anos de experiência em design digital e branding.",
  email: "maria@email.com",
  phone: "+55 11 99999-9999",
  location: { city: "São Paulo", state: "SP", country: "Brasil" },
  skills: ["Photoshop", "Illustrator", "Branding", "UI/UX"],
  experience: [
    { title: "Designer Sênior", company: "Agência Criativa", years: "2018-2023" },
    { title: "Designer Júnior", company: "Estúdio Visual", years: "2015-2018" }
  ],
  education: [
    { degree: "Bacharel em Design", institution: "USP", years: "2011-2014" }
  ],
  portfolio: [
    { imageUrl: "/portfolio1.png", caption: "Identidade Visual" },
    { imageUrl: "/portfolio2.png", caption: "Campanha Digital" },
    { imageUrl: "/portfolio3.png", caption: "Website institucional para ONG" },
    { imageUrl: "/portfolio4.png", caption: "Embalagem de produto sustentável" }
  ],
  services: [
    { name: "Criação de Logotipo", description: "Desenvolvimento de identidade visual profissional." },
    { name: "Design de Posts", description: "Artes para redes sociais." },
    { name: "Apresentações", description: "Slides profissionais para empresas." },
    { name: "Consultoria de Branding", description: "Orientação estratégica para marcas." }
  ],
  socialLinks: [
    { id: 1, platform: "instagram", url: "https://instagram.com/mariasilva" },
    { id: 2, platform: "behance", url: "https://behance.net/mariasilva" },
    { id: 3, platform: "linkedin", url: "https://linkedin.com/in/mariasilva" },
    { id: 4, platform: "facebook", url: "https://facebook.com/mariasilva" }
  ],
  coupons: [
    { code: "BEMVINDA10", description: "10% de desconto na primeira contratação!" }
  ],
  shareUrl: "https://whosdo.com/mariasilva"
};

<FreeProfileLayout user={profileData} />
``` 