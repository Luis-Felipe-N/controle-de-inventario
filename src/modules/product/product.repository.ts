import prisma from "@/lib/prisma"

export const ProductRepository = {
    findAll: () => prisma.product.findMany(),

    findById: (id: string) => prisma.product.findUnique({
        where: { id },
    }),

    create: (data: {
        name: string
        price: number
        unit: number
        image: string
        categoryId: string
    }) => prisma.product.create({
        data,
    }),

    update: (id: string, data: Partial<{ name: string; price: number; unit: number; image: string; categoryId: string }>) =>
        prisma.product.update({
            where: { id },
            data,
        }),

    delete: (id: string) => prisma.product.delete({ where: { id } }),
}