"use client";

import type { Product } from "@/data/products";
import ProductCards from "./ProductCard";

export default function ProductList({ items }: { items: Product[] }) {
    if (items.length === 0) {
        return <p className="text-zinc-400">Pronto tendremos productos en esta categoria</p>
    }

    return (
        <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                   <ProductCards key={p.id}  product={p}/>
                ))}
            </div>
           
        </>
    )
}