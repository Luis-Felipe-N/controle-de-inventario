import prisma from "@/lib/prisma"
import { Prisma, Product } from "@prisma/client"

export class ProductRepository {
    async create(data: Prisma.ProductCreateInput) {
        const product = await prisma.product.create({
            data,
        })

        return product
    }

    async updateProduct(id: string, data: Partial<Product>): Promise<Product | null> {
        const updatedProduct = await prisma.product.update({
            where: { id },
            data,
        });

        return updatedProduct;
    }

    async searchMany(query: string, page: number) {
        const products = await prisma.product.findMany({
            where: {
                name: {
                    contains: query,
                    mode: "insensitive"
                },
            },
            skip: (page - 1) * 20,
            take: 20,
        })

        return products
    }

    async findManyByCategoryName(categoryName: string, page: number) {
        const products = await prisma.product.findMany({
            where: {
                category: {
                    name: categoryName
                },
            },
            skip: (page - 1) * 20,
            take: 20,
        })

        return products
    }
}