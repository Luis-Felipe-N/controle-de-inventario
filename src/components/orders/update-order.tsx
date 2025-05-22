import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Order } from "@/types"
import { Label } from "../ui/label"
import { formatCurrency } from "@/lib/utils/format-currency"
import { useState } from "react"
import { SearchProduct } from "./search-product"
import UpdateQuantity from "./update-quantity"
import { UpdateOrderSchema } from "@/schemas/update-order-schema"
import { Loader2 } from "lucide-react"
import { queryClient } from "@/providers/useQueryProvider"

interface UpdateOrderDialogProps {
    order: Order
}

export default function UpdateOrderDialog({ order }: UpdateOrderDialogProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [quantities, setQuantities] = useState(
        () => order.items.map(item => item.quantity)
    )

    const updateQuantity = (index: number, newQuantity: number) => {
        setQuantities(prev => {
            const updated = [...prev]
            updated[index] = newQuantity
            return updated
        })
    }

    const total = order.items.reduce((acc, item, idx) =>
        acc + item.product.price * quantities[idx], 0
    )

    const handleUpdateOrder = async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);

        const payload = {
            orderId: order.id,
            items: order.items.map((item, idx) => ({
                orderItemId: item.id,
                quantity: quantities[idx],
            })),
        }

        const parsed = UpdateOrderSchema.safeParse(payload)

        if (!parsed.success) {
            console.error(parsed.error.format())
            alert("Erro na validação dos dados")
            return
        }

        try {
            await fetch(`/api/orders/update/${order.id}`, {
                method: "PUT",
                body: JSON.stringify(parsed.data),
                headers: {
                    "Content-Type": "application/json",
                }
            })

            queryClient.invalidateQueries({
                queryKey: ["orders", "OPEN"]
            })
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="mt-2 w-full" variant="outline">Atualizar Comanda</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Comanda ({order.customer})</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <Label htmlFor="link" className="sr-only">
                            Pesquisar produto
                        </Label>
                        <SearchProduct />
                    </div>
                </div>
                <ul className="mt-4 space-y-6 text-black/60">
                    {order.items.map((item, idx) => (
                        <li key={item.id} className="flex items-center ">
                            <span className="block p-1">
                                <img className="h-[40px] w-[40px] object-contain" src={item.product.image} alt="" />
                            </span>
                            <div className="flex-1">
                                <strong className="flex-1 block truncate w-64 text-base">{item.product.name}</strong>
                                <div className="flex justify-between">
                                    <UpdateQuantity
                                        quantity={quantities[idx]}
                                        onIncrease={() => updateQuantity(idx, quantities[idx] + 1)}
                                        onDecrease={() => updateQuantity(idx, quantities[idx] - 1)}
                                    />
                                    <strong>R$ {formatCurrency(item.product.price * quantities[idx])}</strong>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                <hr />
                <div>
                    <div className="flex justify-between">
                        <strong>Subtotal</strong>
                        <strong>R$ {formatCurrency(total)}</strong>
                    </div>
                </div>
                <DialogFooter>
                    {isSubmitting ? (
                        <Button type="submit" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Carregando
                        </Button>
                    ) : (
                        <Button type="submit" onClick={handleUpdateOrder}>
                            <span>Salvar</span>
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
