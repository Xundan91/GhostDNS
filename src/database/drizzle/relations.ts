import { relations } from "drizzle-orm/relations";
import { basedomain, domainIntegration, users, subdomainClaims, purchase } from "./schema";

export const domainIntegrationRelations = relations(domainIntegration, ({one}) => ({
	basedomain: one(basedomain, {
		fields: [domainIntegration.baseDomainId],
		references: [basedomain.id]
	}),
}));

export const basedomainRelations = relations(basedomain, ({one, many}) => ({
	domainIntegrations: many(domainIntegration),
	user: one(users, {
		fields: [basedomain.ownerId],
		references: [users.id]
	}),
	subdomainClaims: many(subdomainClaims),
}));

export const usersRelations = relations(users, ({many}) => ({
	basedomains: many(basedomain),
	purchases: many(purchase),
	subdomainClaims: many(subdomainClaims),
}));

export const purchaseRelations = relations(purchase, ({one}) => ({
	subdomainClaim: one(subdomainClaims, {
		fields: [purchase.subdomainClaimId],
		references: [subdomainClaims.id]
	}),
	user: one(users, {
		fields: [purchase.buyerId],
		references: [users.id]
	}),
}));

export const subdomainClaimsRelations = relations(subdomainClaims, ({one, many}) => ({
	purchases: many(purchase),
	user: one(users, {
		fields: [subdomainClaims.userId],
		references: [users.id]
	}),
	basedomain: one(basedomain, {
		fields: [subdomainClaims.baseDomainId],
		references: [basedomain.id]
	}),
}));