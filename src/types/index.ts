import { Order as OrderPrisma, OrderItem as OrderItemPrisma, Product as ProductPrisma } from "@prisma/client";

export interface OrderItem extends OrderItemPrisma {
    product: ProductPrisma
}

export interface Order extends OrderPrisma {
    items: OrderItem[]
}
