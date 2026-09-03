import { integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { ProductsTable } from "./products.schema";



export const ProductImagesTable = pgTable('productsImage', {
    id: uuid('id').primaryKey().defaultRandom(),
    productId: uuid('product_id').references(() => ProductsTable.id, {onDelete: 'cascade'}).notNull(),
    url: varchar('url').notNull(),
    order: integer('order').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})