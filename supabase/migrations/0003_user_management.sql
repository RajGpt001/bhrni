-- ==========================================
-- 1. Modify Profiles Table
-- ==========================================
alter table public.profiles
  add column if not exists email text,
  add column if not exists is_active boolean default true;

-- ==========================================
-- 2. Audit Log Table
-- ==========================================
create table if not exists public.admin_audit_log (
  id uuid primary key default uuid_generate_v4(),
  admin_id uuid references public.profiles(id) on delete set null,
  action text not null,
  target_table text not null,
  target_id uuid not null,
  details jsonb,
  created_at timestamptz default now()
);

-- ==========================================
-- 3. Update Auth Trigger
-- ==========================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email, role, is_active)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email, 'customer', true);
  return new;
end;
$$ language plpgsql security definer;

-- ==========================================
-- 4. Audit Log RLS
-- ==========================================
alter table public.admin_audit_log enable row level security;

create policy "Admins can view audit logs"
  on public.admin_audit_log for select
  using (public.is_admin());

create policy "Admins can insert audit logs"
  on public.admin_audit_log for insert
  with check (public.is_admin());
