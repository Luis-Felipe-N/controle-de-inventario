import { SearchOrdersService } from '@/modules/orders/services/search-many-orders.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get('page')

    const service = new SearchOrdersService()
    const orders = await service.execute({ page: page ? parseInt(page, 10) : 1 })

    return NextResponse.json(
        {
            orders,
        },
        {
            status: 200,
        },
    )
}