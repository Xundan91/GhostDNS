import { NextResponse } from "next/server";
import { db } from "@/database";
import { users } from "@/database/schema/users";

export async function GET() {
  try {
    console.log("Testing database connection...");
    console.log("DATABASE_URL:", process.env.DATABASE_URL?.split("@")[1]); // Only log the host part for security

    // Test database connection
    const result = await db.select().from(users).limit(1);
    console.log("Database query successful");
    console.log("First user:", result[0] ? { 
      id: result[0].id,
      email: result[0].email,
      role: result[0].role 
    } : "No users found");

    return NextResponse.json({ 
      success: true, 
      message: "Database connection successful",
      hasUsers: result.length > 0
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Database connection failed",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 