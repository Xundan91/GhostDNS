import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/database';
import { configuredomain } from '@/database/schema/configuredomain';
import { basedomain } from '@/database/schema/basedomain';
import { purchase } from '@/database/schema/purchase';
import { eq, and } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { domainId, service, apiKey, selectedProject, cname, domainName } = await request.json();

    if (!domainId || !service || !apiKey || !selectedProject || !cname || !domainName) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Get basedomain (validate ownership)
    const baseDomain = await db.select().from(basedomain)
      .where(and(eq(basedomain.id, domainId), eq(basedomain.ownerId, session.user.id)))
      .limit(1);
    if (!baseDomain.length) {
      return NextResponse.json({ error: 'Base domain not found or not owned by user' }, { status: 404 });
    }
    const baseDomainId = baseDomain[0].id;

    // 2. Get purchase record
    const purchaseDomain = await db.select().from(purchase)
      .where(and(eq(purchase.basedomainId, domainId), eq(purchase.buyerID, session.user.id)))
      .limit(1);
    if (!purchaseDomain.length) {
      return NextResponse.json({ error: 'Purchase record not found' }, { status: 404 });
    }
    const purchaseDomainId = purchaseDomain[0].id;

    // 3. Save configuration to database
    const configuration = await db.insert(configuredomain).values({
      userID_config: session.user.id,
      base_domain_id: baseDomainId,
      purchase_domain: purchaseDomainId,
      domain_id: domainId,
      platform: service,
      vercelapikey: apiKey,
      project_id: selectedProject.id,
      project_name: selectedProject.name,
      deployed_url: selectedProject.url,
      cname: cname,
      // created_at will be set by default
    }).returning();

    return NextResponse.json({
      success: true,
      configuration,
    });

  } catch (error) {
    console.error('Error saving configuration:', error);
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Fetch all configured domains with domain names for the current user
    const configuredDomains = await db
      .select({
        id: configuredomain.id,
        domain_id: configuredomain.domain_id,
        platform: configuredomain.platform,
        project_name: configuredomain.project_name,
        deployed_url: configuredomain.deployed_url,
        cname: configuredomain.cname,
        created_at: configuredomain.created_at,
        vercelapikey: configuredomain.vercelapikey,
        project_id: configuredomain.project_id,
        domain_name: basedomain.domainName,
      })
      .from(configuredomain)
      .innerJoin(basedomain, eq(configuredomain.base_domain_id, basedomain.id))
      .where(eq(configuredomain.userID_config, session.user.id))
      .orderBy(configuredomain.created_at);

    return NextResponse.json({
      success: true,
      domains: configuredDomains,
    });

  } catch (error) {
    console.error('Error fetching configured domains:', error);
    return NextResponse.json(
      { error: 'Failed to fetch configured domains' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { domainId, cname } = await request.json();

    if (!domainId || !cname) {
      return NextResponse.json({ error: 'Domain ID and CNAME are required' }, { status: 400 });
    }

    // Update the CNAME for the specific configured domain
    const updatedDomain = await db.update(configuredomain)
      .set({ cname: cname.trim() })
      .where(and(
        eq(configuredomain.id, domainId),
        eq(configuredomain.userID_config, session.user.id)
      ))
      .returning();

    if (!updatedDomain.length) {
      return NextResponse.json({ error: 'Configured domain not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      domain: updatedDomain[0],
    });

  } catch (error) {
    console.error('Error updating CNAME:', error);
    return NextResponse.json(
      { error: 'Failed to update CNAME' },
      { status: 500 }
    );
  }
}
