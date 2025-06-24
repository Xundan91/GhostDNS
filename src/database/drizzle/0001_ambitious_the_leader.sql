CREATE TABLE "configuredomain" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" varchar(64) NOT NULL,
	"domain_id" varchar(64) NOT NULL,
	"platform" varchar(32) NOT NULL,
	"api_key" varchar(256),
	"project_id" varchar(128),
	"project_name" varchar(256),
	"deployed_url" varchar(512),
	"cname" varchar(256),
	"created_at" timestamp DEFAULT now() NOT NULL
);
