import Image from "next/image";
import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
      <Link 
        href="/category/all" 
        className="relative block w-full overflow-hidden rounded-3xl bg-[#dcece2] dark:bg-emerald-950/40 hover:opacity-95 transition-opacity"
      >
        <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 lg:px-16 min-h-[220px]">
          
          <div className="z-10 text-center md:text-left mb-10 md:mb-0 md:max-w-md">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-teal-950 dark:text-teal-50 leading-[1.1]">
              Curated essentials <br className="hidden md:block" /> for everyday
            </h2>
            <div className="mt-4 inline-flex items-center text-sm font-bold text-teal-800 dark:text-teal-200 uppercase tracking-widest">
              Shop Now <span className="ml-2">&rarr;</span>
            </div>
          </div>

          <div className="relative w-full md:w-1/2 h-32 md:h-full flex items-center justify-center md:justify-end gap-2 sm:gap-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500 hover:scale-110 z-10">
              <Image src="https://images.unsplash.com/photo-1523206489230-c012c64b2b48?w=400&q=80" alt="Tech" fill className="object-cover" />
            </div>
            <div className="w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-110 z-20 -ml-6 sm:ml-0">
              <Image src="https://images.unsplash.com/photo-1596755094514-f87e32f85e23?w=400&q=80" alt="Fashion" fill className="object-cover" />
            </div>
            <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-3xl overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl transform -rotate-6 hover:rotate-0 transition-transform duration-500 hover:scale-110 hidden sm:block">
              <Image src="https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80" alt="Audio" fill className="object-cover" />
            </div>
          </div>

        </div>
      </Link>
    </section>
  );
}
