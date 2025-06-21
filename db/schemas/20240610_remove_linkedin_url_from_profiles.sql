-- Migration reversa: Remove coluna linkedin_url da tabela profiles
-- Data: 2024-06-10

ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS linkedin_url; 