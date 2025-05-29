// app/api/auth/callback/vercel/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  const error = searchParams.get('error')

  console.log('OAuth callback received:', { code, error })

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url))
  }

  if (!code) {
    return NextResponse.redirect(new URL('/login?error=no_code', request.url))
  }

  try {
    // Exchange code for access token
    const tokenResponse = await fetch('https://api.vercel.com/v2/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: process.env.V_CLIENT_ID!,
        client_secret: process.env.V_CLIENT_SECRET!,
        code,
        redirect_uri: new URL('/api/auth/callback/vercel', request.url).toString(),
      }),
    })

    const tokenData = await tokenResponse.json()
    console.log('Token response:', tokenData)

    if (tokenData.access_token) {
      // Get user info
      const userResponse = await fetch('https://api.vercel.com/v2/user', {
        headers: {
          Authorization: `Bearer ${tokenData.access_token}`,
        },
      })

      const userData = await userResponse.json()
      console.log('User data:', userData)

      // Here you would typically create a session or JWT
      // For now, just redirect to success page
      return NextResponse.redirect(new URL('/?success=true', request.url))
    }

    return NextResponse.redirect(new URL('/login?error=token_exchange_failed', request.url))
  } catch (error) {
    console.error('OAuth callback error:', error)
    return NextResponse.redirect(new URL('/login?error=callback_error', request.url))
  }
}