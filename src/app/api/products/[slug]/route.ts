import { z } from 'zod';
import data from '../data.json'
import { NextResponse } from 'next/server';

export async function GET(_: Request,
    { params }: { params: { slug: string } },
) {


    await new Promise(resolve => setTimeout(resolve, 1000))

    const slug = z.string().parse(params.slug)

    const product = data.products.find((product) => product.slug === slug)

    if (!product) {
        return new NextResponse(
            JSON.stringify({ message: 'produto não encontrado' }),
            { status: 404 }
        );
    }

    return Response.json(product)
}