import { Income } from "@/components/income";
import { ListProducts } from "@/components/products/list-products";
import { formatDate } from "@/lib/utils/fomat-date";
import { getProduct } from "@/server/actions/products/get-products";

async function search(keyword: string) {
  const products = await getProduct(keyword)

  return products
}

export default async function Home() {



  const products = await search('coca')

  return (
    <div className="bg-slate-50 p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          <h1>Inventário {formatDate(new Date())}</h1>
          <h1 className="text-4xl font-bold">Distribuidora Bebidas</h1>
        </div>

        <ListProducts products={products} />
        <Income />
      </main>
    </div>
  );
}
