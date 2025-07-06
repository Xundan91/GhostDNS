CREATE TABLE "cnameupdate" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"connectedproject" text NOT NULL,
	"userid" text NOT NULL,
	"purchasedomain" text NOT NULL,
	"cname" varchar(32) NOT NULL,
	"deployedurl" varchar(256) NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"UpdatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "connectproject" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"isconnected" boolean DEFAULT true,
	"userId" text,
	"basedomain" text NOT NULL,
	"purchasedomain" text NOT NULL,
	"platform" varchar(32) NOT NULL,
	"connectApiKey" varchar(256),
	"project_id" varchar(256),
	"project_name" varchar(256),
	"deployed_url" varchar(512),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cnameupdate" ADD CONSTRAINT "cnameupdate_connectedproject_connectproject_id_fk" FOREIGN KEY ("connectedproject") REFERENCES "public"."connectproject"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cnameupdate" ADD CONSTRAINT "cnameupdate_userid_users_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cnameupdate" ADD CONSTRAINT "cnameupdate_userid_basedomain_id_fk" FOREIGN KEY ("userid") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cnameupdate" ADD CONSTRAINT "cnameupdate_purchasedomain_purchase_id_fk" FOREIGN KEY ("purchasedomain") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connectproject" ADD CONSTRAINT "connectproject_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connectproject" ADD CONSTRAINT "connectproject_basedomain_basedomain_id_fk" FOREIGN KEY ("basedomain") REFERENCES "public"."basedomain"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "connectproject" ADD CONSTRAINT "connectproject_purchasedomain_purchase_id_fk" FOREIGN KEY ("purchasedomain") REFERENCES "public"."purchase"("id") ON DELETE no action ON UPDATE no action;