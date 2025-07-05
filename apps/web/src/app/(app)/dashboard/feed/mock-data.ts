import { getAllUserProfiles } from '@/services/profile.service';

// Função para gerar cards automáticos a partir de usuários reais do Supabase
export async function getFeedItemsFromSupabase(limit = 12) {
  const users = await getAllUserProfiles(limit);
  if (!users || users.length === 0) return [];
  // Mistura de cards para cada usuário
  const cards = users.flatMap((u, idx) => [
    // FeedCard
    {
      tipo: 'oferta_servico',
      titulo: `Serviço de ${u.category || 'Consultoria'}`,
      descricao: u.bio || 'Serviço profissional de alta qualidade.',
      imagem: u.profile_picture_url || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
      preco: u.services?.[0]?.price || 'R$ 99,90',
      localizacao: u.location?.city || 'São Paulo, SP',
      patrocinado: idx % 4 === 0,
      usuario: { nome: u.name, avatar: u.profile_picture_url },
      curtidas: Math.floor(Math.random() * 100),
      comentarios: Math.floor(Math.random() * 20),
      tags: u.skills?.slice(0, 3) || ['qualidade', 'promoção'],
      whatsappUrl: u.whatsappNumber ? `https://wa.me/${u.whatsappNumber}` : undefined,
      urgente: idx % 5 === 0,
    },
    // CouponCard
    {
      tipo: 'cupom',
      codigo: `USER${idx + 1}OFF`,
      desconto: `${10 + idx % 20}%`,
      validade: '31/12/2024',
      descricao: `Cupom especial do(a) ${u.name}`,
    },
    // BannerCard
    {
      tipo: 'banner',
      imagem: u.cover_photo_url || 'https://picsum.photos/seed/banner/400/200',
      texto: `Conheça o perfil de ${u.name}`,
      link: `/profile/${u.username}`,
    },
    // EventCard
    {
      tipo: 'evento',
      nome: `Evento com ${u.name}`,
      data: '15/08/2024',
      local: u.location?.city || 'Online',
      imagem: u.profile_picture_url || 'https://picsum.photos/seed/event/400/200',
      link: `/profile/${u.username}`,
    },
    // InviteCard
    {
      tipo: 'convite',
      texto: `Convide amigos para conhecer ${u.name}!`,
      bonus: `${5 + idx} créditos`,
      link: `/profile/${u.username}`,
    },
    // SponsoredAdCard
    {
      tipo: 'patrocinado',
      titulo: `Destaque: ${u.name}`,
      descricao: u.bio || 'Profissional em destaque na plataforma.',
      imagem: u.profile_picture_url || 'https://picsum.photos/seed/ad/400/200',
      link: `/profile/${u.username}`,
      usuarioId: u.id,
    },
    // TestimonialCard
    {
      tipo: 'depoimento',
      usuario: { nome: u.name, avatar: u.profile_picture_url },
      nota: Math.floor(Math.random() * 2) + 4,
      comentario: 'Ótimo profissional, recomendo muito!',
      servico: u.services?.[0]?.name || 'Serviço',
      imagem: u.profile_picture_url || 'https://picsum.photos/seed/testimonial/80/80',
    },
    // UpdateCard
    {
      tipo: 'atualizacao',
      titulo: `Atualização de ${u.name}`,
      descricao: 'Perfil atualizado recentemente!',
      data: 'Hoje',
    },
  ]);
  // Embaralhar cards
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
