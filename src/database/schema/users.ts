import { pgTable ,serial , text , timestamp } from "drizzle-orm/pg-core";
import { sql} from "drizzle-orm"

export const users = pgTable("users",{
    id : text("id").primaryKey().default(sql `gen_random_uuid()`),
    name :text("name").notNull(),
    email :text("email").notNull().unique(),
    password : text("password").notNull(),
    role : text("role").default("USER"),
    createdAt : timestamp("CreatedAt",{withTimezone : true}).defaultNow(),
    updatedAt : timestamp("UpdatedAt",{withTimezone:true}).defaultNow()
})


    //DO $$ DECLARE
    // r RECORD;
    // BEGIN
    //     FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
    //         EXECUTE 'DROP TABLE IF EXISTS public.' || quote_ident(r.tablename) || ' CASCADE';
    //     END LOOP;
    // END $$;
    

