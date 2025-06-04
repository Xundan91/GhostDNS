import { pgTable, PgTable ,text,doublePrecision,timestamp} from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"
import { subdomainclaim } from "./subdomainclaim"
import {users} from "./users"
export const purchase  = pgTable("purchase",{
    id : text("id").primaryKey().default(sql`gen_random_uuid()`),

    subdomainclaimID : text("subdomain_claim_id").notNull().unique().references(()=>subdomainclaim.id),
    buyerID : text("buyer_id").notNull().references(()=>users.id),
    price : doublePrecision("price").notNull(),
    status:text("status").default("COMPLETED"),

    paymentMethod: text("payment_method"),
    paymentRefId : text("payment_ref_id"),

    timestamp : timestamp("timestamp", { withTimezone : true}).defaultNow()
}) 