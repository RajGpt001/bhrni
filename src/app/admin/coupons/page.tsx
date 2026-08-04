import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import CouponsClient from './CouponsClient'

export default async function CouponsPage() {
  const supabase = await createClient()

  const { data: coupons, error } = await supabase
    .from('coupons')
    .select('*, orders(total_amount, discount_amount)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching coupons:", error)
  }

  const couponsWithAnalytics = (coupons || []).map((coupon) => {
    const ordersWithCoupon = coupon.orders || []
    
    const totalRevenue = ordersWithCoupon.reduce((sum: number, order: any) => sum + (Number(order.total_amount) || 0), 0)
    const totalDiscountGiven = ordersWithCoupon.reduce((sum: number, order: any) => sum + (Number(order.discount_amount) || 0), 0)
    
    return {
      ...coupon,
      total_revenue: totalRevenue,
      total_discount_given: totalDiscountGiven
    }
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-beige-900">Coupons</h1>
        <Link 
          href="/admin/coupons/new" 
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm font-medium shadow-sm"
        >
          <Plus className="h-4 w-4" />
          Create Coupon
        </Link>
      </div>

      <CouponsClient coupons={couponsWithAnalytics} />
    </div>
  )
}
