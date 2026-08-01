/* eslint-disable */
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let product: any = null;
  try {
    product = await prisma.product.findUnique({
      where: { slug },
      include: { images: true, category: true, variants: true },
    });
  } catch (error) {
    if (slug === 'mosquito-lamp') {
      product = {
        id: 'fallback-0',
        name: 'Mosquito Lamp',
        slug,
        price: 499,
        mrp: 999,
        description: 'Keep your environment mosquito-free with this quiet, safe, and efficient Mosquito Lamp. Powered by USB, this portable bug zapper uses physical mosquito control with a 368nm purple light wave to attract and trap insects safely without radiation. Easy to clean and perfect for home, office, or outdoor use.',
        category: { name: 'Electronics', slug: 'electronics' },
        images: [
          { id: 'mq-1', url: '/products/mosquito-lamp/1.png' },
          { id: 'mq-2', url: '/products/mosquito-lamp/2.png' },
          { id: 'mq-3', url: '/products/mosquito-lamp/3.jpg' },
          { id: 'mq-4', url: '/products/mosquito-lamp/4.jpg' }
        ],
        variants: [{ sku: 'MOSQ-LMP-01' }]
      };
    } else {
      product = {
        id: 'fallback-1',
      name: 'Smartphone Pro Max (Demo)',
      slug,
      price: 89999,
      mrp: 99999,
      description: 'This is a fallback product because Vercel crashed on local SQLite.',
      category: { name: 'Electronics', slug: 'electronics' },
      images: [{ id: 'img-1', url: 'https://images.unsplash.com/photo-1598327105666-5b89351cb31b?w=800&q=80' }],
      variants: [{ sku: 'DEMO-123' }]
    };
  }
  }

  if (!product) {
    notFound();
  }

  // Also fetch some related products
  let relatedProducts: any = [];
  try {
    relatedProducts = await prisma.product.findMany({
      where: { categoryId: product.categoryId, id: { not: product.id }, published: true },
      include: { images: true, category: true },
      take: 4,
    });
  } catch (error) {
    relatedProducts = [];
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-white dark:bg-black">
      {/* Breadcrumb */}
      <nav className="container mx-auto max-w-7xl px-4 py-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <li><Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link></li>
          <li><span className="mx-2">/</span></li>
          <li><Link href={`/category/${product.category.slug}`} className="hover:text-black dark:hover:text-white transition-colors">{product.category.name}</Link></li>
          <li><span className="mx-2">/</span></li>
          <li className="text-gray-900 dark:text-gray-200" aria-current="page">{product.name}</li>
        </ol>
      </nav>

      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          {/* Product Images */}
          <div className="flex flex-col-reverse lg:flex-row gap-4">
            <div className="flex lg:flex-col gap-4 overflow-x-auto lg:overflow-visible w-full lg:w-24 flex-shrink-0">
              {product.images.map((img, i) => (
                <button key={img.id} className={`relative aspect-square w-20 lg:w-full flex-shrink-0 overflow-hidden rounded-xl border-2 ${i === 0 ? 'border-black dark:border-white' : 'border-transparent'} hover:border-gray-300 dark:hover:border-gray-600 transition-colors`}>
                  <Image src={img.url} alt={img.alt || product.name} fill className="object-cover" />
                </button>
              ))}
            </div>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              {product.images[0] && (
                <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover object-center" priority />
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>
            
            <div className="flex items-end gap-4 mb-6">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">₹{product.price}</p>
              {product.mrp > product.price && (
                <>
                  <p className="text-lg text-gray-500 dark:text-gray-400 line-through mb-0.5">₹{product.mrp}</p>
                  <p className="text-sm font-semibold text-green-600 mb-1">
                    {Math.round(((product.mrp - product.price) / product.mrp) * 100)}% OFF
                  </p>
                </>
              )}
            </div>

            <div className="prose prose-sm sm:prose-base dark:prose-invert mb-10 text-gray-600 dark:text-gray-300">
              <p>{product.description}</p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <button className="w-full flex h-14 items-center justify-center rounded-full bg-black px-8 text-base font-semibold text-white transition-transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 dark:bg-white dark:text-black dark:focus:ring-white dark:focus:ring-offset-black">
                Add to Cart
              </button>
              <button className="w-full flex h-14 items-center justify-center rounded-full border border-gray-300 dark:border-gray-700 bg-transparent px-8 text-base font-medium text-black dark:text-white transition-colors hover:bg-gray-50 dark:hover:bg-zinc-900 focus:outline-none">
                Add to Wishlist
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-12 border-t border-gray-200 dark:border-gray-800 pt-8">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">Category</span>
                  <span className="font-medium text-gray-900 dark:text-white">{product.category.name}</span>
                </div>
                <div>
                  <span className="block text-gray-500 dark:text-gray-400">SKU</span>
                  <span className="font-medium text-gray-900 dark:text-white">{product.variants[0]?.sku || product.id.slice(-6).toUpperCase()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full border-t border-gray-200 dark:border-gray-800 mt-12">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {relatedProducts.map((p: any) => (
              <Link key={p.id} href={`/product/${p.slug}`} className="group flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 xl:aspect-[4/5]">
                  {p.images[0] && (
                    <Image
                      src={p.images[0].url}
                      alt={p.images[0].alt || p.name}
                      fill
                      className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                </div>
                <div className="mt-4 flex flex-col flex-1">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">{p.name}</h3>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">₹{p.price}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{p.category.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
