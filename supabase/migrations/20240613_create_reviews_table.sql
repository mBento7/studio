-- Migration: Criação da tabela de avaliações de usuários (reviews)
-- Data: 2024-06-13

CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID REFERENCES users(id),
  reviewed_user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  is_public BOOLEAN DEFAULT true,
  is_flagged BOOLEAN DEFAULT false,
  flagged_reason TEXT,
  reply TEXT,
  verified BOOLEAN DEFAULT false,
  UNIQUE (reviewer_id, reviewed_user_id)
); 