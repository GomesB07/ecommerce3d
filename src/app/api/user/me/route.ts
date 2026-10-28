import { updateUserSchema } from "@/lib/auth/validations/auth.schema";
import { deleteUser, getUser, updateUser } from "@/services/user.service";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";


export async function PATCH(request: NextRequest) {

    try {
        const requestHeaders = new Headers(request.headers)
        const userId = requestHeaders.get('x-user-id')
        const body = await request.json()
        const parsedBody = updateUserSchema.safeParse(body)

        if(!parsedBody.success) {
            throw new Error('Erro ao atualizar usuário!')
        }

        if(Object.keys(parsedBody.data).length === 0) {
            return NextResponse.json({error: 'Nenhum campo para atualizar'}, {status: 400})
        }

        if(!userId) {
            throw new Error('User id não encontrado!')
        }

        await updateUser(parsedBody.data, userId)

        return new NextResponse(null, { status: 204 })

    } catch (error) {
        if(error instanceof Error && error.message === 'Usuário não encontrado!') {
            return NextResponse.json({error: error.message}, {status: 400})
        }
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}

export async function DELETE(req: NextRequest) {

    try {
        const userId = req.headers.get('x-user-id')

        if(!userId) {
            throw new Error('Id de usuário inválido')
        }

        await deleteUser(userId)

        const cookieStore = await cookies()
        cookieStore.delete('token')

        return NextResponse.json('Usuário deletado', {status: 200})
        
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest) {

    try {
        const userId = req.headers.get('x-user-id')

        if(!userId) {
            throw new Error('Id de usuário inválido')
        }

        const user = await getUser(userId)

        return NextResponse.json(user, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}