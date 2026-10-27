-- Run in the Supabase SQL editor. The site and admin panel use the secret key on the server,
-- so row level security is on with no policies: the public (anon) key can read or write nothing.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  source text not null default 'wizard' check (source in ('wizard', 'contact')),
  status text not null default 'new' check (status in ('new', 'contacted', 'confirmed', 'closed', 'spam')),
  name text not null,
  email text,
  phone text,
  check_in date,
  check_out date,
  adults int,
  children int,
  infants int,
  rooms int,
  stay text,
  occasion text,
  message text,
  details jsonb not null default '{}'::jsonb,
  admin_notes text not null default ''
);

create index if not exists enquiries_status_created_idx on public.enquiries (status, created_at desc);
create index if not exists enquiries_created_idx on public.enquiries (created_at desc);

create or replace function public.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end $$;

drop trigger if exists enquiries_set_updated_at on public.enquiries;
create trigger enquiries_set_updated_at before update on public.enquiries
  for each row execute function public.set_updated_at();

alter table public.enquiries enable row level security;
