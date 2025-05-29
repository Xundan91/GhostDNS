// // app/login/page.tsx
// "use client"

// import { signIn, useSession } from "next-auth/react"
// import { useRouter } from "next/navigation"
// import { useEffect } from "react"

// export default function LoginPage() {
//   const { data: session, status } = useSession()
//   const router = useRouter()

//   useEffect(() => {
//     if (session) {
//       router.push("/user-info") // Redirect to home if already logged in
//     }
//   }, [session, router])

//   if (status === "loading") {
//     return <div>Loading...</div>
//   }

//   if (session) {
//     return <div>Redirecting...</div>
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen">
//       <h1 className="text-2xl font-bold mb-4">Login</h1>
//       <button 
//         onClick={() => signIn("vercel", { callbackUrl: "/" })}
//         className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Sign in with Vercel
//       </button>
//     </div>
//   )
// }


// app/login/page.tsx
"use client"

export default function LoginPage() {
  const handleDirectAuth = () => {
    // Navigate directly to NextAuth signin
    window.location.href = '/api/auth/signin/vercel'
  }

  const handleManualAuth = () => {
    // Manual OAuth flow
    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_V_CLIENT_ID || 'oac_FyTlDrCfwVwo0luF5utscNH7',
      redirect_uri: window.location.origin + '/api/auth/callback/vercel',
      scope: 'read write',
      response_type: 'code',
      state: Math.random().toString(36).substring(7)
    })
    
    window.location.href = `https://vercel.com/oauth/authorize?${params.toString()}`
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-2xl font-bold">Login Test</h1>
      
      <div className="space-y-2">
        <button 
          onClick={handleDirectAuth}
          className="block w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Direct NextAuth Sign In
        </button>
        
        <button 
          onClick={handleManualAuth}
          className="block w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Manual OAuth Flow
        </button>
      </div>

      <div className="mt-8 space-y-2 text-sm">
        <div>
          <a href="/api/test" className="text-blue-600 hover:underline">
            Test API Route
          </a>
        </div>
        <div>
          <a href="/api/auth/providers" className="text-blue-600 hover:underline">
            Test NextAuth Providers
          </a>
        </div>
        <div>
          <a href="/api/auth/signin" className="text-blue-600 hover:underline">
            Test NextAuth Sign In Page
          </a>
        </div>
      </div>
    </div>
  )
}