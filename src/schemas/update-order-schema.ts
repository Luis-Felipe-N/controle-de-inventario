import { z } from "zod";

export const UpdateOrderSchema = z.object({
    orderId: z.string().uuid(),
    items: z.array(
        z.object({
            orderItemId: z.string().uuid(),
            quantity: z.number().min(1),
        })
    )
})

export type UpdateOrderInput = z.infer<typeof UpdateOrderSchema>