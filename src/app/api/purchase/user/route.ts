import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index";
import { purchase } from "@/database/schema/purchase";
import { subdomainclaim } from "@/database/schema/subdomainclaim";
import { basedomain } from "@/database/schema/basedomain";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    // Get all purchases for this user
    const purchases = await db
      .select({
        purchaseId: purchase.id,
        price: purchase.price,
        status: purchase.status,
        timestamp: purchase.timestamp,
        domainName: basedomain.domainName,
        platform: basedomain.platform,
        basedomainId: basedomain.id,
        claimId: subdomainclaim.id,
        fulldomain: subdomainclaim.fulldomain,
        dnsStatus: subdomainclaim.dnsStatus,
        createdAt: subdomainclaim.createdAt,
      })
      .from(purchase)
      .innerJoin(subdomainclaim, eq(purchase.subdomainclaimID, subdomainclaim.id))
      .innerJoin(basedomain, eq(subdomainclaim.basedomainId, basedomain.id))
      .where(eq(purchase.buyerID, session.user.id));
    return NextResponse.json({ purchases });
  } catch (error) {
    console.error("[Get Purchases error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 