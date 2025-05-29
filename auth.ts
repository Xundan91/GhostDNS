// auth.ts (root level)
import NextAuth from "next-auth"

const nextAuth = NextAuth({
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
      clientId: process.env.V_CLIENT_ID,
      clientSecret: process.env.V_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.user?.id || profile.id,
          name: profile.user?.name || profile.name,
          email: profile.user?.email || profile.email,
          image: profile.user?.avatar || profile.avatar,
        }
      },
    }
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    session({ session, token }) {
      return session
    },
  },
})

export const handlers = nextAuth.handlers
export const signIn = nextAuth.signIn
export const signOut = nextAuth.signOut
export const auth = nextAuth.auth