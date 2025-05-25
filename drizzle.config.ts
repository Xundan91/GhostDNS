import type {Config} from "drizzle-kit"

export default{
    schema : "./database/schema",
    out : "./database/drizzle",
    dialect : "postgresql",
    dbCredentials : {
        url : process.env.DATABASE_URL!,
    },


} satisfies Config;