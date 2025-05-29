// app/login/page.tsx
"use client"

import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function LoginPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (session) {
      router.push("/user-info") // Redirect to home if already logged in
    }
  }, [session, router])

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (session) {
    return <div>Redirecting...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <button 
        onClick={() => signIn("vercel", { callbackUrl: "/" })}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Sign in with Vercel
      </button>
    </div>
  )
}