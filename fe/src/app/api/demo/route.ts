import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const redirectUrl = new URL('/dashboard', url.origin)
  
  const response = NextResponse.redirect(redirectUrl)
  
  // Set demo cookie
  response.cookies.set('carboniq_demo', 'true', {
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
    httpOnly: false, // We need to read it on the client via document.cookie
    sameSite: 'lax'
  })
  
  return response
}
