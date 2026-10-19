import ProductCards from "@/components/ProductCard";
import { ArrowRight, Car, Gem, Headphones, Heart,  PenTool, Settings, ShieldCheck, Shirt, ShoppingBag, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { categories, type CategorySlug } from "@/data/products";
import { getProducts } from "@/lib/product";

const categoryIcons : Record<CategorySlug, LucideIcon> = {
  ropa: Shirt,
  accesorios: ShoppingBag,
  vehiculos: Car,
  tatuajes: PenTool,
  personalizaciones: Settings,
};

const features  = [
  {icon: Gem, title: "Productos 100% exclusivos", text: "Solo en Cata Dreams"},
  {icon: ShieldCheck, title: "Pagos seguros", text: "Tu información protegida"},
  {icon: Headphones, title: "Atención personalizada", text: "Estamos para ayudarte"},
  {icon: Heart, titile: "Disñeos único", text: "Tu estilo, sin limites"},
]

export const revalidate = 60; // la web se refresca sola cada 60 s

export default async function Home(){
  const products = await getProducts();
  const featured = products.filter((p) => p.featured).slice(0,5);

  return (
    <main>
      {/* HERO */}
      <section 
        className="relative border-b border-line" 
        style={{ 
          backgroundImage: "linear-gradient(90deg, #050204 0%, rgba(5,2,4,.85) 35%, rgba(5,2,4,.1) 100%), url('/images/hero.webp'), radial-gradient(circle at 75% 40%, #7a0b3a, #050204 70%)",
          backgroundSize: "cover",
          backgroundPosition: "center right",
          }}
        >
          <div className="mx-auto max-w-7xl px-4 py-16 sm:py-24">
            <p className="text-sm uppercase tracking-[0.5em] text-rose">Cata Dreams</p>
            <h1 className="mt-4 font-display text-5xl leading-tight sm:text-7xl">Tu estilo,</h1>
            <p className="bg-gradient-to-r from-rose to-wine bg-clip-text font-brush text-6xl italic text-transparent sm:text-8xl">
              ropa · Accesorios · Vehículos · Tatuajes · Personalizaciones
            </p>
            <Link href="#categoras" className="mt-8 inline-flex items-center gap-3 rounded-full border border-rose bg-wine px-8 py-3 text-sm uppercase tracking-widest transition hover:bg-rose ">
              Explorar colección <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
      </section>
      {/* CATEGORIAS */}
      <section id="categorias" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => {
            const Icon = categoryIcons[c.slug];
            return (
              <Link 
                key={c.slug}
                href={`/categoria/${c.slug}`}
                className="group relative flex h-52 flex-col justify-end overflow-hidden rounded-xl border border-line"
                style={{
                  backgroundImage: `linear-gradient(to top, #050204 5%, rgba(5,2,4,.2) 60%), url('${c.image}'), linear-gradient(160deg, #3a0a1f, #050204)`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="flex items-center gap-3 p-4">
                  <Icon className="h-7 w-7 shrink-0 text-rose" />
                  <div className="flex-1">
                      <p className="text-sm font-semibold uppercase tracking-wide">{c.label}</p>
                      <p className="text-sm to-zinc-400">{c.tagline}</p>
                  </div>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-500 transition group-hover:border-rose group-hover:bg-rose">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      {/* BENEFICIOS */}
      <section id="nosotros" className="mx-auto max-w-7xl scroll-mt-24 border-b border-line px-4 py-8">
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex items-center gap-4">
              <Icon className="h-9  w-9 shrink-0 text-rose" />
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wide">{title}</p>
                <p className="text-xs text-zinc-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto max-w-7xl px-4 py-12">
          <div className="mb-6 flex items-end justify-baseline">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-rose">&#129419; Los más amados</p>
              <h2 className="font-brush text-5xl italic">Best <span className="text-rose">Sellers</span></h2>
            </div>
            <Link className="flex items-center gap-2 text-sm hover:text-rose" href="#categorias">
              Ver todos los productos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {featured.map((p) => (
              <ProductCards key={p.id} product={p} />
            ))}
          </div>
      </section>
    </main>
  )
}