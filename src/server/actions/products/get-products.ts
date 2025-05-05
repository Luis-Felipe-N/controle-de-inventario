import { api } from "@/lib/api"

export async function getProduct(keyword = '') {
    const response = await api(`/products?keyword=${keyword}`, {
        next: {
            revalidate: 60 * 60, // 1 hours
        },
    })

    const responseJson = await response.json()

    return responseJson.products
}