import { deleteFilament } from "@/services/filaments.service";
import { NextRequest, NextResponse } from "next/server";
import { RouteFilamentIdProps } from "../../update/[filamentId]/route";





export async function DELETE(request: NextRequest, {params}: RouteFilamentIdProps) {


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