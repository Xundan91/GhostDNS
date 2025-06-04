CREATE TABLE "basedomain" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain_name" text NOT NULL,
	"platform" text NOT NULL,
	"is_public" boolean DEFAULT true,
	"is_free" boolean DEFAULT true,
	"owner_id" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_At" timestamp with time zone DEFAULT now(),
	CONSTRAINT "basedomain_domain_name_unique" UNIQUE("domain_name")
);
--> statement-breakpoint
CREATE TABLE "domainIntegration" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"base_domain_id" text NOT NULL,
	"platform" text NOT NULL,
	"dns_status" text DEFAULT 'PENDING',
	"provider_api_key" text,
	"createdAt" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subdomain_claim_id" text NOT NULL,
	"buyer_id" text NOT NULL,
	"price" double precision NOT NULL,
	"status" text DEFAULT 'COMPLETED',
	"payment_method" text,
	"payment_ref_id" text,
	"timestamp" timestamp with time zone DEFAULT now(),
	CONSTRAINT "purchase_subdomain_claim_id_unique" UNIQUE("subdomain_claim_id")
);
--> statement-breakpoint
CREATE TABLE "subdomain_claims" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"subdomain" text NOT NULL,
	"fulldomain" text NOT NULL,
	"user_id" text NOT NULL,
	"base_domain_id" text NOT NULL,
	"vercel_project_id" text,
	"vercel_project_url" text,
	"secret_id" text NOT NULL,
	"is_free" boolean DEFAULT true,
	"price" double precision,
	"dns_status" text DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_At" timestamp with time zone DEFAULT now(),
	CONSTRAINT "subdomain_claims_fulldomain_unique" UNIQUE("fulldomain")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL,
	"role" text DEFAULT 'USER',
	"CreatedAt" timestamp with time zone DEFAULT now(),
	"UpdatedAt" timestamp with time zone DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "basedomain" ADD CONSTRAINT "basedomain_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domainIntegration" ADD CONSTRAINT "domainIntegration_base_domain_id_basedomain_id_fk" FOREIGN KEY ("base_domain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_subdomain_claim_id_subdomain_claims_id_fk" FOREIGN KEY ("subdomain_claim_id") REFERENCES "public"."subdomain_claims"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subdomain_claims" ADD CONSTRAINT "subdomain_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subdomain_claims" ADD CONSTRAINT "subdomain_claims_base_domain_id_basedomain_id_fk" FOREIGN KEY ("base_domain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;