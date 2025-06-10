import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

// Add error handling wrapper
const wrappedHandler = async (req: Request, context: any) => {
  try {
    console.log("=== Auth Route Debug ===");
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);
    console.log("======================");

    return await handler(req, context);
  } catch (error) {
    console.error("Auth Route Error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Authentication error", 
        details: error instanceof Error ? error.message : "Unknown error" 
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};

export { wrappedHandler as GET, wrappedHandler as POST };
