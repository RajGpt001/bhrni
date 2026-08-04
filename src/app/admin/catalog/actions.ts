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

  // Handle multiple images
  const imageFiles = formData.getAll('images') as File[]
  const image_urls: string[] = []

  for (const image of imageFiles) {
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, image)
        
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName)
          
        image_urls.push(publicUrlData.publicUrl)
      }
    }
  }

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
  redirect('/admin/catalog')
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
  
  // New images
  const imageFiles = formData.getAll('images') as File[]
  const new_image_urls: string[] = []

  for (const image of imageFiles) {
    if (image && image.size > 0) {
      const fileExt = image.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      
      const { error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(fileName, image)
        
      if (!uploadError) {
        const { data: publicUrlData } = supabase.storage
          .from('product-images')
          .getPublicUrl(fileName)
          
        new_image_urls.push(publicUrlData.publicUrl)
      }
    }
  }

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
  redirect('/admin/catalog')
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
