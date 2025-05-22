import { Order } from "@/types"
import { OrderRepository } from "../order.repository"
import { OrderItem, OrderStatus, Prisma } from "@prisma/client"
import { ProductRepository } from "@/modules/product/product.repository";
import { OrderItemRepository } from "@/modules/orderItems/order-item.repository";

interface UpdateOrderItemData {
    orderItemId: string;
    quantity: number;
}

interface UpdateOrderItemsParams {
    orderId: string;
    items: UpdateOrderItemData[];
}

export class UpdateOrderService {
    async execute(params: UpdateOrderItemsParams): Promise<Order> {
        const { orderId, items } = params;

        const orderRepository = new OrderRepository()
        const productRepository = new ProductRepository()
        const orderItemRepository = new OrderItemRepository()

        const order = await orderRepository.findById(orderId)

        if (!order) {
            throw new Error(`Pedido com ID ${orderId} não encontrado.`);
        }

        if (order.status != OrderStatus.OPEN) {
            throw new Error(`Não é possível atualizar produtos em um pedido com status '${order.status}'.`);
        }

        let totalOrderPriceChange = 0;
        const itemsToUpdateInRepo: { id: string; quantity: number; price: number; }[] = [];

        // Mapear os itens existentes no pedido para fácil acesso
        const existingOrderItemsMap = new Map<string, OrderItem & { product: { price: number; unit: number; name: string; id: string; }; }>();

        order.items.forEach(item => {
            existingOrderItemsMap.set(item.id, item as OrderItem & { product: { price: number; unit: number; name: string; id: string; }; }); // Cast para incluir product
        });

        for (const itemData of items) {
            const existingItem = existingOrderItemsMap.get(itemData.orderItemId)

            if (!existingItem) {
                continue
            }

            if (itemData.quantity < 0) {
                throw new Error(`A quantidade do item ${existingItem.product.name} não pode ser negativa.`);
            }

            const oldQuantity = existingItem.quantity
            const newQuantity = itemData.quantity
            const quantityDifference = newQuantity - oldQuantity

            if (quantityDifference === 0) continue

            if (quantityDifference > 0) {
                const product = await productRepository.findById(existingItem.product.id)

                if (!product) {
                    throw new Error(`Produto com ID ${existingItem.productId} não encontrado.`);
                }

                if (product.unit < quantityDifference) {
                    throw new Error(`Estoque insuficiente para adicionar ${quantityDifference} unidades do produto '${product.name}'. Disponível: ${product.unit}`);
                }
            }

            const newOrderItemPrice = newQuantity * existingItem.product.price
            const itemPriceChange = newOrderItemPrice - existingItem.price

            totalOrderPriceChange += itemPriceChange

            itemsToUpdateInRepo.push({
                id: existingItem.id,
                quantity: newQuantity,
                price: newOrderItemPrice,
            });

            await productRepository.update(existingItem.product.id, {
                unit: existingItem.product.unit - quantityDifference
            })
            // await prisma.product.update({
            //     where: {
            //         id: item?.productId
            //     },
            //     data: {
            //         unit: {
            //             decrement: item?.unitDiff
            //         }
            //     }
            // })
        }

        const updatedOrder = await orderRepository.updateOrderAndItems(
            orderId,
            { price: order.price + totalOrderPriceChange }, // Atualiza o preço total do pedido
            itemsToUpdateInRepo
        );

        if (!updatedOrder) {
            throw new Error('Falha ao atualizar o pedido e seus itens.');
        }

        return updatedOrder;
    }
}
