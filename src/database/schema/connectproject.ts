import { pgTable , text , uuid, varchar,timestamp, boolean } from "drizzle-orm/pg-core";
import {sql} from "drizzle-orm"
import {users} from "./users"
import { basedomain } from "./basedomain";
import { purchase } from "./purchase";
export const connectproject = pgTable("connectproject", {
    id : uuid("id").primaryKey().defaultRandom(),
    isconnected : boolean("isconnected").default(false),
    userId : text("userId").references(()=>users.id),
    basedomain : text("basedomain").notNull().references(()=>basedomain.id),
    purchasedomain : text("purchasedomain").notNull().references(()=>purchase.id),
    platform :varchar("platform", {length : 32}).notNull(),
    connectApiKey : varchar("connectApiKey",{length:256}),
    project_id : varchar("project_id", {length : 256}),
    project_name : varchar("project_name", {length : 256}),
    deployed_url : varchar("deployed_url", {length : 512}),
    created_at : timestamp("createdAt").defaultNow().notNull(),
    updated_at : timestamp("updatedAt").defaultNow().notNull()

}) 
