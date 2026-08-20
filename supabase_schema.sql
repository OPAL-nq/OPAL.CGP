-- ========================================================
-- OPAL — TABLE SUPABASE POUR LES LEADS DU DIAGNOSTIC
-- ========================================================
-- Exécutez ce script dans l'éditeur SQL de votre projet Supabase (SQL Editor).

create table if not exists public.opal_leads (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  last_name text not null,
  email text not null,
  phone text,
  company text not null,
  firm_name text, -- pour compatibilité ascendante
  sector text not null default 'Non spécifié',
  sector_other text,
  global_score integer,
  structure_score integer,
  efficiency_score integer,
  capacity_score integer,
  visibility_score integer,
  profile_key text,
  profile_label text,
  bottleneck text,
  bottleneck_score integer,
  free_text_answer text,
  answers jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index pour accélérer la recherche par email, secteur et date
create index if not exists idx_opal_leads_email on public.opal_leads(email);
create index if not exists idx_opal_leads_sector on public.opal_leads(sector);
create index if not exists idx_opal_leads_created_at on public.opal_leads(created_at desc);

-- Activer Row Level Security (RLS)
alter table public.opal_leads enable row level security;

-- Politique autorisant l'insertion publique depuis l'API Next.js
create policy "Allow public lead insertions"
  on public.opal_leads
  for insert
  with check (true);

-- Politique réservant la lecture aux utilisateurs authentifiés (administrateurs)
create policy "Allow authenticated admin read"
  on public.opal_leads
  for select
  using (auth.role() = 'authenticated');
