import { NextRequest, NextResponse } from 'next/server';
import { json } from 'stream/consumers';

export async function POST(request: NextRequest) {
  try {
    const { apiKey, service } = await request.json();

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 400 });
    }
    if (service === 'vercel') {
      const response = await fetch('https://api.vercel.com/v9/projects', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Vercel API error:', errorText);
        throw new Error('Failed to fetch projects from Vercel');
      }

      const data = await response.json();
      const projects = data.projects?.map((project: any) => ({
        id: project.id,
        name: project.name,
        url: project.latestDeployment?.url || `https://${project.name}.vercel.app`,
        framework: project.framework,
        updatedAt: project.updatedAt
      })) || [];

      return NextResponse.json({ projects });
    } else if (service === 'netlify') {
      const response = await fetch('https://api.netlify.com/api/v1/sites', {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Netlify API error:', errorText);
        throw new Error('Failed to fetch sites from Netlify');
      }

      const data = await response.json();
       const projects = data.map((site: any) => ({
        id: site.id,
        name: site.name,
        url: site.url,
        framework: site.framework,
        updatedAt: site.updated_at
      }));

      return NextResponse.json({ projects });
    } else {
      return NextResponse.json({ error: 'Unsupported service' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
} 
export async function DELETE(request: NextRequest){
  try {
    const {apikey , services} = await request.json();
    if(!apikey || services){
      NextResponse.json({"error": "please enter the valid api key  or services"}, {status:500})
    }
    if(services==="vercel"){
      const response = await fetch("https://api.vercel.com/v9/projects",{
        headers :{
          'Authorization': `Bearer ${apikey}`,
          'content-Type' : 'Application/json',
        }

      });
      if(!response.ok){
        const errorText = await response.text();
        console.error('Vercel API error:', errorText);
        throw new Error('Failed to fetch projects from Vercel');
      }

    }

    
  } catch (error) {
    
  }

}