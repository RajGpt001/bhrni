/* eslint-disable */
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { LampIntro } from "@/components/ui/LampIntro";
import { HeroAnimation } from "@/components/ui/HeroAnimation";
import WoodenCartButton from "@/components/ui/wooden-cart-button";
import { ProductGridImage } from "@/components/ui/ProductGridImage";
import { FeaturedLogos } from "@/components/ui/FeaturedLogos";
import { CommunityBanner } from "@/components/ui/CommunityBanner";
import { PromoBanner } from "@/components/ui/PromoBanner";

export default async function Home() {
  const cookieStore = await cookies();
  const lampSeen = cookieStore.get("lamp_intro_seen")?.value === "true";

  const supabase = await createClient();

  let featuredProducts: any = [];
  try {
    const { data } = await supabase
      .from('products')
      .select('*, categories(name)')
      .eq('is_active', true)
      .limit(8);
    
    // Map Supabase response to the shape the components expect
    if (data) {
      featuredProducts = data.map(p => ({
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
    console.error("Supabase failed. Using fallback data.");
  }

  let categories: any = [];
  try {
    const { data } = await supabase
      .from('categories')
      .select('*')
      .order('sort_order', { ascending: true })
      .limit(4);
    
    if (data) {
      categories = data;
    }
  } catch (error) {
    categories = [];
  }

  return (
    <div className="flex flex-col flex-1 w-full bg-beige-50 dark:bg-beige-900">
      {!lampSeen && <LampIntro />}
      {/* Hero Section */}
      <section className="relative h-[calc(100vh-4rem)] w-full flex items-center justify-center overflow-hidden bg-zinc-900">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-50 scale-[1.15]"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
        <HeroAnimation>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-beige-50 mb-6">
            Find Everything You LYKE
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl">
            From fashion and tech to home essentials and everyday finds—discover thousands of products in one place.
          </p>
          <Link href="/category/all" className="inline-flex h-14 items-center justify-center rounded-full bg-beige-50 px-8 text-lg font-medium text-beige-900 transition-transform hover:scale-105 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black">
            Start Exploring
          </Link>
        </HeroAnimation>
      </section>

      {/* Promotional Banner inserted between Hero and Categories */}
      <PromoBanner />

      {/* Categories */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <h2 className="text-3xl font-bold tracking-tight text-beige-900 dark:text-beige-50 mb-12">Shop by Category</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Electronics', slug: 'electronics', image: '/category-electronics.png' },
            { name: 'Fashion', slug: 'fashion', image: '/category-fashion.png' },
            { name: 'Home & Kitchen', slug: 'home-kitchen', image: '/category-home.png' },
            { name: 'Beauty', slug: 'beauty', image: '/category-beauty.png' },
          ].map((category) => (
            <Link key={category.slug} href={`/category/${category.slug}`} className="group relative h-64 overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-opacity group-hover:opacity-90" />
              <div className="absolute inset-0 flex items-end p-6 z-20">
                <h3 className="text-2xl font-semibold text-beige-50 tracking-tight">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Summer Bliss Banner */}
      <section className="w-full relative group mb-12 sm:mb-24 cursor-pointer overflow-hidden">
        <Link href="/category/fashion">
          <div className="relative w-full h-[200px] sm:h-[300px] lg:h-[450px]">
            <Image
              src="/summer-bliss.png"
              alt="Summer Bliss Collection Up To 50% Off"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
              quality={100}
              priority
            />
          </div>
        </Link>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-beige-100 dark:bg-zinc-900/50 rounded-3xl mb-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-beige-900 dark:text-beige-50 mb-2">Featured Products</h2>
            <p className="text-gray-500 dark:text-gray-400">Handpicked selections for you</p>
          </div>
          <Link href="/category/all" className="text-sm font-medium text-beige-900 dark:text-beige-50 hover:underline hidden sm:block">
            View all products &rarr;
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
          {featuredProducts.map((product: any, index: number) => (
            <Link key={product.id} href={`/product/${product.slug}`} className="group flex flex-col">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-gray-200 xl:aspect-square">
                <ProductGridImage images={product.images} name={product.name} index={index} />
              </div>
              <div className="mt-4 flex flex-col flex-1">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-sm font-medium text-beige-900 dark:text-beige-50">{product.name}</h3>
                  <p className="text-sm font-semibold text-beige-900 dark:text-beige-50">₹{product.price}</p>
                </div>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.category.name}</p>
                {product.mrp > product.price && (
                  <p className="mt-1 text-xs text-gray-400 line-through">₹{product.mrp}</p>
                )}
                
                <div className="mt-auto">
                  <WoodenCartButton 
                    product={{
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      image: product.images[0]?.url || '',
                      quantity: 1
                    }} 
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <FeaturedLogos />
      <CommunityBanner />
    </div>
  );
}
