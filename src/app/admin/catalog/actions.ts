'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category_id = formData.get('category_id') as string
  const price = parseFloat(formData.get('price') as string) || 0
  const mrp = parseFloat(formData.get('mrp') as string) || 0
  const stock_quantity = parseInt(formData.get('stock_quantity') as string) || 0
  const is_active = formData.get('is_active') === 'true'

  // Read the uploaded image URLs that were uploaded on the client-side
  const image_urls = formData.getAll('uploaded_image_urls') as string[]

  const { error } = await supabase.from('products').insert({
    name,
    slug,
    description,
    category_id,
    price,
    mrp,
    stock_quantity,
    is_active,
    image_urls
  })

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/catalog')
  revalidatePath('/')
  return { success: true }
}

export async function updateProduct(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const description = formData.get('description') as string
  const category_id = formData.get('category_id') as string
  const price = parseFloat(formData.get('price') as string) || 0
  const mrp = parseFloat(formData.get('mrp') as string) || 0
  const stock_quantity = parseInt(formData.get('stock_quantity') as string) || 0
  const is_active = formData.get('is_active') === 'true'

  // Existing images from hidden inputs
  const existingImages = formData.getAll('existing_images') as string[]
  
  // New images (uploaded on client)
  const new_image_urls = formData.getAll('uploaded_image_urls') as string[]

  const finalImageUrls = [...existingImages, ...new_image_urls]

  const { error } = await supabase
    .from('products')
    .update({ 
      name, slug, description, category_id, price, mrp, stock_quantity, is_active, 
      image_urls: finalImageUrls 
    })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/catalog')
  revalidatePath('/')
  return { success: true }
}

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/catalog')
  revalidatePath('/')
}

export async function bulkDeleteProducts(ids: string[]) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .in('id', ids)

  if (error) {
    return { error: error.message }
  }
  revalidatePath('/admin/catalog')
}

export async function bulkToggleActiveProducts(ids: string[], is_active: boolean) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .update({ is_active })
    .in('id', ids)

  if (error) {
    return { error: error.message }
  }
  revalidatePath('/admin/catalog')
}
