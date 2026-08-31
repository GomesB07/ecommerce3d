import { boolean, decimal, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";


export const ProductsTable = pgTable('products', {
    id: uuid('id').primaryKey(),
    name: varchar('name').notNull().unique(),
    slug: varchar('slug').notNull().unique(),
    description: varchar('description').notNull(),
    basePrice: decimal('base_price', {precision: 10, scale: 2}).notNull(),
    productionDays: integer('production_days').notNull(),
    active: boolean('active').default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})