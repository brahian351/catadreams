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
    { slug: "ropa", label: "Ropa", tagline: "Estilo en cada detalle", image: "/images/categories/ropa.webp" },
    { slug: "accesorios", label: "Accesorios", tagline: "Complementa tu esencia", image: "/images/categories/accesorios.webp" },
    { slug: "vehiculos", label: "Vehículos", tagline: "Personaliza tu máquina", image: "/images/categories/vehiculos.webp" },
    { slug: "tatuajes", label: "Tatuajes", tagline: "Lleva tu historia en la piel", image: "/images/categories/tatuajes.webp" },
    { slug: "personalizaciones", label: "Personalizaciones", tagline: "Hazlo único", image: "/images/categories/personalizaciones.webp" },
];

// Ejemplos: reemplázalos por tus productos reales
export const products: Product[] = [
    { id: "staff1", name: "Uniforme de Staff", category: "ropa", description: "Pendiente", priceFrom: 80, image: "/images/productos/staff1.webp", featured: true, isNew: true },
    { id: "C-Angel", name: "Chaleco Angel", category: "ropa", description: "Pendiente", priceFrom: 28, image: "/images/productos/angel.webp", featured: true, isNew: true },
    { id: "Ch-smith", name: "Cadena Smith", category: "accesorios", description: "Pendiente", priceFrom: 32, image: "/images/productos/smith.webp", featured: true, isNew: true },
    { id: "C-Apostol", name: "Chaleco Apostol", category: "ropa", description: "Pendiente", priceFrom: 60, image: "/images/productos/apostol.webp", featured: true, isNew: true },
    { id: "LSC", name: "Los Santos Custom", category: "ropa", description: "Pendiente", priceFrom: 48, image: "/images/productos/santos.webp", featured: true, isNew: true },
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