import { Suspense } from "react";
/* eslint-disable */
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import SortDropdown from "@/components/ui/SortDropdown";
import { ProductGridImage } from "@/components/ui/ProductGridImage";
import { Prisma } from "@prisma/client";

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

  let category: any = null;
  try {
    category = isAll ? { name: "All Products", description: "Browse our entire collection" } : await prisma.category.findUnique({
      where: { slug }
    });
  } catch (error) {
    category = isAll ? { name: "All Products", description: "Browse our entire collection" } : { id: "demo-category", name: "Demo Category", description: "Fallback data for Vercel SQLite demo" };
  }

  if (!category) {
    notFound();
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = {};
  if (sort === "price_asc") {
    orderBy = { price: "asc" };
  } else if (sort === "price_desc") {
    orderBy = { price: "desc" };
  } else if (sort === "newest") {
    orderBy = { createdAt: "desc" };
  }

  let products: any = [];
  try {
    products = await prisma.product.findMany({
      where: isAll ? { published: true } : { categoryId: category?.id, published: true },
      include: { images: true, category: true },
      orderBy,
    });
  } catch (error) {
    products = [
      {
        id: 'fallback-turtle',
        name: 'Turtle Combo',
        slug: 'turtle-combo',
        price: 399,
        mrp: 799,
        category: { name: 'Home & Decor' },
        images: [
          { url: '/products/turtle-combo/1.jpg' },
          { url: '/products/turtle-combo/2.jpg' },
          { url: '/products/turtle-combo/3.jpg' },
          { url: '/products/turtle-combo/4.jpg' },
          { url: '/products/turtle-combo/5.jpg' }
        ]
      },
      {
        id: 'fallback-ash',
        name: 'Ash Tray',
        slug: 'ash-tray',
        price: 299,
        mrp: 599,
        category: { name: 'Home & Decor' },
        images: [
          { url: '/products/ash-tray/1.jpg' },
          { url: '/products/ash-tray/2.jpg' },
          { url: '/products/ash-tray/3.jpg' },
          { url: '/products/ash-tray/4.png' },
          { url: '/products/ash-tray/5.jpg' }
        ]
      },
      {
        id: 'fallback-0',
        name: 'Mosquito Lamp',
        slug: 'mosquito-lamp',
        price: 499,
        mrp: 999,
        category: { name: 'Electronics' },
        images: [
          { url: '/products/mosquito-lamp/1.png' },
          { url: '/products/mosquito-lamp/2.png' },
          { url: '/products/mosquito-lamp/3.jpg' },
          { url: '/products/mosquito-lamp/4.jpg' }
        ]
      },
      {
        id: 'fallback-1',
        name: 'Smartphone Pro Max',
        slug: 'smartphone-pro-max',
        price: 89999,
        mrp: 99999,
        category: { name: 'Electronics' },
        images: [{ url: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&q=80' }]
      }
    ];
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {products.map((product: any) => (
                <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col">
                  <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 xl:aspect-square">
                    <ProductGridImage images={product.images} name={product.name} />
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
