"use client";

import { Product } from "@/data/products";
import { X } from "lucide-react";
import { useEffect } from "react";

interface Props {
    product: Product;
    onClose: () => void;
    onMoreInfo: () => void;
}

export default function ProductImageModal({ product, onClose, onMoreInfo }: Props) {
    // Cierra con Escape y bloquea el scrool de la pagina mientras está abierto
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        document.addEventListener("keydown", onKey);
        const previus = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = previus;
        }
    }, [onClose]);

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-label={product.name}
            onClick={onClose}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-line bg-[#0a0306] md:grid-cols-[1.2fr_1fr]"
            >
                <button
                    onClick={onClose}
                    aria-label="Cerrar"
                    className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-black/70 hover:border-rose hover:text-rose"
                >
                    <X className="h-5 w-5" />
                </button>

                {/* Imagen grande */}
                <div className="flex min-h-[280px] items-center justify-center bg-[radial-gradient(circle_at_50%_40%,#3a0a1f,#050204_75%)]">
                    {product.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={product.image}
                            alt={product.name}
                            className="max-h-[60vh] w-full object-contain md:max-h-[90vh]"
                        />
                    ) :
                        (
                            <span className="text-6xl">&#129419;</span>
                        )
                    }
                </div>

                {/* Información */}
                <div className="flex flex-col justify-center gap-4 overflow-y-auto p-6 md:p-8">
                    {product.isNew && (
                        <span className="w-fit rounded-md border border-line px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-rose">
                            Nuevo
                        </span>
                    )}
                    <h2 className="font-display text-3xl">{product.name}</h2>
                    <p className="text-zinc-400">{product.description}</p>
                    <p className="text-lg to-zinc-200">
                        {product.priceFrom ? `Desde $${product.priceFrom}` : "Consultar precio"}
                    </p>
                    <button
                        onClick={onMoreInfo}
                        className="mt-2 rounded-full border border-rose bg-wine px-6 py-3 text-sm uppercase tracking-widest transition hover:bg-rose"
                    >
                        Mas información
                    </button>
                </div>
            </div>
        </div>
    )
}