import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/database/index';
import { configuredomain } from '@/database/schema/configuredomain';
import { authOptions } from '@/lib/auth';

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
      apiKey,
      projectId,
      projectName,
      deployedUrl,
      cname
    } = body;

    // Check each required field individually
    const missingFields: string[] = [];
    if (!basedomain) missingFields.push('basedomain');
    if (!purchasedomain) missingFields.push('purchasedomain');
    if (!domainId) missingFields.push('domainId');
    if (!platform) missingFields.push('platform');
    if (!projectId) missingFields.push('projectId');
    if (!projectName) missingFields.push('projectName');
    if (!cname) missingFields.push('cname');

    if (missingFields.length > 0) {
      console.log('Missing fields:', missingFields);
      return NextResponse.json({ 
        error: 'Missing required fields', 
        missingFields,
        receivedFields: Object.keys(body)
      }, { status: 400 });
    }

    const [created] = await db.insert(configuredomain).values({
      userID_config: session.user.id,
      base_domain_id: basedomain,
      purchase_domain: purchasedomain,
      domain_id: domainId,
      platform,
      api_key: apiKey,
      project_id: projectId,
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