import {pgTable, text, boolean , timestamp} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm"
import {users} from "./users"

export const basedomain = pgTable("basedomain",{
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    ownerId : text("owner_id").notNull().references(()=>users.id,{
        onDelete:"cascade"
    }),
    domainName : text("domain_name").notNull().unique(),
    platform: text("platform").notNull(),
    price: text("price").notNull().default("0"), 
    apiKey: text("api_key"),     ///hash in nexxt version   
    
    createdAt : timestamp("created_at", {withTimezone:true}).defaultNow(),
    updatedAt : timestamp("updated_At", {withTimezone:true}).defaultNow()
    
})



