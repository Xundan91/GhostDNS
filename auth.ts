// src/auth.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";

// Extend the Session type to include accessToken
declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

export const authConfig: NextAuthConfig = {
  providers: [
    {
      id: "vercel",
      name: "Vercel",
      type: "oauth",
      authorization: {
        url: "https://vercel.com/oauth/authorize",
        params: {
          client_id: process.env.V_CLIENT_ID,
          response_type: "code",
          redirect_uri: "https://ghostdns.xundan.in/api/auth/callback/vercel",
          scope: "read:deployments read:projects",
        },
      }, 
      token: {
        url: "https://api.vercel.com/v2/oauth/access_token",
        params: {
          client_id: process.env.V_CLIENT_ID,
          client_secret: process.env.V_CLIENT_SECRET,
          grant_type: "authorization_code",
        },
      },
      userinfo: {
        url: "https://api.vercel.com/v2/user",
      },
      profile(profile) {
        return {
          id: profile.user.id,
          name: profile.user.name,
          email: profile.user.email,
          image: profile.user.avatar,
        };
      },
      clientId: process.env.V_CLIENT_ID,
      clientSecret: process.env.V_CLIENT_SECRET,
    },
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = typeof token.accessToken === "string" ? token.accessToken : undefined;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
