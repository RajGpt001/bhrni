import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import Image from 'next/image'
import { Plus, Edit2, Trash2 } from 'lucide-react'
import { deleteCategory } from './actions'
import { DeleteButton } from './DeleteButton'
export default async function CategoriesPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase
    .from('categories')
    .select('*, products(count)')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-beige-900">Categories</h1>
        <Link 
          href="/admin/categories/new" 
          className="flex items-center gap-2 bg-beige-900 text-white px-4 py-2 rounded-md hover:bg-beige-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-beige-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-beige-50 border-b border-beige-200 text-beige-800">
              <tr>
                <th className="px-6 py-4 font-medium">Image</th>
                <th className="px-6 py-4 font-medium">Name</th>
                <th className="px-6 py-4 font-medium">Slug</th>
                <th className="px-6 py-4 font-medium">Products</th>
                <th className="px-6 py-4 font-medium">Sort Order</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-beige-100">
              {categories?.map((cat) => (
                <tr key={cat.id} className="hover:bg-beige-50/50 transition-colors">
                  <td className="px-6 py-4">
                    {cat.image_url ? (
                      <Image src={cat.image_url} alt={cat.name} width={40} height={40} className="rounded-md object-cover" />
                    ) : (
                      <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center text-gray-400 text-xs">No img</div>
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{cat.name}</td>
                  <td className="px-6 py-4 text-gray-500">{cat.slug}</td>
                  <td className="px-6 py-4 text-gray-500">{cat.products[0]?.count || 0}</td>
                  <td className="px-6 py-4 text-gray-500">{cat.sort_order}</td>
                  <td className="px-6 py-4 flex items-center justify-end gap-3">
                    <Link href={`/admin/categories/${cat.id}/edit`} className="text-blue-600 hover:text-blue-800 p-1">
                      <Edit2 className="h-4 w-4" />
                    </Link>
                    <DeleteButton categoryId={cat.id} productCount={cat.products[0]?.count || 0} />
                  </td>
                </tr>
              ))}
              {categories?.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    No categories found.
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
