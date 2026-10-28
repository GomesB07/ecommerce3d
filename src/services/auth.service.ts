import {db} from '@/db'
import { UserTable } from '@/db/schemas'
import { eq } from 'drizzle-orm'
import { comparePassword, hashPassword } from '@/lib/auth/hash'
import type { LoginInput, RegisterInput } from '@/lib/auth/validations/auth.schema'
import { generateAccessToken, generateRefreshTokenHash, generateRefreshTokenId } from '@/lib/auth/jwt'
import { createRefreshTokenService, deleteRefreshTokenByHashService, deleteRefreshTokenByUserIdService } from './refreshToken.service'


export async function registerUser(input: RegisterInput) {
    const existing = await db.select().from(UserTable).where(eq(UserTable.email, input.email)).limit(1)

    if(existing.length > 0) {
        throw new Error('Email já cadastrado')
    }

    const passwordHash = await hashPassword(input.password)

    const [newUser] = await db.insert(UserTable).values({
        name: input.name,
        email: input.email,
        passwordHash,
        phone: input.phone,
        role: 'customer'
    }).returning({id: UserTable.id, email: UserTable.email, name: UserTable.name, role: UserTable.role})

    const expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
    const refreshTokenId = generateRefreshTokenId()
    const hashRefreshToken = generateRefreshTokenHash(refreshTokenId)

    const token = generateAccessToken({userId: newUser.id, userRole: newUser.role})
    await createRefreshTokenService({hashRefreshToken, userId: newUser.id, expiresAt})

    return {newUser, token, refreshTokenId}
}

export async function loginUser(input: LoginInput, oldRefreshTokenId?: string) {

    const user = await db.query.UserTable.findFirst({
        where: eq(UserTable.email, input.email)
    })

    if(!user) {
        throw new Error('Usuário não encontrado!')
    }

    const password = await comparePassword(input.password, user.passwordHash)

    if(!password) {
        throw new Error('Senha inválida')
    }

    if(oldRefreshTokenId) {
        console.log('CAIU NO IF PARA DELETAR O REFRESH TOKEN ANTIGO')
        const hashOldRefreshTokenId = generateRefreshTokenHash(oldRefreshTokenId)
        await deleteRefreshTokenByHashService(hashOldRefreshTokenId)
        await deleteRefreshTokenByUserIdService(user.id)
    }

    const expiresAt = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000))
    const refreshTokenId = generateRefreshTokenId()
    const hashRefreshToken = generateRefreshTokenHash(refreshTokenId)
    
    const token = generateAccessToken({userId: user.id, userRole: user.role})
    await createRefreshTokenService({hashRefreshToken, userId: user.id, expiresAt})
    
    return {user, token, refreshTokenId}
}