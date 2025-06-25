import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { apiKey } = await req.json();
    if (!apiKey) {
      return NextResponse.json({ error: 'Missing Vercel API key' }, { status: 400 });
    }

    
    const res = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        Authorization: `Bearer ${apiKey}`,
      },
    });
    if (!res.ok) {
      const error = await res.json();
      return NextResponse.json({ error: error.error?.message || 'Failed to fetch projects from Vercel' }, { status: res.status });
    }
    const data = await res.json();
    return NextResponse.json({ projects: data.projects || [] });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 