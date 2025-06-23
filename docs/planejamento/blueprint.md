# **App Name**: WhosDo.com

## Core Features:

- Profile Customization: User profile creation with customizable fields like name, bio, profile picture, cover photo, social media links, location, services/products, portfolio images, and a YouTube video. Uses Supabase Auth for registration and login.
- Public Profile Page: Generates a public profile page for each user with a unique URL (whosdo.com/username or username.whosdo.com for paid clients) displaying their public information, contact buttons, and portfolio.
- Public Search: Implements a search functionality that allows users to find profiles based on city and professional/commercial category, displaying simplified profiles with quick access to user pages.
- QR Code Generation: Automatic generation of personalized QR codes (with the whosdo.com logo) for each user's public profile, making it easy to share their profile.
- Profile Enhancement Suggestions: The tool analyzes user profiles and generates suggestions for profile improvements to attract more visitors. This includes recommendations for bio text, optimal portfolio display, and call-to-action phrases.

## Style Guidelines:

- Primary color: A clean white or light grey (#F5F5F5) for the background to ensure readability and a professional look.
- Secondary color: A dark blue or charcoal grey (#333333) for text and primary interactive elements to provide contrast and sophistication.
- Accent: Teal (#008080) for key CTAs and highlights, providing a modern and engaging feel.
- Clean and modern typography optimized for readability across devices. Consider using a sans-serif font for body text and headings.
- Simple and recognizable icons for navigation and profile elements. Use a consistent style (e.g., filled or outlined) throughout the interface.
- A clean, single-page app (SPA) layout to ensure quick navigation
- Subtle animations on button hover states

# Planejamento: Transformação do Feed em Hub de Oportunidades

## Visão Geral
O Feed do WhosDo.com deve evoluir para um centro inteligente de descobertas, conexões locais e interações comerciais, tornando-se o coração da plataforma e uma vitrine social/comercial viva.

---

## O que pode ser exibido no Feed

### 1. Publicações de Usuários
- Mini portfólios com imagens e descrições
- Serviços recém-ofertados ou atualizados
- Produtos com foto, preço e condições
- Promoções relâmpago ou destaques semanais
- Mudanças de local ou disponibilidade (ex: "Agora atendendo em Recife!")

### 2. Conteúdo Patrocinado
- Anúncios pagos com moedas/créditos
- Serviços destacados por planos Premium
- Publicações impulsionadas com maior alcance
- Espaços reservados para patrocinadores externos

### 3. Recomendações Inteligentes
- "Perfis em alta na sua região"
- "Serviços que você pode gostar"
- "Mais buscados esta semana"
- Novidades da sua categoria favorita

### 4. Categorias e Hashtags em Destaque
- Exemplo: #DesignGráfico, #PetShop, #Delivery, #Eletricista, #FeitoÀMão
- Carrossel de hashtags/categorias para filtro rápido

---

## O que os usuários podem postar

### Para perfis comerciais ou com créditos
- Produtos (imagem + preço + estoque)
- Serviços (descrição, horários e localização)
- Stories com validade de 24h (status visual)
- Vídeos curtos (apresentação, bastidores, promoções)
- Avisos de agenda e disponibilidade (ex: "Vagas abertas amanhã")

### Para perfis gratuitos
- Solicitações ("alguém instala ar-condicionado em BH?")
- Projetos ou portfólios simples
- Indicações de outros profissionais
- Dúvidas ou interações da comunidade

---

## Funcionalidades do Feed
- Curtir, comentar e favoritar postagens
- Botões de ação rápida: WhatsApp, Ver Localização, Agendar agora
- Reações com emojis (👍, 💡, 🔧, 👏, 🤝)
- Destaque "urgente" (custo em créditos)
- Agendamento de postagens (exclusivo para Premium)
- Algoritmo de relevância por região, interesse e categoria

---

## Filtros para navegação no Feed
- Por categoria: serviços, produtos, área de atuação
- Por localização: cidade, bairro ou raio personalizado
- Por tipo: recentes, populares, recomendados
- Por reputação: avaliação e engajamento

---

## Exemplo de Card no Feed

**Serviço:**
📸 [Imagem do serviço]
**João Cortes Premium**
Cortes masculinos R$35 – Atendimento em domicílio até 20h  
❤ 23   💬 4   📍 Vila Mariana   ⚡ Patrocinado

**Produto:**
🛍️ [Imagem do produto]
**Bolos da Lú – Bolo no Pote**
R$8 | Sabores: Chocolate, Morango, Maracujá  
🛒 Fazer pedido  📦 Retirada ou entrega

---

## Por que isso importa?
- Cria engajamento diário
- Incentiva upgrade de plano e uso de moedas
- Oferece valor real para usuários e visitantes
- Transforma o WhosDo em uma vitrine social e comercial viva

---

## Sugestões de Implementação

1. **Refinar o componente de filtro** (categorias, localização, tipo, reputação).
2. **Implementar stories e banners patrocinados** no topo do feed.
3. **Adicionar lógica de recomendação** (por região/categoria/interesse).
4. **Permitir agendamento de postagens** (campo de data/hora na criação).
5. **Implementar reações com emojis** nos cards.
6. **Criar painel de analytics para o usuário** (visualizações, engajamento, etc).

---

Este planejamento serve como guia para evoluir o Feed do WhosDo.com, tornando-o um diferencial competitivo e um motor de engajamento e monetização para a plataforma.