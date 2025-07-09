import { pgTable,uuid,text,varchar, timestamp } from "drizzle-orm/pg-core";
import {users} from "./users"
import { basedomain } from "./basedomain";
import { purchase } from "./purchase";
import { connectproject } from "./connectproject";
export const cnameupdate = pgTable("cnameupdate",{
    id : uuid("id").primaryKey().defaultRandom(),
    connectedproject : uuid("connectedproject").notNull().references(() => connectproject.id),
    userid : text("userid").notNull().references(()=>users.id),
    basedomain: text("basedomain").notNull().references(()=>basedomain.id),
    purchasedomain : text("purchasedomain").notNull().references(()=>purchase.id),
    cname : varchar("cname",{length: 32}).notNull(),
    deployedurl: varchar("deployedurl", {length:256}).notNull(),
    createdAt : timestamp("createdAt").defaultNow().notNull(),
    updatedAt : timestamp("UpdatedAt").defaultNow().notNull()
})