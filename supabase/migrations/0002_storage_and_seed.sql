-- 1. Insert Seed Categories
INSERT INTO public.categories (name, slug, sort_order)
VALUES 
  ('Fashion', 'fashion', 1),
  ('Electronics', 'electronics', 2),
  ('Home & Kitchen', 'home-kitchen', 3),
  ('Beauty', 'beauty', 4)
ON CONFLICT (slug) DO NOTHING;

-- 2. Storage Setup (Assuming the storage schema exists in Supabase by default)

-- Create Buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES ('category-images', 'category-images', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- 3. Storage Policies

-- Category Images Policies
CREATE POLICY "Public Category Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'category-images' );

CREATE POLICY "Admin Insert Category Images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'category-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admin Update Category Images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'category-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admin Delete Category Images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'category-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

-- Product Images Policies
CREATE POLICY "Public Product Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );

CREATE POLICY "Admin Insert Product Images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admin Update Product Images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);

CREATE POLICY "Admin Delete Product Images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-images' 
  AND (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'
);
