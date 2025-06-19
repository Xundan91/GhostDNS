import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index"
import { basedomain } from "@/database/schema/basedomain";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user?.id) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 });
        }

        const domains = await db.select({
            id: basedomain.id,
            domainName: basedomain.domainName,
            platform: basedomain.platform,
            price: basedomain.price,
            createdAt: basedomain.createdAt
        })
        .from(basedomain)
        .where(eq(basedomain.ownerId, session.user.id));

        return NextResponse.json({ domains });
    } catch (error) {
        console.error("Error fetching user domains:", error);
        return NextResponse.json(
            { error: "Failed to fetch user domains" },
            { status: 500 }
        );
    }
} 