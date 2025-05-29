// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth"
import type { NextAuthConfig } from "next-auth"

const config = {
  providers: [
    {
      id: "vercel",
      name: "Vercel",
      type: "oauth",
      authorization: {
        url: "https://vercel.com/oauth/authorize",
        params: { 
          scope: "read write",
          response_type: "code"
        },
      },
      token: "https://api.vercel.com/v2/oauth/access_token",
      userinfo: "https://api.vercel.com/v2/user",
      clientId: process.env.V_CLIENT_ID!,
      clientSecret: process.env.V_CLIENT_SECRET!,
      checks: ["state"],
      profile(profile: any) {
        return {
          id: profile.user?.id || profile.id,
          name: profile.user?.name || profile.name,
          email: profile.user?.email || profile.email,
          image: profile.user?.avatar || profile.avatar,
        }
      },
    }
  ],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      return session
    },
  },
} satisfies NextAuthConfig

const handler = NextAuth(config)

export { handler as GET, handler as POST }