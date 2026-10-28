import { relations } from 'drizzle-orm'
import { FilamentColorTable, ProductTable, ProductVariationTable } from '../schemas'

export const productRelations = relations(ProductTable, ({many}) => ({
    variations: many(ProductVariationTable),
    filamentColor: many(FilamentColorTable)
}))

export const productVariationRelations = relations(ProductVariationTable, ({one}) => ({
    product: one(ProductTable, {
        fields: [ProductVariationTable.productId],
        references: [ProductTable.id]
    }),
    filamentColor: one(FilamentColorTable, {
        fields: [ProductVariationTable.filamentColorId],
        references: [FilamentColorTable.id]
    })
}))