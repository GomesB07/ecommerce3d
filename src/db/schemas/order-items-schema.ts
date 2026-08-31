import { decimal, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { OrdersTable } from "./orders-schema";
import { ProductsTable } from "./products-schema";



export const OrderItemsTable = pgTable('orderItems', {
    id: uuid('id').primaryKey(),
    orderId: uuid('order_id').references(() => OrdersTable.id, {onDelete: 'cascade'}).notNull(),
    productId: uuid('product_id').references(() => ProductsTable.id, {onDelete: 'cascade'}).notNull(),
    variationLabel: varchar('variation_label').notNull(),
    quantity: integer('quantity').notNull(),
    unitPrice: decimal('unit_price', {precision: 10, scale: 2}).notNull(),
    createdAt: timestamp('created_at').defaultNow()
})