import { ListOrders } from "@/components/orders/list-orders";
import { ListProducts } from "@/components/products/list-products";
import { formatDate } from "@/lib/utils/fomat-date";
import { getOrders } from "@/server/actions/orders/get-orders";
import { getProducts } from "@/server/actions/products/get-products";

async function fetchProducts(keyword: string) {
  const products = await getProducts(keyword)

  return products
}



export default async function Home() {
  const products = await fetchProducts('coca')


  return (
    <div className="bg-slate-100 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4 mb-4">
          <h1>Inventário {formatDate(new Date())}</h1>
          <h1 className="text-4xl font-bold">Distribuidora Bebidas</h1>
        </div>

        <ListOrders />
        <ListProducts products={products} />
      </main>
    </div>
  );
}
