import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database";
import { configuredomain } from "@/database/schema/configuredomain";
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
    const domainId = body.domainId;
    console.log("Received body:", body);

    if (!domainId) {
      console.error("Missing domainId in request body");
      return NextResponse.json({ error: "Domain ID is required" }, { status: 400 });
    }

    // Fetch configured domain
    const [configData] = await db
      .select({
        subdomain: configuredomain.cname,
        target: configuredomain.deployed_url,
        base_domain_id: configuredomain.base_domain_id,
      })
      //or operator in place of and operator 
      .from(configuredomain)
      // .where(
      //   and(\
      //     eq(configuredomain.domain_id, domainId),
      //     eq(configuredomain.userID_config, userId)
      //   )
      // );

    if (!configData) {
      console.error("No configuredomain found for this domainId and user");
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

    const { subdomain, target: rawTarget } = configData;

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
