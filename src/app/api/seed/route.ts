// pages/api/seed.ts
import { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { NextRequest, NextResponse } from 'next/server'

const prisma = new PrismaClient()

export async function GET(req: NextRequest) {

    try {
        // Criar categorias
        const categories = await Promise.all(
            Array.from({ length: 3 }).map(() =>
                prisma.category.create({
                    data: { name: faker.commerce.department() }
                })
            )
        )

        // Criar produtos
        const products = await Promise.all(
            Array.from({ length: 10 }).map(() =>
                prisma.product.create({
                    data: {
                        name: faker.commerce.productName(),
                        image: faker.image.url(),
                        price: parseFloat(faker.commerce.price()),
                        unit: faker.number.int({ min: 1, max: 50 }),
                        categoryId: faker.helpers.arrayElement(categories).id,
                    }
                })
            )
        )

        // Criar pedidos
        for (let i = 0; i < 5; i++) {
            const order = await prisma.order.create({
                data: {
                    customer: faker.person.fullName(),
                    price: 0,
                    status: 'OPEN',
                    items: {
                        create: Array.from({ length: 2 }).map(() => {
                            const product = faker.helpers.arrayElement(products)
                            const quantity = faker.number.int({ min: 1, max: 5 })
                            const price = product.price * quantity
                            return {
                                quantity,
                                price,
                                productId: product.id,
                            }
                        }),
                    },
                },
                include: { items: true }
            })

            const totalPrice = order.items.reduce((sum, item) => sum + item.price, 0)
            await prisma.order.update({
                where: { id: order.id },
                data: { price: totalPrice }
            })
        }

        return NextResponse.json({ message: 'Seed completo 🚀' }, { status: 200 })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Erro ao gerar seed' }, { status: 500 })
    } finally {
        await prisma.$disconnect()
    }
}
