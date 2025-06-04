import {pgTable, text, boolean , timestamp} from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm"
import {users} from "./users"
export const basedomain = pgTable("basedomain",{
    id: text("id").primaryKey().default(sql`gen_random_uuid()`),
    domainName : text("domain_name").notNull().unique(),
    platform: text("platform").notNull(),
    isPublic : boolean("is_public").default(true),
    idFree : boolean("is_free").default(true),

    ownerId : text("owner_id").references(()=>users.id),

    createdAt : timestamp("created_at", {withTimezone:true}).defaultNow(),
    updatedAt : timestamp("updated_At", {withTimezone:true}).defaultNow()
    
})