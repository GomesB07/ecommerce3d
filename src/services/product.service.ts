import { db } from "@/db";
import { ProductTable } from "@/db/schemas";
import { CreateProductInput, UpdateProductInput } from "@/lib/validations/product.schema";
import { eq } from "drizzle-orm";
import postgres from "postgres";
import slugify from 'slugify'


export async function createProduct(input: CreateProductInput) {

    let slug = slugify(input.name, {lower: true, strict: true})
    let suffix = 1

    while(true) {
        try {
            const newProduct = await db.insert(ProductTable).values({...input, slug}).returning()
            return newProduct
        } catch (error) {
            if(error instanceof Error && error.cause instanceof postgres.PostgresError && error.cause.code === '23505' && error.cause.constraint_name === 'products_slug_unique') {
                suffix++
                slug = `${slugify(input.name, {lower: true, strict: true})}-${suffix}`
                continue;
            }
            throw error
        }
    }
}

export async function deleteProduct(slug: string) {

    const deleted = await db.delete(ProductTable).where(eq(ProductTable.slug, slug)).returning()

    return deleted
}

export async function updateProduct(slug: string, input: UpdateProductInput) {
    const update = await db.update(ProductTable).set(input).where(eq(ProductTable.slug, slug)).returning()
    return update
}

export async function getProduct(slug: string) {
    const product = await db.query.ProductTable.findFirst({
        where: eq(ProductTable.slug, slug),
        with: {
            variations: {
                with: {
                    filamentColor: {
                        columns: {
                            name: true
                        }
                    }
                }
            },
        }
    })
    return product
}

export async function getAllProducts() {
    const products = await db.select().from(ProductTable)
    return products
}