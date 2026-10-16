export type CategorySlug = "ropa" | "accesorios" | "vehiculos" | "tatuajes" | "personalizaciones";

export interface Category {
    slug: CategorySlug;
    label: string;
    tagline: string;
    image: string;
}

export interface Product {
    id: string;
    name: string;
    category: CategorySlug;
    description: string;
    priceFrom?: number;
    image?: string;
    featured?: boolean; // aparece en Best Sellers
    isNew?: boolean;
}

export const categories: Category[] = [
    { slug: "ropa", label: "Ropa", tagline: "Estilo en cada detalle", image: "/images/categorias/ropa.webpg" },
    { slug: "accesorios", label: "Accesorios", tagline: "Complementa tu esencia", image: "/images/categorias/accesorios.webpg" },
    { slug: "vehiculos", label: "Vehículos", tagline: "Personaliza tu máquina", image: "/images/categorias/vehiculos.webpg" },
    { slug: "tatuajes", label: "Tatuajes", tagline: "Lleva tu historia en la piel", image: "/images/categorias/tatuajes.webpg" },
    { slug: "personalizaciones", label: "Personalizaciones", tagline: "Hazlo único", image: "/images/categorias/personalizaciones.webpg" },
];

// Ejemplos: reemplázalos por tus productos reales
export const products: Product[] = [
    { id: "hoodie-butterfly", name: "Hoodie Butterfly", category: "ropa", description: "Hoodie negro con mariposa bordada.", priceFrom: 55, image: "/images/productos/hoodie.webpg", featured: true, isNew: true },
    { id: "gorra-butterfly", name: "Gorra Butterfly", category: "accesorios", description: "Gorra negra con detalle rosa.", priceFrom: 28, image: "/images/productos/gorra.webpg", featured: true, isNew: true },
    { id: "camiseta-oversize", name: "Camiseta Oversize", category: "ropa", description: "Estampado exclusivo, corte oversize.", priceFrom: 32, image: "/images/productos/camiseta.webpg", featured: true, isNew: true },
    { id: "mochila-butterfly", name: "Mochila Butterfly", category: "accesorios", description: "Mochila negra personalizada.", priceFrom: 60, image: "/images/productos/mochila.webpg", featured: true, isNew: true },
    { id: "pantalon-cargo", name: "Pantalón Cargo", category: "ropa", description: "Cargo con detalles bordados.", priceFrom: 48, image: "/images/productos/pantalon.webpg", featured: true, isNew: true },
    { id: "cadena-cubana", name: "Cadena cubana", category: "accesorios", description: "Varios largos y acabados.", priceFrom: 90 },
    { id: "coche-wrap", name: "Wrap y vinilos", category: "vehiculos", description: "Personalización de pintura y vinilos.", priceFrom: 300 },
    { id: "tatuaje-mariposa", name: "Tatuaje personalizado", category: "tatuajes", description: "Diseño exclusivo para tu personaje.", priceFrom: 60 },
    { id: "diseno-exclusivo", name: "Diseño exclusivo", category: "personalizaciones", description: "Cuéntanos tu idea y la creamos.", priceFrom: 40 },
];

// export const categories: Category[] = [
//     {
//         slug: "ropa",
//         label: "Ropa",
//         description: "Diseños y prendas personalizadas",
//         image: "/images/categories/ropa.webp",
//     },
//     {
//         slug: "cadenas",
//         label: "Cadenas",
//         description: "Accesorios personalizados",
//         image: "/images/categories/cadenas.webp",
//     },
//     {
//         slug: "chalecos",
//         label: "Chalecos",
//         description: "Estilo y protección",
//          image: "/images/categories/chalecos.webp",
//     },
//     {
//         slug: "coches",
//         label: "Coches",
//         description: "Vehículos y personalización",
//         image: "/images/categories/coches.webp",
//     },
//     {
//         slug: "tatuajes",
//         label: "Tatuajes",
//         description: "Diseños únicos para tu personaje",
//         image: "/images/categories/tatuajes.webp",
//     },
// ];

// // información de la ropa
// export const products: Product[] = [
//     {
//         id: "1",
//         name: "Camiseta personalizada",
//         category: "ropa",
//         description: "disteño a tu medida",
//         priceFrom: 20,
//     },
//     {
//         id: "2",
//         name: "hoodie personalizado",
//         category: "ropa",
//         description: "Con tu arte y acabados",
//         priceFrom: 40,
//     },
//     {
//         id: "3",
//         name: "Cadenas cubana",
//         category: "cadenas",
//         description: "Varios largos y acabados",
//         priceFrom: 30,
//     },
//     {
//         id: "4",
//         name: "Cadena con nombre",
//         category: "cadenas",
//         description: "Personaliza tu cadena con tu nombre y/o Logo",
//         priceFrom: 25,
//     },
//     {
//         id: "5",
//         name: "chaleco de cuero",
//         category: "chalecos",
//         description: "Parches personalizados y acabados de calidad",
//         priceFrom: 100,
//     },
//     {
//         id: "6",
//         name: "Chaleco tactico",
//         category: "chalecos",
//         description: "Protección y estilo para tu personaje",
//         priceFrom: 150,
//     },
//     {
//         id: "7",
//         name: "Personalización de coche",
//         category: "coches",
//         description: "Vinilos, pintura y acabados de calidad",
//         priceFrom: 50,
//     },
// ];