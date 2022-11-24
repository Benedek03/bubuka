import { ButtonBuilder, ButtonInteraction, Client, Events } from "discord.js"

export type Button = {
    builder: ButtonBuilder;
    execute: (interaction: ButtonInteraction) => Promise<void>;
}

export const buttonMap: Map<string, Button> = new Map<string, Button>();

export const addButtonInteractionHandler = (client: Client) =>
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isButton()) return;

        const command = buttonMap.get(interaction.customId);
        if (!command) {
            console.error(`No button matching ${interaction.customId} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this button!', ephemeral: true });
        }
    });

for (const f of [
    './btns/insult.js',
]) {
    let b = await import(f)
    buttonMap.set(b.default.builder.data.custom_id, b.default);
}