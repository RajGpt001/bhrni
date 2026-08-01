import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  // In a real app, you would check auth/roles here and redirect if not ADMIN/SELLER
  // import { redirect } from 'next/navigation';
  // const user = await getUser();
  // if (!user || (user.role !== 'ADMIN' && user.role !== 'SELLER')) redirect('/');

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-zinc-950 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-900 text-white flex-shrink-0 flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800">
          <Link href="/admin" className="text-xl font-bold tracking-tighter">LYKE ADMIN</Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md bg-zinc-800 text-white">
            Dashboard
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            Orders
          </Link>
          <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            Categories
          </Link>
          <Link href="/admin/coupons" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            Coupons
          </Link>
          <Link href="/admin/reviews" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-300 hover:bg-zinc-800 hover:text-white transition-colors">
            Reviews
          </Link>
        </nav>
        <div className="p-4 border-t border-zinc-800">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-zinc-400 hover:text-white transition-colors">
            &larr; Back to Store
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white dark:bg-zinc-900 border-b border-gray-200 dark:border-zinc-800 flex items-center justify-between px-8">
          <h2 className="text-lg font-medium text-gray-900 dark:text-white">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-sm font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
