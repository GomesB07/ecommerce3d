import { boolean, decimal, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { FilamentsTable } from "./filaments.schema";


export const ProductsTable = pgTable('products', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull().unique(),
    slug: varchar('slug').notNull().unique(),
    description: varchar('description').notNull(),
    basePrice: decimal('base_price', {precision: 10, scale: 2}).notNull(),
    productionDays: integer('production_days').notNull(),
    filamentsId: uuid('filaments_id').references(() => FilamentsTable.id),
    active: boolean('active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})