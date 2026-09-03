import { decimal, pgEnum, pgTable, uuid, varchar } from "drizzle-orm/pg-core";
import { ProductsTable } from "./products.schema";

export const variationTypeEnum = pgEnum('variation_type', ['color', 'size', 'engraving'])


export const ProductVariationsTable = pgTable('productVariations', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => ProductsTable.id, {onDelete: 'cascade'}).notNull(),
    type: variationTypeEnum('type').notNull(),
    label: varchar('label', {length: 20}).notNull(),
    priceModifier: decimal('price_modifier', {precision: 10, scale: 2}).notNull()
})