import NextAuth from "Next-Auth"
import CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
// import VercelProvider from "next-auth/providers/vercel"
import NetlifyProvider from "next-auth/providers/netlify"


const handler =  NextAuth({
providers:[
    CredentialsProvider({
        name : "Credentials",
        credentials :{
            email:{label : "Email", type : "email"},
            password : {label : "password ",type : "password"},
        }, 
        async authorize(credentials){
            if(!credentials?.email || !credentials?.password) return null;

            try {
                return {
                  

                }
                
            } catch (error) {
                
            }

        }
    })
]
})