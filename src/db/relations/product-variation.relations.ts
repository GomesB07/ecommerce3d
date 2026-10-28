import { relations } from "drizzle-orm";
import { FilamentColorTable, ProductTable, ProductVariationTable } from "../schemas";


export const productVariationsRelations = relations(ProductVariationTable, ({one}) => ({
    filamentColor: one(FilamentColorTable, {
        fields: [ProductVariationTable.filamentColorId],
        references: [FilamentColorTable.id]
    }),
    product: one(ProductTable, {
        fields: [ProductVariationTable.productId],
        references: [ProductTable.id]
    })
}))

export const filamentColorProductVariationRelations = relations(FilamentColorTable, ({many}) => ({
    productVariation: many(ProductVariationTable)
}))

export const productProductVariationRelations = relations(ProductTable, ({many}) => ({
   productVariation: many(ProductVariationTable) 
}))