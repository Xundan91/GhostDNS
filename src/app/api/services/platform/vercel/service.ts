import { Vercel } from '@vercel/sdk';
import { db } from '@/database';
import { cnameupdate } from '@/database/schema/cnameupdated';
import { connectproject } from '@/database/schema/connectproject';
import { basedomain } from '@/database/schema/basedomain';
import { eq } from 'drizzle-orm';

export async function updateVercelDomain(purchaseId: string) {
  try {
    console.log("Vercel service: Fetching configuration for purchaseId:", purchaseId);
    
    // Fetch CNAME and project configuration
    const [configData] = await db
      .select({
        subdomain: cnameupdate.cname,
        base_domain_id: cnameupdate.basedomain,
        vercelapikey: connectproject.connectApiKey,
        projectname: connectproject.project_name,
      })
      .from(cnameupdate)
      .innerJoin(connectproject, eq(cnameupdate.purchasedomain, connectproject.purchasedomain))
      .where(eq(cnameupdate.purchasedomain, purchaseId));

    if (!configData) {
      console.error("No configuration found for this purchaseId");
      throw new Error("Configuration not found");
    }

    const [baseDomainData] = await db
      .select({
        domain: basedomain.domainName,
      })
      .from(basedomain)
      .where(eq(basedomain.id, configData.base_domain_id));

    if (!baseDomainData) {
      console.error("Base domain not found for ID:", configData.base_domain_id);
      throw new Error("Base domain not found");
    }

    const fulldomain = `${configData.subdomain}.${baseDomainData.domain}`;

    console.log("Vercel service: Making SDK call with:", {
      vercelApiKey: configData.vercelapikey ? "***" : "undefined",
      projectName: configData.projectname,
      fulldomain,
    });

    const vercel = new Vercel({
      bearerToken: configData.vercelapikey as string,
    });

    const vercelResponse = await vercel.projects.addProjectDomain({
      idOrName: configData.projectname as string,
      requestBody: {
        name: fulldomain,
      },
    });

    console.log("Vercel service: SDK response:", vercelResponse);

    return {
      success: true,
      message: `Domain updated successfully: ${fulldomain}`,
      data: vercelResponse,
    };
  } catch (error: any) {
    console.error('Vercel service: Error updating domain:', error?.response?.data || error.message);
    throw new Error(error?.message || "Failed to update Vercel domain");
  }
} 