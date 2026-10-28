import {z} from 'zod'

export const createProductSchema = z.object({
    name: z.string('O nome do produto é obrigatório').max(200).nonempty(),
    description: z.string('A descrição do produto é obrigatória').max(200).nonempty(),
    basePrice: z.union([z.number(), z.string()])
    .transform((val) => {
        if(typeof val === 'number') return val.toFixed(2);
        return val
    })
    .pipe(z.string().regex(/^\d{1,8}\.\d{2}$/, "Preço inválido para o formato do banco")),
    productionDays: z.coerce.number('O prazo de dias de fabricação é obrigatório').int().positive(),
    filamentsId: z.uuid().nonempty()
})

export type CreateProductInput = z.infer<typeof createProductSchema>

export const updateProductSchema = z.object({
    name: z.string('O nome do produto é obrigatório').max(200).optional(),
    description: z.string('A descrição do produto é obrigatória').max(200).optional(),
    basePrice: z.union([z.number(), z.string()])
    .transform((val) => {
        if(typeof val === 'number') return val.toFixed(2);
        return val
    })
    .pipe(z.string().regex(/^\d{1,8}\.\d{2}$/, "Preço inválido para o formato do banco")).optional(),
    productionDays: z.coerce.number('O prazo de dias de fabricação é obrigatório').int().positive().optional(),
    filamentsId: z.uuid().optional()
})

export type UpdateProductInput = z.infer<typeof updateProductSchema>