import Stock from "@/types/stock";


export default function CardDetails({cardStock}:{cardStock: Stock}) {
    return (
        <div>
            <h1>Store: {cardStock.store}</h1>
            <p>Price: {cardStock.price}</p>
            <p>Stock: {cardStock.stock}</p>
        </div>
    )
}