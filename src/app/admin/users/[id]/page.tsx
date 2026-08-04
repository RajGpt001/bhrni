import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Mail, Phone, Calendar } from 'lucide-react'
import UserActions from './UserActions'

export default async function UserDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: user } = await supabase
    .from('profiles')
    .select('*, orders(*)')
    .eq('id', id)
    .single()

  if (!user) {
    notFound()
  }

  const orders = user.orders || []
  const totalSpent = orders.reduce((sum: number, order: any) => sum + (Number(order.total_amount) || 0), 0)

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/users" className="text-gray-500 hover:text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-beige-900">
          User Details
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-4">
            <div className="h-20 w-20 bg-beige-100 rounded-full flex items-center justify-center text-2xl font-bold text-beige-900 mb-4">
              {user.full_name?.charAt(0) || user.email?.charAt(0) || '?'}
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-gray-900">{user.full_name || 'No Name'}</h3>
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <Mail className="h-3 w-3" /> {user.email || 'No email provided'}
              </p>
              {user.phone && (
                <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                  <Phone className="h-3 w-3" /> {user.phone}
                </p>
              )}
              <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                <Calendar className="h-3 w-3" /> Joined {new Date(user.created_at).toLocaleDateString()}
              </p>
            </div>

            <div className="pt-4 border-t flex gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Orders</p>
                <p className="text-xl font-semibold">{orders.length}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Total Spent</p>
                <p className="text-xl font-semibold text-green-600">₹{totalSpent.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <UserActions user={user} />
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-xl border border-beige-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-beige-200">
              <h3 className="text-lg font-semibold">Order History</h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
                  <tr>
                    <th className="px-6 py-4 font-medium">Order ID</th>
                    <th className="px-6 py-4 font-medium">Date</th>
                    <th className="px-6 py-4 font-medium">Status</th>
                    <th className="px-6 py-4 font-medium text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-beige-100">
                  {orders.sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()).map((order: any) => (
                    <tr key={order.id} className="hover:bg-beige-50/50 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">{order.id.split('-')[0]}</td>
                      <td className="px-6 py-4 text-gray-600">{new Date(order.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                          order.status === 'completed' ? 'bg-green-100 text-green-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">₹{Number(order.total_amount).toFixed(2)}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No orders found for this user.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
