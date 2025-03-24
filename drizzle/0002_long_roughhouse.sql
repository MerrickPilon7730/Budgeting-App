ALTER TABLE "accounts" ALTER COLUMN "plaid_id" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "accounts" ALTER COLUMN "plaid_id" DROP NOT NULL;