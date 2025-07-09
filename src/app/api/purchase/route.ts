import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index";
import { purchase } from "@/database/schema/purchase";
import { basedomain } from "@/database/schema/basedomain";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    try {
        const purchases = await db.select({
            purchaseId: purchase.id,
            status: purchase.status,
            price: purchase.price,
            timestamp: purchase.timestamp,
            domain: {
                id: basedomain.id,
                domainName: basedomain.domainName,
                platform: basedomain.platform,
                ownerId: basedomain.ownerId,
            }
        })
        .from(purchase)
        .leftJoin(basedomain, eq(purchase.basedomainId, basedomain.id))
        .where(eq(purchase.buyerID, session.user.id));

        return NextResponse.json({ purchases });
    } catch (error) {
        console.error("[Get Purchases Error]:", error);
        return NextResponse.json({ error: "Failed to fetch purchases" }, { status: 500 });
    }
}

// POST: Purchase a domain baby
export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
        return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const body = await req.json();
    const { basedomainId } = body;
    if (!basedomainId) {
        return NextResponse.json({ error: "Missing basedomainId" }, { status: 400 });
    }
    try {
        //Get domain info baby
        const [domain] = await db.select().from(basedomain).where(eq(basedomain.id, basedomainId));
        if (!domain) {
            return NextResponse.json({ error: "Domain not found" }, { status: 404 });
        }
        //user cannot buy own domain baby
        // const [checkdomainowned] = await db.select().from(basedomain).where(eq(basedomain.ownerId , session.user.id))
        //  if(checkdomainowned){
        //     return NextResponse.json({error: "user cannot buy own domain"}, {status :401})
        //  }
         //////////////////////////////////////////////////////////

        const isFree = String(domain.price) === "0";
        const purchasePrice = isFree ? 0 : Math.floor(Math.random() * 100) + 1;

        ///////////////////////////////////////////////////////////

        const [newPurchase] = await db.insert(purchase).values({
            buyerID: session.user.id,
            basedomainId,
            price: purchasePrice,
            status: "paid",
        }).returning();

        //If paid, insert paymentdetail with random data
        ///this is dummy data i will add  this data later bro hope you understand code 
        //if you are reading this then love you bro cry emoji gulabi dil emoji 
        let paymentDetail = null;
        if (!isFree) {
            //Generate random payment details
            const paymentMethods = ["credit_card", "upi", "net_banking", "wallet"];
            const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
            const paymentRefId = Math.random().toString(36).substring(2, 12);
            const paymentStatus = "success";
            const paymentAmount = purchasePrice;
            const paymentCurrency = "INR";

            [paymentDetail] = await db.insert(require("@/database/schema/paymentdetail").paymentdetail).values({
                purchaseId: newPurchase.id,
                paymentMethod,
                paymentRefId,
                paymentStatus,
                paymentAmount,
                paymentCurrency,
            }).returning();
        }

        return NextResponse.json({ message: "Domain purchased successfully", purchase: newPurchase, paymentDetail }, { status: 200 });
    } catch (error) {
        console.error("[Purchase Error]:", error);
        return NextResponse.json({ error: "Failed to purchase domain" }, { status: 500 });
    }
} 