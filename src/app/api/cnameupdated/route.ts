import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/database';
import { cnameupdate } from '@/database/schema/cnameupdated';
import { connectproject } from '@/database/schema/connectproject';
import { eq } from 'drizzle-orm';
import { updateHostingerDNS } from '../services/domain/hostinger/service';
import { updateVercelDomain } from '../services/platform/vercel/service';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { purchaseId, cname, deployedUrl } = body;

    if (!purchaseId || !cname || !deployedUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if CNAME is already added for this purchase
    const existingCname = await db
      .select()
      .from(cnameupdate)
      .where(eq(cnameupdate.purchasedomain, purchaseId))
      .limit(1);

    if (existingCname.length > 0) {
      return NextResponse.json({ error: 'CNAME already exists for this purchase' }, { status: 400 });
    }

    // Get the connected project for this purchase
    const connectedProject = await db
      .select()
      .from(connectproject)
      .where(eq(connectproject.purchasedomain, purchaseId))
      .limit(1);

    if (connectedProject.length === 0) {
      return NextResponse.json({ error: 'No connected project found for this purchase' }, { status: 400 });
    }

    // Insert new CNAME record
    const [newCname] = await db
      .insert(cnameupdate)
      .values({
        connectedproject: connectedProject[0].id,
        userid: session.user.id,
        basedomain: connectedProject[0].basedomain,
        purchasedomain: purchaseId,
        cname: cname,
        deployedurl: deployedUrl,
      })
      .returning();

    // Update the connected project to mark it as fully configured
    await db
      .update(connectproject)
      .set({ isconnected: true })
      .where(eq(connectproject.id, connectedProject[0].id));

    // Call external services to update DNS and platform configurations
    const serviceResults = {
      hostinger: { success: false, message: '' },
      vercel: { success: false, message: '' }
    };

    try {
      console.log('[Hostinger] Calling Hostinger service for purchaseId:', purchaseId);
      const hostingerResult = await updateHostingerDNS(purchaseId);
      serviceResults.hostinger.success = true;
      serviceResults.hostinger.message = hostingerResult.message;
      console.log('[Hostinger] Service response:', hostingerResult);
    } catch (error: any) {
      console.error('[Hostinger] Service error:', error.message);
      serviceResults.hostinger.message = error.message || 'Hostinger service failed';
    }

    try {
      console.log('[Vercel] Calling Vercel service for purchaseId:', purchaseId);
      const vercelResult = await updateVercelDomain(purchaseId);
      serviceResults.vercel.success = true;
      serviceResults.vercel.message = vercelResult.message;
      console.log('[Vercel] Service response:', vercelResult);
    } catch (error: any) {
      console.error('[Vercel] Service error:', error.message);
      serviceResults.vercel.message = error.message || 'Vercel service failed';
    }

    return NextResponse.json({ 
      success: true, 
      cname: newCname,
      serviceResults
    });

  } catch (error) {
    console.error('Error adding CNAME:', error);
    return NextResponse.json(
      { error: 'Failed to add CNAME' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { purchaseId, cname, deployedUrl, existingCnameId } = body;

    if (!purchaseId || !cname || !deployedUrl || !existingCnameId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update existing CNAME record
    const [updatedCname] = await db
      .update(cnameupdate)
      .set({
        cname: cname,
        deployedurl: deployedUrl,
        updatedAt: new Date(),
      })
      .where(eq(cnameupdate.id, existingCnameId))
      .returning();

    // Call external services to update DNS and platform configurations
    const serviceResults = {
      hostinger: { success: false, message: '' },
      vercel: { success: false, message: '' }
    };

    try {
      console.log('[PUT-Hostinger] Calling Hostinger service for purchaseId:', purchaseId);
      const hostingerResult = await updateHostingerDNS(purchaseId);
      serviceResults.hostinger.success = true;
      serviceResults.hostinger.message = hostingerResult.message;
      console.log('[PUT-Hostinger] Service response:', hostingerResult);
    } catch (error: any) {
      console.error('[PUT-Hostinger] Service error:', error.message);
      serviceResults.hostinger.message = error.message || 'Hostinger service failed';
    }

    try {
      console.log('[PUT-Vercel] Calling Vercel service for purchaseId:', purchaseId);
      const vercelResult = await updateVercelDomain(purchaseId);
      serviceResults.vercel.success = true;
      serviceResults.vercel.message = vercelResult.message;
      console.log('[PUT-Vercel] Service response:', vercelResult);
    } catch (error: any) {
      console.error('[PUT-Vercel] Service error:', error.message);
      serviceResults.vercel.message = error.message || 'Vercel service failed';
    }

    return NextResponse.json({ 
      success: true, 
      cname: updatedCname,
      serviceResults
    });

  } catch (error) {
    console.error('Error updating CNAME:', error);
    return NextResponse.json(
      { error: 'Failed to update CNAME' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const purchaseId = searchParams.get('purchaseId');

    if (!purchaseId) {
      return NextResponse.json({ error: 'Purchase ID is required' }, { status: 400 });
    }

    const cnameRecord = await db
      .select()
      .from(cnameupdate)
      .where(eq(cnameupdate.purchasedomain, purchaseId))
      .limit(1);

    return NextResponse.json({ 
      cname: cnameRecord[0] || null 
    });

  } catch (error) {
    console.error('Error fetching CNAME:', error);
    return NextResponse.json(
      { error: 'Failed to fetch CNAME' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const purchaseId = searchParams.get('purchaseId');

    if (!purchaseId) {
      return NextResponse.json({ error: 'Purchase ID is required' }, { status: 400 });
    }

    // Find the CNAME record to delete
    const cnameRecord = await db
      .select()
      .from(cnameupdate)
      .where(eq(cnameupdate.purchasedomain, purchaseId))
      .limit(1);

    if (cnameRecord.length === 0) {
      return NextResponse.json({ error: 'CNAME record not found' }, { status: 404 });
    }

    // Delete the CNAME record
    await db
      .delete(cnameupdate)
      .where(eq(cnameupdate.purchasedomain, purchaseId));

    // Also update the connected project to mark it as not fully configured
    await db
      .update(connectproject)
      .set({ isconnected: false })
      .where(eq(connectproject.purchasedomain, purchaseId));

    return NextResponse.json({ 
      success: true,
      message: 'CNAME configuration deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting CNAME:', error);
    return NextResponse.json(
      { error: 'Failed to delete CNAME' },
      { status: 500 }
    );
  }
} 