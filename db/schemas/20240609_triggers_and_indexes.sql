-- Migration: Triggers, funções e índices
-- Data: 2024-06-09

-- Função e Trigger para criar um perfil automaticamente no cadastro de um novo usuário
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_full_name TEXT := NEW.raw_user_meta_data->>'full_name';
BEGIN
  INSERT INTO public.profiles (id, full_name, email, username)
  VALUES (
    NEW.id,
    COALESCE(user_full_name, NEW.email),
    NEW.email,
    (
      SELECT CASE
        WHEN EXISTS (SELECT 1 FROM public.profiles WHERE username = split_part(NEW.email, '@', 1))
        THEN split_part(NEW.email, '@', 1) || '.' || substr(md5(random()::text), 1, 4)
        ELSE split_part(NEW.email, '@', 1)
      END
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Trigger para atualizar o timestamp 'updated_at' em cada alteração no perfil
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_profile_update();

-- Índices para buscas frequentes
CREATE INDEX idx_profiles_category ON public.profiles(category);
CREATE INDEX idx_profiles_is_available ON public.profiles(is_available);
CREATE INDEX idx_profiles_city ON public.profiles((location->>'city'));

-- Índices para as novas tabelas
CREATE INDEX idx_experience_profile_id ON public.experience(profile_id);
CREATE INDEX idx_education_profile_id ON public.education(profile_id);
CREATE INDEX idx_reviews_profile_id ON public.reviews(profile_id);
CREATE INDEX idx_layout_templates_name ON public.layout_templates(name); 