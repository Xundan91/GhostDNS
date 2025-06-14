import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/database/index"
import { basedomain } from "@/database/schema/basedomain";
import { authOptions } from "@/lib/auth";
import { eq } from "drizzle-orm";

const recentSubmissions = new Map<string, number>();
const SUBMISSION_TIMEOUT = 2000; // 2 seconds

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
        console.error("Error fetching domains:", error);
        return NextResponse.json(
            { error: "Failed to fetch domains" },
            { status: 500 }
        );
    }
}

export async function POST(req:Request){
    console.log("Headers:", req.headers);
    const session = await getServerSession(authOptions)
    console.log("Full session object:", JSON.stringify(session, null, 2));
    console.log("Session user:", session?.user);
    console.log("Session user ID:", session?.user?.id);
    
    if(!session || !session.user?.id){
        console.log("Unauthorized: No session or user ID found");
        return NextResponse.json({error:"unauthorized"},{status:401})
    }
    const body = await req.json();
    console.log("Request body:", body);
    const price = body.pricingType === 'free' ? "0" : String(body.price ?? "0");
    try {
        const submitdomain = await db.insert(basedomain).values({
            domainName : body.domainName,
            platform : body.provider,
            price ,
            ownerId : session.user?.id,
            apiKey : body.apiKey,
        })
        console.log("Domain submitted successfully:", submitdomain)
        return NextResponse.json({ message: "Domain submitted successfully" }, { status: 200 });
        
    } catch (error) {
        console.error(`[Domain submit error]:`, error)
        return NextResponse.json({error:"Internal server error"},{status : 500})
    }
}
