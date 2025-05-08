import { api } from "@/lib/api"

export async function getOrders(status: "OPEN" | "CLOSE") {
    const response = await api(`/orders?status=${status}`, {
        next: {
            revalidate: 60 * 60, // 1 hours
        },
    })

    const responseJson = await response.json()

    return responseJson.orders
}