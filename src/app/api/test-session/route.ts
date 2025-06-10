import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    console.log("=== Test Session Endpoint ===");
    console.log("Session:", session);
    
    return NextResponse.json({
      authenticated: !!session,
      session: session,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error("Session Test Error:", error);
    return NextResponse.json({
      error: "Failed to get session",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 