import { createFilamentColorSchema } from "@/lib/validations/filament-color.schema";
import { createFilamentColorService, getAllFilamentColorsService } from "@/services/filament-color.service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = createFilamentColorSchema.safeParse(body)

        if(!parsed.success) {
            throw new Error('Campo inválido')
        }   

        const filamentColor = await createFilamentColorService(parsed.data)
        return NextResponse.json(filamentColor, {status: 201})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest) {
    try {
        const allFilamentColors = await getAllFilamentColorsService()
        return NextResponse.json(allFilamentColors, {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}