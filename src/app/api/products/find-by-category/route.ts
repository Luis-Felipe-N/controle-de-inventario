
import { FetchProductsByCategoryService } from '@/modules/product/services/fetch-products-by-category.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const category = request.nextUrl.searchParams.get('category')
    const page = request.nextUrl.searchParams.get('page')

    const service = new FetchProductsByCategoryService()
    const products = await service.execute({ category: category ?? "", page: page ? parseInt(page, 10) : 1 })

    return NextResponse.json(
        {
            products,
        },
        {
            status: 200,
        },
    )
}