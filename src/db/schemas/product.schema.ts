import { boolean, decimal, integer, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { FilamentTable } from "./filament.schema";


export const ProductTable = pgTable('product', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    slug: varchar('slug').notNull().unique(),
    description: varchar('description').notNull(),
    basePrice: decimal('base_price', {precision: 10, scale: 2}).notNull(),
    productionDays: integer('production_days').notNull(),
    filamentId: uuid('filaments_id').references(() => FilamentTable.id),
    active: boolean('active').default(true).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})