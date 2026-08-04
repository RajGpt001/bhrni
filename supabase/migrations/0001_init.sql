-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- ==========================================
-- 1. Tables Creation
-- ==========================================

create table public.categories (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  image_url text,
  sort_order integer default 0,
  created_at timestamptz default now()
);

create table public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  slug text not null unique,
  description text,
  category_id uuid references public.categories(id) on delete set null,
  price numeric(10,2) not null,
  mrp numeric(10,2),
  stock_quantity integer default 0,
  image_urls text[],
  is_active boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  full_name text,
  phone text,
  role text default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz default now()
);

create table public.orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending',
  total_amount numeric(10,2) not null,
  coupon_code text,
  discount_amount numeric(10,2) default 0,
  created_at timestamptz default now()
);

create table public.order_items (
  id uuid primary key default uuid_generate_v4(),
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete set null,
  quantity integer not null,
  price_at_purchase numeric(10,2) not null
);

create table public.coupons (
  id uuid primary key default uuid_generate_v4(),
  code text not null unique,
  description text,
  discount_type text check (discount_type in ('percentage', 'flat')),
  discount_value numeric(10,2) not null,
  min_order_value numeric(10,2) default 0,
  max_discount numeric(10,2),
  usage_limit integer,
  times_used integer default 0,
  is_active boolean default true,
  starts_at timestamptz default now(),
  expires_at timestamptz,
  created_at timestamptz default now()
);


-- ==========================================
-- 2. Row Level Security (RLS) Enable
-- ==========================================
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
alter table public.coupons enable row level security;


-- ==========================================
-- 3. RLS Policies
-- ==========================================

-- Function to check if current user is admin
create or replace function public.is_admin()
returns boolean as $$
begin
  return exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
end;
$$ language plpgsql security definer;

-- Categories
create policy "Categories are viewable by everyone."
  on public.categories for select
  using (true);

create policy "Admins can insert categories."
  on public.categories for insert
  with check (public.is_admin());

create policy "Admins can update categories."
  on public.categories for update
  using (public.is_admin());

create policy "Admins can delete categories."
  on public.categories for delete
  using (public.is_admin());

-- Products
create policy "Active products are viewable by everyone."
  on public.products for select
  using (is_active = true or public.is_admin());

create policy "Admins can insert products."
  on public.products for insert
  with check (public.is_admin());

create policy "Admins can update products."
  on public.products for update
  using (public.is_admin());

create policy "Admins can delete products."
  on public.products for delete
  using (public.is_admin());

-- Profiles
create policy "Users can view their own profile."
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "Users can update their own profile."
  on public.profiles for update
  using (auth.uid() = id or public.is_admin());

-- Orders
create policy "Users can view their own orders."
  on public.orders for select
  using (auth.uid() = user_id or public.is_admin());

create policy "Users can insert their own orders."
  on public.orders for insert
  with check (auth.uid() = user_id);

create policy "Admins can update orders."
  on public.orders for update
  using (public.is_admin());

-- Order Items
create policy "Users can view their own order items."
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders 
      where id = order_items.order_id and user_id = auth.uid()
    ) or public.is_admin()
  );

create policy "Users can insert order items for their orders."
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders 
      where id = order_items.order_id and user_id = auth.uid()
    )
  );

-- Coupons
create policy "Active coupons are viewable by authenticated users."
  on public.coupons for select
  using (is_active = true or public.is_admin());

create policy "Admins can insert coupons."
  on public.coupons for insert
  with check (public.is_admin());

create policy "Admins can update coupons."
  on public.coupons for update
  using (public.is_admin());

create policy "Admins can delete coupons."
  on public.coupons for delete
  using (public.is_admin());


-- ==========================================
-- 4. Triggers
-- ==========================================

-- Auto-insert into profiles when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, role)
  values (new.id, new.raw_user_meta_data->>'full_name', 'customer');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Trigger for updated_at on products
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.products
  for each row
  execute procedure public.handle_updated_at();
