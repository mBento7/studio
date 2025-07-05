import { useState, useEffect } from 'react';
import { Star, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

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
}

export function ReviewList({ reviewedUserId, currentUserId }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
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
  }, [reviewedUserId]);

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm('Tem certeza que deseja excluir esta avaliação?')) return;

    try {
      const response = await fetch(`/api/reviews?id=${reviewId}`, {
        method: 'DELETE',
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

  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg mt-4">
      <h3 className="text-lg font-semibold mb-4">Avaliações ({reviews.length})</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4 last:border-b-0 last:pb-0">
            <div className="flex items-center mb-2">
              <Image
                src={review.profiles.avatar_url || '/avatar-default.png'}
                alt={review.profiles.full_name || review.profiles.username}
                width={40}
                height={40}
                className="rounded-full mr-3"
              />
              <div>
                <p className="font-semibold">{review.profiles.full_name || review.profiles.username}</p>
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${star <= review.rating ? "text-yellow-400" : "text-gray-300"}`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-500">
                    {formatDistanceToNow(new Date(review.created_at), { addSuffix: true, locale: ptBR })}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 mb-2">{review.comment}</p>

            {review.reply && (
              <div className="bg-gray-100 p-2 rounded-md mt-2 ml-10 border-l-2 border-blue-500">
                <p className="font-semibold text-blue-700">Resposta do Avaliado:</p>
                <p className="text-gray-800">{review.reply}</p>
              </div>
            )}

            {review.verified && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
                Avaliação Verificada
              </span>
            )}

            {currentUserId === review.reviewer_id && (
              <button
                onClick={() => handleDeleteReview(review.id)}
                className="ml-auto text-red-500 hover:text-red-700 text-sm mt-2 flex items-center"
              >
                <Trash2 className="w-4 h-4 mr-1" /> Excluir
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
} 