import ProductForm from '../ProductForm'
import { createClient } from '@/lib/supabase/server'

export default async function NewProductPage() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div>
      <ProductForm categories={categories || []} />
    </div>
  )
}
