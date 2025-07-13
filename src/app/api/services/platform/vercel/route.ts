import { NextRequest, NextResponse } from 'next/server';
import { Vercel } from '@vercel/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { db } from '@/database';
import { cnameupdate } from '@/database/schema/cnameupdated';
import { connectproject } from '@/database/schema/connectproject';
import { basedomain } from '@/database/schema/basedomain';
import { eq, and } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
  
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { purchaseId } = await req.json();

    if (!purchaseId) {
      return NextResponse.json({ error: 'Purchase ID is required' }, { status: 400 });
    }

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
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    const [baseDomainData] = await db
      .select({
        domain: basedomain.domainName,
      })
      .from(basedomain)
      .where(eq(basedomain.id, configData.base_domain_id));

    if (!baseDomainData) {
      return NextResponse.json({ error: 'Base domain not found' }, { status: 404 });
    }

    const fulldomain = `${configData.subdomain}.${baseDomainData.domain}`;

    const vercel = new Vercel({
      bearerToken: configData.vercelapikey as string,
    });

    const vercelResponse = await vercel.projects.addProjectDomain({
      idOrName: configData.projectname as string,
      requestBody: {
        name: fulldomain,
      },
    });

    return NextResponse.json({
      message: `Domain updated successfully: ${fulldomain}`,
      data: vercelResponse,
    });
  } catch (error: any) {
    console.error('Error updating domain in Vercel:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message || error },
      { status: 500 }
    );
  }
}