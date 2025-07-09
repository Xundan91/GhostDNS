import {pgTable,text,boolean,timestamp,doublePrecision } from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"
import { basedomain } from "./basedomain"
import { users } from "./users"

export const subdomainclaim = pgTable("subdomain_claims",{
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    subdomain : text("subdomain").notNull(),
    fulldomain : text("fulldomain").notNull().unique(),
    userId : text("user_id").notNull().references(()=>(users.id)),
    basedomainId : text("base_domain_id").notNull().references(()=>(basedomain.id)),
    vercelProjectId : text("vercel_project_id"),
    vercelProjectUrl : text("vercel_project_url"),
    secretId : text("secret_id").notNull(),
    isFree : boolean("is_free").default(true),
    price : doublePrecision("price"),

    dnsStatus : text("dns_status").default("pending"),
    createdAt : timestamp("created_at",{withTimezone:true}).defaultNow(),
    updatedAt: timestamp("updated_At",{withTimezone: true}).defaultNow()

    
})
