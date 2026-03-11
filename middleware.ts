import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /admin routes except the login page itself
  if (pathname.startsWith('/admin') && pathname !== '/admin') {
    const authCookie = request.cookies.get('admin_auth')

    if (!authCookie || authCookie.value !== 'true') {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
