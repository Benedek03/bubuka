import { ButtonBuilder, ButtonInteraction, CacheType, Interaction } from "discord.js"
import { readdirSync } from "fs";

export type Button = {
    builder: ButtonBuilder;
    execute: (interaction: ButtonInteraction) => Promise<void>;
}

export const buttonMap: Map<string, Button> = new Map<string, Button>();

export const buttonListener = async (interaction: Interaction<CacheType>) => {
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
};

let fileNames;
// this if statement is so it works both after:
//      npm run ts-node
//      npm run build && npm run start
if (import.meta.url.endsWith('.js'))
    fileNames = readdirSync('./dist/btns').filter(file => file.endsWith('.js'));
else
    fileNames = readdirSync('./src/btns').filter(file => file.endsWith('.ts')).map(file => file.replace('.ts', '.js'));

for (const fileName of fileNames) {
    let btn = (await import(`./btns/${fileName}`)).default;
    buttonMap.set(btn.builder.data.custom_id, btn);
}