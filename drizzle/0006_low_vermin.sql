ALTER TABLE "productVariations" ADD COLUMN "filament_color_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "productVariations" ADD CONSTRAINT "productVariations_filament_color_id_filamentsColor_id_fk" FOREIGN KEY ("filament_color_id") REFERENCES "public"."filamentsColor"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "productVariations" DROP COLUMN "type";--> statement-breakpoint
ALTER TABLE "productVariations" ADD CONSTRAINT "productVariations_filament_color_id_unique" UNIQUE("filament_color_id");--> statement-breakpoint
DROP TYPE "public"."variation_type";