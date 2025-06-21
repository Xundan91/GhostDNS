import { pgTable, unique, text, timestamp, foreignKey, doublePrecision, boolean } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const users = pgTable("users", {
	id: text().default(gen_random_uuid()).primaryKey().notNull(),
	name: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	role: text().default('USER'),
	createdAt: timestamp("CreatedAt", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("UpdatedAt", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_email_unique").on(table.email),
]);

export const domainIntegration = pgTable("domainIntegration", {
	id: text().default(gen_random_uuid()).primaryKey().notNull(),
	baseDomainId: text("base_domain_id").notNull(),
	platform: text().notNull(),
	dnsStatus: text("dns_status").default('PENDING'),
	providerApiKey: text("provider_api_key"),
	createdAt: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.baseDomainId],
			foreignColumns: [basedomain.id],
			name: "domainIntegration_base_domain_id_basedomain_id_fk"
		}),
]);

export const basedomain = pgTable("basedomain", {
	id: text().default(gen_random_uuid()).primaryKey().notNull(),
	domainName: text("domain_name").notNull(),
	platform: text().notNull(),
	ownerId: text("owner_id").notNull(),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_At", { withTimezone: true, mode: 'string' }).defaultNow(),
	price: text().default('0').notNull(),
	apiKey: text("api_key"),
}, (table) => [
	foreignKey({
			columns: [table.ownerId],
			foreignColumns: [users.id],
			name: "basedomain_owner_id_users_id_fk"
		}).onDelete("cascade"),
	unique("basedomain_domain_name_unique").on(table.domainName),
]);

export const purchase = pgTable("purchase", {
	id: text().default(gen_random_uuid()).primaryKey().notNull(),
	subdomainClaimId: text("subdomain_claim_id").notNull(),
	buyerId: text("buyer_id").notNull(),
	price: doublePrecision().notNull(),
	status: text().default('COMPLETED'),
	paymentMethod: text("payment_method"),
	paymentRefId: text("payment_ref_id"),
	timestamp: timestamp({ withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.subdomainClaimId],
			foreignColumns: [subdomainClaims.id],
			name: "purchase_subdomain_claim_id_subdomain_claims_id_fk"
		}),
	foreignKey({
			columns: [table.buyerId],
			foreignColumns: [users.id],
			name: "purchase_buyer_id_users_id_fk"
		}),
	unique("purchase_subdomain_claim_id_unique").on(table.subdomainClaimId),
]);

export const subdomainClaims = pgTable("subdomain_claims", {
	id: text().default(gen_random_uuid()).primaryKey().notNull(),
	subdomain: text().notNull(),
	fulldomain: text().notNull(),
	userId: text("user_id").notNull(),
	baseDomainId: text("base_domain_id").notNull(),
	vercelProjectId: text("vercel_project_id"),
	vercelProjectUrl: text("vercel_project_url"),
	secretId: text("secret_id").notNull(),
	isFree: boolean("is_free").default(true),
	price: doublePrecision(),
	dnsStatus: text("dns_status").default('pending'),
	createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_At", { withTimezone: true, mode: 'string' }).defaultNow(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [users.id],
			name: "subdomain_claims_user_id_users_id_fk"
		}),
	foreignKey({
			columns: [table.baseDomainId],
			foreignColumns: [basedomain.id],
			name: "subdomain_claims_base_domain_id_basedomain_id_fk"
		}),
	unique("subdomain_claims_fulldomain_unique").on(table.fulldomain),
]);
