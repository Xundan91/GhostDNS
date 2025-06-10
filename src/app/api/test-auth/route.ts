import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    console.log("Testing auth configuration...");
    console.log("NEXTAUTH_URL:", process.env.NEXTAUTH_URL);
    console.log("NEXTAUTH_SECRET is set:", !!process.env.NEXTAUTH_SECRET);

    const session = await getServerSession(authOptions);
    console.log("Current session:", session);

    return NextResponse.json({
      success: true,
      message: "Auth configuration check",
      hasSession: !!session,
      session: session ? {
        user: session.user,
        expires: session.expires
      } : null,
      env: {
        hasNextAuthUrl: !!process.env.NEXTAUTH_URL,
        hasNextAuthSecret: !!process.env.NEXTAUTH_SECRET,
        isDevelopment: process.env.NODE_ENV === "development"
      }
    });
  } catch (error) {
    console.error("Auth configuration error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Auth configuration check failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 