import { NextRequest, NextResponse } from 'next/server';
import { Vercel } from '@vercel/sdk';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

import { db } from '@/database';
import { configuredomain } from '@/database/schema/configuredomain';
import { basedomain } from '@/database/schema/basedomain';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;
  
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const [config] = await db
      .select({
        vercelapikey: configuredomain.vercelapikey,
        subdomain: configuredomain.cname,
        projectname: configuredomain.project_name,
        base_domain_id: configuredomain.base_domain_id,
      })
      .from(configuredomain)
      .where(eq(configuredomain.userID_config, userId));

    if (!config) {
      return NextResponse.json({ error: 'Configuration not found' }, { status: 404 });
    }

    const [baseDomainData] = await db
      .select({
        domain: basedomain.domainName,
      })
      .from(basedomain)
      .where(eq(basedomain.id, config.base_domain_id));

    if (!baseDomainData) {
      return NextResponse.json({ error: 'Base domain not found' }, { status: 404 });
    }

    const fulldomain = `${config.subdomain}.${baseDomainData.domain}`;

    const vercel = new Vercel({
      bearerToken: config.vercelapikey as string,
    });

    const vercelResponse = await vercel.projects.addProjectDomain({
      idOrName: config.projectname as string,
      requestBody: {
        name: fulldomain,
      },
    });

    return NextResponse.json({
      message: `Domain registered successfully: ${fulldomain}`,
      data: vercelResponse,
    });
  } catch (error: any) {
    console.error('Error adding domain to Vercel:', error?.response?.data || error.message);
    return NextResponse.json(
      { error: 'Internal server error', details: error?.message || error },
      { status: 500 }
    );
  }
}
