import CardDetails from "@/components/cardstock";
import Stock from "@/types/stock";
import { useRouter } from "next/router";
import { Suspense } from "react";

export default function CardPage() {
    const router = useRouter()
    const name: string = router.query.name as string

    console.log(name)

    const cardStock: Stock = {
        foil: false,
        name: name,
        price: 50000,
        stock: 2,
        store: 'Kindle'
    }

    return (
        <div>
            <h1>{name}</h1>
            <p>Welcome to the page where the stock for {name} will be displayed</p>
            <div>
                <Suspense fallback="Retrieving stock...">
                    <CardDetails cardStock={cardStock}/>
                </Suspense>
            </div>
        </div>
    )
}