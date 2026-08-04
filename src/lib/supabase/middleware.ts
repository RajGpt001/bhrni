import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const isAuthRoute = request.nextUrl.pathname.startsWith('/login')
    const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
    const isAccountRoute = request.nextUrl.pathname.startsWith('/account')

    const createRedirect = (path: string, searchParams?: Record<string, string>) => {
      const url = request.nextUrl.clone()
      url.pathname = path
      if (searchParams) {
        Object.entries(searchParams).forEach(([k, v]) => url.searchParams.set(k, v))
      }
      const redirectResponse = NextResponse.redirect(url)
      // Copy cookies from the original supabaseResponse
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, {
          domain: cookie.domain,
          path: cookie.path,
          secure: cookie.secure,
          httpOnly: cookie.httpOnly,
          sameSite: cookie.sameSite as any,
          expires: cookie.expires
        })
      })
      return redirectResponse
    }

    if (
      !user &&
      (isAdminRoute || isAccountRoute)
    ) {
      return createRedirect('/login', { redirect: request.nextUrl.pathname })
    }

    if (user) {
      // Check user profile for role and active status
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('role, is_active')
        .eq('id', user.id)
        .single()

      if (profile) {
        if (profile.is_active === false) {
          // Suspend user
          // Skip calling signOut as it might fail in edge middleware, just redirect
          return createRedirect('/login', { error: 'suspended' })
        }

        if (isAdminRoute && profile.role !== 'admin') {
          return createRedirect('/', { error: 'unauthorized' })
        }
      } else if (isAdminRoute) {
        // No profile, can't be admin
        return createRedirect('/', { error: 'unauthorized' })
      }
    }

    // If user is logged in, they shouldn't access login page
    if (user && isAuthRoute) {
      return createRedirect('/account')
    }

    return supabaseResponse
  } catch (e) {
    console.error('Middleware exception:', e)
    return supabaseResponse
  }
}
