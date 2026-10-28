import { decimal, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { OrderTable } from "./order.schema";
import { ProductTable } from "./product.schema";



export const OrderItemsTable = pgTable('orderItems', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => OrderTable.id, {onDelete: 'cascade'}).notNull(),
    productId: uuid('product_id').references(() => ProductTable.id).notNull(),
    variationLabel: varchar('variation_label').notNull(),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', {precision: 10, scale: 2}).notNull(),
    createdAt: timestamp('created_at').defaultNow()
})