import { relations } from 'drizzle-orm'
import { RefreshTokenTable, UserTable } from '../schemas'

export const refreshTokenRelations = relations(RefreshTokenTable, ({one}) => ({
    user: one(UserTable, {
        fields: [RefreshTokenTable.userId],
        references: [UserTable.id]
    }),
}))