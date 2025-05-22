import { api } from "@/lib/api"

export async function getProducts(keyword = '') {
    const response = await api(`/products?query=${keyword}`, {
        next: {
            revalidate: 60 * 60, // 1 hours
        },
    })

    const responseJson = await response.json()

    return responseJson.products
}