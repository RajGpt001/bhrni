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
      className={`sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80 transition-all duration-300 ease-in-out ${
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
      }`}
    >
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter text-black dark:text-white">
            LYKE
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link href="/category/fashion" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              Fashion
            </Link>
            <Link href="/category/electronics" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              Electronics
            </Link>
            <Link href="/category/home-kitchen" className="text-sm font-medium text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
              Home
            </Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <form 
            ref={searchRef}
            onSubmit={handleSearchSubmit}
            className={`flex items-center transition-all duration-300 ease-in-out overflow-hidden rounded-full ${
              isSearchOpen 
                ? 'bg-gray-100 dark:bg-zinc-800 w-48 md:w-64 px-3 py-1' 
                : 'bg-transparent w-10 px-0 py-1'
            }`}
          >
            <button 
              type="button"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              aria-label="Search" 
              className={`flex-shrink-0 p-1.5 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors ${
                isSearchOpen ? 'text-black dark:text-white' : ''
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
            </button>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`bg-transparent outline-none text-sm text-black dark:text-white placeholder-gray-500 transition-all duration-300 ${
                isSearchOpen ? 'w-full opacity-100 ml-2' : 'w-0 opacity-0 ml-0 pointer-events-none'
              }`}
            />
          </form>
          <Link href="/account" aria-label="Account" className="p-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </Link>
          <Link id="cart-icon-target" href="/cart" aria-label="Cart" className="p-2 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-black dark:bg-white dark:text-black rounded-full">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
