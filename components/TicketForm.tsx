"use client";
import { useState, type FormEvent } from "react";

interface Props {
    productName: string;
    onclose: () => void;
}

export default function TicketForm({ productName, onclose }: Props) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [error, setError] = useState("");

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");
        const data = Object.fromEntries(new FormData(e.currentTarget));
        try {
            const res = await fetch("/api/ticket", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...data, productName })
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Error al enviar");
            setStatus("success");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error al enviar");
            setStatus("error");
        }
    }
    const field = "w-full rounded-lg bg-zinc-800 border border-zinc-700 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500";

    return (
        <div className="fixed inset-0 z-50 flex intems-center justify-center bg-black/70 p-4">
            <div className="w-full max-w-md rounded-2xl border border-zinc-800 p-6 text-white">
                {status === "success" ? (
                    <div className="space-y-4 text-center">
                        <p className="text-lg font-semibold">Ticket creado exitosamente</p>
                        <p className="text-sm text-zinc-400">
                            Nuestro equipo de soporte se pondrá en contacto contigo a la brevedad. Por favor, revisa tu Discord para más detalles, en caso de que no estes en el discord unete aquí:
                        </p>
                        <a
                            href={process.env.NEXT_PUBLIC_DISCORD_INVITE}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium hover:bg-purple-700"
                        >
                            Cata Dreams Discord
                        </a>
                        <div>
                            <button
                                onClick={onclose}
                                className="text-sm text-zinc-400 hover:text-white"
                            >
                                Cerrar
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-3">
                        <h2 className="text-lg font-semibold">Más información</h2>
                        <p className="text-sm text-zinc-400">Sobre {productName}</p>
                        <input name="name" required placeholder="Tu nombre" className={field} />
                        <input name="character" placeholder="Nombre de tu personaje (Opcional)" className={field} />
                        <input name="discordUser" required placeholder="Tu usuario de Discord" className={field} />
                        <textarea name="message" required placeholder="Cuentanos que necesitas" className={field} rows={4} />
                        {/* Honey Pot */}
                        <input name="website" tabIndex={-1} autoComplete="off" className="hidden" />
                        {status === "error" && (
                            <p className="text-sm text-red-500">{error}</p>
                        )}
                        <div className="flex gap-2 pt-2">
                            <button
                                type="button"
                                onClick={onclose}
                                className="flex-1 rounded-lg border border-zinc-700 py-2 text-sm hover:bg-zinc-800"
                            >
                                Cancelar
                            </button>
                            <button
                            type="submit"
                            disabled={status === "loading"}
                            className="flex-1 rounded-lg bg-purple-600 py-2 text-sm font-medium hover:bg-purple-700 disabled:opacity-50"
                            >
                                {status === "loading" ? "Enviando..." : "Abrir Ticket"}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    )
}

