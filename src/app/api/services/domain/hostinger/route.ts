import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/database";
import { configuredomain} from "@/database/schema/configuredomain"
import {eq, and } from "drizzle-orm"
import { basedomain } from "@/database/schema/basedomain";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id){
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const { domainId } = await req.json();

    if (!domainId) {
      return NextResponse.json({ error: "Domain ID is required" }, { status: 400 });
    }

    // Get the specific configured domain
    const [configData] = await db
      .select({
        subdomain: configuredomain.cname,
        target: configuredomain.deployed_url,
        base_domain_id: configuredomain.base_domain_id,
      })
      .from(configuredomain)
      .where(and(
        eq(configuredomain.id, domainId),
        eq(configuredomain.userID_config, session.user.id)
      ));

    if (!configData) {
      return NextResponse.json({ error: "Configuration not found" }, { status: 404 });
    }

    // Get the base domain data
    const [domainData] = await db
      .select({
        apikey: basedomain.apiKey,
        domain: basedomain.domainName,
      })
      .from(basedomain)
      .where(eq(basedomain.id, configData.base_domain_id));

    if (!domainData) {
      return NextResponse.json({ error: "Base domain not found" }, { status: 404 });
    }

    const { subdomain, target } = configData;
    const { domain, apikey } = domainData;

    if (!subdomain || !target || !domain || !apikey) {
      return NextResponse.json({ message: "Missing required parameters" }, { status: 400 });
    }

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
                content: target.endsWith(".") ? target : target + ".",
                is_disabled: false,
              },
            ],
          },
        ],
      },
      {
        headers: {
          Authorization: `bearer ${apikey}`,
          "content-Type": "application/json",
        },
      }
    );

    return NextResponse.json({
      message: "CNAME record updated successfully",
      data: response.data,
    });
  } catch (error: any) {
    console.error("Error updating CNAME record", error.response?.data || error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.response?.data || error.message,
      },
      {
        status: 500,
      }
    );
  }
}
