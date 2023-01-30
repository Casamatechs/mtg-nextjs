import Cards from "@/types/cards";
import { Combobox, Transition } from '@headlessui/react';
import React, { Fragment, useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function SearchBar() {
    const router = useRouter()
    const [query, setQuery] = useState<string>('')
    const [cards, setCards] = useState<string[]>([])
    const [selectedCard, setSelectedCard] = useState<string>('')

    useEffect(() => {
        console.log('Running useEffect to call the API')
        const getData = setTimeout(() => {
            handleChange(query)
        }, 500);
        return () => clearTimeout(getData)
    }, [query])

    useEffect(() => {
        console.log('Running useEffect to navigate to a new page')
        if (selectedCard !== '') {
            console.log(selectedCard)
            router.push('/card/' + selectedCard)
        }
    }, [selectedCard])

    const handleChange = (cardName: string) => {
        console.log('Calling API');
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
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className="w-full border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
                        displayValue={(card: string) => card}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </div>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery('')}
                >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {cards.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            cards.map((card) => (
                                <Combobox.Option
                                    key={card}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-teal-600 text-white' : 'text-gray-900'
                                        }`
                                    }
                                    value={card}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {card}
                                            </span>
                                            {selected ? (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                                                        }`}
                                                >
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </Transition>
            </div>
        </Combobox>
    )
}