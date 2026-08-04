'use client';

import { Suspense } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

function SortDropdownInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = searchParams.get('sort') || 'recommended';

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (newSort === 'recommended') {
      params.delete('sort');
    } else {
      params.set('sort', newSort);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select 
      value={currentSort}
      onChange={handleSortChange}
      className="border-gray-300 rounded-md text-sm dark:bg-zinc-800 dark:border-gray-700 dark:text-white py-1.5 pl-3 pr-8 focus:ring-black focus:border-black"
    >
      <option value="recommended">Recommended</option>
      <option value="price_asc">Price: Low to High</option>
      <option value="price_desc">Price: High to Low</option>
      <option value="newest">Newest Arrivals</option>
    </select>
  );
}

export default function SortDropdown() {
  return (
    <Suspense fallback={<div className="h-9 w-40 bg-gray-100 dark:bg-zinc-800 rounded-md animate-pulse"></div>}>
      <SortDropdownInner />
    </Suspense>
  )
}
