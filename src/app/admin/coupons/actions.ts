'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

async function verifyAdmin(supabase: any) {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profile?.role === 'admin') {
    return user.id
  }
  return null
}

export async function createCoupon(formData: FormData) {
  const supabase = await createClient()
  if (!await verifyAdmin(supabase)) return { error: 'Unauthorized' }

  const code = formData.get('code')?.toString().toUpperCase()
  if (!code) return { error: 'Code is required' }

  const data = {
    code,
    description: formData.get('description')?.toString() || null,
    discount_type: formData.get('discount_type')?.toString() || 'percentage',
    discount_value: Number(formData.get('discount_value')),
    min_order_value: Number(formData.get('min_order_value')) || 0,
    max_discount: formData.get('max_discount') ? Number(formData.get('max_discount')) : null,
    usage_limit: formData.get('usage_limit') ? Number(formData.get('usage_limit')) : null,
    starts_at: formData.get('starts_at') ? new Date(formData.get('starts_at') as string).toISOString() : new Date().toISOString(),
    expires_at: formData.get('expires_at') ? new Date(formData.get('expires_at') as string).toISOString() : null,
    is_active: formData.get('is_active') === 'on'
  }

  const { error } = await supabase.from('coupons').insert(data)
  if (error) return { error: error.message }

  revalidatePath('/admin/coupons')
  return { success: true }
}

export async function updateCoupon(id: string, formData: FormData) {
  const supabase = await createClient()
  if (!await verifyAdmin(supabase)) return { error: 'Unauthorized' }

  const data = {
    code: formData.get('code')?.toString().toUpperCase(),
    description: formData.get('description')?.toString() || null,
    discount_type: formData.get('discount_type')?.toString() || 'percentage',
    discount_value: Number(formData.get('discount_value')),
    min_order_value: Number(formData.get('min_order_value')) || 0,
    max_discount: formData.get('max_discount') ? Number(formData.get('max_discount')) : null,
    usage_limit: formData.get('usage_limit') ? Number(formData.get('usage_limit')) : null,
    starts_at: formData.get('starts_at') ? new Date(formData.get('starts_at') as string).toISOString() : new Date().toISOString(),
    expires_at: formData.get('expires_at') ? new Date(formData.get('expires_at') as string).toISOString() : null,
    is_active: formData.get('is_active') === 'on'
  }

  const { error } = await supabase.from('coupons').update(data).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/coupons')
  return { success: true }
}

export async function deleteCoupon(id: string) {
  const supabase = await createClient()
  if (!await verifyAdmin(supabase)) return { error: 'Unauthorized' }

  const { error } = await supabase.from('coupons').delete().eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/coupons')
  return { success: true }
}

export async function toggleCouponActive(id: string, is_active: boolean) {
  const supabase = await createClient()
  if (!await verifyAdmin(supabase)) return { error: 'Unauthorized' }

  const { error } = await supabase.from('coupons').update({ is_active }).eq('id', id)
  if (error) return { error: error.message }

  revalidatePath('/admin/coupons')
  return { success: true }
}
