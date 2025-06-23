CREATE TABLE "basedomain" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"domain_name" text NOT NULL,
	"platform" text NOT NULL,
	"price" text DEFAULT '0' NOT NULL,
	"api_key" text,
	"owner_id" text NOT NULL,
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
CREATE TABLE "paymentdetail" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purchase_id" text,
	"payment_method" text,
	"payment_ref_id" text,
	"payment_status" text,
	"payment_amount" double precision,
	"payment_date" timestamp with time zone DEFAULT now(),
	"payment_currency" text
);
--> statement-breakpoint
CREATE TABLE "purchase" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"buyer_id" text NOT NULL,
	"basedomain_id" text,
	"price" double precision NOT NULL,
	"status" text DEFAULT 'pending ',
	"timestamp" timestamp with time zone DEFAULT now(),
	"update_at" timestamp with time zone DEFAULT now()
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
ALTER TABLE "basedomain" ADD CONSTRAINT "basedomain_owner_id_users_id_fk" FOREIGN KEY ("owner_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "domainIntegration" ADD CONSTRAINT "domainIntegration_base_domain_id_basedomain_id_fk" FOREIGN KEY ("base_domain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "paymentdetail" ADD CONSTRAINT "paymentdetail_purchase_id_purchase_id_fk" FOREIGN KEY ("purchase_id") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_buyer_id_users_id_fk" FOREIGN KEY ("buyer_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "purchase" ADD CONSTRAINT "purchase_basedomain_id_basedomain_id_fk" FOREIGN KEY ("basedomain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subdomain_claims" ADD CONSTRAINT "subdomain_claims_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "subdomain_claims" ADD CONSTRAINT "subdomain_claims_base_domain_id_basedomain_id_fk" FOREIGN KEY ("base_domain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;