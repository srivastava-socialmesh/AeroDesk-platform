
---

## 🛡️ **FILE #9: middleware.ts** (Create in root folder)

```typescript
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Define public routes that don't require authentication
  const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/about', '/contact']
  const isPublicRoute = publicRoutes.some(route => req.nextUrl.pathname === route)
  
  // Protected routes
  const isDashboardRoute = req.nextUrl.pathname.startsWith('/dashboard')
  const isApiRoute = req.nextUrl.pathname.startsWith('/api')
  
  // If it's a protected route and no session, redirect to login
  if ((isDashboardRoute || isApiRoute) && !session && !isPublicRoute) {
    const redirectUrl = new URL('/login', req.url)
    redirectUrl.searchParams.set('redirectedFrom', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If user is logged in and tries to access auth pages, redirect to appropriate dashboard
  if (session && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register')) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    if (user?.role) {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url))
    }
  }

  // Role-based access control for dashboard routes
  if (isDashboardRoute && session) {
    const { data: user } = await supabase
      .from('users')
      .select('role')
      .eq('id', session.user.id)
      .single()

    const pathSegments = req.nextUrl.pathname.split('/')
    const requestedRole = pathSegments[2] // dashboard/[role]

    // If user tries to access a different role's dashboard, redirect to their own
    if (requestedRole && user?.role && user.role !== requestedRole) {
      return NextResponse.redirect(new URL(`/dashboard/${user.role}`, req.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*', '/login', '/register'],
}