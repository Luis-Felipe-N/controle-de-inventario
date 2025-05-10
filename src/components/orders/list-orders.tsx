
import { formatDate } from "@/lib/utils/fomat-date";
import { getOrders } from "@/server/actions/orders/get-orders";

import UpdateOrderDialog from "./update-order";
import { Order } from "@/types";
import { formatCurrency } from "@/lib/utils/format-currency";

interface FetchOrdersResponse extends Order {

}


async function fetchOrders(status: "OPEN" | "CLOSE"): Promise<FetchOrdersResponse[]> {
    const orders = await getOrders(status)

    return orders
}

export async function ListOrders() {
    const orders = await fetchOrders('OPEN')

    if (orders && !orders.length) { return null }

    return (
        <div className="mb-8">
            <strong className="mb-2 block text-2xl">Comandas abertas</strong>
            <ul className=" flex gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
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
                                    <span className="me-6 block">{item.quantity}</span>
                                    <span>R$ {formatCurrency(item.product.price)}</span>
                                </li>
                            ))}
                        </ul>
                        <UpdateOrderDialog order={order} />
                    </li>
                ))}
            </ul >
        </div >
    )
}