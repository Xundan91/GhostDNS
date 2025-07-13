import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/database';
import { purchase } from '@/database/schema/purchase';
import { basedomain } from '@/database/schema/basedomain';
import { eq } from 'drizzle-orm';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const purchaseId = params.id;

    // Fetch purchase with domain details
    const purchaseData = await db
      .select({
        id: purchase.id,
        price: purchase.price,
        status: purchase.status,
        timestamp: purchase.timestamp,
        domain: {
          id: basedomain.id,
          domainName: basedomain.domainName,
          platform: basedomain.platform,
        },
      })
      .from(purchase)
      .leftJoin(basedomain, eq(purchase.basedomainId, basedomain.id))
      .where(eq(purchase.id, purchaseId))
      .limit(1);

    if (purchaseData.length === 0) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    // Check if the purchase belongs to the current user
    const purchaseRecord = await db
      .select()
      .from(purchase)
      .where(eq(purchase.id, purchaseId))
      .limit(1);

    if (purchaseRecord.length === 0 || purchaseRecord[0].buyerID !== session.user.id) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      purchase: purchaseData[0] 
    });

  } catch (error) {
    console.error('Error fetching purchase:', error);
    return NextResponse.json(
      { error: 'Failed to fetch purchase' },
      { status: 500 }
    );
  }
} 