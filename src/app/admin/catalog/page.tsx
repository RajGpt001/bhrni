import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import CatalogTable from './CatalogTable'

export default async function CatalogPage() {
  const supabase = await createClient()

  const { data: products } = await supabase
    .from('products')
    .select('*, categories(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight text-beige-900">Catalog</h1>
        <Link 
          href="/admin/catalog/new" 
          className="flex items-center gap-2 bg-beige-900 text-white px-4 py-2 rounded-md hover:bg-beige-800 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      <CatalogTable products={products || []} />
    </div>
  )
}
