import { pgEnum, pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const userRolesEnum = pgEnum('roles', ['admin', 'customer'])


export const UsersTable = pgTable('users', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    email: varchar('email').notNull().unique(),
    passwordHash: varchar('password_hash').notNull(),
    phone: varchar('phone').unique(),
    role: userRolesEnum().default('customer').notNull(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date())
})