'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createCoupon, updateCoupon } from './actions'
import { ArrowLeft, Save, Loader2, Sparkles } from 'lucide-react'

export default function CouponForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [discountType, setDiscountType] = useState(initialData?.discount_type || 'percentage')
  const [code, setCode] = useState(initialData?.code || '')

  const generateCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCode(`LYKE${result}`)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const formData = new FormData(e.currentTarget)
    formData.set('code', code) // ensure current state code is used

    let res
    if (initialData?.id) {
      res = await updateCoupon(initialData.id, formData)
    } else {
      res = await createCoupon(formData)
    }

    if (res?.error) {
      setError(res.error)
      setLoading(false)
    } else {
      router.push('/admin/coupons')
    }
  }

  // Formatting dates for inputs (YYYY-MM-DDThh:mm)
  const formatDateForInput = (isoString: string) => {
    if (!isoString) return ''
    return new Date(isoString).toISOString().slice(0, 16)
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/coupons" className="text-gray-500 hover:text-black transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-beige-900">
          {initialData ? 'Edit Coupon' : 'Create New Coupon'}
        </h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-beige-200 p-6 space-y-8">
        
        {/* Core Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Core Settings</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Coupon Code *</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="code"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900 uppercase font-mono"
                  placeholder="e.g. SUMMER20"
                />
                <button
                  type="button"
                  onClick={generateCode}
                  className="px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 flex items-center justify-center flex-shrink-0"
                  title="Generate Random Code"
                >
                  <Sparkles className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input
                type="text"
                name="description"
                defaultValue={initialData?.description || ''}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
                placeholder="Internal or public description"
              />
            </div>
          </div>
        </div>

        {/* Discount Rules */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Discount Rules</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type *</label>
              <select
                name="discount_type"
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value)}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900 bg-white"
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (₹)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Discount Value * {discountType === 'percentage' ? '(%)' : '(₹)'}
              </label>
              <input
                type="number"
                name="discount_value"
                required
                min="0"
                step="0.01"
                max={discountType === 'percentage' ? "100" : undefined}
                defaultValue={initialData?.discount_value || ''}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Order Value (₹)</label>
              <input
                type="number"
                name="min_order_value"
                min="0"
                step="0.01"
                defaultValue={initialData?.min_order_value || '0'}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            {discountType === 'percentage' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Discount Cap (₹)</label>
                <input
                  type="number"
                  name="max_discount"
                  min="0"
                  step="0.01"
                  defaultValue={initialData?.max_discount || ''}
                  className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
                  placeholder="Leave empty for no limit"
                />
              </div>
            )}
          </div>
        </div>

        {/* Usage & Lifecycle */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Usage & Lifecycle</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Usage Limit</label>
              <input
                type="number"
                name="usage_limit"
                min="1"
                defaultValue={initialData?.usage_limit || ''}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
                placeholder="Leave empty for unlimited uses"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 mt-7 cursor-pointer">
                <input
                  type="checkbox"
                  name="is_active"
                  defaultChecked={initialData ? initialData.is_active : true}
                  className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
                />
                <span className="text-sm font-medium text-gray-700">Coupon is Active</span>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input
                type="datetime-local"
                name="starts_at"
                defaultValue={initialData ? formatDateForInput(initialData.starts_at) : formatDateForInput(new Date().toISOString())}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
              <input
                type="datetime-local"
                name="expires_at"
                defaultValue={initialData?.expires_at ? formatDateForInput(initialData.expires_at) : ''}
                className="w-full px-3 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
                placeholder="Leave empty for no expiry"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 border-t flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {initialData ? 'Update Coupon' : 'Create Coupon'}
          </button>
        </div>
      </form>
    </div>
  )
}
