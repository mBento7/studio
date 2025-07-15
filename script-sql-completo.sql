-- =====================================================
-- SCRIPT SQL COMPLETO PARA SUPABASE
-- Criação de todas as tabelas e configurações
-- =====================================================

-- Habilitar extensões necessárias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- TABELAS PRINCIPAIS
-- =====================================================

-- Tabela de perfis de usuários
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT,
  email TEXT UNIQUE,
  phone TEXT,
  whatsapp_number TEXT,
  bio TEXT,
  profile_picture_url TEXT,
  cover_photo_url TEXT,
  category TEXT,
  plan TEXT DEFAULT 'free'::text,
  layout_template_id TEXT DEFAULT 'default'::text,
  is_available BOOLEAN DEFAULT true,
  stripe_customer_id TEXT,
  location JSONB,
  skills JSONB,
  premium_banner JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de links sociais
CREATE TABLE IF NOT EXISTS public.social_links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de serviços
CREATE TABLE IF NOT EXISTS public.services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de itens do portfólio
CREATE TABLE IF NOT EXISTS public.portfolio_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de experiência profissional
CREATE TABLE IF NOT EXISTS public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Tabela de educação
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Tabela de avaliações
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Tabela de templates de layout
CREATE TABLE IF NOT EXISTS public.layout_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  available_for TEXT[] CHECK (available_for <@ ARRAY['standard'::text, 'premium'::text]),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Tabela de atividades
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- exemplo: 'profile_update'
  data JSONB, -- dados extras, como campos alterados
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================
-- FUNÇÕES E TRIGGERS
-- =====================================================

-- Função para criar perfil automaticamente no cadastro
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

-- Trigger para criar perfil no cadastro
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Função para atualizar timestamp
CREATE OR REPLACE FUNCTION public.handle_profile_update()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar timestamp
DROP TRIGGER IF EXISTS on_profile_updated ON public.profiles;
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_profile_update();

-- =====================================================
-- ÍNDICES PARA PERFORMANCE
-- =====================================================

-- Índices para profiles
CREATE INDEX IF NOT EXISTS idx_profiles_category ON public.profiles(category);
CREATE INDEX IF NOT EXISTS idx_profiles_is_available ON public.profiles(is_available);
CREATE INDEX IF NOT EXISTS idx_profiles_city ON public.profiles((location->>'city'));
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- Índices para tabelas relacionadas
CREATE INDEX IF NOT EXISTS idx_social_links_profile_id ON public.social_links(profile_id);
CREATE INDEX IF NOT EXISTS idx_services_profile_id ON public.services(profile_id);
CREATE INDEX IF NOT EXISTS idx_portfolio_items_profile_id ON public.portfolio_items(profile_id);
CREATE INDEX IF NOT EXISTS idx_experience_profile_id ON public.experience(profile_id);
CREATE INDEX IF NOT EXISTS idx_education_profile_id ON public.education(profile_id);
CREATE INDEX IF NOT EXISTS idx_reviews_profile_id ON public.reviews(profile_id);
CREATE INDEX IF NOT EXISTS idx_layout_templates_name ON public.layout_templates(name);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON public.activities(user_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created_at ON public.activities(created_at);

-- =====================================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- =====================================================

-- Habilitar RLS nas tabelas
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;

-- Políticas para profiles (leitura pública, escrita apenas pelo próprio usuário)
CREATE POLICY "Profiles são visíveis publicamente" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem inserir seu próprio perfil" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Usuários podem atualizar seu próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas para social_links
CREATE POLICY "Social links são visíveis publicamente" ON public.social_links
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar seus próprios social links" ON public.social_links
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para services
CREATE POLICY "Services são visíveis publicamente" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar seus próprios services" ON public.services
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para portfolio_items
CREATE POLICY "Portfolio items são visíveis publicamente" ON public.portfolio_items
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar seus próprios portfolio items" ON public.portfolio_items
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para experience
CREATE POLICY "Experience é visível publicamente" ON public.experience
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar sua própria experience" ON public.experience
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para education
CREATE POLICY "Education é visível publicamente" ON public.education
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar sua própria education" ON public.education
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para reviews
CREATE POLICY "Reviews são visíveis publicamente" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Usuários podem gerenciar reviews de seu perfil" ON public.reviews
  FOR ALL USING (auth.uid() = profile_id);

-- Políticas para activities
CREATE POLICY "Usuários podem ver suas próprias activities" ON public.activities
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas próprias activities" ON public.activities
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Layout templates são visíveis para todos
CREATE POLICY "Layout templates são visíveis publicamente" ON public.layout_templates
  FOR SELECT USING (true);

-- =====================================================
-- DADOS INICIAIS (SEEDS)
-- =====================================================

-- Inserir templates de layout padrão
INSERT INTO public.layout_templates (id, name, description, available_for) VALUES
  (uuid_generate_v4(), 'default', 'Template padrão simples e limpo', ARRAY['standard', 'premium']),
  (uuid_generate_v4(), 'modern', 'Template moderno com design arrojado', ARRAY['premium']),
  (uuid_generate_v4(), 'classic', 'Template clássico e elegante', ARRAY['standard', 'premium'])
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- VERIFICAÇÃO FINAL
-- =====================================================

-- Verificar se todas as tabelas foram criadas
SELECT 
  schemaname,
  tablename,
  tableowner
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN (
  'profiles', 'social_links', 'services', 'portfolio_items', 
  'experience', 'education', 'reviews', 'layout_templates', 'activities'
)
ORDER BY tablename;

-- Verificar se as funções foram criadas
SELECT 
  proname as function_name,
  prosrc as function_body
FROM pg_proc 
WHERE proname IN ('handle_new_user', 'handle_profile_update');

SELECT 'Script SQL executado com sucesso! Todas as tabelas, funções, triggers e políticas foram criadas.' as status;