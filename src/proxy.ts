 // src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { routeMiddleware } from './middleware/routeMiddleware';

export function proxy(request: NextRequest) {
  // 1. Ejecutar el middleware de rutas/auth
  const routeResponse = routeMiddleware(request);
  
  // Si el middleware retornó una redirección (NextResponse), la enviamos de inmediato
  if (routeResponse) {
    return routeResponse;
  }

  // 2. Aquí podrías ejecutar otros en el futuro:
  // const analyticsResponse = analyticsMiddleware(request);
  // if (analyticsResponse) return analyticsResponse;

  // Si ningún middleware interceptó la petición, permitimos el paso
  return NextResponse.next();
}

// El matcher es ÚNICO y va aquí para filtrar todas las ejecuciones
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};