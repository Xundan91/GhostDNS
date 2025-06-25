import { NextResponse, NextRequest } from 'next/server';
import { Vercel } from '@vercel/sdk';
//token
//domain
//subdomain
//projectname

const vercel = new Vercel(
  {
    bearerToken : "9ZVxALTbQiCNGJNPKES77eXS",
  }
)
export async function POST(req: Request) {
  try {
    const {subdomain} =  await req.json();
    if(!subdomain){
      return NextResponse.json({message : "missing subdomain"},
      {
        status : 400
      }
    )
    }
    const fulldomain = `${subdomain}.xundan.in`
    try {
      const vercelResponse = await vercel.projects.addProjectDomain(
        {
          idOrName : "micro-tech",
          requestBody: {
            name: fulldomain,
          },
        }
      )
      return NextResponse.json({
        message : `Domain is register succesfully  ${fulldomain} `,
        data : vercelResponse
      });
      
    } catch (error: any) {
      console.error("error adding domain to vercel", error.NextResponse?.data || error.message)
      return NextResponse.json({
        message : " There is error in setting the domain "
      })
    } 
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 