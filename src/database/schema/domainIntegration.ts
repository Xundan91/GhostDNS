import { pgTable,text,timestamp } from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm"
import { basedomain } from "./basedomain";
export const domainIntegration = pgTable("domainIntegration",{
    id : text("id").primaryKey().default(sql`gen_random_uuid()`),

    basedomain : text("base_domain_id").notNull().references(()=>basedomain.id),

    platform:text("platform").notNull(),
    dnsstatus: text("dns_status").default("PENDING"),
    providerApiKey :text("provider_api_key"),

    createdAt : timestamp("createdAt", {withTimezone:true}).defaultNow()
 
}) 