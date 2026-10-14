import { categories } from "@/data/products";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      {/* NAVBAR */}
      <header className="fixed left-0 top-0 w-full border-b border-white/10 bg-white backdrop-blur-xl z-50">
        <div className="mx-auto flex h-20 max-w7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase text-[#6d0c33]">
            Cata Dreams &#129419;
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            <Link
              href="/"
              className="text-sm text-[#6d0c33] transition hover:text-black/60"
            >
              Inicio
            </Link>

            <Link
              href="#categorias"
              className="text-sm text-[#6d0c33]/70 transition hover:text-black"
            >
              Categorías
            </Link>
          </nav>
          <Link
            href="#categorias"
            className="rounded-full border text-[#6d0c33] border-white/20 px-5 py-2.5 text-sm font-medium transition hover:bg-white hover:text-black"
          >
            Explorar
          </Link>
        </div>
      </header>

      {/* hero section */}
      <section className="relative felx min-h-screen items-center overflow-hidden">
        {/* efectos fondo */}
        <div className="absolute left-1/2 top-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#6d0c33]/20 blur-3xl" />
        <div className="relative mx-auto w-full max-w-7xl px-6 pt-20 lg:px-8">
          <div className="max-w-4xl">
            <p className="mb-6 text-sm font-medium leading-[0.95] tracking-tight sm:text-7xl lg:text-8xl">
              Personalización • Estilo • Exclusividad
            </p>
            <h1 className="text-5xl font-bold leading-[0.95] tracking-tight uppercase sm:text-7xl lg:text-8xl">
              Tu Estilo
              <br />
              <span className="uppercase text-white/40">Tu Identidad</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-white/60 sm:text-lg">
              {/* Descubre una nueva forma de expresar tu estilo único con nuestros diseños exclusivos. */}
              Descubre productos personalizados diseñados para representar tu
              estilo. Ropa, accesorios, vehículos, tatuajes y mucho más.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="#categorias"
                className="rounded-full bg-[#6d0c33] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6d0c33]/80"
              >
                Ver Colección
              </Link>
              <Link
                href="#"
                className="rounded-full border border-white/20 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-white/10"
              >
                Contáctanos
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Categorias */}
      <section id="categorias" className="border-t border-white/10 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="mb-3 text-xs font-medium tracking-[0.3em] text-white/40 uppercase">
                Explora
              </p>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
                Categorías
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-white/50">
              Descubre nuestra amplia selección de categorías diseñadas para satisfacer tus necesidades y preferencias.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link key={c.slug} href={`/categoria/${c.slug}`} className="group relative min-h-70 overflow-hidden rounded-2xl border border-white/10 bg-[#6d0c33]/5 ">

                <div key={c.label}>
                  {/* Imagen */}
                  <div className="absolute inset-0 bg-zinc-800 transition duration-500 group-hover:scale-105 text-shadow-2xs text-shadow-[#6d0c33]">
                    <Image
                      width={500}
                      height={500}
                      src={c.image}
                      alt={c.label}
                      className="h-full w-full object-center object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* Degradado */}
                  <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent ">
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <h3 className="text-xl font-semibold text-shadow-2xs text-shadow-[#6d0c33]">
                        {c.label}
                      </h3>
                      <p className="mt-1 text-sm text-white/50">
                        {c.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

          </div>
        </div>
      </section>
      <footer className="border-t border-white/10 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>CataDreams</span>

          <span>© 2026 Todos los derechos reservados.</span>
        </div>
      </footer>
    </main>
  );
}
