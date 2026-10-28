import {z} from 'zod'

export const createFilamentColorSchema = z.object({
    name: z.string().nonempty('Esse campo não pode ser nulo'),
    colorValue: z.string().nonempty(),
    active: z.boolean().default(true).optional(),
    filamentId: z.uuid().nonempty()
})

export type CreateFilamentColorInput = z.infer<typeof createFilamentColorSchema>

export const updateFilamentColorSchema = z.object({
    name: z.string().optional(),
    colorValue: z.string().optional(),
    active: z.boolean().default(true).optional(),
    filamentId: z.uuid().optional()
})

export type UpdateFilamentColorInput = z.infer<typeof updateFilamentColorSchema>