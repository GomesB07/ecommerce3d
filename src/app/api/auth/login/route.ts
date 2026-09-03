import { loginUserSchema } from "@/lib/auth/validations/auth.schema"
import { loginUser } from "@/services/auth.service"
import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"


export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const parsed = loginUserSchema.safeParse(body)

        if(!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        const userAndToken = await loginUser(parsed.data)

        if(!userAndToken) {
            throw new Error('Erro ao fazer login')
        }
        
        const {name} = userAndToken.user
        const {token} = userAndToken


        const cookieStore = await cookies()
        cookieStore.set('token', token, {httpOnly: true, maxAge: 86400})

        return NextResponse.json({name}, { status: 200 })

    } catch(error) {
        if(error instanceof Error && error.message === 'User não encontrado') {
            return NextResponse.json({ error: error.message }, { status: 404 })
        }
        console.error(error)
        return NextResponse.json({error: 'Erro interno ao localizar usuário'}, { status: 500 })
    }
}