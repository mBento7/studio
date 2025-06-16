-- 1. Cria a tabela principal de perfis de usuário
CREATE TABLE public.profiles (
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
  stripe_customer_id TEXT, -- Para integração futura com pagamentos
  -- Campos JSON para dados que não precisam ser relacionais
  location JSONB, -- Ex: { "city": "São Paulo", "country": "Brasil" }
  skills JSONB, -- Ex: ["React", "Next.js", "Design"]
  premium_banner JSONB, -- Ex: { "imageUrl": "...", "title": "..." }
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilita a segurança em nível de linha (Row Level Security)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política de segurança: Permite que usuários leiam todos os perfis (para páginas públicas)
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );

-- Política de segurança: Permite que usuários insiram seu próprio perfil
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );

-- Política de segurança: Permite que usuários atualizem seu próprio perfil
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- 2. Cria tabelas para dados relacionais (one-to-many)

CREATE TABLE public.social_links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view social links." ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Users can manage their own social links." ON public.social_links FOR ALL USING (auth.uid() = profile_id);


CREATE TABLE public.services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view services." ON public.services FOR SELECT USING (true);
CREATE POLICY "Users can manage their own services." ON public.services FOR ALL USING (auth.uid() = profile_id);


CREATE TABLE public.portfolio_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view portfolio items." ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Users can manage their own portfolio items." ON public.portfolio_items FOR ALL USING (auth.uid() = profile_id);

-- Novas tabelas a serem adicionadas para sincronizar com o banco de dados
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public experience items are viewable by everyone." ON public.experience FOR SELECT USING (true);
CREATE POLICY "Users can manage their own experience items." ON public.experience FOR ALL USING (auth.uid() = profile_id);

CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public education items are viewable by everyone." ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can manage their own education items." ON public.education FOR ALL USING (auth.uid() = profile_id);

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews." ON public.reviews FOR ALL USING (auth.uid() = profile_id);

CREATE TABLE public.layout_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  available_for TEXT[] CHECK (available_for <@ ARRAY['standard'::text, 'premium'::text]),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);
ALTER TABLE public.layout_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Layout templates are viewable by everyone." ON public.layout_templates FOR SELECT USING (true);
CREATE POLICY "Users can manage their own layout templates." ON public.layout_templates FOR ALL USING (auth.uid() = profile_id); -- Note: This policy might need adjustment based on how layout templates are managed. Assuming they are system-wide for now.

-- 3. Função e Trigger para criar um perfil automaticamente no cadastro de um novo usuário

-- Esta função será chamada pelo trigger
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  -- Extrai o nome completo dos metadados do usuário, se disponível
  user_full_name TEXT := NEW.raw_user_meta_data->>'full_name';
BEGIN
  -- Insere uma nova linha na tabela public.profiles
  INSERT INTO public.profiles (id, full_name, email, username)
  VALUES (
    NEW.id,
    -- Usa o nome completo dos metadados ou o email como fallback
    COALESCE(user_full_name, NEW.email),
    NEW.email,
    -- Gera um nome de usuário único a partir do email
    -- Ex: 'joao.silva' de 'joao.silva@email.com'
    -- Adiciona um sufixo aleatório se o username já existir
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

-- Cria o trigger que chama a função acima após cada novo cadastro em auth.users
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

-- Exemplos de queries para campos JSONB:
-- Buscar perfis por cidade:
-- SELECT * FROM public.profiles WHERE location->>'city' = 'São Paulo';
-- Buscar perfis por skill:
-- SELECT * FROM public.profiles WHERE skills ? 'React';
