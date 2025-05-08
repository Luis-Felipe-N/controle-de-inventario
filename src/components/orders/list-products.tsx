
import { formatDate } from "@/lib/utils/fomat-date";
import { getOrders } from "@/server/actions/orders/get-orders";
import { Order, OrderItem } from "@prisma/client";

interface SearchResultsProps {
    orders: Order[]
}

interface FetchOrdersResponse extends Order {
    items: OrderItem[]
}

async function fetchOrders(status: "OPEN" | "CLOSE"): Promise<FetchOrdersResponse[]> {
    const orders = await getOrders(status)

    return orders
}

export async function ListOrders() {
    const orders = await fetchOrders('OPEN')
    console.log(orders[0].items)
    if (orders && !orders.length) { return null }
    return (
        <div className="mb-8">
            <strong className="mb-2 block text-2xl">Comandas abertas</strong>
            <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
                {orders.map(order => (
                    <li key={order.id} className="bg-white p-3">
                        <div className="text-center">
                            <h2>{order.customer}</h2>
                            <small>Aberta às {formatDate(new Date(order.openedAt), true)}</small>
                        </div>
                        <ul className="mt-4 text-black/60">
                            {order.items.map(item => (
                                <li key={item.id} className="flex items-center">
                                    <span className="block p-1">
                                        <img className="h-[40px] w-[40px] object-contain" src={item.product.image} alt="" />
                                    </span>
                                    <span className="flex-1 block w-40 truncate text-base">{item.product.name}</span>
                                    <span className="me-6 block">1</span>
                                    <span>R$ {item.product.price}</span>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul >
        </div >
    )
}