import { NextResponse } from "next/server";
import {db} from '@/database/index'
import {eq} from "drizzle-orm"
import {users} from "@/database/schema/users"

import bcrypt from "bcrypt"


export async function POST(req:Request){
    try {
        const body = await req.json();
        const {name , email , password} = body;
        if(!name || !email || !password){
            return NextResponse.json({error:"Missing field",status :400});
        }
        const [existinguser] = await db.select().from(users).where(eq(users.email , email)).limit(1);
        if(existinguser){
            return NextResponse.json({msg: "user already exist"}, {status : 409});
        }
        const hashpassword = await bcrypt.hash(password,10);

        const newUser = await db.insert(users).values({
            name , 
            email,
            password:hashpassword
        })
        return NextResponse.json({message:"user created successfully"}, {status : 201})

    } catch (error) {
        return NextResponse.json({error:" Internal server error"},{status:500})
        
    }

}