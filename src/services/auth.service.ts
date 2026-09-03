import {db} from '@/db'
import { UsersTable } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import { comparePassword, hashPassword } from '@/lib/auth/hash'
import type { LoginInput, RegisterInput } from '@/lib/auth/validations/auth.schema'
import { generateToken } from '@/lib/auth/jwt'


export async function registerUser(input: RegisterInput) {
    const existing = await db.select().from(UsersTable).where(eq(UsersTable.email, input.email)).limit(1)

    if(existing.length > 0) {
        throw new Error('Email já cadastrado')
    }

    const passwordHash = await hashPassword(input.password)

    const [newUser] = await db.insert(UsersTable).values({
        name: input.name,
        email: input.email,
        passwordHash,
        phone: input.phone,
        role: 'customer'
    }).returning()

    const token = generateToken(newUser.id, newUser.role)

    return {newUser, token}
} 

export async function loginUser(input: LoginInput) {

    const user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.email, input.email)
    })

    if(!user) {
        throw new Error('User não encontrado!')
    }

    const getHash = comparePassword(input.password, user.passwordHash)

    if(!!getHash) {
        const token = generateToken(user.id, user.role)

        return {user, token}
    }

}