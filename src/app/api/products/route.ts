import { createProductSchema } from "@/lib/validations/product.schema";
import { createProduct, getAllProducts } from "@/services/product.service";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    try {
        const body = await request.json()
        const parsed = createProductSchema.safeParse(body)

        if(!parsed.success) {
            throw new Error('Erro ao adicionar produto')
        }

        const product = await createProduct(parsed.data)

        return NextResponse.json(product, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}

export async function GET(req: NextRequest) {
    try {
        const products = await getAllProducts()
        return NextResponse.json(products, {status: 200})

    } catch(error) {
        return NextResponse.json({error: (error as Error).message}, {status: 400})
    }
}