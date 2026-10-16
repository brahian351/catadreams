import { categories } from "@/data/products";
import { ChevronDown, Heart, Search, ShoppingCart, User } from "lucide-react";
import Link from "next/link";


export default function Header() {
    return (
        <>
            {/* Barra superior */}
            <div className="border-b border-line bg-[#2a0614] py-2 text-center text-[10px] uppercase tracking-[0.25em] text-rose/90 sm:text-xs">
                <span>&#129419; Diseños únicos</span>
                <span className="mx-3 text-zinc-600">|</span>
                <span className="hidden sm:inline">Personaliza tu estilo</span>
                <span className="mx-3 hidden text-zinc-600 sm:inline">|</span>
                <span>Tu estilo sin límites</span>
            </div>
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-line bg-black/90 backdrop-blur">
                <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3">
                    {/* Logo */}

                    <Link href="/" className="flex items-center gap-3">
                        <span className="text-4xl">&#129419;</span>
                        <span className="leading-none">
                            <span className="block font-display text-3xl tracking-widest">CATA</span>
                            <span className="blox text-[9px] tracking-[0.6em] text-zinc-400">DREAMS</span>
                        </span>
                    </Link>
                    <nav className="hidden items-center gap-8 text-sm uppercase tracking-wider md:flex ">
                        <Link href="/" className="border-b-2 border-rose pb-1">Inicio</Link>

                        <div className="group relative">
                            <button className="flex items-center gap-1 pb-1 hover:text-rose">
                                Categorias  <ChevronDown className="h-4 w-4" />
                            </button>
                            <div className="invisible absolute left-0 top-full w-56 rounded-lg border border-line bg-black p-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
                                {categories.map((c) => (
                                    <Link key={c.slug} href={`/categoria/${c.slug}`} className="block rounded px-3 py-2 normal-case tracking-normal hover:bg-wine/40">
                                        {c.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <Link href="/#nosotros" className="pb-1 hover:text-rose">Nosotros</Link>
                        <a href={process.env.NEXT_PUBLIC_DISCORD_INVITE} target="_blank" rel="noreferrer" className="pb-1 hover:text-rose">Contacto</a>
                    </nav>
                    <div className="flex items-center gap-4">
                        <div className="hidden items-center rounded-full border border-zinc-700 px-4 py-2 lg:flex">
                            <input placeholder="Buscar productos..." className="w-40 bg-transparent text-sm placeholder:to-zinc-500 focus:outline-none" />
                            <Search className="h-4 w-4 to-zinc-300" />                                
                        </div>
                        <User className="h-6 w-6 cursor-pointer hover:text-rose" />
                        <Heart className="h-6 w-6 cursor-pointer hover:text-rose" />
                        <div className="relative">
                            <ShoppingCart className="h-6 w-6 cursor-pointer hover:text-rose" />
                            <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-rose text-[10px] font-bold">0</span>
                        </div>
                    </div>
                </div>

            </header>
        </>
    )
}