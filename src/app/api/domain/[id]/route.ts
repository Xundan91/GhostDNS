import { NextResponse } from "next/server";
import { db } from "@/database/index"
import { basedomain } from "@/database/schema/basedomain";
import { eq } from "drizzle-orm";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const domain = await db.select({
      id: basedomain.id,
      domainName: basedomain.domainName,
      platform: basedomain.platform,
      price: basedomain.price,
      createdAt: basedomain.createdAt,
      ownerId: basedomain.ownerId
    })
    .from(basedomain)
    .where(eq(basedomain.id, params.id))
    .then((res) => res[0]);

    if (!domain) {
      return NextResponse.json(
        { error: "Domain not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ domain });
  } catch (error) {
    console.error("Error fetching domain:", error);
    return NextResponse.json(
      { error: "Failed to fetch domain" },
      { status: 500 }
    );
  }
} 