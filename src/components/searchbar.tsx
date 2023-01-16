import Cards from "@/types/cards";
import { Combobox, Menu } from '@headlessui/react';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const [cards, setCards] = useState<string[]>([])
    const [selectedCard, setSelectedCard] = useState<string>('')

    useEffect(() => {
        const getData = setTimeout(() => {
            handleChange(query)
        }, 500);
        return () => clearTimeout(getData)
    }, [query])

    useEffect(() => {
        if (selectedCard !== '') {
            console.log(selectedCard)
            router.push('/card/' + selectedCard)
        }
    }, [selectedCard])

    const handleChange = (cardName: string) => {
        console.log(cardName);
        if (cardName.length > 2) {
            fetch(`https://openbinder.co.kr/cardnameonlysearch.php?term=${cardName}`)
                .then(resp => resp.json())
                .then((data: Cards[]) => {
                    setCards(data.map(c => c.label));
                });
        }
    };

    return (
        <Combobox value={selectedCard} onChange={setSelectedCard}>
            <Combobox.Input onChange={(event) => setQuery(event.target.value)}></Combobox.Input>
            <Combobox.Options>
                {cards.map((card) => {
                    return <Combobox.Option key={card} value={card}>
                        {card}
                    </Combobox.Option>;
                })}
            </Combobox.Options>
        </Combobox>
    )
}