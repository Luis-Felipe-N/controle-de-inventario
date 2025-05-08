import { OrderRepository } from "../order.repository"


interface FetchOrdersByStatusRequest {
    status: "OPEN" | "CLOSE"
    page: number
}

export class FetchOrdersByStatusService {
    async execute({ status, page }: FetchOrdersByStatusRequest) {
        const repository = new OrderRepository()
        const orders = repository.findManyByStatus(status, page)

        console.log(orders)
    }
}
