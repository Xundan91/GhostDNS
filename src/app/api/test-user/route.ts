import { NextResponse } from "next/server";
import { db } from "@/database";
import { users } from "@/database/schema/users";
import { hash } from "bcryptjs";

export async function GET() {
  try {
    console.log("Checking for existing users...");
    const existingUsers = await db.select().from(users).limit(1);
    
    if (existingUsers.length > 0) {
      console.log("Found existing user:", {
        id: existingUsers[0].id,
        email: existingUsers[0].email,
        role: existingUsers[0].role
      });
      
      return NextResponse.json({
        success: true,
        message: "Users exist in database",
        user: {
          id: existingUsers[0].id,
          email: existingUsers[0].email,
          role: existingUsers[0].role
        }
      });
    }

    // If no users exist, create a test user
    console.log("No users found, creating test user...");
    const hashedPassword = await hash("password123", 12);
    
    const newUser = await db.insert(users).values({
      name: "Test User",
      email: "test@example.com",
      password: hashedPassword,
      role: "ADMIN"
    }).returning();

    console.log("Created test user:", {
      id: newUser[0].id,
      email: newUser[0].email,
      role: newUser[0].role
    });

    return NextResponse.json({
      success: true,
      message: "Test user created",
      user: {
        id: newUser[0].id,
        email: newUser[0].email,
        role: newUser[0].role
      }
    });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check/create test user",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
} 