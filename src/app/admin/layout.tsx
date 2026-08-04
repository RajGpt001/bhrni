import Link from 'next/link'
import { ReactNode } from 'react'
import { LayoutDashboard, ShoppingBag, Tags, Users, Ticket, ShoppingCart, LogOut, ArrowLeft } from 'lucide-react'
import { AdminGuard } from '@/components/auth/AdminGuard'

export const metadata = {
  title: 'Lyke Admin Panel',
  description: 'Admin panel for Lyke India',
}

const sidebarLinks = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Catalog', href: '/admin/catalog', icon: ShoppingBag },
  { name: 'Categories', href: '/admin/categories', icon: Tags },
  { name: 'Users', href: '/admin/users', icon: Users },
  { name: 'Coupons', href: '/admin/coupons', icon: Ticket },
  { name: 'Orders', href: '/admin/orders', icon: ShoppingCart },
]

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen bg-beige-50 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 text-beige-50 flex flex-col hidden md:flex">
          <div className="p-6">
            <Link href="/admin" className="text-2xl font-bold tracking-tighter text-white">
              LYKE <span className="text-beige-200 text-lg ml-2 font-medium">Admin</span>
            </Link>
          </div>
          
          <nav className="flex-1 px-4 space-y-2 mt-4">
            {sidebarLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium hover:bg-zinc-800 transition-colors"
              >
                <item.icon className="h-5 w-5 text-beige-200" />
                {item.name}
              </Link>
            ))}
          </nav>
          
          <div className="p-4 border-t border-zinc-800 space-y-2">
            <Link 
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Store
            </Link>
            
            <form action="/api/auth/signout" method="post">
               {/* We can use a client component or server action here. Let's just use a simple link to a logout route or a client component if needed. 
                   Wait, we built a logout action in /login/actions.ts. Let's import it. Wait, layout is a server component by default, we can't use formAction with imported functions directly unless we make a client component or an inline form. 
                   Actually, Server Actions in forms work fine in Server Components. */}
            </form>
            
            <Link 
              href="/account"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-zinc-800 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Sign Out (via Account)
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="h-full overflow-y-auto p-8">
            {children}
          </div>
        </main>
      </div>
    </AdminGuard>
  )
}
