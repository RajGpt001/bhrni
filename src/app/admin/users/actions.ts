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

export async function updateUserRole(targetUserId: string, newRole: 'admin' | 'customer') {
  const supabase = await createClient()
  const adminId = await verifyAdmin(supabase)
  
  if (!adminId) {
    return { error: 'Unauthorized' }
  }

  // Prevent admin from demoting themselves
  if (adminId === targetUserId && newRole === 'customer') {
    return { error: 'You cannot demote yourself.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ role: newRole })
    .eq('id', targetUserId)

  if (error) {
    return { error: error.message }
  }

  // Log action
  await supabase.from('admin_audit_log').insert({
    admin_id: adminId,
    action: 'update_role',
    target_table: 'profiles',
    target_id: targetUserId,
    details: { new_role: newRole }
  })

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${targetUserId}`)
  return { success: true }
}

export async function toggleUserSuspension(targetUserId: string, is_active: boolean) {
  const supabase = await createClient()
  const adminId = await verifyAdmin(supabase)
  
  if (!adminId) {
    return { error: 'Unauthorized' }
  }

  // Prevent admin from suspending themselves
  if (adminId === targetUserId && !is_active) {
    return { error: 'You cannot suspend yourself.' }
  }

  const { error } = await supabase
    .from('profiles')
    .update({ is_active })
    .eq('id', targetUserId)

  if (error) {
    return { error: error.message }
  }

  // Log action
  await supabase.from('admin_audit_log').insert({
    admin_id: adminId,
    action: is_active ? 'reactivate_user' : 'suspend_user',
    target_table: 'profiles',
    target_id: targetUserId,
    details: { is_active }
  })

  revalidatePath('/admin/users')
  revalidatePath(`/admin/users/${targetUserId}`)
  return { success: true }
}
