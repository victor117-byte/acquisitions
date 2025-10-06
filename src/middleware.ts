import { NextResponse, type NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth/utils';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que no requieren autenticación
  const publicPaths = [
    '/',
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/pricing',
    '/api/auth/login',
    '/api/auth/register',
    '/api/stripe/webhook',
  ];

  // Si es una ruta pública, permitir acceso
  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Verificar token de autenticación
  const token = request.cookies.get('auth-token')?.value;

  if (!token) {
    // No hay token, redirigir al login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  try {
    // Verificar si el token es válido
    const payload = verifyToken(token);
    
    if (!payload) {
      // Token inválido, redirigir al login
      const url = request.nextUrl.clone();
      url.pathname = '/auth/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    // Token válido, permitir acceso
    return NextResponse.next();
  } catch (error) {
    // Error al verificar token, redirigir al login
    const url = request.nextUrl.clone();
    url.pathname = '/auth/login';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};