import { getAllFilaments } from "@/services/filaments.service";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextRequest) {

    try {

        const allFilaments = await getAllFilaments()

        return NextResponse.json(allFilaments, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 500})
    }
}