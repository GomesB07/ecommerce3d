import { updateFilamentSchema } from "@/lib/validations/filament.schema";
import { deleteFilament, getFilament, updateFilament } from "@/services/filament.service";
import { NextRequest, NextResponse } from "next/server";


export interface IFilamentIdProps {
    params: Promise<{filamentId: string}>
}

export async function GET(request: NextRequest, {params}: IFilamentIdProps) {
    try {
        const {filamentId} = await params

        const filament = await getFilament(filamentId)

        return NextResponse.json(filament, {status: 200})

    } catch(error) {
        if(error instanceof Error && error.message === 'Erro ao buscar filamento') {
            return NextResponse.json({error: (error as Error).message}, {status: 404})
        }
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}


export async function PATCH(request: NextRequest, {params}: IFilamentIdProps) {
    try {
        const body = await request.json()
        const {filamentId} = await params
        const parsed = updateFilamentSchema.safeParse(body)

        if(!parsed.success) {
            return NextResponse.json({error: parsed.error.flatten().fieldErrors}, {status: 400})
        }

        if(Object.keys(parsed.data).length === 0) {
            throw new Error('Erro ao atualizar filamento')
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

export async function DELETE(request: NextRequest, {params}: IFilamentIdProps) {
    try {
        const {filamentId} = await params

        const filamentDeletedName = await deleteFilament(filamentId)

        return NextResponse.json(`Filamento ${filamentDeletedName} deletado com sucesso`, {status: 200})

    } catch(error) {
        if(error instanceof Error && error.message === 'Erro ao excluir filamento') {
            return NextResponse.json({error: error.message}, {status: 401})
        }
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}