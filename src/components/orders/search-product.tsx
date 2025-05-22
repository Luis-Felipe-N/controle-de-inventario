"use client"

import { useState, useEffect } from "react"
import { useSearchProduct } from "@/hooks/useSearchProduct"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils/format-currency"
import { Button } from "../ui/button"

export function SearchProduct() {
    const [query, setQuery] = useState("")
    const [debouncedQuery, setDebouncedQuery] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(query)
        }, 500)
        return () => clearTimeout(timeout)
    }, [query])

    const { data: products, isLoading, error } = useSearchProduct(debouncedQuery)

    const handleAddProduct = async (producId: string, orderId: string) => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const payload = {
            productId: producId
        }

        try {
            await fetch(`/api/orders/product/${orderId}`, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            // queryClient.invalidateQueries({
            //     queryKey: ["orders", "OPEN"]
            // })
        } finally {
            // setIsSubmitting(false)
        }
    }

    return (
        <div className="space-y-4">
            <Input
                placeholder="Buscar produto..."
                value={query}
                onChange={e => setQuery(e.target.value)}
            />

            {isLoading && <p>Carregando...</p>}
            {error && <p>Erro ao buscar produtos</p>}

            {products && products.length > 0 ? (
                <ul className="space-y-2">
                    {products.map(product => (
                        <li key={product.id} className="p-2 border rounded flex items-center gap-4">
                            <span className="block p-1">
                                <img className="h-[40px] w-[40px] object-contain" src={product.image} alt="" />
                            </span>
                            <div className="flex-1">
                                <strong className="flex-1 text-black/60 block truncate w-64 text-base">{product.name}</strong>
                                <div className="flex justify-between">
                                    <strong className="text-black/60">R$ {formatCurrency(product.price)}</strong>
                                </div>
                            </div>
                            <Button onClick={handleAddProduct}>add</Button>
                        </li>
                    ))}
                </ul>
            ) : (
                debouncedQuery && !isLoading && <p>Nenhum produto encontrado</p>
            )}
        </div>
    )
}
