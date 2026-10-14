const API = "https://discord.com/api/v10";

// Permisos discord
const VIEW_CHANNEL = BigInt(1) << BigInt(10);
const SEND_MESSAGES = BigInt(1) << BigInt(11);
const READ_HISTORY = BigInt(1) << BigInt(16);
const ALLOW_TICKET = (VIEW_CHANNEL | SEND_MESSAGES | READ_HISTORY).toString();
const DENY_VIEW = VIEW_CHANNEL.toString();

function env(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Missing environment variable: ${name}`);
    }
    return value;
}

async function discord<T>(path: string, init: RequestInit = {} ): Promise<T> {
    const res = await fetch(`${API}${path}`, {
        ...init,
        headers: {
            "Authorization": `Bot ${env("DISCORD_BOT_TOKEN")}`,
            "Content-Type": "application/json",
            ...init.headers,
        },
    });
    if(!res.ok) {
        throw new Error(`Discord API error: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

export interface TicketInput {
    name: string;
    character: string;
    discordUser: string;
    productName: string;
    message: string;
}

export async function createTicket(input: TicketInput): Promise<void> {
    const guildId = env("DISCORD_GUILD_ID");
    const staffRoleId = env("DISCORD_STAFF_ROLE_ID");
    const me = await discord<{ id: string }>(`/users/@me`);

    const slug = input.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 20) || "cliente";
    const suffix = Date.now().toString(36).slice(-4);
    
    const channel = await discord<{id: string}>(`/guilds/${guildId}/channels`, {
        method: "POST",
        body: JSON.stringify({
            name: `ticket-${slug}-${suffix}`,
            type: 0,
            parent_id: process.env.DISCORD_TICKET_CATEGORY_ID || undefined,
            topic: `Ticket de ${input.name} - (${input.productName})`,
            permission_overwrites: [
                {id: guildId, type: 0, deny: DENY_VIEW,}, // @everyone no ve el canal
                {id: staffRoleId, type: 1, allow: ALLOW_TICKET,}, // Staff ve el canal
                {id: me.id, type: 1, allow: ALLOW_TICKET,} // Bot ve el canal
            ],
        }),
    });

    await discord(`/channels/${channel.id}/messages`, {
        method: "POST",
        body: JSON.stringify({
            content: `<@&${staffRoleId}> Nuevo ticket de ${input.name} (${input.character}) - (${input.productName})`,
            embeds: [
                {
                    title: `Ticket de ${input.name}`,
                    color: 0xa855f7,
                    fields: [
                        {name: "Cliente", value: input.name, inline: true},
                        {name: "Personaje", value: input.character || "No indicado", inline: true},
                        {name: "Discord", value: input.discordUser, inline: true},
                        {name: "Producto / Servicio", value: input.productName},
                        {name: "Mensaje", value: input.message.slice(0, 1024)},
                    ],
                    timestamp: new Date().toISOString(),
                },
            ],
        }),
    });
}
