import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export default async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match only the admin and auth routes to drastically reduce Edge Function invocations.
     * Public pages like /, /about, /services will be served directly from CDN cache.
     */
    '/admin/:path*',
    '/auth/:path*',
  ],
}
