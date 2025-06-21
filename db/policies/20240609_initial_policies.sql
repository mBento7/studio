-- Migration: Políticas iniciais de segurança (RLS)
-- Data: 2024-06-09

-- Perfis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone."
  ON public.profiles FOR SELECT
  USING ( true );
CREATE POLICY "Users can insert their own profile."
  ON public.profiles FOR INSERT
  WITH CHECK ( auth.uid() = id );
CREATE POLICY "Users can update their own profile."
  ON public.profiles FOR UPDATE
  USING ( auth.uid() = id );

-- Social Links
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view social links." ON public.social_links FOR SELECT USING (true);
CREATE POLICY "Users can manage their own social links." ON public.social_links FOR ALL USING (auth.uid() = profile_id);

-- Services
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view services." ON public.services FOR SELECT USING (true);
CREATE POLICY "Users can manage their own services." ON public.services FOR ALL USING (auth.uid() = profile_id);

-- Portfolio Items
ALTER TABLE public.portfolio_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view portfolio items." ON public.portfolio_items FOR SELECT USING (true);
CREATE POLICY "Users can manage their own portfolio items." ON public.portfolio_items FOR ALL USING (auth.uid() = profile_id);

-- Experience
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public experience items are viewable by everyone." ON public.experience FOR SELECT USING (true);
CREATE POLICY "Users can manage their own experience items." ON public.experience FOR ALL USING (auth.uid() = profile_id);

-- Education
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public education items are viewable by everyone." ON public.education FOR SELECT USING (true);
CREATE POLICY "Users can manage their own education items." ON public.education FOR ALL USING (auth.uid() = profile_id);

-- Reviews
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public reviews are viewable by everyone." ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Users can manage their own reviews." ON public.reviews FOR ALL USING (auth.uid() = profile_id);

-- Layout Templates
ALTER TABLE public.layout_templates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Layout templates are viewable by everyone." ON public.layout_templates FOR SELECT USING (true);
CREATE POLICY "Users can manage their own layout templates." ON public.layout_templates FOR ALL USING (auth.uid() = profile_id); 