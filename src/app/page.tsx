import { Income } from "@/components/income";
import Image from "next/image";

export default function Home() {
  return (
    <div className="p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          <h1>Inventário 2 de maio de 2025</h1>
          <h1 className="text-4xl font-bold">Distribuidora Bebidas</h1>
        </div>

        <Income />
      </main>
    </div>
  );
}
