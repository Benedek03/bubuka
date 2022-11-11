import { ButtonBuilder, ButtonInteraction } from "discord.js"

export type Button = {
    builder: ButtonBuilder;
    execute: (interaction: ButtonInteraction) => Promise<void>;
}

export const buttonMap: Map<string, Button> = new Map<string, Button>();

for (const f of [
    './btns/insult.js',
]) {
    import(f).then(c => {
        buttonMap.set(c.default.builder.data.custom_id, c.default);
    })
}