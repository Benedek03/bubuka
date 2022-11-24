import { CommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody as DataType } from 'discord.js';

export type Command = {
    data: DataType;
    execute: (interaction: CommandInteraction) => Promise<void>;
}

export const commandMap: Map<string, Command> = new Map<string, Command>();
export const commandDataArray: DataType[] = [];

export let md = `<!--- this file was automaticly generated at ${Date.now()} --->\n# **Commands:**\n`;

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