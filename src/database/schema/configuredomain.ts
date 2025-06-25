import { pgTable, uuid, varchar, timestamp, text } from 'drizzle-orm/pg-core';
import { basedomain } from './basedomain';
import { purchase } from './purchase';
import { users } from "./users"

export const configuredomain = pgTable('configuredomain', {
  id: uuid('id').primaryKey().defaultRandom(),
  userID_config: text('userID_config').notNull().references(() => users.id),
  base_domain_id: text('base_domain_id').notNull().references(() => basedomain.id),
  purchase_domain: text('purchase_domain').notNull().references(() => purchase.id),
  domain_id: varchar('domain_id', { length: 64 }).notNull(),
  platform: varchar('platform', { length: 32 }).notNull(),
  api_key: varchar('api_key', { length: 256 }),
  project_id: varchar('project_id', { length: 128 }),
  project_name: varchar('project_name', { length: 256 }),
  deployed_url: varchar('deployed_url', { length: 512 }),
  cname: varchar('cname', { length: 256 }).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull()
}); 
//purchase_domain
//api_key
//deployed_url
