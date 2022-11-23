import { ButtonBuilder, ButtonInteraction } from "discord.js"

export type Button = {
    builder: ButtonBuilder;
    execute: (interaction: ButtonInteraction) => Promise<void>;
}

export const buttonMap: Map<string, Button> = new Map<string, Button>();

for (const f of [
    './btns/insult.js',
]) {
    let b = await import(f)
    buttonMap.set(b.default.builder.data.custom_id, b.default);
}