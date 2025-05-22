// hooks/useSearchProduct.ts
import { useQuery } from "@tanstack/react-query"
import { getProducts } from "@/server/actions/products/get-products"
import { Product } from "@prisma/client"

export function useSearchProduct(query: string) {
    return useQuery<Product[]>({
        queryKey: ["products", query],
        queryFn: () => getProducts(query),
        enabled: !!query, // só executa se houver query
    })
}
