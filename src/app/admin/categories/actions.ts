'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createCategory(formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)
  
  const image = formData.get('image') as File
  let image_url = null

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    const { error: uploadError, data } = await supabase.storage
      .from('category-images')
      .upload(fileName, image)
      
    if (uploadError) {
      console.error(uploadError)
      return { error: 'Failed to upload image' }
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('category-images')
      .getPublicUrl(fileName)
      
    image_url = publicUrlData.publicUrl
  }

  const { error } = await supabase.from('categories').insert({
    name,
    slug,
    sort_order,
    image_url
  })

  if (error) {
    console.error(error)
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/')
  redirect('/admin/categories')
}

export async function updateCategory(id: string, formData: FormData) {
  const supabase = await createClient()

  const name = formData.get('name') as string
  const slug = formData.get('slug') as string
  const sort_order = parseInt((formData.get('sort_order') as string) || '0', 10)
  
  const image = formData.get('image') as File
  let image_url = formData.get('existing_image_url') as string

  if (image && image.size > 0) {
    const fileExt = image.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('category-images')
      .upload(fileName, image)
      
    if (uploadError) {
      return { error: 'Failed to upload image' }
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('category-images')
      .getPublicUrl(fileName)
      
    image_url = publicUrlData.publicUrl
  }

  const { error } = await supabase
    .from('categories')
    .update({ name, slug, sort_order, image_url })
    .eq('id', id)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/')
  redirect('/admin/categories')
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id)

  if (error) {
    // Return error to show warning if products still reference it
    return { error: error.message }
  }

  revalidatePath('/admin/categories')
  revalidatePath('/')
}
