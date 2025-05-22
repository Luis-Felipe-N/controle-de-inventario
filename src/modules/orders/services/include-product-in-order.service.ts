import { OrderStatus, Order, OrderItem } from '@prisma/client';
import { OrderRepository } from '../order.repository';
import { ProductRepository } from '@/modules/product/product.repository';
import { OrderItemRepository } from '@/modules/orderItems/order-item.repository';

interface IncludeProductInOrderParams {
    orderId: string;
    productId: string;
    quantity: number;
}

export class OrderService {
    /**
     * Adiciona um produto a um pedido existente.
     * Se o pedido não estiver aberto, um erro será lançado.
     * Se o produto não estiver ativo, um erro será lançado.
     *
     * @param params.orderId O ID do pedido ao qual adicionar o produto.
     * @param params.productId O ID do produto a ser adicionado.
     * @param params.quantity A quantidade do produto a ser adicionada.
     * @returns O item do pedido (OrderItem) criado ou atualizado.
     */
    async execute(params: IncludeProductInOrderParams): Promise<OrderItem> {
        const { orderId, productId } = params;

        const orderRepository = new OrderRepository()
        const productRepository = new ProductRepository()
        const orderItemRepository = new OrderItemRepository()


        const order = await orderRepository.findById(orderId);

        if (!order) {
            throw new Error(`Pedido com ID ${orderId} não encontrado.`);
        }

        if (order.status !== OrderStatus.OPEN) {
            throw new Error(`Não é possível adicionar produtos a um pedido com status '${order.status}'.`);
        }


        const product = await productRepository.findById(productId);

        if (!product) {
            throw new Error(`Produto com ID ${productId} não encontrado.`);
        }

        if (!product.active) {
            throw new Error(`O produto '${product.name}' não está ativo e não pode ser adicionado a um pedido.`);
        }

        let orderItem: OrderItem;
        const itemPrice = product.price * 1;

        const existingOrderItem = await orderItemRepository.findByOrderIdAndProductId(orderId, productId);

        if (existingOrderItem) {
            orderItem = await orderItemRepository.update(existingOrderItem.id, {
                quantity: existingOrderItem.quantity + 1,
                price: existingOrderItem.price + itemPrice,
            });
        } else {

            orderItem = await orderItemRepository.create({
                order: { connect: { id: orderId } },
                product: { connect: { id: productId } },
                quantity: 1,
                price: itemPrice,
            });
        }

        const updatedOrderPrice = order.price + itemPrice;
        await orderRepository.update(orderId, { price: updatedOrderPrice });
        await productRepository.update(productId, { unit: product.unit - 1 });

        return orderItem;
    }
}