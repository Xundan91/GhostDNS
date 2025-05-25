import {db } from "@/database/index"
import {users} from "@/database/schema/users";

import { NextResponse } from "next/server";

export async function GET(){
    const allUser = await db.select().from(users);
    return NextResponse.json(allUser);
}

export async function POST(req:Request){
    const body = await req.json();
    // await db.insert(users).values({name : body.name});
    return NextResponse.json({success : true})
}

