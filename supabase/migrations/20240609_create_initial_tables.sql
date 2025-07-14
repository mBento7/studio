-- Migration: Criação das tabelas principais
-- Data: 2024-06-09

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
  stripe_customer_id TEXT,
  location JSONB,
  skills JSONB,
  premium_banner JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.social_links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.services (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.portfolio_items (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  degree TEXT NOT NULL,
  institution TEXT NOT NULL,
  years TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  author_name TEXT NOT NULL,
  author_avatar_url TEXT,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

CREATE TABLE public.layout_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  available_for TEXT[] CHECK (available_for <@ ARRAY['standard'::text, 'premium'::text]),
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
); 