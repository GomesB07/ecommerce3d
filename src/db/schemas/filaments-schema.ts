import { boolean, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";



export const FilamentsTable = pgTable('filaments', {
    id: uuid('id').primaryKey(),
    name: varchar('name', {length: 50}).notNull().unique(),
    description: varchar('description', {length: 5000}).notNull(),
    active: boolean().default(true),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})