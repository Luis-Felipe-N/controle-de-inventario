'use client'

import { Product } from "@prisma/client";

interface SearchResultsProps {
    products: Product[]
}

export function ListProducts({ products }: SearchResultsProps) {
    if (products && !products.length) { return null }

    return (
        <div>
            <strong className="mb-2 block text-2xl">Produtos Disponíveis</strong>
            <ul className="grid gap-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] md:grid-cols-[repeat(auto-fill,minmax(10rem,1fr))] grid-cols-[repeat(auto-fill,minmax(8rem,1fr))]">
                {products &&
                    products.map((product) => (
                        <li key={product.id} className="h-full w-full relative rounded border-transparent  hover:border-slate-100 transition">

                            {product.unit > 5 ? (
                                <span className="absolute right-0 text-white bg-emerald-500 font-bold p-2">
                                    <small>{product.unit}</small>
                                </span>
                            ) : (
                                <span className="absolute right-0 text-white bg-red-500 font-bold p-2">
                                    <small>POUCAS UNIDADES ({product.unit})</small>
                                </span>
                            )}


                            <img
                                width={308}
                                height={404}
                                className="h-full w-full object-cover"
                                src={product.image}
                                alt={product.name}
                            />

                            <div className="text-center pb-2">
                                <span>{product.name}</span>
                            </div>
                        </li>
                    ))
                }
            </ul >
        </div >
    )
}