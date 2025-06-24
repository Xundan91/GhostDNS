ALTER TABLE "configuredomain" ADD COLUMN "userID_config" text NOT NULL;--> statement-breakpoint
ALTER TABLE "configuredomain" ADD COLUMN "base_domain_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "configuredomain" ADD COLUMN "purchase_domain" text NOT NULL;--> statement-breakpoint
ALTER TABLE "configuredomain" ADD CONSTRAINT "configuredomain_userID_config_users_id_fk" FOREIGN KEY ("userID_config") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "configuredomain" ADD CONSTRAINT "configuredomain_base_domain_id_basedomain_id_fk" FOREIGN KEY ("base_domain_id") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "configuredomain" ADD CONSTRAINT "configuredomain_purchase_domain_purchase_id_fk" FOREIGN KEY ("purchase_domain") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "configuredomain" DROP COLUMN "user_id";