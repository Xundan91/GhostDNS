// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import type { NextAuthConfig } from "next-auth";
import { OAuthConfig } from "next-auth/providers";

const VercelProvider = {
  id: "vercel",
  name: "Vercel",
  type: "oauth",
  authorization: {
    url: "https://vercel.com/oauth/authorize",
    params: { scope: "read write" },
  },
  token: "https://api.vercel.com/v2/oauth/access_token",
  userinfo: "https://api.vercel.com/v2/user",
  clientId: process.env.VERCEL_CLIENT_ID!,
  clientSecret: process.env.VERCEL_CLIENT_SECRET!,
  profile(profile) {
    return {
      id: profile.user.id,
      name: profile.user.name,
      email: profile.user.email,
      image: profile.user.avatar,
    };
  },
} satisfies OAuthConfig<any>;

export const authOptions: NextAuthConfig = {
  providers: [VercelProvider],
  secret: process.env.AUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
