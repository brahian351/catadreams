import { Product } from "@/data/products";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";


export async function getProducts(): Promise<Product[]> {
    try {
        const snap = await getDocs(query(collection(db, "products"), orderBy("createdAt", "desc")));
        return snap.docs.map((d) => {
            const x = d.data();
            return {
                id: d.id,
                name: x.name,
                category: x.category,
                description: x.description ?? "",
                priceFrom: x.priceFrom,
                image: x.image,
                imagePath: x.imagePath,
                featured: Boolean(x.featured),
                isNew: Boolean(x.isNew),
                createdAt: x.createdAt,
            } as Product;
        });
    } catch (err) {
        console.error("Error leyendo productos: ", err);
        return [];
    }

}