import { generateRefreshTokenHash } from "@/lib/auth/jwt";
import { deleteRefreshTokenByHashService } from "@/services/refreshToken.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function GET(req: NextRequest) {

    try {
        const userId = req.headers.get('x-user-id')

        if(!userId) {
            throw new Error('User id não encontrado!')
        }

        const cookieStore = await cookies()

        const refreshTokenId = cookieStore.get('refreshTokenId')
        if(!refreshTokenId) {
            throw new Error('Erro ao buscar refresh token id')
        }

        const refreshTokenHash = generateRefreshTokenHash(refreshTokenId.value)
        await deleteRefreshTokenByHashService(refreshTokenHash)

        cookieStore.delete('token')
        cookieStore.delete('refreshTokenId')

        return NextResponse.json('Logout feito com sucesso!', {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}