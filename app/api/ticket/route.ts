import {NextResponse} from "next/server";
import {createTicket, type TicketInput} from "@/lib/discord";
export const runtime = "nodejs";

function clean(value: unknown, max: number): string {
    return typeof value === "string" ? value.slice(0, max) : "";
}

export async function POST(req: Request) {
    let body: Record<string, unknown>;
    try {
        body = await req.json();
    } catch {
        return NextResponse.json({error: "Solicitud inválida"}, {status: 400});
    }

// Honeypot anti-bots: debe venir vacio
if(clean(body.website, 100)) return NextResponse.json({ok: true});

const input: TicketInput = {
    name: clean(body.name, 60),
    character: clean(body.character, 60),
    discordUser: clean(body.discordUser, 40),
    productName: clean(body.productName, 80),
    message: clean(body.message, 1024),
};

if(!input.name || !input.character || !input.discordUser || !input.productName || !input.message) {
    return NextResponse.json({error: "Faltan campos obligatorios"}, {status: 400});
}

try{
    await createTicket(input);
    return NextResponse.json({ok: true});
} catch(err) {
    return NextResponse.json({error: "No se pudo crear el ticket"}, {status: 500});
    }
}
