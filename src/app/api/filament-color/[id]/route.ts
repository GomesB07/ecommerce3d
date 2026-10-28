import { updateFilamentColorSchema } from "@/lib/validations/filament-color.schema";
import { deleteFilamentColorService, getFilamentColorService, updateFilamentColorService } from "@/services/filament-color.service";
import { NextRequest, NextResponse } from "next/server";

interface IFilamentColorParams {
    params: Promise<{id: string}>
}


export async function DELETE(req: NextRequest, {params}: IFilamentColorParams) {
    try {
        const {id} = await params

        await deleteFilamentColorService(id)

        return NextResponse.json(`Cor de filamento deletada`, {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest, {params}: IFilamentColorParams) {
    try {
        const {id} = await params
        const filamentColor = await getFilamentColorService(id)
        return NextResponse.json(filamentColor, {status: 200})
    } catch(error) {
        if(error === '22P02') {
            console.warn('Erro ao buscar cor de filamento: ', error)
        }
        return NextResponse.json('Erro ao buscar cor de filamento', {status: 400})
    }
}

export async function PATCH(req: NextRequest, {params}: IFilamentColorParams) {
    try {
        const {id} = await params
        const body = await req.json()
        const parsed = updateFilamentColorSchema.safeParse(body)
        if(!parsed.success) {
            throw new Error('Campo inválido para atualizar cor de filamento')
        }
        const updateFilament = await updateFilamentColorService(id, parsed.data)
        return NextResponse.json(updateFilament, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}