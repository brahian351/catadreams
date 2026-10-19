"use client";
import { useCallback, useEffect, useState, type FormEvent } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { auth, db, storage } from "@/lib/firebase";
import { getProducts } from "@/lib/product";
import { categories, seedProducts, type CategorySlug, type Product } from "@/data/products";
import { features } from "process";


const ADMINS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLocaleLowerCase())
    .filter(Boolean);

interface FormState {
    name: string;
    category: CategorySlug;
    description: string;
    priceFrom: string;
    featured: boolean;
    isNew: boolean;
}

const emptyForm: FormState = {
    name: "",
    category: "ropa",
    description: "",
    priceFrom: "",
    featured: false,
    isNew: true,
}
const slugify = (s: string) =>
    s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "producto";

// Firestore no recibe valores null o undedined 
const clean = <T extends object>(o: T): T => JSON.parse(JSON.stringify(o));

// Reduce a max 1200PX y convierte a webp
async function toWebp(file: File, max = 1200) {
    const bmp = await createImageBitmap(file);
    const scale = Math.min(1, max / Math.max(bmp.width, bmp.height),);
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bmp.width * scale);
    canvas.height = Math.round(bmp.height * scale);
    canvas.getContext("2d")!.drawImage(bmp, 0, 0, canvas.width, canvas.height);

    const encode = (type: string, quality: number) =>
        new Promise<Blob | null>((res) =>
            canvas.toBlob(res, type, quality),
        );

    let blob = await encode("image/webp", 0.82);
    let ext = "webp";

    if (!blob || blob.type !== "image/webp") {
        blob = await encode("image/jpeg", 0.85);
        ext = "jpg"
    }
    if (!blob) throw new Error("No se pudo convertir la imagen")

    return { blob, ext }
}

