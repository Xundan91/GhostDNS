import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index"
import { basedomain } from "@/database/schema/basedomain";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";


export async function GET() {
    try {
        // For marketplace, we want to show all domains, not just user-specific ones
        const domains = await db.select({
            id: basedomain.id,
            domainName: basedomain.domainName,
            platform: basedomain.platform,
            price: basedomain.price,
            createdAt: basedomain.createdAt
        })
        .from(basedomain);

        return NextResponse.json({ domains });
    } catch (error) {
        console.error("Error fetching domains:", error);
        return NextResponse.json(
            
            { error: "Failed to fetch domains" },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { domainName, provider, pricingType, price, apiKey } = body;

    // Validate required fields
    if (!domainName || !provider) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const priceStr = pricingType === 'free' ? "0" : String(price ?? "0");

    try {
        const [createdDomain] = await db.insert(basedomain).values({
            domainName,
            platform: provider, // maps provider to platform
            price: priceStr,
            ownerId: session.user.id,
            apiKey,
        }).returning();

        return NextResponse.json({ message: "Domain submitted successfully", domain: createdDomain }, { status: 200 });
    } catch (error) {
        console.error(`[Domain submit error]:`, error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
