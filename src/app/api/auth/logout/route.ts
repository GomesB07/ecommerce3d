import { cookies } from "next/headers";
import { NextResponse } from "next/server";



export async function GET() {

    try {
        const cookieStore = await cookies()
        cookieStore.delete('token')
        return NextResponse.json('Usuário desconectado', { status: 200 })

    } catch(error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 })
    }
}