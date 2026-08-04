'use client'

import { useState } from 'react'
import { createCategory, updateCategory } from './actions'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function CategoryForm({ 
  initialData 
}: { 
  initialData?: any 
}) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [slug, setSlug] = useState(initialData?.slug || '')

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!initialData) {
      setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    let res
    if (initialData) {
      res = await updateCategory(initialData.id, formData)
    } else {
      res = await createCategory(formData)
    }

    if (res?.error) {
      setError(res.error)
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/categories" className="text-gray-500 hover:text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-beige-900">
          {initialData ? 'Edit Category' : 'Create Category'}
        </h2>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg text-sm border border-red-200">
          {error}
        </div>
      )}

      <div className="bg-white p-6 rounded-xl border border-beige-200 shadow-sm space-y-6">
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Sort Order</label>
          <input
            type="number"
            name="sort_order"
            defaultValue={initialData?.sort_order || 0}
            className="w-full px-4 py-2 border border-beige-200 rounded-md focus:outline-none focus:ring-2 focus:ring-beige-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Image</label>
          {initialData?.image_url && (
            <div className="mb-4">
              <Image src={initialData.image_url} alt="Current" width={100} height={100} className="rounded-lg object-cover" />
              <input type="hidden" name="existing_image_url" value={initialData.image_url} />
            </div>
          )}
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-beige-100 file:text-beige-900 hover:file:bg-beige-200"
          />
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Link 
          href="/admin/categories"
          className="px-6 py-2 border border-beige-200 text-beige-900 rounded-md font-medium hover:bg-beige-50 transition-colors"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-beige-900 text-white rounded-md font-medium hover:bg-beige-800 transition-colors flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? 'Saving...' : <><Save className="h-4 w-4" /> Save</>}
        </button>
      </div>
    </form>
  )
}
