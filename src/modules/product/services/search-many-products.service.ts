import { ProductRepository } from "../product.repository"

interface SearchProductsRequest {
    query: string
    page: number
}

export class SearchProductsService {
    async execute({ query, page }: SearchProductsRequest) {
        const repository = new ProductRepository()
        const products = await repository.searchMany(query, page)

        return products
    }
}
