import { ProductService } from '@/modules/product/product.service'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const pageStr = request.nextUrl.searchParams.get('page')
    const limitStr = request.nextUrl.searchParams.get('limit')

    const page = pageStr ? parseInt(pageStr, 10) : 1
    const limit = limitStr ? parseInt(limitStr, 10) : 10
    const skip = (page - 1) * limit

    const products = await ProductService.fetchProductsByCategory()

    return NextResponse.json(
        {
            reviews,
        },
        {
            status: 201,
        },
    )
}