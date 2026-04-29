// src/middlewares/routeMiddleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function routeMiddleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === '/login' || pathname === '/register';

  // Si no hay token y no es ruta pública -> Al Login
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Si hay token e intenta ir a ruta pública -> Al Dashboard
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Si todo está bien, retornamos null para que el orquestador sepa que puede continuar
  return null;
}