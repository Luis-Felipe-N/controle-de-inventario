import { SearchOrdersService } from '@/modules/orders/services/search-many-orders.service'
import { UpdateOrderService } from '@/modules/orders/services/update-order.service'
import { UpdateOrderSchema } from '@/schemas/update-order-schema'
import { NextRequest, NextResponse } from 'next/server'

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json()

    const data = UpdateOrderSchema.parse(body)

    const service = new UpdateOrderService()
    const order = await service.execute(data)
    console.log(order)
    return NextResponse.json(
        {
            order,
        },
        {
            status: 202,
        },
    )
}