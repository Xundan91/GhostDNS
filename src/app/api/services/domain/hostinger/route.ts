import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database";
import { cnameupdate } from "@/database/schema/cnameupdated";
import { connectproject } from "@/database/schema/connectproject";
import { basedomain } from "@/database/schema/basedomain";
import { eq, and } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    console.log(" Hostinger API invoked");

    // Auth check
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
    if (!userId) {
      console.error("Unauthorized request: session invalid");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Parse body once
    const body = await req.json();
    const purchaseId = body.purchaseId;
    console.log("Received body:", body);

    if (!purchaseId) {
      console.error("Missing purchaseId in request body");
      return NextResponse.json({ error: "Purchase ID is required" }, { status: 400 });
    }

    // Fetch CNAME and project configuration
    const [configData] = await db
      .select({
        subdomain: cnameupdate.cname,
        base_domain_id: cnameupdate.basedomain,
        deployed_url: connectproject.deployed_url,
      })
      .from(cnameupdate)
      .innerJoin(connectproject, eq(cnameupdate.purchasedomain, connectproject.purchasedomain))
      .where(eq(cnameupdate.purchasedomain, purchaseId));

    if (!configData) {
      console.error("No configuration found for this purchaseId");
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    // Fetch base domain
    const [domainData] = await db
      .select({
        apikey: basedomain.apiKey,
        domain: basedomain.domainName,
      })
      .from(basedomain)
      .where(eq(basedomain.id, configData.base_domain_id));

    if (!domainData) {
      console.error("Base domain not found for ID:", configData.base_domain_id);
      return NextResponse.json({ error: "Base domain not found" }, { status: 404 });
    }

    const { subdomain, deployed_url: rawTarget } = configData;

    // Clean target (remove protocol and trailing slash, add trailing dot)
    let target = (rawTarget ?? "")
      .trim()
      .replace(/^https?:\/\//, "") // remove http/https
      .replace(/\/$/, "");         // remove trailing slash

    if (!target.endsWith(".")) {
      target += ".";
    }

    const { domain, apikey } = domainData;

    if (!subdomain || !target || !domain || !apikey) {
      console.error("Missing parameters:", { subdomain, target, domain, apikey });
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 });
    }

    console.log(" Making PUT request to Hostinger with:", {
      domain,
      subdomain,
      target,
      apikey,
    });

    const response = await axios.put(
      `https://developers.hostinger.com/api/dns/v1/zones/${domain}`,
      {
        overwrite: true,
        zone: [
          {
            type: "CNAME",
            name: subdomain,
            ttl: 3600,
            records: [
              {
                content: target,
                is_disabled: false,
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${apikey}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(" Hostinger response:", response.data);

    return NextResponse.json({
      message: "CNAME record updated successfully",
      data: response.data,
    });
  } catch (error: any) {
    const errData = error.response?.data || error.message || error;
    console.error("Error updating CNAME:", errData);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: errData,
      },
      {
        status: 500,
      }
    );
  }
}