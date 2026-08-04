import { createClient } from '@/lib/supabase/server'
import UsersClient from './UsersClient'

export default async function UsersPage() {
  const supabase = await createClient()

  const { data: profiles, error } = await supabase
    .from('profiles')
    .select('*, orders(total_amount)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching users:", error)
  }

  const usersWithStats = (profiles || []).map((profile) => {
    const orderCount = profile.orders ? profile.orders.length : 0;
    const totalSpent = profile.orders ? profile.orders.reduce((sum: number, order: any) => sum + (Number(order.total_amount) || 0), 0) : 0;
    
    return {
      ...profile,
      order_count: orderCount,
      total_spent: totalSpent
    }
  })

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-beige-900">Users</h1>
      <UsersClient users={usersWithStats} />
    </div>
  )
}
