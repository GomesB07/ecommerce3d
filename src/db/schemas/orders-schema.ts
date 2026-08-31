import { decimal, pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UsersTable } from "./users-schema";

export const OrderStatusEnum = pgEnum('orderStatus', ['pending_payment', 'paid', 'in_production', 'shipped', 'delivered', 'canceled'])

export const OrdersTable = pgTable('orders', {
    id: uuid('id').primaryKey(),
    userId: uuid('user_id').references(() => UsersTable.id).notNull(),
    status: OrderStatusEnum('status').default('pending_payment'),
    total: decimal('total', {precision: 10, scale: 2}).notNull(),
    shippingCost: decimal('shipping_cost', {precision: 10, scale: 2}).notNull(),
    trackingCode: varchar('tracking_code'),
    paymentGatewayId: varchar('payment_gateway_id').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})