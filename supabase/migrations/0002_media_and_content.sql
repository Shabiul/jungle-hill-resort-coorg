-- Asset library (files live in the public "media" storage bucket) and editable site content.
-- Both tables are written only by the server with the secret key; row level security is on with no policies.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media', 'media', true, 15728640,
  array['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml', 'video/mp4', 'video/webm']
)
on conflict (id) do update
  set public = true,
      file_size_limit = excluded.file_size_limit,
      allowed_mime_types = excluded.allowed_mime_types;

create table if not exists public.media (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  path text not null unique,
  url text not null,
  folder text not null default 'uploads',
  mime text not null default 'image/webp',
  alt text not null default '',
  width int,
  height int,
  blur text,
  size_bytes int,
  original_name text
);
create index if not exists media_folder_idx on public.media (folder, created_at desc);

-- key examples: "room:deluxe-ac-rooms" -> { price, rateNote, images[] }, "gallery" -> { images[] }
create table if not exists public.site_content (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

drop trigger if exists site_content_set_updated_at on public.site_content;
create trigger site_content_set_updated_at before update on public.site_content
  for each row execute function public.set_updated_at();

alter table public.media enable row level security;
alter table public.site_content enable row level security;
