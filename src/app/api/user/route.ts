import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index";
import { users } from "@/database/schema/users";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const user = await db.query.users.findFirst({
    where: eq(users.id, session.user.id),
    columns: { id: true, name: true, email: true, role: true, createdAt: true, updatedAt: true },
  });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  const { name, email, password } = body;
  if (!name && !email && !password) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }
  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (password) updateData.password = await hash(password, 10);
  try {
    const [updatedUser] = await db
      .update(users)
      .set({ ...updateData, updatedAt: new Date() })
      .where(eq(users.id, session.user.id))
      .returning({ id: users.id, name: users.name, email: users.email, role: users.role, createdAt: users.createdAt, updatedAt: users.updatedAt });
    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    if (error instanceof Error && error.message.includes("unique")) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 });
  }
} 
//In purchase domain there will be connect project .
