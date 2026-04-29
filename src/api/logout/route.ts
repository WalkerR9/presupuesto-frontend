// src/app/api/logout/route.ts
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();
  
  // Borramos la cookie
  cookieStore.delete('access_token');
  
  return NextResponse.json({ message: 'Sesión cerrada' });
}