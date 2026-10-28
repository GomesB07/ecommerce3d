ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "filamentsColor" DROP CONSTRAINT "filamentsColor_filament_id_filaments_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."products"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "filamentsColor" ADD CONSTRAINT "filamentsColor_filament_id_filaments_id_fk" FOREIGN KEY ("filament_id") REFERENCES "public"."filaments"("id") ON DELETE cascade ON UPDATE no action;