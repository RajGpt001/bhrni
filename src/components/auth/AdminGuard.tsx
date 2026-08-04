import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { ReactNode } from 'react'

export async function AdminGuard({ children }: { children: ReactNode }) {
  const supabase = await createClient()
  
  const { data: { user }, error: userError } = await supabase.auth.getUser()
  
  if (userError || !user) {
    redirect('/login?redirect=/admin')
  }

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (profileError || !profile || profile.role !== 'admin') {
    redirect('/?error=unauthorized')
  }

  return <>{children}</>
}
