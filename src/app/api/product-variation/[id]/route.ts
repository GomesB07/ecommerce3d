import { updateProductVariationSchema } from "@/lib/validations/product-variation.schema";
import { deleteProductVariationService, getProductVariationService, updateProductVariationService } from "@/services/product-variation.service";
import { NextRequest, NextResponse } from "next/server";

interface IProductVariantParams {
    params: Promise<{id: string}>
}

export async function DELETE(req: NextRequest, {params}: IProductVariantParams) {
    try {
        const {id} = await params
        
        await deleteProductVariationService(id)

        return NextResponse.json('Variação do produto deletada', {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function PATCH(req: NextRequest, {params}: IProductVariantParams) {
    try {
        const {id} = await params
        const body = await req.json()
        const parsed = updateProductVariationSchema.safeParse(body)

        if(!parsed.success) {
            throw new Error('Erro ao atualizar variação do produto')
        }

        const update = await updateProductVariationService(parsed.data, id)

        return NextResponse.json(update, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest, {params}: IProductVariantParams) {
    try {
        const {id} = await params
        const productVariation = await getProductVariationService(id)
        return NextResponse.json(productVariation, {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}