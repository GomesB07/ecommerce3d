import { pgTable, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { UserTable } from "./user.schema";



export const RefreshTokenTable = pgTable('refreshToken', {
    id: uuid('id').primaryKey().defaultRandom(),
    token: varchar('token', {length: 255}).unique().notNull(),
    userId: uuid('user_id').references(() => UserTable.id, {onDelete: 'cascade'}).notNull(),
    expiresAt: timestamp('expires_at', {withTimezone: true}).notNull(),
    createdAt: timestamp('created_at', {withTimezone: true}).defaultNow().notNull()
})