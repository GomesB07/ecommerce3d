import {z} from 'zod'


export const createFilamentSchema = z.object({
    name: z.string('Nome inválido').nonempty('O filamento precisa ter um nome'),
    description: z.string('Descrição inválida').nonempty('O filamento precisa ter uma descrição'),
})

export const updateFilamentSchema = z.object({
    name: z.string('Nome inválido').optional(),
    description: z.string('Descrição inválida').optional(),
})

export type CreateFilamentInput = z.infer<typeof createFilamentSchema>
export type UpdateFilamentInput = z.infer<typeof updateFilamentSchema>