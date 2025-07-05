import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

interface ReviewSummaryProps {
  reviewedUserId: string; // ID do usuário que está sendo avaliado
}

interface SummaryData {
  totalReviews: number;
  averageRating: number;
  distribution: { [key: number]: number }; // Ex: {1: 5, 2: 10, 3: 20, 4: 15, 5: 30}
}

export function ReviewSummary({ reviewedUserId }: ReviewSummaryProps) {
  const [summary, setSummary] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews/summary?userId=${reviewedUserId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || 'Erro ao buscar resumo das avaliações.');
        }

        setSummary(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, [reviewedUserId]);

  if (loading) return <div className="p-4 text-center">Carregando resumo...</div>;
  if (error) return <div className="p-4 text-center text-red-500">Erro ao carregar resumo: {error}</div>;
  if (!summary || summary.totalReviews === 0) return null; // Não mostra se não houver avaliações

  const maxReviewsInDistribution = Math.max(...Object.values(summary.distribution));

  return (
    <div className="p-4 border rounded-xl bg-white shadow-lg mt-4">
      <h3 className="text-lg font-semibold mb-4">Resumo das Avaliações</h3>
      <div className="flex items-center mb-4">
        <span className="text-4xl font-bold text-yellow-500">{summary.averageRating}</span>
        <div className="ml-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`w-6 h-6 ${star <= Math.round(summary.averageRating) ? "text-yellow-400" : "text-gray-300"}`}
              />
            ))}
          </div>
          <p className="text-gray-600">Baseado em {summary.totalReviews} avaliações</p>
        </div>
      </div>

      {/* Gráfico de distribuição de estrelas */}
      <div className="space-y-1">
        {[5, 4, 3, 2, 1].map((star) => {
          const count = summary.distribution[star] || 0;
          const percentage = summary.totalReviews > 0 ? (count / summary.totalReviews) * 100 : 0;
          const barWidth = maxReviewsInDistribution > 0 ? (count / maxReviewsInDistribution) * 100 : 0;

          return (
            <div key={star} className="flex items-center">
              <span className="text-sm font-medium mr-2 flex-shrink-0">{star} estrelas</span>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-yellow-400 h-2.5 rounded-full"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 ml-2 flex-shrink-0">{count}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 