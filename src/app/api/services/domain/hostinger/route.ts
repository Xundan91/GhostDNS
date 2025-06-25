import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req:NextRequest) {
  try {
    const {subdomain , target , domain , apikey} = await req.json();
    if(!subdomain || !target || !domain || !apikey){
      return NextResponse.json({message:"Missing required paramerters"}, {status:400})
    }
    const response = await axios.put(`https://developers.hostinger.com/api/dns/v1/zones/${domain}`,
      {
        overwrite : true,
        zone : [
          {
            type : 'CNAME',
            name : subdomain,
            ttl :3600,
            records : [
             { content : target.endsWith('.')? target : target+ '.',
              is_disabled : false,
             }
            ]
          }
        ]
      }  ,
      {
        headers: {
          Authorization : `bearer ${apikey}`,
          'content-Type': 'application/json',

        }
      }
    
    );
    return NextResponse.json({
      message : 'cname record added successfully',
      data : response.data
    })
  } catch (error:any) {
    console.error('error adding Cname record ', error.response?.data || error.message)
    return NextResponse.json({
      "messsage" : "Internal server error",
      error : error.response?.data || error.message,


    },{
      status : 500
    }
  )
    
  }
  
}