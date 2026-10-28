import { boolean, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { FilamentTable } from "./filament.schema";



export const FilamentColorTable = pgTable('filamentColor', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name', {length: 50}).notNull().unique(),
    colorValue: text('color_value').notNull(),
    active: boolean('active').default(true).notNull(),
    filamentId: uuid('filament_id').references(() => FilamentTable.id, {onDelete: 'cascade'}).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})