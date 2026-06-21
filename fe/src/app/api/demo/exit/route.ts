import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const url = new URL(request.url)
  const redirectUrl = new URL('/', url.origin)
  
  const response = NextResponse.redirect(redirectUrl)
  
  // Clear demo cookie
  response.cookies.delete('carboniq_demo')
  
  return response
}
