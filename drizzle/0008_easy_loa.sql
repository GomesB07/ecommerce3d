ALTER TABLE "users" RENAME TO "user";--> statement-breakpoint
ALTER TABLE "products" RENAME TO "product";--> statement-breakpoint
ALTER TABLE "productsImage" RENAME TO "productImage";--> statement-breakpoint
ALTER TABLE "productVariations" RENAME TO "productVariation";--> statement-breakpoint
ALTER TABLE "filaments" RENAME TO "filament";--> statement-breakpoint
ALTER TABLE "orders" RENAME TO "order";--> statement-breakpoint
ALTER TABLE "filamentsColor" RENAME TO "filamentColor";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_email_unique";--> statement-breakpoint
ALTER TABLE "user" DROP CONSTRAINT "users_phone_unique";--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "products_slug_unique";--> statement-breakpoint
ALTER TABLE "productVariation" DROP CONSTRAINT "productVariations_filament_color_id_unique";--> statement-breakpoint
ALTER TABLE "filament" DROP CONSTRAINT "filaments_name_unique";--> statement-breakpoint
ALTER TABLE "filamentColor" DROP CONSTRAINT "filamentsColor_name_unique";--> statement-breakpoint
ALTER TABLE "product" DROP CONSTRAINT "products_filaments_id_filaments_id_fk";
--> statement-breakpoint
ALTER TABLE "productImage" DROP CONSTRAINT "productsImage_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "productImage" DROP CONSTRAINT "productsImage_filament_color_id_filamentsColor_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariation" DROP CONSTRAINT "productVariations_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "productVariation" DROP CONSTRAINT "productVariations_filament_color_id_filamentsColor_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "orders_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItems" DROP CONSTRAINT "orderItems_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "orderStatusHistory" DROP CONSTRAINT "orderStatusHistory_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "filamentColor" DROP CONSTRAINT "filamentsColor_filament_id_filaments_id_fk";
--> statement-breakpoint
ALTER TABLE "refreshToken" DROP CONSTRAINT "refreshToken_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_filaments_id_filament_id_fk" FOREIGN KEY ("filaments_id") REFERENCES "public"."filament"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productImage" ADD CONSTRAINT "productImage_filament_color_id_filamentColor_id_fk" FOREIGN KEY ("filament_color_id") REFERENCES "public"."filamentColor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariation" ADD CONSTRAINT "productVariation_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariation" ADD CONSTRAINT "productVariation_filament_color_id_filamentColor_id_fk" FOREIGN KEY ("filament_color_id") REFERENCES "public"."filamentColor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_product_id_product_id_fk" FOREIGN KEY ("product_id") REFERENCES "public"."product"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderStatusHistory" ADD CONSTRAINT "orderStatusHistory_order_id_order_id_fk" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "filamentColor" ADD CONSTRAINT "filamentColor_filament_id_filament_id_fk" FOREIGN KEY ("filament_id") REFERENCES "public"."filament"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "refreshToken" ADD CONSTRAINT "refreshToken_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_email_unique" UNIQUE("email");--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_phone_unique" UNIQUE("phone");--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_slug_unique" UNIQUE("slug");--> statement-breakpoint
ALTER TABLE "productVariation" ADD CONSTRAINT "productVariation_filament_color_id_unique" UNIQUE("filament_color_id");--> statement-breakpoint
ALTER TABLE "filament" ADD CONSTRAINT "filament_name_unique" UNIQUE("name");--> statement-breakpoint
ALTER TABLE "filamentColor" ADD CONSTRAINT "filamentColor_name_unique" UNIQUE("name");