CREATE TABLE "categories" (
	"id" text PRIMARY KEY NOT NULL,
	"plaid_id" text DEFAULT '',
	"name" text NOT NULL,
	"user_id" text NOT NULL
);
