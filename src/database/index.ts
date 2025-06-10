import {drizzle} from "drizzle-orm/node-postgres"
import {Pool} from 'pg'
import {users} from "@/database/schema/users"
import {basedomain} from "@/database/schema/basedomain"
import {subdomainclaim} from "@/database/schema/subdomainclaim"
import {purchase} from "@/database/schema/purchase"
import {domainIntegration } from "@/database/schema/domainIntegration"
import { platformEnum, dnsStatusEnum, purchaseStatusEnum, userRoleEnum } from "./schema/optionalEnums"

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const pool = new Pool({
    connectionString : process.env.DATABASE_URL!,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
    } : undefined
})

// Test the connection
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error acquiring client', err.stack);
        return;
    }
    console.log('Database connection successful');
    release();
});

const schema = {users,    basedomain,    subdomainclaim,    purchase , domainIntegration}
export const db = drizzle(pool , {schema,logger:true})