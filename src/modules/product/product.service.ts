import { ProductRepository } from "./product.repository"

export const ProductService = {
    fetchProductsByCategory
    getAll: () => ProductRepository.findAll(),

    getById: (id: string) => ProductRepository.findById(id),

    createProduct: async (data: {
        name: string
        price: number
        unit: number
        image: string
        categoryId: string
    }) => {
        if (data.price <= 0) throw new Error("Preço inválido")
        return ProductRepository.create(data)
    },

    updateProduct: (id: string, data: Partial<{ name: string; price: number; unit: number; image: string; categoryId: string }>) => {
        return ProductRepository.update(id, data)
    },

    deleteProduct: (id: string) => ProductRepository.delete(id),
}