import { Button } from "@/components/ui/button"

interface UpdateQuantityProps {
    quantity: number
    onIncrease: () => void
    onDecrease: () => void
}

export default function UpdateQuantity({ quantity, onIncrease, onDecrease }: UpdateQuantityProps) {
    return (
        <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="sm" onClick={onDecrease} disabled={quantity <= 1}>
                -
            </Button>
            <span className="w-6 text-center">{quantity}</span>
            <Button type="button" variant="outline" size="sm" onClick={onIncrease}>
                +
            </Button>
        </div>
    )
}
