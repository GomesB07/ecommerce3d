import { relations } from "drizzle-orm";
import { FilamentColorTable, FilamentTable, ProductTable } from "../schemas";


export const filamentRelations = relations(FilamentTable, ({many}) => ({
    product: many(ProductTable),
    filamentColor: many(FilamentColorTable)
}))

export const productsFilamentRelations = relations(ProductTable, ({one, many}) => ({
    filament: one(FilamentTable, {
        fields: [ProductTable.filamentId],
        references: [FilamentTable.id]
    }),
    filamentColor: many(FilamentColorTable)
}))

export const filamentsColorFilamentRelations = relations(FilamentColorTable, ({one}) => ({
    filament: one(FilamentTable, {
        fields: [FilamentColorTable.filamentId],
        references: [FilamentTable.id]
    })
}))