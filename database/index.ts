import {drizzle} from "drizzle-orm/node-postgres"
import {Pool} from 'pg'
import {users} from "@/database/schema/users"
import {basedomain} from "@/database/schema/basedomain"
import {subdomainclaim} from "@/database/schema/subdomainclaim"
import {purchase} from "@/database/schema/purchase"
import {domainIntegration } from "@/database/schema/domainIntegration"
import { platformEnum, dnsStatusEnum, purchaseStatusEnum, userRoleEnum } from "./schema/optionalEnums"


const pool = new Pool({
    connectionString : process.env.DATABASE_URL!,
})
const schema = {users,    basedomain,    subdomainclaim,    purchase , domainIntegration}
export const db = drizzle(pool , {schema,logger:true})