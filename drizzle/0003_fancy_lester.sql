ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "filaments" ALTER COLUMN "active" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orders" ALTER COLUMN "status" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "orderStatusHistory" ALTER COLUMN "email_sent" SET NOT NULL;