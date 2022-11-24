import { Client, CommandInteraction, Events, RESTPostAPIChatInputApplicationCommandsJSONBody as DataType } from 'discord.js';

export type Command = {
    data: DataType;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export const commandMap: Map<string, Command> = new Map<string, Command>();
export const commandDataArray: DataType[] = [];

export let md = `<!--- this file was automaticly generated at ${Date.now()} --->\n# **Commands:**\n`;

export const addCommandInteractionHandler = (client: Client) =>
    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;

        const command = commandMap.get(interaction.commandName);
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    });


for (const f of [
    './cmds/insult.js',
    './cmds/pfp.js',
    './cmds/ping.js'
]) {
    let c = await import(f);
    commandMap.set(c.default.data.name, c.default);
    commandDataArray.push(c.default.data);
    c = c.default.data;
    md += `## **${c.name}**\n`;
    md += `### ${c.description}\n`;
    if (c.options && c.options.length > 0) {
        md += '### options:\n';
        for (let j = 0; j < c.options.length; j++) {
            const o = c.options[j];
            if (o.required == false)
                md += `- *${o.name}*: ${o.description}\n`;
            else
                md += `- ${o.name}: ${o.description}\n`;
        }
    }
}