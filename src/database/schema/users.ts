import { pgTable ,serial , text , timestamp } from "drizzle-orm/pg-core";
import {relations, sql} from "drizzle-orm"

export const users = pgTable("users",{
    id : text("id").primaryKey().default(sql `gen_random_uuid()`),
    name :text("name").notNull(),
    email :text("email").notNull().unique(),
    password : text("password").notNull(),
    role : text("role").default("USER"),
    createdAt : timestamp("CreatedAt",{withTimezone : true}).defaultNow(),
    updatedAt : timestamp("UpdatedAt",{withTimezone:true}).defaultNow()
})
