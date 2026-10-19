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
    imagePath?: string; // Ruta en Storage, para poder borrar la foto
    featured?: boolean; // aparece en Best Sellers
    isNew?: boolean;
    createdAt?: number;
}

export const categories: Category[] = [
    { slug: "ropa", label: "Ropa", tagline: "Estilo en cada detalle", image: "/images/categories/ropa.webp" },
    { slug: "accesorios", label: "Accesorios", tagline: "Complementa tu esencia", image: "/images/categories/accesorios.webp" },
    { slug: "vehiculos", label: "Vehículos", tagline: "Personaliza tu máquina", image: "/images/categories/vehiculos.webp" },
    { slug: "tatuajes", label: "Tatuajes", tagline: "Lleva tu historia en la piel", image: "/images/categories/tatuajes.webp" },
    { slug: "personalizaciones", label: "Personalizaciones", tagline: "Hazlo único", image: "/images/categories/personalizaciones.webp" },
];

// Ejemplos: reemplázalos por tus productos reales
export const seedProducts: Product[] = [
    { id: "staff1", name: "Uniforme de Staff", category: "ropa", description: "Pendiente", priceFrom: 80, image: "/images/productos/staff1.webp", featured: true, isNew: true },
    { id: "C-Angel", name: "Chaleco Angel", category: "ropa", description: "Pendiente", priceFrom: 28, image: "/images/productos/angel.webp", featured: true, isNew: true },
    { id: "Ch-smith", name: "Cadena Smith", category: "accesorios", description: "Pendiente", priceFrom: 32, image: "/images/productos/smith.webp", featured: true, isNew: true },
    { id: "C-Apostol", name: "Chaleco Apostol", category: "ropa", description: "Pendiente", priceFrom: 60, image: "/images/productos/apostol.webp", featured: true, isNew: true },
    { id: "LSC", name: "Los Santos Custom", category: "ropa", description: "Pendiente", priceFrom: 48, image: "/images/productos/santos.webp", featured: true, isNew: true },
   
];
