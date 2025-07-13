import axios from "axios";
import { db } from "@/database";
import { cnameupdate } from "@/database/schema/cnameupdated";
import { connectproject } from "@/database/schema/connectproject";
import { basedomain } from "@/database/schema/basedomain";
import { eq } from "drizzle-orm";

export async function updateHostingerDNS(purchaseId: string) {
  try {
    console.log("Hostinger service: Fetching configuration for purchaseId:", purchaseId);
    
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
      throw new Error("Configuration not found");
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
      throw new Error("Base domain not found");
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
      throw new Error("Missing required parameters");
    }

    console.log("Hostinger service: Making PUT request with:", {
      domain,
      subdomain,
      target,
      apikey: apikey ? "***" : "undefined",
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

    console.log("Hostinger service: API response:", response.data);

    return {
      success: true,
      message: "CNAME record updated successfully",
      data: response.data,
    };
  } catch (error: any) {
    const errData = error.response?.data || error.message || error;
    console.error("Hostinger service: Error updating CNAME:", errData);
    throw new Error(errData.message || "Failed to update Hostinger DNS");
  }
} 