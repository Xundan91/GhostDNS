import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/database";
import { users } from "@/database/schema/users";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  debug: true,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("=== Authorize Callback ===");
          console.log("Credentials:", { email: credentials?.email });
          
          if (!credentials?.email || !credentials?.password) {
            console.log("Missing credentials");
            throw new Error("Email and password are required.");
          }

          const user = await db
            .select()
            .from(users)
            .where(eq(users.email, credentials.email))
            .then((res) => res[0]);

          if (!user) {
            console.log("No user found with email:", credentials.email);
            throw new Error("No user found with this email.");
          }

          const isValid = await compare(credentials.password, user.password);
          if (!isValid) {
            console.log("Invalid password for user:", credentials.email);
            throw new Error("Invalid password.");
          }

          console.log("User authenticated successfully:", user.email);
          const userAccount = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role ?? "USER",
          };
          console.log("Returning user account:", userAccount);
          return userAccount;
        } catch (error) {
          console.error("Auth error:", error);
          throw error;
        }
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },

  callbacks: {
    async signIn({ user, account }) {
      console.log("=== SignIn Callback ===");
      console.log("User:", user);
      console.log("Account:", account);
      return true;
    },
    async jwt({ token, user, account }) {
      console.log("=== JWT Callback ===");
      console.log("Initial Token:", token);
      console.log("User:", user);
      console.log("Account:", account);
      
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
      }
      console.log("Final Token:", token);
      return token;
    },
    async session({ session, token }) {
      console.log("=== Session Callback ===");
      console.log("Initial Session:", session);
      console.log("Token:", token);
      
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.email = token.email as string;
      }
      console.log("Final Session:", session);
      return session;
    },
  },

  events: {
    async signIn(message) {
      console.log("=== SignIn Event ===");
      console.log(message);
    },
    async signOut(message) {
      console.log("=== SignOut Event ===");
      console.log(message);
    },
    async session(message) {
      console.log("=== Session Event ===");
      console.log(message);
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}; 