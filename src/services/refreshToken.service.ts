import { db } from "@/db"
import { RefreshTokenTable } from "@/db/schemas"
import { eq } from "drizzle-orm"

interface refreshTokenServiceProps {
    hashRefreshToken: string,
    userId: string,
    expiresAt: Date
}

export async function createRefreshTokenService({hashRefreshToken, userId, expiresAt}: refreshTokenServiceProps) {
    try {
        const refreshToken = await db.insert(RefreshTokenTable).values({
            token: hashRefreshToken,
            userId,
            expiresAt
        }).returning()

        return refreshToken

    } catch(error) {
        console.warn('Erro ao salvar refresh token')
        throw new Error('Erro ao salvar refresh token')
    }
}

export async function getRefreshTokenByHashService(hashRefreshToken: string) {
    try {
        const refreshToken = await db.query.RefreshTokenTable.findFirst({
            where: eq(RefreshTokenTable.token, hashRefreshToken),
            with: {
                user: {
                    columns: {
                        id: true,
                        role: true
                    }
                }
            }
        })
        return refreshToken
    } catch(error) {
        throw new Error('Erro ao buscar refresh token: ' + (error as Error).message)
    }
}

export async function deleteRefreshTokenByHashService(hashRefreshToken: string) {
    try {
        const deleteRefreshToken = await db.delete(RefreshTokenTable).where(eq(RefreshTokenTable.token, hashRefreshToken))
        return deleteRefreshToken
    } catch(error) {
        throw new Error('Erro ao deletar refresh token: ' + (error as Error).message)
    }
}

export async function deleteRefreshTokenByUserIdService(userId: string) {
    try {
        const deleteRefreshToken = await db.delete(RefreshTokenTable).where(eq(RefreshTokenTable.userId, userId))
        return deleteRefreshToken
    } catch(error) {
        throw new Error('Erro ao deletar refresh token')
    }
}