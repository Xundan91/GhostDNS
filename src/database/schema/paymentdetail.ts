import { pgTable, PgTable ,text,doublePrecision,timestamp} from "drizzle-orm/pg-core"
import {sql} from "drizzle-orm"
import {purchase} from "./purchase"
export const paymentdetail = pgTable("paymentdetail",{
    id : text("id").primaryKey().default(sql`gen_random_uuid()`),
    purchaseId : text("purchase_id").references(()=>purchase.id),
    paymentMethod : text("payment_method"),
    paymentRefId : text("payment_ref_id"),
    paymentStatus : text("payment_status"),
    paymentAmount : doublePrecision("payment_amount"),
    paymentDate : timestamp("payment_date", { withTimezone : true}).defaultNow(),
    paymentCurrency : text("payment_currency"),
}) 