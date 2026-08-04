'use client'

import Link from 'next/link'
import { Plus, Edit2, Trash2, Tag, CheckCircle, Ban, Clock } from 'lucide-react'
import { deleteCoupon, toggleCouponActive } from './actions'

export default function CouponsClient({ coupons }: { coupons: any[] }) {
  const getStatus = (coupon: any) => {
    if (!coupon.is_active) return { label: 'Inactive', color: 'bg-gray-100 text-gray-700', icon: Ban }
    
    const now = new Date()
    const startsAt = new Date(coupon.starts_at)
    const expiresAt = coupon.expires_at ? new Date(coupon.expires_at) : null

    if (startsAt > now) return { label: 'Scheduled', color: 'bg-blue-100 text-blue-700', icon: Clock }
    if (expiresAt && expiresAt < now) return { label: 'Expired', color: 'bg-red-100 text-red-700', icon: Ban }
    
    return { label: 'Active', color: 'bg-green-100 text-green-700', icon: CheckCircle }
  }

  const handleDelete = async (id: string, code: string) => {
    if (confirm(`Are you sure you want to delete coupon ${code}?`)) {
      await deleteCoupon(id)
    }
  }

  const handleToggleActive = async (id: string, currentStatus: boolean) => {
    await toggleCouponActive(id, !currentStatus)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
            <tr>
              <th className="px-6 py-4 font-medium">Coupon Code</th>
              <th className="px-6 py-4 font-medium">Discount</th>
              <th className="px-6 py-4 font-medium">Usage</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Revenue Impact</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-beige-100">
            {coupons.map((coupon) => {
              const status = getStatus(coupon)
              const StatusIcon = status.icon

              return (
                <tr key={coupon.id} className="hover:bg-beige-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 font-mono tracking-wider">{coupon.code}</div>
                    {coupon.description && <div className="text-gray-500 text-xs mt-1">{coupon.description}</div>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {coupon.discount_type === 'percentage' ? `${coupon.discount_value}% OFF` : `₹${coupon.discount_value} OFF`}
                    </div>
                    <div className="text-gray-500 text-xs mt-1">
                      Min: ₹{coupon.min_order_value}
                      {coupon.max_discount && ` | Max: ₹${coupon.max_discount}`}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">
                      {coupon.times_used} / {coupon.usage_limit || '∞'}
                    </div>
                    <div className="w-24 h-1.5 bg-gray-200 rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-black rounded-full"
                        style={{ width: coupon.usage_limit ? `${(coupon.times_used / coupon.usage_limit) * 100}%` : '0%' }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${status.color}`}>
                      <StatusIcon className="h-3 w-3" /> {status.label}
                    </span>
                    <div className="text-xs text-gray-500 mt-2">
                      {new Date(coupon.starts_at).toLocaleDateString()} - 
                      {coupon.expires_at ? new Date(coupon.expires_at).toLocaleDateString() : 'Never'}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-green-600">
                      Rev: ₹{coupon.total_revenue.toFixed(2)}
                    </div>
                    <div className="text-xs text-red-500 mt-1">
                      Given: ₹{coupon.total_discount_given.toFixed(2)}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleToggleActive(coupon.id, coupon.is_active)}
                        className="text-xs font-medium text-gray-600 hover:text-black border px-2 py-1 rounded"
                      >
                        {coupon.is_active ? 'Deactivate' : 'Activate'}
                      </button>
                      <Link 
                        href={`/admin/coupons/${coupon.id}/edit`} 
                        className="text-blue-600 hover:text-blue-800 p-1 bg-blue-50 rounded"
                        title="Edit"
                      >
                        <Edit2 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(coupon.id, coupon.code)}
                        className="text-red-600 hover:text-red-800 p-1 bg-red-50 rounded"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
            {coupons.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center">
                  <Tag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 font-medium">No coupons created yet.</p>
                  <Link href="/admin/coupons/new" className="text-beige-900 hover:underline mt-2 inline-block">
                    Create your first coupon
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
