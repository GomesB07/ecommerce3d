import {z} from 'zod'

export const createProductVariationSchema = z.object({
    productId: z.uuid().nonempty(),
    priceModifier: z.union([z.number(), z.string()])
    .transform((val) => {
        if(typeof val === 'number') return val.toFixed(2);
        return val
    })
    .pipe(z.string().regex(/^\d{1,8}\.\d{2}$/, "Preço inválido para o formato do banco")).optional(),
    filamentColorId: z.uuid().nonempty(),
    active: z.boolean().default(true).optional()
})

export type CreateProductVariationInput = z.infer<typeof createProductVariationSchema>

export const updateProductVariationSchema = z.object({
    priceModifier: z.union([z.number(), z.string()])
    .transform((val) => {
        if(typeof val === 'number') return val.toFixed(2);
        return val
    })
    .pipe(z.string().regex(/^\d{1,8}\.\d{2}$/, "Preço inválido para o formato do banco")).optional(),
    filamentColorId: z.uuid().optional(),
    active: z.boolean().optional()
})

export type UpdateProductVariationsInput = z.infer<typeof updateProductVariationSchema>