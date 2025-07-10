-- SCHEMA DO BANCO DE DADOS - VERSÃO 2024-07
-- Projeto: WhosDo
-- Contexto: Estrutura atual do banco de dados (NÃO EXECUTAR DIRETAMENTE)
-- Observações:
-- - Tabelas relacionadas à autenticação referenciam auth.users(id) do Supabase Auth.
-- - Políticas de segurança (RLS) estão documentadas em db/policies/.
-- - Para alterações, crie migrations versionadas.
-- - Convenções: use sempre profile_id/user_id para relacionamentos com perfis/usuários.
-- - Este arquivo serve para consulta, auditoria e rastreabilidade.

-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

------------------------------------------------------------
-- Tabela de atividades do usuário (logs de ações importantes)
------------------------------------------------------------
CREATE TABLE public.activities (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL, -- Referencia profiles(id)
  type text NOT NULL, -- Tipo da atividade
  data jsonb, -- Dados extras
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT activities_pkey PRIMARY KEY (id),
  CONSTRAINT activities_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de bloqueio de usuários (controle de bloqueios entre usuários)
------------------------------------------------------------
CREATE TABLE public.blocked_users (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  blocker_id uuid, -- Quem bloqueou (auth.users)
  blocked_id uuid, -- Quem foi bloqueado (auth.users)
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blocked_users_pkey PRIMARY KEY (id),
  CONSTRAINT blocked_users_blocker_id_fkey FOREIGN KEY (blocker_id) REFERENCES auth.users(id),
  CONSTRAINT blocked_users_blocked_id_fkey FOREIGN KEY (blocked_id) REFERENCES auth.users(id)
);

------------------------------------------------------------
-- Tabela de contatos (exemplo de agenda ou favoritos)
------------------------------------------------------------
CREATE TABLE public.contacts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  image text,
  CONSTRAINT contacts_pkey PRIMARY KEY (id)
);

------------------------------------------------------------
-- Tabela de conversas (chat entre dois usuários)
------------------------------------------------------------
CREATE TABLE public.conversations (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user1_id uuid NOT NULL, -- Participante 1
  user2_id uuid NOT NULL, -- Participante 2
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  expires_at timestamp without time zone,
  CONSTRAINT conversations_pkey PRIMARY KEY (id)
);

------------------------------------------------------------
-- Tabela de formação acadêmica
------------------------------------------------------------
CREATE TABLE public.education (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  profile_id uuid, -- Referencia profiles(id)
  degree text NOT NULL,
  institution text NOT NULL,
  years text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT education_pkey PRIMARY KEY (id),
  CONSTRAINT education_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de experiências profissionais
------------------------------------------------------------
CREATE TABLE public.experience (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  profile_id uuid, -- Referencia profiles(id)
  title text NOT NULL,
  company text NOT NULL,
  years text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT experience_pkey PRIMARY KEY (id),
  CONSTRAINT experience_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de templates de layout de perfil
------------------------------------------------------------
CREATE TABLE public.layout_templates (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  image_url text,
  available_for ARRAY CHECK (available_for <@ ARRAY['standard'::text, 'premium'::text]),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  CONSTRAINT layout_templates_pkey PRIMARY KEY (id)
);

------------------------------------------------------------
-- Tabela de mensagens (chat)
------------------------------------------------------------
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  conversation_id uuid, -- Referencia conversations(id)
  sender_id uuid NOT NULL, -- auth.users(id)
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  read_by ARRAY DEFAULT '{}'::uuid[],
  type text DEFAULT 'text'::text,
  image_url text,
  read_at timestamp without time zone,
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_conversation_id_fkey FOREIGN KEY (conversation_id) REFERENCES public.conversations(id)
);

------------------------------------------------------------
-- Tabela de itens de portfólio
------------------------------------------------------------
CREATE TABLE public.portfolio_items (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  profile_id uuid NOT NULL, -- Referencia profiles(id)
  image_url text NOT NULL,
  caption text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT portfolio_items_pkey PRIMARY KEY (id),
  CONSTRAINT portfolio_items_user_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de perfis de usuário (dados públicos e privados)
------------------------------------------------------------
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  username text NOT NULL UNIQUE,
  full_name text,
  email text UNIQUE,
  phone text,
  whatsapp_number text,
  bio text,
  profile_picture_url text,
  cover_photo_url text,
  category text,
  plan text DEFAULT 'free'::text,
  layout_template_id text DEFAULT 'default'::text,
  is_available boolean DEFAULT true,
  location jsonb,
  skills jsonb,
  premium_banner jsonb,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  profile_snapshot jsonb,
  layout text DEFAULT 'minimalist'::text,
  primarycolor character varying,
  secondarycolor character varying,
  font character varying,
  layouttemplateid character varying,
  avatar_url text,
  sociallinks jsonb,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);

------------------------------------------------------------
-- Tabela de avaliações/reviews
------------------------------------------------------------
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  profile_id uuid, -- Referencia profiles(id)
  author_name text NOT NULL,
  author_avatar_url text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()),
  reviewed_user_id uuid,
  reviewer_id uuid,
  is_public boolean DEFAULT false,
  reply text,
  verified boolean DEFAULT false,
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de serviços oferecidos pelo usuário
------------------------------------------------------------
CREATE TABLE public.services (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  profile_id uuid NOT NULL, -- Referencia profiles(id)
  name text NOT NULL,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT services_pkey PRIMARY KEY (id),
  CONSTRAINT services_user_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

------------------------------------------------------------
-- Tabela de links sociais do usuário
------------------------------------------------------------
CREATE TABLE public.social_links (
  id bigint GENERATED ALWAYS AS IDENTITY NOT NULL,
  profile_id uuid NOT NULL, -- Referencia profiles(id)
  platform text NOT NULL,
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT social_links_pkey PRIMARY KEY (id),
  CONSTRAINT social_links_user_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);

-- Políticas de segurança (RLS) e triggers estão documentadas separadamente em db/policies/ e db/schemas/20240609_triggers_and_indexes.sql 