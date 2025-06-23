import { pgTable,text,doublePrecision,timestamp} from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"
import {basedomain} from "./basedomain"
import {users} from "./users"


export const purchase = pgTable("purchase",{
    id : text("id").primaryKey().default(sql`gen_random_uuid()`),
    buyerID : text("buyer_id").notNull().references(()=>users.id ),
    basedomainId : text("basedomain_id").references(()=>basedomain.id  ),
    price : doublePrecision("price").notNull(),
    status: text("status").default("pending "),
    timestamp : timestamp("timestamp", { withTimezone : true}).defaultNow(),
    updateAt :timestamp("update_at", { withTimezone : true}).defaultNow()
}) 