export default function AdminPage() {
    const [user, setUser] = useState<User | null>(null);
    const [authReady, setAuthReady] = useState(false);
    const [items, setItems] = useState<Product[]>([]);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [editing, setEditing] = useState<Product | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [msg, setMsg] = useState("");

    const isAdmin = !!user?.email && ADMINS.includes(user.email.toLocaleLowerCase());

    useEffect(() => {
        return onAuthStateChanged(auth, (u) => {
            setUser(u),
                setAuthReady(true);
        })
    }, []);

    const load = useCallback(async () => setItems(await getProducts()), []);
    useEffect(() => {
        if (isAdmin) load();
    }, [isAdmin, load]);

    function reset() {
        setForm(emptyForm);
        setEditing(null);
        setFile(null);
        setPreview(null);
    }

    function startEdit(p: Product) {
        setEditing(p);
        setForm({
            name: p.name,
            category: p.category,
            description: p.description,
            priceFrom: p.priceFrom ? String(p.priceFrom) : "",
            featured: !!p.featured,
            isNew: !!p.isNew,
        });
        setFile(null);
        setPreview(p.image ?? null);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function onFile(f: File | null) {
        setFile(f);
        setPreview(f ? URL.createObjectURL(f) : (editing?.image ?? null))
    }

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        if (!form.name.trim()) return;
        setSaving(true);
        setMsg("");
        try {
            let image = editing?.image;
            let imagePath = editing?.imagePath;

            if (file) {
                const { blob, ext } = await toWebp(file);
                const path =
                    `productos/${Date.now()}-${slugify(form.name)}.${ext}`;
                const r = ref(storage, path);
                await uploadBytes(r, blob, {
                    contentType: blob.type,
                    cacheControl: "public,max-age=31536000",
                });
                image = await getDownloadURL(r);
                if (editing?.imagePath) {
                    await deleteObject(ref(storage, editing.imagePath))
                        .catch(() => { });
                }
                imagePath = path;
            }

            const id = editing?.id ?? `${slugify(form.name)}-${Date.now().toString(36)}`;
            await setDoc(
                doc(db, "products", id),
                clean({
                    name: form.name.trim(),
                    category: form.category,
                    description: form.description.trim(),
                    priceFrom: form.priceFrom ? Number(form.priceFrom) : undefined,
                    featured: form.featured,
                    isNew: form.isNew,
                    image,
                    imagePath,
                    createdAt: editing?.createdAt ?? Date.now(),
                }),
            );
            setMsg(editing ? "Producto actualizado ✅" : "Producto creado ✅");
            reset();
            await load();
        } catch (err) {
            console.log(err)
            setMsg("Error al guardar. Comunicate con soporte ")
        } finally {
            setSaving(false);
        }
    }

    async function onDelete(p: Product) {
        if (!confirm(`¿Eliminar "${p.name}"?`)) return;
        await deleteDoc(doc(db, "products", p.id));
        if (p.imagePath) await deleteObject(ref(storage, p.imagePath)).catch(() => { });
        if (editing?.id === p.id) reset();
        await load();
    }

    async function importSeed() {
        if (!confirm("¿Importar los elementos de ejemplo del archivo product.ts")) return;
        const now = Date.now();
        await Promise.all(
            seedProducts.map((p, i) => {
                const { id, ...rest } = p;
                return setDoc(doc(db, "products", id), clean({ ...rest, createdAt: now - i }));
            }),
        );
        setMsg("Productos importados ✅");
        await load();
    }

    const field = "w-full rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-2 text-sm placeholder:text-zinc-500 focus:border-rose focus:outline-none";

    if (!authReady) return <p className="p-10 to-zinc-400">Cargando...</p>;

    if (!user) {
        return (
            <main className="mx-auto max-w-md px-4 py-24 text-center">
                <h1 className="font-display text-3xl">Panel Cata Dreams</h1>
                <button
                    onClick={() => signInWithPopup(auth, new GoogleAuthProvider())}
                    className="mt-8 rounded-full border border-rose bg-wine px-8 py-3 uppercase tracking-widest hover:bg-rose"
                >
                    Entrar con Google
                </button>
            </main>
        )
    }

    if (!isAdmin) {
        return (
            <main className="mx-auto max-w-md px-4 py-24 text-center">
                <p className="to-zinc-300">{user.email} no tiene permiso para administrar.</p>
                <button onClick={() => signOut(auth)} className="mt-6 text-sm text-rose underline">
                    Cerrar Sesión
                </button>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl px-4 py-10">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                <h1 className="font-display text-3xl">Productos</h1>
                <div className="flex items-center gap-4 text-sm">
                    <span className="text-zinc-400">{user.email}</span>
                    <button onClick={() => signOut(auth)} className="text-rose underline">Salir</button>
                </div>
            </div>

            <div className="grid gap-10 lg:grid-cols-[380px_1fr]">
                {/* FORMULARIO */}
                <form onSubmit={onSubmit} className="h-fit space-y-3 rounded-3xl border border-line bg-black/60 p-5">
                    <h2 className="font-semibold">{editing ? "Editar producto" : "Nuevo producto"}</h2>
                    <input required placeholder="nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} />
                    <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as CategorySlug })} className={field}>
                        {categories.map((c) => (
                            <option key={c.slug} value={c.slug}>
                                {c.label}
                            </option>
                        ))}
                    </select>
                    <textarea rows={3} placeholder="Descripción" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={field} />
                    <input type="number" min={0} placeholder="Precio desde (opcional)" value={form.priceFrom} onChange={(e) => setForm({ ...form, priceFrom: e.target.value })} className={field} />
                    <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
                        Mostrar en Best Sellers
                    </label>
                    <label className="flext items-center gap-2 text-sm">
                        <input type="checkbox" checked={form.isNew} onChange={(e) => setForm({ ...form, isNew: e.target.checked })} />
                        Etiqueta "Nuevo"
                    </label>

                    <div>
                        <input type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
                        {preview && (
                            // eslint-disbaled-next-line @next/next/no-img-elemnt
                            <img src={preview} alt="Vista Previa" className="mt-3 aspect-square w-40 rounded-lg border border-line object-cover" />
                        )}
                    </div>

                    {msg && <p className="text-sm text-rose">{msg}</p>}

                    <div className="flex gap-2 pt-2">
                        {editing && (
                            <button type="button" onClick={reset} className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm hover:bg-zinc-900">
                                Cancelear
                            </button>
                        )}
                        <button type="submit" disabled={saving} className="flex-1 rounded-lg border border-rose bg-wine py-2 text-sm font-medium hover:bg-rose disabled:opacity-50">
                            {saving ? "Guardando" : editing ? "Guardar cambio" : "Crear producto"}
                        </button>
                    </div>
                </form>

                {/* LISTA */}
                <section>
                    {items.length === 0 ? (
                        <div className="rounded-2xl border border-dashed border-line p-8 text-center">
                            <p className="to-zinc-400">Aún no hay productos registrados</p>
                            <button onClick={importSeed} className="mt-4 rounded-lg border border-rose px-4 py-2  text-sm text-rose hover:bg-rose hover:text-withe">
                                Importar información ejemplo
                            </button>
                        </div>
                    ) : (
                        <ul>
                            {items.map((p) => (
                                <li key={p.id} className="flex items-center gap-4 rounded-xl border border-line bg-black/60 p-3">
                                    <div
                                        className="h-16 w-16 shrink-0  rounded-lg bg-cover bg-center"
                                        style={{ backgroundImage: p.image ? `url('${p.image}'),linear-gradient(160deg,#2a0614,#050204)` : "linear-gradient(160deg,#2a0614,#050204)" }}
                                    />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-medium">{p.name}</p>
                                        <p className="text-xs to-zinc-400">
                                            {categories.find((c) => c.slug == p.category)?.label}
                                            {p.featured && " · Best Seller"}
                                            {p.isNew && " · Nuevo"}
                                        </p>
                                    </div>
                                    <button onClick={() => startEdit(p)} className="text-sm text-rose hover:underline">Editar</button>
                                    <button onClick={() => onDelete(p)} className="text-sm text-zinc-500 hover:text-red-400">Eliminar</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </div>
        </main>
    )
}