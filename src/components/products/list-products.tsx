'use client'

import { Product } from "@prisma/client";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

interface ListProductsProps {
    products: Product[]
}

export function ListProducts({ products }: ListProductsProps) {
    if (products && !products.length) { return null }

    return (
        <div>
            <strong className="mb-2 block text-2xl">Produtos Disponíveis</strong>
            <ul className="grid gap-2 ">
                <Swiper
                    slidesPerView={'auto'}
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                    }}
                    className="mySwiper"
                >
                    {products &&
                        products.map((product) => (
                            <SwiperSlide key={product.id}>
                                <li className="w-[330px] relative rounded border-transparent bg-white hover:border-slate-100 transition">
                                    {product.unit > 5 ? (
                                        <span className="absolute right-0 text-white bg-emerald-500 font-bold p-2">
                                            <small>{product.unit}</small>
                                        </span>
                                    ) : (
                                        <span className="absolute right-0 text-white bg-red-500 font-bold p-2">
                                            <small>POUCAS UNIDADES ({product.unit})</small>
                                        </span>
                                    )}

                                    <div className="p-4 h-[330px] aspect-square flex justify-center items-center">
                                        <img
                                            className="object-contain py-12"
                                            src={product.image}
                                            alt={product.name}
                                        />
                                    </div>

                                    <div className="text-center pb-2 px-8">
                                        <small>{product.name}</small>
                                    </div>
                                </li>
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </ul>

        </div >
    )
}