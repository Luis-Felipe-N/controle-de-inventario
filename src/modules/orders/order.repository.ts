import prisma from "@/lib/prisma"
import { Prisma, Order } from "@prisma/client"

export class OrderRepository {
    async create(data: Prisma.OrderCreateInput): Promise<Order> {
        const order = await prisma.order.create({
            data,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        return order
    }

    async findById(id: string): Promise<Order | null> {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        return order
    }

    async searchMany(page: number) {
        const orders = await Promise.all([
            prisma.order.findMany({
                skip: (page - 1) * 20,
                take: 20,
                orderBy: { openedAt: "desc" },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            }),
            prisma.order.count(),
        ])

        return orders
    }

    async findByStatus(status: "OPEN" | "CLOSE", page: number) {
        const orders = await Promise.all([
            prisma.order.findMany({
                where: { status },
                skip: (page - 1) * 20,
                take: 20,
                orderBy: { openedAt: "desc" },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            }),
            prisma.order.count({
                where: { status },
            }),
        ])

        return orders
    }

    async update(id: string, data: Partial<Order>): Promise<Order | null> {
        const order = await prisma.order.update({
            where: { id },
            data,
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        })
        return order
    }

}
