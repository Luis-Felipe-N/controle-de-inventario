import { BellRing, Check, TrendingUp } from "lucide-react"

import { cn } from "@/lib/utils"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChartIncome } from "./chart"


const notifications = [
    {
        title: "Your call has been confirmed.",
        description: "1 hour ago",
    },
    {
        title: "You have a new message!",
        description: "1 hour ago",
    },
    {
        title: "Your subscription is expiring soon!",
        description: "2 hours ago",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export function Income({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-[380px]", className)} {...props}>
            <CardHeader>
                <CardTitle>Desempenho Financeiro — Maio</CardTitle>
                <CardDescription>Resumo dos ganhos obtidos ao longo do mês.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <h1>R$ 359,04</h1>
                <ChartIncome />
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Seus ganhos cresceram 5,2% em relação a abril <TrendingUp className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Janeiro - Maio 2025
                        </div>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}