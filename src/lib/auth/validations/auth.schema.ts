import {z} from 'zod'

export const registerUserSchema = z.object({
    name: z.string().min(2, 'Nome muito curto'),
    email: z.email('Email inválido'),
    password: z.string().min(8, 'Senha precisa de no mínimo 8 caracteres'),
    phone: z.string().optional()
})

export type RegisterInput = z.infer<typeof registerUserSchema>

export const loginUserSchema = z.object({
    email: z.email('Email inválido'),
    password: z.string()
})

export type LoginInput = z.infer<typeof loginUserSchema>

export const updateUserSchema = z.object({
    name: z.string().min(2, 'Nome muito curto').optional(),
    email: z.email('Email inválido').optional(),
    phone: z.string().optional()
})

export type updateUserInput = z.infer<typeof updateUserSchema>