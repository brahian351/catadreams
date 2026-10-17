"use client";

import { Product } from "@/data/products";
import { Heart, ZoomIn } from "lucide-react";
import { useState } from "react";
import TicketForm from "./TicketForm";
import ProductImageModal from "./ProductImageModal";

export default function ProductCards({ product }: { product: Product }) {
    const [viewing, setViewing] = useState(false);
    const [ticketOpen, setTicketOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [liked, setLiked] = useState(false);

    // Si la imagen no existe, se ve el degradado de fondo
    const bg = `${product.image ? `url('${product.image}'), ` : ""}linear-gradient(160deg, #2a0614, #050204)`;

    return (
        <>
            <article className="flex flex-col overflow-hidden rounded-b-xl border border-line bg-black/60">
                <div className="relative aspect-square bg-cover bg-center" style={{ backgroundImage: bg }}>
                    {/* Zona clicable: abre el modal */}
                    <button
                        onClick={() => setViewing(true)}
                        aria-label={`Ver imagen de ${product.name}`}
                        className="absolute inset-0 cursor-zoom-in bg-cover bg-center"
                        style={{ backgroundImage: bg }}
                    >
                        <span className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100">
                            <ZoomIn className="h-8 w-8 text-white" />
                        </span>
                    </button>
                    {product.isNew && (
                        <span className="abssolute left-3 t3 rounded-md border border-line bg-black/70 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose">
                            Nuevo
                        </span>
                    )}
                    <button onClick={() => setLiked(!liked)} aria-label="Favorito" className="absolute right-3 top-3">
                        <Heart className={`h-5 w-5 ${liked ? "fill-rose text-rose" : "text-white"}`} />
                    </button>
                </div>
                <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="mt-1 flex-1 text-sm text-zinc-400">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm to-zinc-300">
                            {product.priceFrom ? `Desde $${product.priceFrom}` : "Consultar"}
                        </span>
                        <button onClick={() => setOpen(true)} className="rounded-lg border border-rose px-3 py-1.5 text-sm font-medium uppercase tracking-wider text-rose transition hover:bg-rose hover:text-white">
                            Más Información
                        </button>
                    </div>
                </div>
            </article>
            {viewing && (
                <ProductImageModal
                    product={product}
                    onClose={() => setViewing(false)}
                    onMoreInfo={() => {
                        setViewing(false);
                        setTicketOpen(true);
                    }}
                />
            )}
            {open && <TicketForm productName={product.name} onclose={() => setOpen(false)} />}
        </>
    )
}