'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Edit2, Trash2, CheckSquare, Square } from 'lucide-react'
import { bulkDeleteProducts, bulkToggleActiveProducts, deleteProduct } from './actions'

export default function CatalogTable({ products }: { products: any[] }) {
  const [selected, setSelected] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const toggleSelect = (id: string) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id))
    } else {
      setSelected([...selected, id])
    }
  }

  const toggleAll = () => {
    if (selected.length === products.length) {
      setSelected([])
    } else {
      setSelected(products.map(p => p.id))
    }
  }

  const handleBulkDelete = async () => {
    if (confirm(`Are you sure you want to delete ${selected.length} products?`)) {
      setLoading(true)
      await bulkDeleteProducts(selected)
      setSelected([])
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setLoading(true)
      await deleteProduct(id)
      setLoading(false)
    }
  }

  const handleBulkToggle = async (is_active: boolean) => {
    setLoading(true)
    await bulkToggleActiveProducts(selected, is_active)
    setSelected([])
    setLoading(false)
  }

  return (
    <div className="space-y-4">
      {selected.length > 0 && (
        <div className="bg-white p-3 rounded-xl border border-beige-200 shadow-sm flex items-center gap-4">
          <span className="text-sm font-medium text-gray-700">{selected.length} selected</span>
          <button 
            onClick={() => handleBulkToggle(true)}
            disabled={loading}
            className="text-sm px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-md hover:bg-green-100"
          >
            Mark Active
          </button>
          <button 
            onClick={() => handleBulkToggle(false)}
            disabled={loading}
            className="text-sm px-3 py-1.5 bg-gray-50 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-100"
          >
            Mark Inactive
          </button>
          <button 
            onClick={handleBulkDelete}
            disabled={loading}
            className="text-sm px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-md hover:bg-red-100 ml-auto"
          >
            Delete Selected
          </button>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
              <tr>
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleAll}>
                    {selected.length === products.length && products.length > 0 ? (
                      <CheckSquare className="h-5 w-5 text-beige-900" />
                    ) : (
                      <Square className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Price / MRP</th>
                <th className="px-6 py-4 font-medium">Stock</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {products?.map((prod) => (
                <tr key={prod.id} className={`hover:bg-beige-50/50 transition-colors ${selected.includes(prod.id) ? 'bg-beige-50' : ''}`}>
                  <td className="px-6 py-4">
                    <button onClick={() => toggleSelect(prod.id)}>
                      {selected.includes(prod.id) ? (
                        <CheckSquare className="h-5 w-5 text-beige-900" />
                      ) : (
                        <Square className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {prod.image_urls && prod.image_urls.length > 0 ? (
                      <Image src={prod.image_urls[0]} alt={prod.name} width={40} height={40} className="rounded-md object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{prod.name}</td>
                  <td className="px-6 py-4 text-gray-500">{prod.categories?.name}</td>
                  <td className="px-6 py-4 text-gray-500">
                    <span className="font-semibold text-gray-900">₹{prod.price}</span>
                    {prod.mrp > prod.price && <span className="line-through ml-2 text-xs">₹{prod.mrp}</span>}
                  </td>
                  <td className="px-6 py-4 text-gray-500">{prod.stock_quantity}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${prod.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                      {prod.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <Link href={`/admin/catalog/${prod.id}/edit`} className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <button 
                      onClick={() => handleDelete(prod.id)}
                      disabled={loading}
                      className="text-red-600 hover:text-red-800 p-1 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {products?.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
