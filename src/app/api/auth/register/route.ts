import { registerUserSchema } from "@/lib/auth/validations/auth.schema";
import { registerUser } from "@/services/auth.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const parsed = registerUserSchema.safeParse(body)

        if(!parsed.success) {
            return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 })
        }

        const {newUser, token} = await registerUser(parsed.data)

        const cookieStore = await cookies()
        cookieStore.set('token', token, {httpOnly: true, maxAge: 86400})

        const { passwordHash, ...safeUser } = newUser

        return NextResponse.json(safeUser, { status: 201 })

    } catch (error) {

        if(error instanceof Error && error.message === 'Email já cadastrado') {
            return NextResponse.json({ error: error.message }, { status: 409 })
        }
        return NextResponse.json({ error: 'Erro interno ao criar usuário '}, { status: 500 })
    }


}