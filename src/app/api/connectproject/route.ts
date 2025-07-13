import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { db } from '@/database';
import { connectproject } from '@/database/schema/connectproject';
import { purchase } from '@/database/schema/purchase';
import { eq } from 'drizzle-orm';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { purchaseId, platform, apiKey, projectId, projectName, deployedUrl } = body;

    if (!purchaseId || !platform || !apiKey || !projectId || !projectName || !deployedUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Check if project is already connected for this purchase
    const existingProject = await db
      .select()
      .from(connectproject)
      .where(eq(connectproject.purchasedomain, purchaseId))
      .limit(1);

    if (existingProject.length > 0) {
      return NextResponse.json({ error: 'Project already connected for this purchase' }, { status: 400 });
    }

    // Get purchase data to get the basedomain
    const purchaseData = await db
      .select()
      .from(purchase)
      .where(eq(purchase.id, purchaseId))
      .limit(1);

    if (purchaseData.length === 0) {
      return NextResponse.json({ error: 'Purchase not found' }, { status: 404 });
    }

    // Insert new connected project
    const [newProject] = await db
      .insert(connectproject)
      .values({
        userId: session.user.id,
        basedomain: purchaseData[0].basedomainId || '',
        purchasedomain: purchaseId,
        platform: platform,
        connectApiKey: apiKey,
        project_id: projectId,
        project_name: projectName,
        deployed_url: deployedUrl,
        isconnected: true,
      })
      .returning();

    return NextResponse.json({ 
      success: true, 
      project: newProject 
    });

  } catch (error) {
    console.error('Error connecting project:', error);
    return NextResponse.json(
      { error: 'Failed to connect project' },
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
    const { purchaseId, platform, apiKey, projectId, projectName, deployedUrl, existingProjectId } = body;

    if (!purchaseId || !platform || !apiKey || !projectId || !projectName || !deployedUrl || !existingProjectId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update existing connected project
    const [updatedProject] = await db
      .update(connectproject)
      .set({
        platform: platform,
        connectApiKey: apiKey,
        project_id: projectId,
        project_name: projectName,
        deployed_url: deployedUrl,
        updated_at: new Date(),
      })
      .where(eq(connectproject.id, existingProjectId))
      .returning();

    return NextResponse.json({ 
      success: true, 
      project: updatedProject 
    });

  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json(
      { error: 'Failed to update project' },
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

    const project = await db
      .select()
      .from(connectproject)
      .where(eq(connectproject.purchasedomain, purchaseId))
      .limit(1);

    return NextResponse.json({ 
      project: project[0] || null 
    });

  } catch (error) {
    console.error('Error fetching connected project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch connected project' },
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

    // Find the project to delete
    const project = await db
      .select()
      .from(connectproject)
      .where(eq(connectproject.purchasedomain, purchaseId))
      .limit(1);

    if (project.length === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete the project
    await db
      .delete(connectproject)
      .where(eq(connectproject.purchasedomain, purchaseId));

    return NextResponse.json({ 
      success: true,
      message: 'Project configuration deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting connected project:', error);
    return NextResponse.json(
      { error: 'Failed to delete connected project' },
      { status: 500 }
    );
  }
} 