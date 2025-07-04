import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/database/index';
import { configuredomain } from '@/database/schema/configuredomain';
import { authOptions } from '@/lib/auth';
import { log } from 'console';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    console.log(session?.user?.id);
    
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const purchasedomain = searchParams.get('purchasedomain');
  const domainId = searchParams.get('domainId');
  if (!purchasedomain && !domainId) {
    return NextResponse.json({ error: 'Missing query param: purchasedomain or domainId' }, { status: 400 });
  }
  try {
    const where: any = { userID_config: session.user.id };
    if (purchasedomain) where.purchase_domain = purchasedomain;
    if (domainId) where.domain_id = domainId;
    const config = await db.select().from(configuredomain).where(where).limit(1);
    if (config.length === 0) {
      return NextResponse.json({ configuredomain: null }, { status: 200 });
    }
    return NextResponse.json({ configuredomain: config[0] });
  } catch (error: any) {
    return NextResponse.json({ error: 'Failed to fetch configuration', details: error?.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.id) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }
  try {
    const body = await req.json();
    console.log('Received request body:', body);
    
    const {
      basedomain,
      purchasedomain,
      domainId,
      platform,
      vercelapikey,
      projectId,
      projectName,
      deployedUrl,
      cname,
    } = body;

    const [created] = await db.insert(configuredomain).values({
      userID_config: session.user.id,
      base_domain_id: basedomain,
      purchase_domain: purchasedomain,
      domain_id: domainId, 
      platform,
      vercelapikey,
      project_id: projectId,
      isconfigured: true,
      project_name: projectName,
      deployed_url: deployedUrl,
      cname
    }).returning();

    return NextResponse.json({ configuredomain: created });
  } catch (error: any) {
    console.error('Configuration error:', error);
    return NextResponse.json({ error: 'Failed to save configuration', details: error?.message }, { status: 500 });
  }
} 