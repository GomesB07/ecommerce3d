import { updateFilamentSchema } from "@/lib/auth/validations/filaments.schema";
import { updateFilament } from "@/services/filaments.service";
import { NextRequest, NextResponse } from "next/server";


export interface RouteFilamentIdProps {
    params: Promise<{filamentId: string}>
}

export async function PATCH(request: NextRequest, {params}: RouteFilamentIdProps) {

    try {
        const body = await request.json()
        const {filamentId} = await params
        const parsed = updateFilamentSchema.safeParse(body)

        if(!parsed.success) {
            return NextResponse.json({error: parsed.error.flatten().fieldErrors}, {status: 400})
        }

        const filament = await updateFilament(filamentId, parsed.data)

        return NextResponse.json(filament, {status: 200})

    } catch(error) {
        if(error instanceof Error && error.message === 'Erro ao atualizar filamento') {
            return NextResponse.json({error: error.message}, {status: 401})
        }
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}