'use client'

import { useState } from 'react'
import { createProduct, updateProduct } from './actions'
import { ArrowLeft, Save, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ProductForm({ 
  initialData,
  categories
}: { 
  initialData?: any,
  categories: any[]
}) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState(initialData?.slug || '')
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.image_urls || [])

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!initialData) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const removeExistingImage = (index: number) => {
    const newImages = [...existingImages]
    newImages.splice(index, 1)
    setExistingImages(newImages)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    // Add existing images back to form data manually since we manage them in state
    formData.delete('existing_images') // remove any hidden inputs if they exist
    existingImages.forEach(img => {
      formData.append('existing_images', img)
    })
    
    try {
      let res
      if (initialData) {
        res = await updateProduct(initialData.id, formData)
      } else {
        res = await createProduct(formData)
      }

      if (res?.error) {
        setError(res.error)
        setLoading(false)
      } else {
        router.push('/admin/catalog')
        router.refresh()
      }
    } catch (err: any) {
      setError(err?.message || 'An unexpected error occurred while saving.')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/catalog" className="text-gray-500 hover:text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-beige-900">
          {initialData ? 'Edit Product' : 'Create Product'}
        </h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Main Info */}
          <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Basic Details</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                name="name"
                defaultValue={initialData?.name}
                onChange={handleNameChange}
                required
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Slug</label>
              <input
                name="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                required
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                defaultValue={initialData?.description}
                rows={6}
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              ></textarea>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Images</h3>
            
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-4">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative w-24 h-24 border rounded-md overflow-hidden">
                    <Image src={img} alt="Product" fill className="object-cover" />
                    <button 
                      type="button" 
                      onClick={() => removeExistingImage(idx)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Upload New Images</label>
              <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-beige-100 file:text-beige-900 hover:file:bg-beige-200"
              />
              <p className="text-xs text-gray-500 mt-2">You can select multiple files.</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Pricing & Inventory */}
          <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-6">
            <h3 className="text-lg font-semibold border-b pb-2 mb-4">Organization & Pricing</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                name="category_id"
                defaultValue={initialData?.category_id || ''}
                required
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900 bg-white"
              >
                <option value="" disabled>Select a category</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                defaultValue={initialData?.price}
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MRP (₹)</label>
              <input
                type="number"
                name="mrp"
                step="0.01"
                defaultValue={initialData?.mrp}
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock Quantity</label>
              <input
                type="number"
                name="stock_quantity"
                defaultValue={initialData?.stock_quantity ?? 10}
                className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
              />
            </div>

            <div className="flex items-center gap-2 pt-2 border-t">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                value="true"
                defaultChecked={initialData ? initialData.is_active : true}
                className="h-4 w-4 rounded border-gray-300 text-beige-900 focus:ring-beige-900"
              />
              <label htmlFor="is_active" className="text-sm font-medium text-gray-700">
                Active (Published)
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <Link 
          href="/admin/catalog"
          className="px-6 py-2 border border-beige-200 text-beige-900 rounded-md font-medium hover:bg-beige-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-beige-900 text-white rounded-md font-medium hover:bg-beige-800 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : <><Save className="h-4 w-4" /> Save Product</>}
        </button>
      </div>
    </form>
  )
}
