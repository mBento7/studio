-- Script para corrigir URLs de desenvolvimento em produção
-- Execute este script no banco de dados de produção para limpar URLs de desenvolvimento

-- Atualizar URLs de desenvolvimento para URLs padrão seguras
UPDATE public.profiles 
SET 
  profile_picture_url = CASE 
    WHEN profile_picture_url LIKE 'blob:http://localhost%' OR profile_picture_url LIKE 'blob:http://10.1.1.105%' 
    THEN 'https://api.dicebear.com/7.x/avataaars/svg?seed=' || username
    ELSE profile_picture_url
  END,
  cover_photo_url = CASE 
    WHEN cover_photo_url LIKE 'blob:http://localhost%' OR cover_photo_url LIKE 'blob:http://10.1.1.105%' 
    THEN 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200&h=400&fit=crop'
    ELSE cover_photo_url
  END
WHERE 
  profile_picture_url LIKE 'blob:http://localhost%' 
  OR profile_picture_url LIKE 'blob:http://10.1.1.105%'
  OR cover_photo_url LIKE 'blob:http://localhost%' 
  OR cover_photo_url LIKE 'blob:http://10.1.1.105%';

-- Verificar se há outras tabelas com URLs de desenvolvimento
UPDATE public.portfolio_items 
SET image_url = 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=400&fit=crop'
WHERE 
  image_url LIKE 'blob:http://localhost%' 
  OR image_url LIKE 'blob:http://10.1.1.105%';

-- Limpar URLs de desenvolvimento em outras possíveis colunas
UPDATE public.reviews 
SET author_avatar_url = 'https://api.dicebear.com/7.x/avataaars/svg?seed=user'
WHERE 
  author_avatar_url LIKE 'blob:http://localhost%' 
  OR author_avatar_url LIKE 'blob:http://10.1.1.105%';

-- Verificar resultados
SELECT 
  id, 
  username, 
  profile_picture_url, 
  cover_photo_url 
FROM public.profiles 
WHERE 
  profile_picture_url LIKE 'blob:%' 
  OR cover_photo_url LIKE 'blob:%'
  OR profile_picture_url LIKE '%localhost%'
  OR cover_photo_url LIKE '%localhost%'
  OR profile_picture_url LIKE '%10.1.1.105%'
  OR cover_photo_url LIKE '%10.1.1.105%';