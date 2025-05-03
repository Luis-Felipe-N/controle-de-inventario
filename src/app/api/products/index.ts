import { NextApiRequest, NextApiResponse } from "next"
import { ProductService } from "@/modules/product/product.service"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method === "GET") {
            const products = await ProductService.getAll()
            return res.status(200).json(products)
        }

        if (req.method === "POST") {
            const { name, price, unit, image, categoryId } = req.body
            const product = await ProductService.createProduct({ name, price, unit, image, categoryId })
            return res.status(201).json(product)
        }

        res.setHeader("Allow", ["GET", "POST"])
        return res.status(405).end(`Method ${req.method} Not Allowed`)
    } catch (error: any) {
        return res.status(400).json({ error: error.message })
    }
}

