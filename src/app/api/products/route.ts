
import { SearchProductsService } from '@/modules/product/services/search-many-products.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const query = request.nextUrl.searchParams.get('query')
    const page = request.nextUrl.searchParams.get('page')

    const service = new SearchProductsService()
    const products = await service.execute({ query: query ?? "", page: page ? parseInt(page, 10) : 1 })

    return NextResponse.json(
        {
            products,
        },
        {
            status: 200,
        },
    )
}