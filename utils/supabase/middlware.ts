import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    // Response
    let response = NextResponse.next({
        request: {
        headers: request.headers,
        },
    })

    // Client Supabase
    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
        cookies: {
            getAll() {
            return request.cookies.getAll()
            },
            setAll(cookiesToSet) {
            // Update Cookies In Request
            cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
            
            // Updating Cookies in Response
            response = NextResponse.next({
                request,
            })
            cookiesToSet.forEach(({ name, value, options }) =>
                response.cookies.set(name, value, options)
            )
            },
        },
        }
    )

    // Checking current logged in user (If exists)
    const { data: { user } } = await supabase.auth.getUser()

    // Page Path Protection
    
    // Chedking Current URL Path
    const path = request.nextUrl.pathname

    // User hasn't logged in and tried to enter protected routes
    const publicRoutes = ['/login', '/register', '/forgot-password', '/auth/callback']
    const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

    if (!user && !isPublicRoute) {
        const url = request.nextUrl.clone()
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }
    
    // User has logged in but re-entered login page or / route
    if (user) {
        if (path.startsWith('/login') || path === '/' || path ==='/register' || path==='/forgot-password') {
            const url = request.nextUrl.clone()
            url.pathname = '/table'
            return NextResponse.redirect(url)
        }
    }

    return response
}