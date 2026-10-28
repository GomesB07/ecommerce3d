import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { ProductTable } from "./product.schema";
import { FilamentColorTable } from "./filament-color.schema";



export const ProductImageTable = pgTable('productImage', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => ProductTable.id, {onDelete: 'cascade'}).notNull(),
    url: varchar('url').notNull(),
    filamentColorId: uuid('filament_color_id').references(() => FilamentColorTable.id),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})