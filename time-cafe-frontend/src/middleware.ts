import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('user_token')?.value;
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET!);
    const { payload } = await jwtVerify(token, secret);

    const userRole = payload.role as string;

    if (pathname.startsWith('/admin')) {
      if (userRole !== 'admin') {
        url.pathname = '/login';
        return NextResponse.redirect(url);
      }
    }

    const clientRoutes = [
      '/fake-gateway',
      '/booking', 
      '/profile',
      '/transaction'
    ];

    const isClientRoute = clientRoutes.some(route => pathname.startsWith(route));
    
    if (isClientRoute && userRole !== 'client') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    const response = NextResponse.next();
    response.headers.set('x-user-role', userRole);
    if (payload.sub) {
      response.headers.set('x-user-id', payload.sub.toString());
    }
    
    return response;
  } catch (e) {
    console.log('JWT ошибка:', e);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/fake-gateway/:path*',
    '/booking/:path*',
    '/profile/:path*',
    '/transaction/:path*'
  ],
};
