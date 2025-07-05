import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Parâmetro userId é obrigatório.' }, { status: 400 });
  }

  try {
    // 1. Contar o total de avaliações
    const { count: totalReviewsRaw, error: countError } = await supabase
      .from('reviews')
      .select('id', { count: 'exact' })
      .eq('reviewed_user_id', userId)
      .eq('is_public', true);

    if (countError) {
      console.error('Erro ao contar avaliações:', countError);
      return NextResponse.json({ error: countError.message }, { status: 500 });
    }

    const totalReviews = totalReviewsRaw || 0;

    // 2. Calcular a média das avaliações
    const { data: avgData, error: avgError } = await supabase
      .from('reviews')
      .select('rating')
      .eq('reviewed_user_id', userId)
      .eq('is_public', true);

    if (avgError) {
      console.error('Erro ao buscar ratings para média:', avgError);
      return NextResponse.json({ error: avgError.message }, { status: 500 });
    }

    const sumRatings = avgData?.reduce((acc, review) => acc + review.rating, 0) || 0;
    const averageRating = totalReviews > 0 ? (sumRatings / totalReviews).toFixed(1) : '0.0';

    // 3. Distribuição de estrelas
    const distribution: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    avgData?.forEach(review => {
      if (review.rating >= 1 && review.rating <= 5) {
        distribution[review.rating]++;
      }
    });

    return NextResponse.json({
      totalReviews,
      averageRating: parseFloat(averageRating),
      distribution,
    }, { status: 200 });

  } catch (error: any) {
    console.error('Erro inesperado na API de resumo de reviews (GET):', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor.' }, { status: 500 });
  }
} 