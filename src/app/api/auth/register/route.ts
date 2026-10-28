import { registerUserSchema } from "@/lib/auth/validations/auth.schema";
import { registerUser } from "@/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    try {
        const body = await req.json()
        const parse = registerUserSchema.safeParse(body)

        if(!parse.success) {
            return NextResponse.json('Erro ao criar usuário')
        }

        const {newUser, token, refreshTokenId} = await registerUser(parse.data)

        const cookieStore = await cookies()
        cookieStore.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 15,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
        cookieStore.set('refreshTokenId', refreshTokenId, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })

        const user = {
            id: newUser.id,
            name: newUser.name,
            email: newUser.email
        }

        return NextResponse.json(user, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}