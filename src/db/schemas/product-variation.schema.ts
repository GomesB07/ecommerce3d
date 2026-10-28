import { boolean, decimal, pgTable, uuid } from "drizzle-orm/pg-core";
import { ProductTable } from "./product.schema";
import { FilamentColorTable } from "./filament-color.schema";

export const ProductVariationTable = pgTable('productVariation', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => ProductTable.id, {onDelete: 'cascade'}).notNull(),
    filamentColorId: uuid('filament_color_id').references(() => FilamentColorTable.id).notNull().unique(),
    active: boolean('active').default(true).notNull(),
    priceModifier: decimal('price_modifier', {precision: 10, scale: 2}).default("0").notNull()
})