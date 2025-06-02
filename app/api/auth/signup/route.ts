import { NextResponse } from "next/server";

import {db} from "@/database/index"
import {eq} from "drizzle-orm"
import {users} from "@/database/schema/users"

import bcrypt from "bcrypt"


export async function POST(req:Request){
    try {
        const body = await req.json();
        const {name , email , password} = body;
        //validate input 
        if(!email || !password || !name){
            return NextResponse.json({error:"Missing field"}, {status : 400});
        }
        //////check if user already exist
        const [existinguser] = await db.select().from(users).where(eq(users.email,email)).limit(1);
        if(existinguser){
            return NextResponse.json({error:"user already exist"},{status: 409})
        }
        //hash password 
        const hashpassword = await bcrypt.hash(password,10)
        ///Insert user

        await db.insert(users).values({
            name,
            email,
            password:hashpassword
        })
        return NextResponse.json({message:"user created successfull"},{status:201})

    } catch (error) {
        console.error("signup error",error);
        return NextResponse.json({
            error:"Internal server Error"
        },{status:500})
        
    }
}