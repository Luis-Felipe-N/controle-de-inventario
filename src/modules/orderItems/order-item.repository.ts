import prisma from "@/lib/prisma"
import { Prisma, OrderItem } from "@prisma/client"

interface ItemDataProps {
    id: string
    quantity: number
    productId?: string
}

export class OrderItemRepository {
    async create(data: Prisma.OrderItemCreateInput): Promise<OrderItem> {
        const order = await prisma.orderItem.create({
            data,
        })

        return order
    }

    async findById(id: string): Promise<OrderItem | null> {
        const order = await prisma.orderItem.findUnique({
            where: { id },
        })
        return order
    }

    async findByOrderIdAndProductId(orderId: string, productId: string): Promise<OrderItem | null> {
        const order = await prisma.orderItem.findFirst({
            where: {
                orderId,
                productId
            },
        })
        return order
    }

    async update(id: string, data: Partial<OrderItem>) {
        const orderItem = await prisma.orderItem.update({
            where: { id },
            data,
        });

        return orderItem
    }
}
