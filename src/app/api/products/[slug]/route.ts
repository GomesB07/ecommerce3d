import { updateProductSchema } from "@/lib/validations/product.schema";
import { deleteProduct, getProduct, updateProduct } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";

interface IProductParams {
    params: Promise<{slug: string}>
}

export async function DELETE(req: NextRequest, {params}: IProductParams) {

    try {
        const {slug} = await params

        const deleted = await deleteProduct(slug)

        return NextResponse.json(deleted, {status: 200})


    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function PATCH(req: NextRequest, {params}: IProductParams) {
    try {
        const {slug} = await params
        const body = await req.json()
        const parsed = updateProductSchema.safeParse(body)

        if(!parsed.success) {
            throw new Error('Erro ao coletar informações do produto')
        }

        const update = await updateProduct(slug, parsed.data)

        if(update.length <= 0) {
            throw new Error('Produto não encontrado')
        }

        return NextResponse.json(update, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest, {params}: IProductParams) {

    try {
        const {slug} = await params

        const product = await getProduct(slug)

        if(product == undefined) {
            throw new Error('Produto não encontrado')
        }

        return NextResponse.json(product, {status: 200})
    } catch(error) {
        return NextResponse.json({error: (error as Error).message},  {status: 400})
    }
}