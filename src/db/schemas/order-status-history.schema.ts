import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { OrderTable, OrderStatusEnum } from "./order.schema";




export const OrderStatusHistoryTable = pgTable('orderStatusHistory', {
    id: uuid('id').primaryKey().defaultRandom(),
    orderId: uuid('order_id').references(() => OrderTable.id, {onDelete: 'cascade'}).notNull(),
    status: OrderStatusEnum('status').notNull(),
    note: varchar('note', {length: 2000}).notNull(),
    emailSent: boolean('email_sent').default(false).notNull(),
    createdAt: timestamp('created_at').defaultNow()
})