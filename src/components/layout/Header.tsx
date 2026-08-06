'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef<HTMLFormElement>(null);
  const { totalItems } = useCart();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
        setIsSearchOpen(false); // Close search on scroll
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/category/all?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
    }
  };

  return (
    <header 
      className={`sticky top-0 z-50 w-full border-b border-beige-200 bg-beige-50/95 backdrop-blur-md transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12 lg:gap-24">
          <Link href="/" className="text-3xl font-black tracking-[0.2em] bg-clip-text text-transparent bg-gradient-to-r from-[#4A3728] to-[#8B5A2B] hover:opacity-80 transition-opacity drop-shadow-sm">
            LYKE
          </Link>
          <nav className="hidden md:flex gap-8 items-center h-16">
            <Link href="/" className="text-base font-bold text-beige-900 tracking-wide hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors h-full flex items-center">
              Home
            </Link>
            
            <div className="relative group h-full flex items-center">
              <Link href="/category/fashion" className="text-base font-bold text-beige-900 tracking-wide hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
                Fashion
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </Link>
              <div className="absolute left-0 top-[calc(100%-10px)] hidden group-hover:block w-48 pt-4 pb-2">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-2 flex flex-col gap-1">
                  <Link href="/category/fashion?sub=men" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Men's Clothing</Link>
                  <Link href="/category/fashion?sub=women" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Women's Clothing</Link>
                  <Link href="/category/fashion?sub=accessories" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Accessories</Link>
                </div>
              </div>
            </div>

            <div className="relative group h-full flex items-center">
              <Link href="/category/electronics" className="text-base font-bold text-beige-900 tracking-wide hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors flex items-center gap-1">
                Electronics
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
              </Link>
              <div className="absolute left-0 top-[calc(100%-10px)] hidden group-hover:block w-48 pt-4 pb-2">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-xl p-2 flex flex-col gap-1">
                  <Link href="/category/electronics?sub=smartphones" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Smartphones</Link>
                  <Link href="/category/electronics?sub=laptops" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Laptops</Link>
                  <Link href="/category/electronics?sub=audio" className="text-base text-gray-900 font-bold dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 px-3 py-2 rounded-md transition-colors">Audio &amp; Headphones</Link>
                </div>
              </div>
            </div>

            <Link href="/category/new-arrivals" className="text-base font-bold text-beige-900 tracking-wide hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors h-full flex items-center">
              New Arrivals
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <form 
            ref={searchRef}
            onSubmit={handleSearchSubmit}
            className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden rounded-full ${
              isSearchOpen 
                ? 'bg-[#766442] dark:bg-zinc-800 w-48 md:w-64 px-3 py-1' 
                : 'bg-transparent w-10 px-0 py-1'
            }`}
          >
            <button 
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search" 
              className={`flex-shrink-0 p-1.5 text-beige-800 font-semibold hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors ${
                isSearchOpen ? 'text-beige-800 dark:text-white' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-base text-beige-900 font-medium dark:text-white placeholder-gray-500 transition-all duration-300 ${
                isSearchOpen ? 'w-full opacity-100 ml-2' : 'w-0 opacity-0 ml-0 pointer-events-none'
              }`}
            />
          </form>
          <Link href="/account" aria-label="Account" className="p-2 text-beige-800 font-semibold hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <Link id="cart-icon-target" href="/cart" aria-label="Cart" className="p-2 text-beige-800 font-semibold hover:text-accent dark:text-gray-300 dark:hover:text-white transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black dark:bg-[#8c7851] dark:text-beige-800 rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
