import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index";
import { basedomain } from "@/database/schema/basedomain";
import { subdomainclaim } from "@/database/schema/subdomainclaim";
import { purchase } from "@/database/schema/purchase";
import { authOptions } from "@/lib/auth";
import { eq, and } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { basedomainId, price, paymentMethod, paymentRefId } = body;
    if (!basedomainId) {
      return NextResponse.json({ error: "Missing basedomainId" }, { status: 400 });
    }
    // Check if already purchased
    const existingClaim = await db.select().from(subdomainclaim).where(and(eq(subdomainclaim.basedomainId, basedomainId), eq(subdomainclaim.userId, session.user.id))).then(res => res[0]);
    if (existingClaim) {
      return NextResponse.json({ error: "Domain already claimed by user" }, { status: 409 });
    }
    // Get domain info
    const domain = await db.select().from(basedomain).where(eq(basedomain.id, basedomainId)).then(res => res[0]);
    if (!domain) {
      return NextResponse.json({ error: "Domain not found" }, { status: 404 });
    }
    // Create subdomainclaim
    const claim = await db.insert(subdomainclaim).values({
      subdomain: domain.domainName.split('.')[0],
      fulldomain: domain.domainName,
      userId: session.user.id,
      basedomainId: domain.id,
      secretId: Math.random().toString(36).substring(2),
      isFree: parseFloat(domain.price) === 0,
      price: parseFloat(domain.price),
      dnsStatus: 'pending',
    }).returning();
    const claimId = claim[0]?.id;
    if (!claimId) {
      return NextResponse.json({ error: "Failed to create claim" }, { status: 500 });
    }
    // Create purchase
    await db.insert(purchase).values({
      subdomainclaimID: claimId,
      buyerID: session.user.id,
      price: parseFloat(domain.price),
      status: 'COMPLETED',
      paymentMethod: paymentMethod || null,
      paymentRefId: paymentRefId || null,
    });
    return NextResponse.json({ message: "Domain purchased successfully" });
  } catch (error) {
    console.error("[Purchase error]:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 