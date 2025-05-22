import prisma from "@/lib/prisma"
import { Order } from "@/types"
import { Prisma, Order as OrderPrisma } from "@prisma/client"

interface ItemDataToUpdate {
    id: string; // ID do OrderItem
    quantity: number;
    price: number;
}


export class OrderRepository {
    async create(data: Prisma.OrderCreateInput): Promise<OrderPrisma> {
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
        const orders = await prisma.order.findMany({
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
        })

        return orders
    }

    async findManyByStatus(status: "OPEN" | "CLOSE", page: number) {
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

    async update(id: string, data: Partial<OrderPrisma>): Promise<OrderPrisma | null> {
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

    async updateOrderAndItems(
        orderId: string,
        orderData: Partial<Order>,
        itemsToUpdate: ItemDataToUpdate[] // Recebe os itens já processados
    ): Promise<Order | null> {
        try {
            const orderUpdated = await prisma.order.update({
                where: { id: orderId },
                data: {
                    ...orderData,
                    items: {
                        update: itemsToUpdate.map((item) => ({
                            where: { id: item.id },
                            data: {
                                quantity: item.quantity,
                                price: item.price
                            },
                        })),
                    },
                },
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                    },
                },
            })

            return orderUpdated
        } catch (error) {
            console.error("Erro ao atualizar pedido e itens no repositório:", error);
            return null; // Ou relance o erro, dependendo da sua estratégia de tratamento de erros
        }
    }
}
