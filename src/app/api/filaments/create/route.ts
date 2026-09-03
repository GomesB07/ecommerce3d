import { createFilamentSchema } from "@/lib/auth/validations/filaments.schema";
import { createFilament } from "@/services/filaments.service";
import { NextRequest, NextResponse } from "next/server";



export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const parsed = createFilamentSchema.safeParse(body)

        if(!parsed.success) {
            return NextResponse.json({error: parsed.error.flatten().fieldErrors}, { status: 400 })
        }

        const filament = await createFilament(parsed.data)

        return NextResponse.json(filament, { status: 201 })

    } catch(error) {
        if(error instanceof Error && error.message === 'Filamento já adicionado!') {
            return NextResponse.json({error: error.message}, { status: 409 })
        }
        return NextResponse.json({error: (error as Error).message}, { status: 500 })
    }
}