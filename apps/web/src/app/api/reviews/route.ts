import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = await createClient();

  try {
    const { reviewer_id, reviewed_user_id, rating, comment } = await req.json();

    if (!reviewer_id || !reviewed_user_id || !rating || !comment) {
      return NextResponse.json({ error: 'Parâmetros obrigatórios ausentes.' }, { status: 400 });
    }

    // Validar se o rating está entre 1 e 5
    if (rating < 1 || rating > 5) {
      return NextResponse.json({ error: 'A avaliação (rating) deve ser entre 1 e 5.' }, { status: 400 });
    }

    // Verificar se o usuário já avaliou este perfil
    const { data: existingReview, error: existingReviewError } = await supabase
      .from('reviews')
      .select('id')
      .eq('reviewer_id', reviewer_id)
      .eq('reviewed_user_id', reviewed_user_id)
      .single();

    if (existingReviewError && existingReviewError.code !== 'PGRST116') { // PGRST116 = No rows found
      console.error('Erro ao verificar review existente:', existingReviewError);
      return NextResponse.json({ error: 'Erro ao verificar avaliação existente.' }, { status: 500 });
    }

    if (existingReview) {
      return NextResponse.json({ error: 'Você já avaliou este usuário.' }, { status: 409 }); // Conflict
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert({
        reviewer_id,
        reviewed_user_id,
        rating,
        comment
      })
      .select();

    if (error) {
      console.error('Erro ao criar avaliação:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Avaliação criada com sucesso!', review: data[0] }, { status: 201 });

  } catch (error: any) {
    console.error('Erro inesperado na API de reviews:', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'Parâmetro userId é obrigatório.' }, { status: 400 });
  }

  try {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select(`
        id,
        rating,
        comment,
        created_at,
        reviewer_id,
        reviewed_user_id,
        reply,
        verified,
        profiles(full_name, username, avatar_url)
      `)
      .eq('reviewed_user_id', userId)
      .eq('is_public', true);

    if (error) {
      console.error('Erro ao buscar avaliações do Supabase:', error);
      return NextResponse.json({ error: 'Erro ao buscar avaliações.' }, { status: 500 });
    }

    return NextResponse.json({ reviews });
  } catch (error: any) {
    console.error('Erro inesperado na API de reviews (GET):', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const supabase = await createClient();
  const { searchParams } = new URL(req.url);
  const reviewId = searchParams.get('id');

  if (!reviewId) {
    return NextResponse.json({ error: 'ID da avaliação (id) é obrigatório.' }, { status: 400 });
  }

  try {
    // Obter o usuário autenticado
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      return NextResponse.json({ error: 'Não autenticado.' }, { status: 401 });
    }

    // Verificar se o usuário autenticado é o autor da avaliação
    const { data: reviewToDelete, error: fetchError } = await supabase
      .from('reviews')
      .select('reviewer_id')
      .eq('id', reviewId)
      .single();

    if (fetchError || !reviewToDelete) {
      console.error('Erro ao buscar avaliação para exclusão ou avaliação não encontrada:', fetchError);
      return NextResponse.json({ error: 'Avaliação não encontrada ou erro ao buscar.' }, { status: 404 });
    }

    if (reviewToDelete.reviewer_id !== user.id) {
      return NextResponse.json({ error: 'Você não tem permissão para excluir esta avaliação.' }, { status: 403 });
    }

    // Excluir a avaliação
    const { error: deleteError } = await supabase
      .from('reviews')
      .delete()
      .eq('id', reviewId);

    if (deleteError) {
      console.error('Erro ao excluir avaliação:', deleteError);
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Avaliação excluída com sucesso.' }, { status: 200 });

  } catch (error: any) {
    console.error('Erro inesperado na API de reviews (DELETE):', error);
    return NextResponse.json({ error: error.message || 'Erro interno do servidor.' }, { status: 500 });
  }
}
