/**
 * PROXY: autenticação e autorização
 *
 * Objetivo: descobrir quem é o usuário, decidir se ele pode acessar
 * a rota e repassar a identidade ao handler via headers.
 *
 * 1. PREPARAÇÃO
 *    1.1 Copiar os headers da requisição ===
 *    1.2 Remover x-user-id e x-user-role (nunca confiar no cliente) ===
 *
 * 2. ROTA LIVRE
 *    2.1 Rota pública E método GET: liberar com os headers limpos ===
 *
 * 3. IDENTIFICAR O USUÁRIO
 *    Resultado: { userId, role, newAccessToken? } ou nulo
 *    3.1 Ler o cookie do access token ===
 *    3.2 Presente e válido: usar userId e role do token ===
 *    3.3 Ausente ou expirado: tentar o refresh token
 *        a) cookie do refresh ausente: 401
 *        b) gerar o hash e buscar no banco; não achou: 401
 *        c) expirado: apagar do banco, limpar cookies, 401
 *        d) válido: gerar novo access token, usar userId e role
 *           do usuário que veio do banco
 *    3.4 Token adulterado ou inválido: 401 direto, sem tentar refresh
 *
 * 4. AUTORIZAR (um único ponto, vale para os dois caminhos)
 *    4.1 Rota exige admin e role diferente de admin: 403
 *
 * 5. LIBERAR
 *    5.1 Setar x-user-id e x-user-role nos headers da requisição
 *    5.2 Repassar a requisição com esses headers
 *    5.3 Se houve novo access token: gravar o cookie na resposta
 *
 * REGRAS
 * - 401 = não autenticado; 403 = autenticado sem permissão
 * - Mensagens de erro genéricas para o cliente; detalhe só no log
 * - Toda rota que lê x-user-* precisa estar no matcher
 */






import { NextRequest, NextResponse } from "next/server";
import verifyAccessToken, { generateAccessToken, generateRefreshTokenHash } from "./lib/auth/jwt";
import { deleteRefreshTokenByHashService, getRefreshTokenByHashService } from "./services/refreshToken.service";

const freeRoutes = ['/api/products', '/api/product-variations']
const ownerRequiredRoutes = ['/api/filaments', '/api/products', '/api/product-variations']

export async function proxy(request: NextRequest) {
    try {
        return await authenticateAndAuthorize(request)
    } catch(error) {
        console.error(error)
        return NextResponse.json({error: 'Erro interno'}, {status: 500})
    }
}

const authenticateAndAuthorize = async (request: NextRequest) => {
    const requestHeaders = new Headers(request.headers)
    requestHeaders.delete('x-user-id')
    requestHeaders.delete('x-user-role')

    const method = request.method
    const { pathname } = request.nextUrl

    let userId: string | null = null
    let userRole: string | null = null
    let newAccessToken: string | null = null

    const isFreeRoute = freeRoutes.some((route) => pathname.startsWith(route))
    if(isFreeRoute && method === 'GET') {
        return NextResponse.next({
            request: {headers: requestHeaders}
        })
    }

    const token = request.cookies.get('token')
    const decoded = token ? verifyAccessToken(token.value) : null

    if(decoded && decoded.status === 'invalid') {
        const invalidResponse = NextResponse.json({error: 'Token inválido'}, {status: 401})
        invalidResponse.cookies.delete('token')
        return invalidResponse
    }

    if(decoded && decoded.status === 'valid') {
        userId = decoded.userId
        userRole = decoded.userRole
    } else {
        const refreshTokenId = request.cookies.get('refreshTokenId')

        if(!refreshTokenId) return await clearSession(request)

        const refreshTokenHash = generateRefreshTokenHash(refreshTokenId.value)
        const refreshToken = await getRefreshTokenByHashService(refreshTokenHash)

        if(!refreshToken || refreshToken.expiresAt < new Date()) {
            if(refreshToken) await deleteRefreshTokenByHashService(refreshTokenHash)
            return await clearSession(request)
        }
        userId = refreshToken.user.id
        userRole = refreshToken.user.role
        newAccessToken = generateAccessToken({userId, userRole})
    }

    const isOwnerRoute = ownerRequiredRoutes.some((route) => pathname.startsWith(route))
    if(isOwnerRoute && userRole !== 'admin') {
        console.warn(`Usuário ${userId} bloqueado na rota admin`)
        return NextResponse.json({error: 'Usuário não autorizado!'}, {status: 403})
    }

    requestHeaders.set('x-user-id', userId)
    requestHeaders.set('x-user-role', userRole)

    const response = NextResponse.next({
        request: {headers: requestHeaders}
    })

    if(newAccessToken) {
        response.cookies.set('token', newAccessToken, {
            httpOnly: true,
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
        })
    }

    return response
}


const clearSession = async (request: NextRequest) => {
    const response = NextResponse.json({ error: 'Sessão expirada. Faça login novamente' }, { status: 401 })
    const refreshTokenId = request.cookies.get('refreshTokenId')?.value
    if (refreshTokenId) {
        const refreshTokenHash = generateRefreshTokenHash(refreshTokenId)
        await deleteRefreshTokenByHashService(refreshTokenHash)
    }
    response.cookies.delete('token')
    response.cookies.delete('refreshTokenId')
    return response
}

export const config = {
    matcher: [
        '/api/auth/logout',
        '/api/auth/update',
        '/api/user/me',
        '/api/filaments/:path*',
        '/api/products/:path*',
        '/api/product-variations/:path*'
    ],
}