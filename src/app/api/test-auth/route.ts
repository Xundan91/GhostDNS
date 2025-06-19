import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    return NextResponse.json({
      hasSession: !!session,
      user: session?.user || null,
      timestamp: new Date().toISOString(),
      status: "ok"
    });
  } catch (error) {
    console.error("Test auth error:", error);
    return NextResponse.json({
      hasSession: false,
      user: null,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
      status: "error"
    }, { status: 500 });
  }
} 