import { ProductRepository } from "../product.repository"

interface FetchProductsByCategoryRequest {
    category: string
    page: number
}

export class FetchProductsByCategoryService {
    async execute({ category, page }: FetchProductsByCategoryRequest) {
        const repository = new ProductRepository()
        const products = repository.findManyByCategoryName(category, page)

        console.log(products)
    }
}
