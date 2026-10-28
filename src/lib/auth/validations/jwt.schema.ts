import { userRolesEnum } from '@/db/schemas'
import {z} from 'zod'

export const accessTokenSchema = z.object({
    userId: z.uuid(),
    userRole: z.enum(userRolesEnum.enumValues)
})