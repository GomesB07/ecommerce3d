import { loginUserSchema } from "@/lib/auth/validations/auth.schema";
import { loginUser } from "@/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    try {
        const cookieStore = await cookies()
        const body = await req.json()
        const parse = loginUserSchema.safeParse(body)

        const refreshTokenIdCookie = cookieStore.get('refreshTokenId')
        const oldRefreshTokenId = refreshTokenIdCookie?.value

        if(!parse.success) {
            return NextResponse.json('Erro ao fazer login')
        }

        const user = await loginUser(parse.data, oldRefreshTokenId)

        if(!user?.token || !user.refreshTokenId) {
            return NextResponse.json('Erro ao fazer login')
        }


        cookieStore.set('token', user.token, {
            httpOnly: true,
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
        cookieStore.set('refreshTokenId', user.refreshTokenId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        const userFormated = {
            id: user.user.id,
            name: user.user.name,
            email: user.user.email,
        }

        return NextResponse.json(userFormated, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}