import { createProductVariationSchema } from "@/lib/validations/product-variation.schema";
import { createProductVariationService, getAllProductVariationsService } from "@/services/product-variation.service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const parsed = createProductVariationSchema.safeParse(body)
        
        if(!parsed.success) {
            throw new Error('Dados para criar variação de produtos inválidos')
        }
        
        const newVariationProduct = await createProductVariationService(parsed.data)

        return NextResponse.json(newVariationProduct, {status: 201})
    } catch(error) {
        const errorMessage = (error as Error).message
        if (errorMessage === 'Erro ao adicionar variação do produto') {
            return NextResponse.json(errorMessage, { status: 404 })
        }
        console.warn(errorMessage)
        return NextResponse.json(errorMessage, {status: 500})
    }
}

export async function GET(req: NextRequest) {
    try {
        const allProductVariations = await getAllProductVariationsService()
        return NextResponse.json(allProductVariations, {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}