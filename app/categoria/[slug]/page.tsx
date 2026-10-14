import ProductList from "@/components/ProductList";
import { categories, products } from "@/data/products";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams(){
    return categories.map((c) => ({ slug: c.slug}));
}

export default async function CategoryPage({ params } : { params: Promise <{ slug: string }>}){
    const {slug} = await params;
    const category = categories.find((c) => c.slug === slug);
    if(!category) notFound();
    
    const items = products.filter((p) => p.category === category.slug);

    return (
        <main className="mx-auto max-w-6xl px-4 py-10 text-white">
            <Link href="/#categorias" className="text-sm to-zinc-900 hover:to-white">
                ← Volver a categorías
            </Link>
            <h1 className="mt-4 text-3xl font-bold">{category.label}</h1>
            <p className="mb-8 mt-1 to-zinc-400">{category.description}</p>
            <ProductList items={items} />
        </main>
    )
}