import { useQuery } from "@tanstack/react-query"
import { getOrders } from "@/server/actions/orders/get-orders"
import { Order } from "@/types"

export function useListOrders(status: "OPEN" | "CLOSE") {
    return useQuery<Order[]>({
        queryKey: ["orders", status],
        queryFn: () => getOrders(status),
        enabled: !!status,

    })
}
