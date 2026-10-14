export type CategorySlug = "ropa" | "cadenas" | "chalecos" | "coches" | "tatuajes";

export interface Category {
    slug: CategorySlug;
    label: string;
    description: string;
    image: string;
}

export interface Product {
    id: string;
    name: string;
    category: CategorySlug;
    description: string;
    priceFrom: number;
}

export const categories: Category[] = [
    {
        slug: "ropa",
        label: "Ropa",
        description: "Diseños y prendas personalizadas",
        image: "/images/categories/ropa.webp",
    },
    {
        slug: "cadenas",
        label: "Cadenas",
        description: "Accesorios personalizados",
        image: "/images/categories/cadenas.webp",
    },
    {
        slug: "chalecos",
        label: "Chalecos",
        description: "Estilo y protección",
         image: "/images/categories/chalecos.webp",
    },
    {
        slug: "coches",
        label: "Coches",
        description: "Vehículos y personalización",
        image: "/images/categories/coches.webp",
    },
    {
        slug: "tatuajes",
        label: "Tatuajes",
        description: "Diseños únicos para tu personaje",
        image: "/images/categories/tatuajes.webp",
    },
];

// información de la ropa
export const products: Product[] = [
    {
        id: "1",
        name: "Camiseta personalizada",
        category: "ropa",
        description: "disteño a tu medida",
        priceFrom: 20,
    },
    {
        id: "2",
        name: "hoodie personalizado",
        category: "ropa",
        description: "Con tu arte y acabados",
        priceFrom: 40,
    },
    {
        id: "3",
        name: "Cadenas cubana",
        category: "cadenas",
        description: "Varios largos y acabados",
        priceFrom: 30,
    },
    {
        id: "4",
        name: "Cadena con nombre",
        category: "cadenas",
        description: "Personaliza tu cadena con tu nombre y/o Logo",
        priceFrom: 25,
    },
    {
        id: "5",
        name: "chaleco de cuero",
        category: "chalecos",
        description: "Parches personalizados y acabados de calidad",
        priceFrom: 100,
    },
    {
        id: "6",
        name: "Chaleco tactico",
        category: "chalecos",
        description: "Protección y estilo para tu personaje",
        priceFrom: 150,
    },
    {
        id: "7",
        name: "Personalización de coche",
        category: "coches",
        description: "Vinilos, pintura y acabados de calidad",
        priceFrom: 50,
    },
];