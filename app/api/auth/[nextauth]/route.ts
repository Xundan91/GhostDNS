import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

//database imports
import {users} from "@/database/schema/users"
import {eq} from "drizzle-orm";
import {db} from "@/database/index"
////
const handler = NextAuth({providers :[

    CredentialsProvider({
        name : "credentials",
        credentials:{
            email :{label : "Email" , type:"email"},
            password :{label:"Password",type : "password"},
        },
        async authorize(credentials){
            if(!credentials?.email|| !credentials?.password)return null;
            try {
                const [user] = await db.select().from(users).where(eq(users.email,credentials.email)).limit(1);
                if(!user) return null;
                const isValidPassword = await bcrypt.compare(credentials.password, user.password);
                if(!isValidPassword) return null;
                 
                return{
                    id :user.id,
                    name : user.name,
                    email: user.email,
                    role : user.role,

                }
            } catch (error) {
                console.error("Authorization error",error)
                return null;
                
            }

        }
    })
],
callbacks:{
    async jwt ({token, user}){
        if(user){
            token.id = user.id;
            token.role = user.role;
        }
        return token;
    },
    async session({session, token}){
        if(token && session.user){
            session.user.id = token.id;
            session.user.role = token.role;
        }
        return session;
    }

},
pages:{
    
},
session:{
    strategy:"jwt"
},
secret:process.env.NEXTAUTH_SECRET,

})