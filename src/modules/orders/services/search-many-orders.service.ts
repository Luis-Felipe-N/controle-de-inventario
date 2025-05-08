import { OrderRepository } from "../order.repository"


interface SearchOrdersRequest {

    page: number
}

export class SearchOrdersService {
    async execute({ page }: SearchOrdersRequest) {
        const repository = new OrderRepository()
        const orders = await repository.searchMany(page)

        return orders
    }
}
