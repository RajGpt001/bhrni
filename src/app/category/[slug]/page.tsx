import { Suspense } from "react";
/* eslint-disable */
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SortDropdown from "@/components/ui/SortDropdown";
import { ProductGridImage } from "@/components/ui/ProductGridImage";

export default async function CategoryPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ sort?: string }>;
}) {
  const { slug } = await params;
  const { sort } = await searchParams;
  const isAll = slug === "all";
  
  const supabase = await createClient();

  let category: any = null;
  try {
    if (isAll) {
      category = { name: "All Products", description: "Browse our entire collection" };
    } else {
      const { data } = await supabase.from('categories').select('*').eq('slug', slug).single();
      category = data;
    }
  } catch (error) {
    console.error(error);
  }

  if (!category) {
    notFound();
  }

  let products: any = [];
  try {
    let query = supabase.from('products').select('*, categories(name)').eq('is_active', true);
    
    if (!isAll && category.id) {
      query = query.eq('category_id', category.id);
    }
    
    if (sort === "price_asc") {
      query = query.order('price', { ascending: true });
    } else if (sort === "price_desc") {
      query = query.order('price', { ascending: false });
    } else {
      query = query.order('created_at', { ascending: false });
    }

    const { data } = await query;
    if (data) {
      products = data.map(p => ({
        id: p.id,
        name: p.name,
        slug: p.slug,
        price: p.price,
        mrp: p.mrp,
        category: { name: p.categories?.name },
        images: p.image_urls?.map((url: string) => ({ url })) || []
      }));
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-black">
      <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-gray-200 dark:border-gray-800 py-16 px-4">
        <div className="container mx-auto max-w-7xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {category.description || "Discover the best products in this category."}
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 py-12 flex gap-8">
        {/* Sidebar Filters */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
            
            <div className="mb-8">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Price Range</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Under ₹1,000</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">₹1,000 - ₹5,000</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Over ₹5,000</span>
                </label>
              </div>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Availability</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                  <span className="text-sm text-gray-600 dark:text-gray-400">In Stock</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-sm text-gray-500 dark:text-gray-400">Showing {products.length} products</p>
            <Suspense fallback={<div className="h-9 w-32 bg-gray-200 dark:bg-zinc-800 rounded animate-pulse"></div>}>
              <SortDropdown />
            </Suspense>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your filters or checking back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {products.map((product: any, index: number) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 xl:aspect-square">
                    <ProductGridImage images={product.images} name={product.name} index={index} />
                  </div>
                  <div className="mt-4 flex flex-col flex-1">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">{product.name}</h3>
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{product.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
