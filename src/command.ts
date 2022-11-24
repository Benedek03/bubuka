import { Client, REST, Routes, CommandInteraction, Events, RESTPostAPIChatInputApplicationCommandsJSONBody as DataType } from 'discord.js';
import { readdirSync } from 'fs';

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

export const deployCommands = async (token: string, applicationId: string, testGuildId: string | undefined, array = commandDataArray) => {
    const rest = new REST({ version: '10' }).setToken(token);
    try {
        console.log(`Started refreshing application (/) commands.`);
        const data = await rest.put(
            testGuildId ? Routes.applicationGuildCommands(applicationId, testGuildId) : Routes.applicationCommands(applicationId),
            { body: array },
        );
        console.log(`Successfully reloaded application (/) commands.`);
    } catch (error) {
        console.error(error);
    }
}

let fileNames;
// this if statement is so it works both after:
//      npm run ts-node
//      npm run build && npm run start
if (import.meta.url.endsWith('.js'))
    fileNames = readdirSync('./dist/cmds').filter(file => file.endsWith('.js'));
else
    fileNames = readdirSync('./src/cmds').filter(file => file.endsWith('.ts')).map(file => file.replace('.ts', '.js'));

for (const fileName of fileNames) {
    let cmd = (await import(`./cmds/${fileName}`)).default;
    commandMap.set(cmd.data.name, cmd);
    commandDataArray.push(cmd.data);
    cmd = cmd.data;
    md += `## **${cmd.name}**\n`;
    md += `### ${cmd.description}\n`;
    if (cmd.options && cmd.options.length > 0) {
        md += '### options:\n';
        for (let j = 0; j < cmd.options.length; j++) {
            const o = cmd.options[j];
            if (o.required == false)
                md += `- *${o.name}*: ${o.description}\n`;
            else
                md += `- ${o.name}: ${o.description}\n`;
        }
    }
}