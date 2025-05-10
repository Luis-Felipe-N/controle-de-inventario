'use client'

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
import { Input } from "../ui/input"
import { formatCurrency } from "@/lib/utils/format-currency"
import { useState } from "react"
import UpdateQuantity from "./update-quantity"


interface UpdateOrderDialogProps {
    order: Order
}

export default function UpdateOrderDialog({ order }: UpdateOrderDialogProps) {

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

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Profile</Button>
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
                        <Input
                            id="link"
                            defaultValue="https://ui.shadcn.com/docs/installation"
                            readOnly
                        />
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
                    <Button type="submit">Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
