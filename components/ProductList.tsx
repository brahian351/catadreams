"use client";

import { useState } from "react";
import type { Product } from "@/data/products";
import TicketForm from "./TicketForm";

export default function ProductList({ items }: { items: Product[] }) {
    const [selected, setSelected] = useState<string | null>(null);
    if (items.length === 0) {
        return <p className="text-zinc-400">Pronto tendremos productos en esta categoria</p>
    }

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                    <article key={p.id} className="flex flex-col rounded-2xl border-zinc-800 bg-zinc-900 p-5 ">
                        <div className="mb-4 flex aspect-video items-center justify-center rounded-lg bg-zinc-800 text-sm text-zinc-600">
                            Imagen
                        </div>
                        <h3 className="font-semibold">{p.name}</h3>
                        <p className="mt-1 flex1 text-sm text-zinc-400">{p.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="text-sm text-zinc-300">{p.priceFrom ? `Desde $${p.priceFrom}` : "Consultar"}</span>
                            <button
                                onClick={() => setSelected(p.name)}
                                className="rounded-lg bg-purple-600 px-3 p-y-1.5 text-sm font-medium hover:bg-purple-700"
                            >
                                Más Información
                            </button>
                        </div>
                    </article>
                ))}
            </div>
            {selected && <TicketForm productName={selected} onclose={() => setSelected(null)} /> }
        </>
    )
}