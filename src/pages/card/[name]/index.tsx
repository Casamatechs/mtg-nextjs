import { useRouter } from "next/router";
import Link from 'next/link';

export default function CardPage() {
    const router = useRouter()
    const name: string = router.query.name as string

    console.log(name)

    return (
        <div>
            <h1>{name}</h1>
            <p>Welcome to the page where the stock for {name} will be displayed</p>
        </div>
    )
}