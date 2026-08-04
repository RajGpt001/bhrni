import { createClient } from '@/lib/supabase/server'
import { Package, Users, Ticket, ShoppingCart } from 'lucide-react'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Total Products
  const { count: productsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    
  // 2. Total Users (from profiles)
  const { count: usersCount } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true })

  // 3. Active Coupons
  const { count: couponsCount } = await supabase
    .from('coupons')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true)

  // 4. Orders Today
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  
  const { count: ordersTodayCount } = await supabase
    .from('orders')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', today.toISOString())

  const stats = [
    { name: 'Total Products', value: productsCount || 0, icon: Package, color: 'text-blue-500', bg: 'bg-blue-100' },
    { name: 'Total Users', value: usersCount || 0, icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-100' },
    { name: 'Active Coupons', value: couponsCount || 0, icon: Ticket, color: 'text-amber-500', bg: 'bg-amber-100' },
    { name: 'Orders Today', value: ordersTodayCount || 0, icon: ShoppingCart, color: 'text-rose-500', bg: 'bg-rose-100' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-beige-900">Dashboard Overview</h1>
        <p className="mt-2 text-sm text-gray-500">
          A high-level view of your Lyke India metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="overflow-hidden rounded-xl bg-white shadow-sm border border-beige-200">
            <div className="p-6 flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bg}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                <p className="text-3xl font-semibold text-beige-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
