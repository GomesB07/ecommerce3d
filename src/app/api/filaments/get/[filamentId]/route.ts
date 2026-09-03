import { NextRequest, NextResponse } from "next/server";
import { RouteFilamentIdProps } from "../../update/[filamentId]/route";
import { getFilament } from "@/services/filaments.service";



export async function GET(request: NextRequest, {params}: RouteFilamentIdProps) {


    try {
        const {filamentId} = await params

        const filament = await getFilament(filamentId)

        return NextResponse.json(filament, {status: 200})

    } catch(error) {
        if(error instanceof Error && error.message === 'Erro ao buscar filamento') {
            return NextResponse.json({error: (error as Error).message}, {status: 404})
        }
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}