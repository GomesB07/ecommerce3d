import { db } from "@/db";
import { ProductVariationTable } from "@/db/schemas";
import { CreateProductVariationInput, UpdateProductVariationsInput } from "@/lib/validations/product-variation.schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";


export async function createProductVariationService(input: CreateProductVariationInput) {
    const createProduct = await db.insert(ProductVariationTable).values(input).returning().catch(error => {
        const errorCode = error instanceof Error && error.cause instanceof postgres.PostgresError && error.cause.code
        if(errorCode === '23503') {
            throw new Error('Erro ao adicionar variação do produto')
        }
        throw error
    })
    return createProduct
}

export async function deleteProductVariationService(id: string) {
    const deleteProductVariation = await db.delete(ProductVariationTable).where(eq(ProductVariationTable.id, id))
    return deleteProductVariation
}

export async function updateProductVariationService(input: UpdateProductVariationsInput, id: string) {
    const update = await db.update(ProductVariationTable).set(input).returning()
    return update
}

export async function getProductVariationService(id: string) {
    const productVariation = await db.query.ProductVariationTable.findFirst({
        where: eq(ProductVariationTable.id, id),
        with: {
            product: true,
            filamentColor: {
                columns: {
                    name: true
                }
            }
        }
    })
    return productVariation
}

export async function getAllProductVariationsService() {
    const allProductVariation = await db.select().from(ProductVariationTable)
    return allProductVariation
}