-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 1. Admin Users (Allowlist)
create table public.admin_users (
    id uuid default uuid_generate_v4() primary key,
    email text unique not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Contact Submissions
create table public.contact_submissions (
    id uuid default uuid_generate_v4() primary key,
    name text not null,
    email text not null,
    phone text,
    message text not null,
    status text default 'new' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Referrals
create table public.referrals (
    id uuid default uuid_generate_v4() primary key,
    referrer_name text not null,
    referrer_email text not null,
    referrer_phone text,
    participant_name text not null,
    service_required text not null,
    notes text,
    status text default 'new' not null,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS on all tables
alter table public.admin_users enable row level security;
alter table public.contact_submissions enable row level security;
alter table public.referrals enable row level security;

-- Admin role checking function
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.admin_users
    where email = auth.jwt() ->> 'email'
  );
end;
$$ language plpgsql security definer;

-- RLS Policies

-- admin_users: Only admins can view/edit the allowlist
create policy "Admins can view admin users" on public.admin_users for select using (public.is_admin());
create policy "Admins can manage admin users" on public.admin_users for all using (public.is_admin());

-- contact_submissions: Anyone can insert (via secure server action), only admins can read/update/delete
create policy "Anyone can submit contact form" on public.contact_submissions for insert with check (true);
create policy "Admins can view contact submissions" on public.contact_submissions for select using (public.is_admin());
create policy "Admins can update contact submissions" on public.contact_submissions for update using (public.is_admin());
create policy "Admins can delete contact submissions" on public.contact_submissions for delete using (public.is_admin());

-- referrals: Anyone can insert, only admins can read/update/delete
create policy "Anyone can submit referrals" on public.referrals for insert with check (true);
create policy "Admins can view referrals" on public.referrals for select using (public.is_admin());
create policy "Admins can update referrals" on public.referrals for update using (public.is_admin());
create policy "Admins can delete referrals" on public.referrals for delete using (public.is_admin());
