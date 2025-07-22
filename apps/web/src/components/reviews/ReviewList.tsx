import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Card } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext
} from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';

interface Review {
  id: string;
  reviewer_id: string;
  reviewed_user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  is_flagged: boolean;
  flagged_reason: string | null;
  reply: string | null;
  verified: boolean;
  profiles: { // Dados do avaliador
    full_name: string;
    username: string;
    avatar_url: string;
  };
}

interface ReviewListProps {
  reviewedUserId: string; // ID do usuário que está sendo avaliado
  currentUserId?: string; // ID do usuário logado (opcional, para moderação/exclusão)
  renderAsCarousel?: boolean;
  reviews?: any[]; // Novo: permite passar reviews diretamente
}

export function ReviewList({ reviewedUserId, currentUserId, renderAsCarousel = false, reviews: propReviews }: ReviewListProps) {
  const [reviews, setReviews] = useState<any[]>(propReviews || []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Embla state para slides visíveis
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'center', slidesToScroll: 1 });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on('select', onSelect);
    onSelect();
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);

  // Adicionar log para debug
  useEffect(() => {
    console.log('🔍 DEBUG - ReviewList propReviews:', propReviews);
    console.log('🔍 DEBUG - ReviewList reviews state:', reviews);
  }, [propReviews, reviews]);

  useEffect(() => {
    if (Array.isArray(propReviews) && propReviews.length > 0) {
      setReviews(propReviews);
      setLoading(false);
    } else {
      // Busca via API se não houver reviews na prop ou se for array vazio
      setLoading(true);
      const fetchReviews = async () => {
        try {
          const response = await fetch(`/api/reviews?userId=${reviewedUserId}`);
          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Erro ao buscar avaliações.');
          }

          setReviews(data.reviews);
        } catch (err: any) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchReviews();
    }
  }, [reviewedUserId, propReviews]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    try {
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao excluir avaliação.');
      }

      setReviews(reviews.filter(review => review.id !== reviewId));
      alert('Avaliação excluída com sucesso!');
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    }
  };

  if (loading) return <div className="p-4 text-center">Carregando avaliações...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Erro: {error}</div>;
  if (reviews.length === 0) return <div className="p-4 text-center text-gray-500">Nenhuma avaliação ainda.</div>;

  if (renderAsCarousel) {
    return (
      <Carousel
        className="w-full max-w-2xl mx-auto"
        opts={{ align: 'center', slidesToScroll: 1 }}
      >
        <CarouselContent ref={emblaRef}>
          {reviews.map((review, idx) => {
            let className = 'transition-transform duration-300';
            if (idx === selectedIndex) className += ' is-selected';
            else if (idx === selectedIndex - 1) className += ' is-prev';
            else if (idx === selectedIndex + 1) className += ' is-next';
            return (
              <CarouselItem
                key={review.id}
                className={className}
                style={{}}
              >
                <Card
                  className={
                    'min-w-[320px] max-w-xs flex-shrink-0 p-4 md:p-6 shadow-md dark:bg-slate-800/80 mx-auto review-carousel-card'
                  }
                  data-index={idx}
                >
                  <div className="flex items-start mb-2">
                    <Image
                      src={review.profiles?.avatar_url || '/avatar-default.png'}
                      alt={review.profiles?.full_name || review.profiles?.username || 'Usuário Anônimo'}
                      width={40}
                      height={40}
                      className="rounded-full mr-3 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-slate-200">{review.profiles?.full_name || review.profiles?.username || 'Usuário Anônimo'}</p>
                      <div className="flex items-center text-sm mb-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                          />
                        ))}
                        <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                          {review.created_at && !isNaN(new Date(review.created_at).getTime())
                            ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })
                            : 'Data inválida'}
                        </span>
                      </div>
                      <p className="text-slate-700 dark:text-slate-300">{review.comment}</p>
                    </div>
                    {currentUserId === review.reviewer_id && (
                      <button
                        onClick={() => handleDeleteReview(review.id)}
                        className="ml-4 text-red-500 hover:text-red-700 text-xs flex items-center"
                      >
                        <Trash2 className="w-3 h-3 mr-1" /> Excluir
                      </button>
                    )}
                  </div>
                  {review.reply && (
                    <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-md mt-2 ml-13 border-l-2 border-blue-500 dark:border-blue-400">
                      <p className="font-semibold text-blue-700 dark:text-blue-300">Resposta do Avaliado:</p>
                      <p className="text-slate-800 dark:text-slate-200 text-sm">{review.reply}</p>
                    </div>
                  )}
                  {review.verified && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mt-2 ml-13">
                      Avaliação Verificada
                    </span>
                  )}
                </Card>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    );
  }

  return (
    <Card className="p-4 md:p-6 shadow-md dark:bg-slate-800/80 mt-4">
      <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">Avaliações ({reviews.length})</h3>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0 border-slate-200 dark:border-slate-700">
            <div className="flex items-start mb-2">
              <Image
                src={review.profiles?.avatar_url || '/avatar-default.png'}
                alt={review.profiles?.full_name || review.profiles?.username || 'Usuário Anônimo'}
                width={40}
                height={40}
                className="rounded-full mr-3 flex-shrink-0"
              />
              <div className="flex-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">{review.profiles?.full_name || review.profiles?.username || 'Usuário Anônimo'}</p>
                <div className="flex items-center text-sm mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`}
                    />
                  ))}
                  <span className="ml-2 text-xs text-slate-500 dark:text-slate-400">
                    {review.created_at && !isNaN(new Date(review.created_at).getTime())
                      ? formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })
                      : 'Data inválida'}
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300">{review.comment}</p>
              </div>
              {currentUserId === review.reviewer_id && (
                <button
                  onClick={() => handleDeleteReview(review.id)}
                  className="ml-4 text-red-500 hover:text-red-700 text-xs flex items-center"
                >
                  <Trash2 className="w-3 h-3 mr-1" /> Excluir
                </button>
              )}
            </div>

            {review.reply && (
              <div className="bg-slate-100 dark:bg-slate-700 p-2 rounded-md mt-2 ml-13 border-l-2 border-blue-500 dark:border-blue-400">
                <p className="font-semibold text-blue-700 dark:text-blue-300">Resposta do Avaliado:</p>
                <p className="text-slate-800 dark:text-slate-200 text-sm">{review.reply}</p>
              </div>
            )}

            {review.verified && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 mt-2 ml-13">
                Avaliação Verificada
              </span>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
